import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

import {
  AdvancedSubnetting,
  IPInformation,
  SingleSubnetting,
} from './components/blocks';
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
            path: '',
            element: <IPInformation />,
          },
          {
            path: 'single-subnetting',
            element: <SingleSubnetting />,
          },
          {
            path: 'advanced-subnetting',
            element: <AdvancedSubnetting />,
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
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
