import clsx from 'clsx';
import { Link, Outlet, useLocation } from 'react-router-dom';

export const CalculatorPage = () => {
  const location = useLocation();
  const isIPInformation = location.pathname === '/calculator';
  const isSingleSubnetting =
    location.pathname === '/calculator/single-subnetting';
  const isAdvancedSubnetting =
    location.pathname === '/calculator/advanced-subnetting';

  return (
    <div className="container py-5">
      <h1 className="font-bold text-2xl mb-4">IP Calculator / IP Subnetting</h1>

      <ul className="flex mb-5">
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
            to="single-subnetting"
            className={clsx('border border-gray-400 py-2 px-4', {
              'bg-blue-100': isSingleSubnetting,
            })}
          >
            Single Subnetting
          </Link>
        </li>
        <li>
          <Link
            to="advanced-subnetting"
            className={clsx(
              'border border-l-0 border-gray-400 py-2 px-4 rounded-r-md',
              {
                'bg-blue-100': isAdvancedSubnetting,
              },
            )}
          >
            Advanced Subnetting
          </Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
};
