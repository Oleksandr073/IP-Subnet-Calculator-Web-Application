import { useState } from 'react';

import { calculateIPInfo, IPInfo, multiSubnetting } from '../../../utils';

import {
  AdvancedCalculatorFormData,
  AdvancedIPCalculatorForm,
} from './AdvancedIPCalculatorForm';
import { IPInfoTable } from './IPInfoTable';

export const AdvancedSubnetting = () => {
  const [ipInfo, setIpInfo] = useState<IPInfo | null>(null);
  const [subnetsIpInfo, setSubnetsIpInfo] = useState<IPInfo[]>([]);

  const onSubmitHandler = ({
    ipAddress,
    mask,
    subnetsHosts,
  }: AdvancedCalculatorFormData) => {
    const inputAddressInfo = calculateIPInfo(ipAddress, mask);
    setIpInfo(inputAddressInfo);

    try {
      const subnetsToUseAddresses = multiSubnetting(
        inputAddressInfo.network.binary,
        Number(mask),
        subnetsHosts,
      );

      const subnetsInfo = subnetsToUseAddresses.map((item) =>
        calculateIPInfo(item.address, item.mask),
      );

      setSubnetsIpInfo(subnetsInfo);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error', error);
    }
  };

  return (
    <div>
      <div className="mb-3">
        <AdvancedIPCalculatorForm onSubmit={onSubmitHandler} />
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
