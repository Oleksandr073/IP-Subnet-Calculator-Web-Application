import clsx from 'clsx';

type Size = 'md' | 'lg';
type Color = 'white' | 'gray' | 'blue';

type Props = {
  size?: Size;
  color?: Color;
};
export const Loader = ({ size = 'md', color = 'blue' }: Props) => {
  return (
    <div
      className={clsx(
        'inline-block animate-spin rounded-full border-solid border-current border-r-transparent align-[-0.5em] motion-reduce:animate-[spin_1.5s_linear_infinite]',
        {
          'h-8 w-8 border-4': size === 'md',
          'h-16 w-16 border-8': size === 'lg',
          'text-white': color === 'white',
          'text-gray-400': color === 'gray',
          'text-blue-500': color === 'blue',
        },
      )}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};
