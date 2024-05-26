import { isIPv4 } from 'is-ip';

const toBinary = (num: string | number) => Number(num).toString(2);
const toDecimal = (binary: string) => parseInt(binary, 2).toString();
const ipToBinary = (decimalIp: string) =>
  decimalIp
    .split('.')
    .map((octet) => {
      const binary = toBinary(octet);
      return binary.length < 8
        ? '0'.repeat(8 - binary.length) + binary
        : binary;
    })
    .join('.');
const ipToDecimal = (binaryIp: string) =>
  binaryIp.split('.').map(toDecimal).join('.');
const addDotsToIP = (ip: string) =>
  ip.replace(/(\d{8})(\d{8})(\d{8})(\d{8})/, '$1.$2.$3.$4');
const addSpaceAfterMaskBits = (ipBinary: string, mask: number) => {
  let count = 0;
  let index = 0;

  while (count < mask && index < ipBinary.length) {
    if (ipBinary[index] !== '.') {
      count = count + 1;
    }
    index = index + 1;
  }

  if (count < mask) {
    return ipBinary;
  }

  return ipBinary.slice(0, index) + ' ' + ipBinary.slice(index);
};

export function calculateIPInfo(
  inputAddress: string,
  inputMask: string | number,
) {
  const netmask = Number(inputMask);
  if (!isIPv4(inputAddress) || netmask < 1) {
    throw new Error('input IP or mask is not correct');
  }

  const binaryAddress = ipToBinary(inputAddress);

  const binaryNetmask = addDotsToIP(
    '1'.repeat(netmask) + '0'.repeat(32 - netmask),
  );
  const decimalNetmask = ipToDecimal(binaryNetmask);

  const binaryWildcard = addDotsToIP(
    '0'.repeat(netmask) + '1'.repeat(32 - netmask),
  );
  const decimalWildcard = ipToDecimal(binaryWildcard);

  const binaryNetworkNumber = binaryAddress
    .replace(/\./g, '')
    .slice(0, netmask);

  const binaryNetwork = addDotsToIP(
    binaryNetworkNumber + '0'.repeat(32 - netmask),
  );
  const decimalNetwork = ipToDecimal(binaryNetwork);

  const binaryBroadcast = addDotsToIP(
    binaryNetworkNumber + '1'.repeat(32 - netmask),
  );
  const decimalBroadcast = ipToDecimal(binaryBroadcast);

  const binaryHostMin = binaryNetwork.slice(0, -1) + '1';
  const decimalHostMin = ipToDecimal(binaryHostMin);

  const binaryHostMax = binaryBroadcast.slice(0, -1) + '0';
  const decimalHostMax = ipToDecimal(binaryHostMax);

  const hostsCount = 2 ** (32 - netmask) - 2;

  return {
    inputIp: inputAddress,
    inputMask: netmask,
    hostsCount,
    address: {
      decimal: inputAddress,
      binary: binaryAddress,
      binaryWithMask: addSpaceAfterMaskBits(binaryAddress, netmask),
    },
    netmask: {
      decimal: decimalNetmask,
      binary: binaryNetmask,
      binaryWithMask: addSpaceAfterMaskBits(binaryNetmask, netmask),
    },
    wildcard: {
      decimal: decimalWildcard,
      binary: binaryWildcard,
      binaryWithMask: addSpaceAfterMaskBits(binaryWildcard, netmask),
    },
    network: {
      decimal: decimalNetwork,
      binary: binaryNetwork,
      binaryWithMask: addSpaceAfterMaskBits(binaryNetwork, netmask),
    },
    broadcast: {
      decimal: decimalBroadcast,
      binary: binaryBroadcast,
      binaryWithMask: addSpaceAfterMaskBits(binaryBroadcast, netmask),
    },
    hostMin: {
      decimal: decimalHostMin,
      binary: binaryHostMin,
      binaryWithMask: addSpaceAfterMaskBits(binaryHostMin, netmask),
    },
    hostMax: {
      decimal: decimalHostMax,
      binary: binaryHostMax,
      binaryWithMask: addSpaceAfterMaskBits(binaryHostMax, netmask),
    },
  };
}

export type IPInfo = ReturnType<typeof calculateIPInfo>;

export const getSubnetsDecimalAddresses = (
  networkIpBinary: string,
  oldMask: string | number,
  newMask: string | number,
) => {
  const ipBinaryNumber = networkIpBinary.replace(/\./g, '');
  const fromMask = Number(oldMask);
  const toMask = Number(newMask);

  const subnetsBinaryWithOutDots: string[] = [];

  const newBitsAmount = toMask - fromMask;

  const subnetsAmount = 2 ** newBitsAmount;

  for (let i = 0; i < subnetsAmount; i++) {
    const newSubnetEnding = toBinary(i);
    const newSubnetEndingStr =
      newSubnetEnding.length < newBitsAmount
        ? '0'.repeat(newBitsAmount - newSubnetEnding.length) + newSubnetEnding
        : newSubnetEnding;
    const newSubnetBinary =
      ipBinaryNumber.slice(0, fromMask) +
      newSubnetEndingStr +
      '0'.repeat(32 - toMask);
    subnetsBinaryWithOutDots.push(newSubnetBinary);
  }

  return subnetsBinaryWithOutDots.map(addDotsToIP).map(ipToDecimal);
};

const findClosestMask = (hosts: number) => {
  for (let i = 1; i < 32; i++) {
    const hostsAmount = 2 ** i - 2;
    if (hosts <= hostsAmount) {
      return 32 - i;
    }
  }
  throw new Error('Cannot find mask to fit these hosts: ' + hosts);
};

export const multiSubnetting = (
  networkIpBinary: string,
  mask: number,
  subnetsHosts: number[],
) => {
  const outputSubnetsAddresses: { address: string; mask: number }[] = [];
  const sortedHosts = [...subnetsHosts].sort((a, b) => b - a);
  const newMasks: {
    [key in string]: number;
  } = {};

  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < sortedHosts.length; i++) {
    const hosts = sortedHosts[i];
    const newMask = findClosestMask(hosts);
    if (newMask < mask) {
      throw new Error('Cannot split your network to fit these hosts: ' + hosts);
    }
    newMasks[String(newMask)] = newMasks[String(newMask)]
      ? newMasks[String(newMask)] + 1
      : 1;
  }

  const sortedMaskKeys = Object.keys(newMasks)
    .map(Number)
    .sort((a, b) => a - b);
  let prevIpBinary = networkIpBinary;
  let prevMask = mask;
  let isSubnetsSplitted = false;
  for (const newMask of sortedMaskKeys) {
    if (isSubnetsSplitted) {
      throw new Error("can't split addresses more");
    }
    const newMaskAmount = newMasks[String(newMask)];
    if (newMaskAmount > 2 ** (newMask - prevMask)) {
      throw new Error(
        `Cannot split network ${newMaskAmount} times for ${newMask} mask`,
      );
    }

    const subnetAddresses = getSubnetsDecimalAddresses(
      prevIpBinary,
      prevMask,
      newMask,
    );

    const subnetsToUse = subnetAddresses.slice(0, newMaskAmount);
    const subnetsToNextSplit = subnetAddresses.slice(newMaskAmount);

    outputSubnetsAddresses.push(
      ...subnetsToUse.map((item) => ({ address: item, mask: newMask })),
    );

    if (subnetsToNextSplit.length === 0 || !subnetsToNextSplit[0]) {
      isSubnetsSplitted = true;
    }

    prevIpBinary = ipToBinary(subnetsToNextSplit[0]);
    prevMask = newMask;
  }

  return outputSubnetsAddresses;
};
