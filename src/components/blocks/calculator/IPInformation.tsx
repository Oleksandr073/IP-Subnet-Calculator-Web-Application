import { useState } from 'react';

import { calculateIPInfo, IPInfo } from '../../../utils';

import { IPInfoTable } from './IPInfoTable';
import {
  CalculatorFormData,
  SimpleIPCalculatorForm,
} from './SimpleIPCalculatorForm';

export const IPInformation = () => {
  const [ipInfo, setIpInfo] = useState<IPInfo | null>(null);

  const onSubmitHandler = (data: CalculatorFormData) => {
    const { ipAddress, mask } = data;
    const result = calculateIPInfo(ipAddress, mask);
    setIpInfo(result);

    // eslint-disable-next-line no-console
    console.log({ ipAddress, mask });
  };

  return (
    <div>
      <div>
        <SimpleIPCalculatorForm onSubmit={onSubmitHandler} />
      </div>

      {ipInfo && <IPInfoTable ipInfo={ipInfo} />}
    </div>
  );
};
