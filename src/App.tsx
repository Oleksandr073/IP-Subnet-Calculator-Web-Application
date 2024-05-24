import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

import { MainLayout } from './components/layout';
import { authSelectors } from './redux/auth/selectors';
import { useAppSelector } from './redux/hooks';
import { CalculatorPage, HomePage, LoginPage, NotFoundPage } from './pages';

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
        path: '/login',
        element: (
          <PublicOnlyRoute>
            <LoginPage />
          </PublicOnlyRoute>
        ),
      },
      {
        path: '/calculator',
        element: (
          <Protected>
            <CalculatorPage />
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
