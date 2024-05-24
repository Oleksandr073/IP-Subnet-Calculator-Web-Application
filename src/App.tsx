import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { MainLayout } from './components/layout';
import { CalculatorPage, LoginPage, NotFoundPage } from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <LoginPage />,
      },
      {
        path: '/calculator',
        element: <CalculatorPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
