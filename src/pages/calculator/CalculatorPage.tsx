import { Link, Outlet } from 'react-router-dom';

export const CalculatorPage = () => {
  return (
    <div className="container mx-auto py-5">
      <h1 className="font-bold text-2xl mb-4">IP Calculator / IP Subnetting</h1>

      <ul className="flex mb-4">
        <li className="border py-2 px-4">
          <Link to="/calculator/">IP Information</Link>
        </li>
        <li className="border py-2 px-4">
          <Link to="/calculator/subnetting">IP Subnetting</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
};
