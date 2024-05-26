import { useState } from 'react';

import { calculateIPInfo, IPInfo } from '../../../utils';

import { IPInfoTable } from './IPInfoTable';
import {
  CalculatorFormData,
  SimpleIPCalculatorForm,
} from './SimpleIPCalculatorForm';

export const IPInformation = () => {
  const [ipInfo, setIpInfo] = useState<IPInfo | null>(null);

  const onSubmitHandler = ({ ipAddress, mask }: CalculatorFormData) => {
    const result = calculateIPInfo(ipAddress, mask);
    setIpInfo(result);
  };

  return (
    <div>
      <div className="mb-3">
        <SimpleIPCalculatorForm onSubmit={onSubmitHandler} />
      </div>

      {ipInfo && <IPInfoTable ipInfo={ipInfo} />}
    </div>
  );
};
