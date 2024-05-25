import clsx from 'clsx';
import { Link, Outlet, useLocation } from 'react-router-dom';

export const CalculatorPage = () => {
  const location = useLocation();
  const isIPInformation = location.pathname === '/calculator';
  const isIPSubnetting = location.pathname === '/calculator/subnetting';

  return (
    <div className="container py-5">
      <h1 className="font-bold text-2xl mb-4">IP Calculator / IP Subnetting</h1>

      <ul className="flex mb-4">
        <li>
          <Link
            to=""
            className={clsx(
              'border border-r-0 border-gray-400 py-2 px-4 rounded-l-md',
              {
                'bg-blue-100': isIPInformation,
              },
            )}
          >
            IP Information
          </Link>
        </li>
        <li>
          <Link
            to="subnetting"
            className={clsx('border border-gray-400 py-2 px-4 rounded-r-md', {
              'bg-blue-100': isIPSubnetting,
            })}
          >
            IP Subnetting
          </Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
};
