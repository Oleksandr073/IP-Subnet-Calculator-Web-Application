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

export function calculateIPInfo(inputAddress: string, inputMask: string) {
  const netmask = Number(inputMask);
  if (!isIPv4(inputAddress) || netmask < 1 || netmask > 31) {
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
