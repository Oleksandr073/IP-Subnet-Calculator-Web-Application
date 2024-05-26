import { FormEventHandler, useState } from 'react';
import { isIPv4 } from 'is-ip';

import { numberToLetters } from '../../../utils';
import { Button, Input } from '../../ui';

export type AdvancedCalculatorFormData = {
  ipAddress: string;
  mask: string;
  subnetsHosts: number[];
};

type Props = {
  onSubmit(data: AdvancedCalculatorFormData): void;
};
export const AdvancedIPCalculatorForm = ({ onSubmit }: Props) => {
  const [ipAddress, setIpAddress] = useState('');
  const [mask, setMask] = useState('');
  const [error, setError] = useState('');
  const [subnetsHosts, setSubnetsHosts] = useState<number[]>([100]);

  const setSubnetHosts = (hosts: number, index: number) => {
    setSubnetsHosts((prevSubnetsHosts) => {
      const newSubnetsHosts = [...prevSubnetsHosts];
      newSubnetsHosts[index] = hosts;
      return newSubnetsHosts;
    });
  };

  const onAddSubnet = () => {
    setSubnetsHosts((hosts) => [...hosts, 30]);
  };

  const onSubmitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const notNullHosts = subnetsHosts.filter((value) => value > 0);
    setSubnetsHosts(notNullHosts.length > 0 ? notNullHosts : [100]);
    if (!ipAddress || !mask || notNullHosts.length === 0) {
      return;
    }
    if (!isIPv4(ipAddress)) {
      setError('IP address is not correct');
      return;
    }
    if (Number(mask) < 1 || Number(mask) > 31) {
      setError('Mask is not correct');
      return;
    }
    setError('');
    onSubmit({ ipAddress, mask, subnetsHosts: notNullHosts });
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <div className="flex flex-wrap items-end -mt-1 mb-3">
          <div className="mt-1">
            <Input
              value={ipAddress}
              onChange={setIpAddress}
              name="ip-address"
              label="Address (Host or Network)"
            />
          </div>
          <div className="flex items-end mt-1">
            <span className="mb-0.5">&nbsp;/&nbsp;</span>
            <Input
              value={mask}
              onChange={setMask}
              name="netmask"
              label="Netmask"
            />
          </div>
        </div>
        <p className="mb-1 text-lg font-semibold">Subnets:</p>
        <div className="flex mb-2 gap-3 flex-wrap items-end">
          {subnetsHosts.map((hosts, index) => (
            <Input
              key={index}
              value={hosts.toString()}
              onChange={(value) => setSubnetHosts(Number(value), index)}
              name={`subnet-${numberToLetters(hosts).toLowerCase()}`}
              label={`Subnet ${numberToLetters(index + 1)}`}
            />
          ))}
          <Button text="Add subnet" type="button" onClick={onAddSubnet} />
        </div>

        {error && <p className="mb-2 text-red-600 font-semibold">{error}</p>}
        <Button text="Calculate!" type="submit" />
      </form>
    </div>
  );
};
