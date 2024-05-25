import { FormEventHandler, useState } from 'react';
import { isIPv4 } from 'is-ip';

import { Button, Input } from '../../ui';

export type CalculatorFormData = {
  ipAddress: string;
  mask: string;
  newMask?: string;
};

type Props = {
  onSubmit(data: CalculatorFormData): void;
  isMovingMask?: boolean;
};
export const SimpleIPCalculatorForm = ({
  onSubmit,
  isMovingMask = false,
}: Props) => {
  const [ipAddress, setIpAddress] = useState('');
  const [mask, setMask] = useState('');
  const [newMask, setNewMask] = useState('');
  const [error, setError] = useState('');

  const onSubmitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!ipAddress || !mask || (isMovingMask && !newMask)) {
      return;
    }
    if (!isIPv4(ipAddress)) {
      setError('input IP is not correct');
      return;
    }
    if (Number(mask) < 1 || Number(mask) > 31) {
      setError('input mask is not correct');
      return;
    }
    if (isMovingMask && Number(newMask) <= Number(mask)) {
      setError('input new mask is not correct');
      return;
    }
    setError('');
    onSubmit({ ipAddress, mask, newMask: isMovingMask ? newMask : undefined });
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <div className="flex flex-wrap items-end mb-3 -mt-1">
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
          {isMovingMask && (
            <div className="flex items-end mt-1">
              <span className="mb-0.5">&nbsp;move to:&nbsp;</span>
              <Input
                value={newMask}
                onChange={setNewMask}
                name="new-netmask"
                label="Netmask for subnet"
              />
            </div>
          )}
        </div>
        <Button text="Calculate!" type="submit" />
      </form>

      {error && <p>{error}</p>}
    </div>
  );
};
