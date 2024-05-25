import { useState } from 'react';

import {
  calculateIPInfo,
  getSubnetsDecimalAddresses,
  IPInfo,
} from '../../../utils';

import { IPInfoTable } from './IPInfoTable';
import {
  CalculatorFormData,
  SimpleIPCalculatorForm,
} from './SimpleIPCalculatorForm';

export const SingleSubnetting = () => {
  const [ipInfo, setIpInfo] = useState<IPInfo | null>(null);
  const [subnetsIpInfo, setSubnetsIpInfo] = useState<IPInfo[]>([]);

  const onSubmitHandler = (data: CalculatorFormData) => {
    const { ipAddress, mask, newMask } = data;
    if (!newMask) return;

    const inputAddressInfo = calculateIPInfo(ipAddress, mask);

    const subnetsDecimalAddresses = getSubnetsDecimalAddresses(
      inputAddressInfo.network.binary,
      mask,
      newMask,
    );

    const subnetsInfo = subnetsDecimalAddresses.map((item) =>
      calculateIPInfo(item, newMask),
    );

    setIpInfo(inputAddressInfo);
    setSubnetsIpInfo(subnetsInfo);
  };

  return (
    <div>
      <div className="mb-3">
        <SimpleIPCalculatorForm onSubmit={onSubmitHandler} isMovingMask />
      </div>

      {ipInfo && (
        <div className="mb-4">
          <p className="mb-2">Result:</p>
          <IPInfoTable ipInfo={ipInfo} />
        </div>
      )}

      <div>
        {subnetsIpInfo.length > 0 && (
          <>
            <p className="mb-2">Subnets:</p>
            <div>
              {subnetsIpInfo.map((info, index) => (
                <div key={index} className="mb-4">
                  <IPInfoTable ipInfo={info} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
