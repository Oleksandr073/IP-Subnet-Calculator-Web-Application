import { FormEventHandler, useState } from 'react';
import { isIPv4 } from 'is-ip';

import { calculateIPInfo, IPInfo } from '../../../utils';

import { IPInfoTable } from './IPInfoTable';

export const IPSubnetting = () => {
  const [ipAddress, setIpAddress] = useState('');
  const [mask, setMask] = useState('');
  const [newMask, setNewMask] = useState('');
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
    <div>
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
        <input
          className="border"
          value={newMask}
          onChange={(e) => setNewMask(e.target.value)}
        />
        <button className="border" type="submit">
          Calculate!
        </button>
      </form>

      {error && <p>{error}</p>}

      {ipInfo && <IPInfoTable ipInfo={ipInfo} />}

      <p>Subnets:</p>

      {/* render IPInfoTable for each subnet */}
    </div>
  );
};
