import { FormEventHandler, useState } from 'react';
import { isIPv4 } from 'is-ip';

import { calculateIPInfo, IPInfo } from './calculateIPInfo';

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
    <div className="container mx-auto">
      <h1>Calculator Page</h1>
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

      {ipInfo && (
        <table className="table-fixed">
          <tbody>
            <tr>
              <td>Address</td>
              <td>{ipInfo.address.decimal}</td>
              <td>{ipInfo.address.binary}</td>
            </tr>
            <tr>
              <td>Netmask</td>
              <td>{ipInfo.netmask.decimal}</td>
              <td>{ipInfo.netmask.binary}</td>
            </tr>
            <tr>
              <td>Wildcard</td>
              <td>{ipInfo.wildcard.decimal}</td>
              <td>{ipInfo.wildcard.binary}</td>
            </tr>
            <tr>
              <td>Network</td>
              <td>{ipInfo.network.decimal}</td>
              <td>{ipInfo.network.binary}</td>
            </tr>
            <tr>
              <td>Broadcast</td>
              <td>{ipInfo.broadcast.decimal}</td>
              <td>{ipInfo.broadcast.binary}</td>
            </tr>
            <tr>
              <td>HostMin</td>
              <td>{ipInfo.hostMin.decimal}</td>
              <td>{ipInfo.hostMin.binary}</td>
            </tr>
            <tr>
              <td>HostMax</td>
              <td>{ipInfo.hostMax.decimal}</td>
              <td>{ipInfo.hostMax.binary}</td>
            </tr>
            <tr>
              <td>Hosts</td>
              <td>{ipInfo.hostsCount}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};
