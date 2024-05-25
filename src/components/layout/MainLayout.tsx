import { Outlet } from 'react-router-dom';

import { Header } from '../ui';

export const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
