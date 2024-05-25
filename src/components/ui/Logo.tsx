import clsx from 'clsx';

import logo from '../../assets/cloud-network.png';

type Size = 'sm' | 'md';

type Props = {
  size?: Size;
};
export const Logo = ({ size = 'md' }: Props) => {
  return (
    <div>
      <img
        src={logo}
        className={clsx({
          'w-5 h-5': size === 'sm',
          'w-10 h-10': size === 'md',
        })}
      />
    </div>
  );
};
