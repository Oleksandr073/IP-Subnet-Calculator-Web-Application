import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

import { IPInformation, IPSubnetting } from './components/blocks';
import { MainLayout } from './components/layout';
import { authSelectors } from './redux/auth/selectors';
import { useAppSelector } from './redux/hooks';
import {
  CalculatorPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  UserPage,
} from './pages';

const Protected = ({ children }: { children: React.ReactNode }) => {
  const isUserLoggedIn = useAppSelector(authSelectors.selectIsUserLoggedIn);
  return isUserLoggedIn ? children : <Navigate to="/login" replace />;
};

const PublicOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  const isUserLoggedIn = useAppSelector(authSelectors.selectIsUserLoggedIn);
  return isUserLoggedIn ? <Navigate to="/" replace /> : children;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/calculator',
        element: <CalculatorPage />,
        children: [
          {
            path: '/calculator/',
            element: <IPInformation />,
          },
          {
            path: '/calculator/subnetting',
            element: <IPSubnetting />,
          },
        ],
      },
      {
        path: '/login',
        element: (
          <PublicOnlyRoute>
            <LoginPage />
          </PublicOnlyRoute>
        ),
      },
      {
        path: '/user',
        element: (
          <Protected>
            <UserPage />
          </Protected>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
