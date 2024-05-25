import { FormEventHandler, useState } from 'react';
import { isIPv4 } from 'is-ip';

import { IPInfoTable } from '../../components/blocks';
import { calculateIPInfo, IPInfo } from '../../utils/ipCalculator';

export const CalculatorPage = () => {
  const [ipAddress, setIpAddress] = useState('');
  const [mask, setMask] = useState('');
  const [error, setError] = useState('');
  const [ipInfo, setIpInfo] = useState<IPInfo | null>(null);

  const onSubmitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!ipAddress || !mask) {
      return;
    }
    if (!isIPv4(ipAddress) || Number(mask) < 1 || Number(mask) > 31) {
      setError('input IP or mask is not correct');
      return;
    }
    setError('');
    const result = calculateIPInfo(ipAddress, mask);
    setIpInfo(result);
  };

  return (
    <div className="container mx-auto pt-5">
      <h1 className="font-semibold">IP Calculator / IP Subnetting</h1>

      <form onSubmit={onSubmitHandler}>
        <input
          className="border"
          value={ipAddress}
          onChange={(e) => setIpAddress(e.target.value)}
        />
        <input
          className="border"
          value={mask}
          onChange={(e) => setMask(e.target.value)}
        />
        <button className="border" type="submit">
          Calculate!
        </button>
      </form>

      {error && <p>{error}</p>}

      {ipInfo && <IPInfoTable ipInfo={ipInfo} />}
    </div>
  );
};
