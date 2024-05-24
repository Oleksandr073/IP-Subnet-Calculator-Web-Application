import { Outlet } from 'react-router-dom';

import { Header } from '../components';

export const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
