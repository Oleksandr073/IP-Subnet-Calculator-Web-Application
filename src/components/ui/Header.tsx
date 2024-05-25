import { signOut } from 'firebase/auth';
import { Link, NavLink } from 'react-router-dom';

import { auth } from '../../config';
import { authSelectors } from '../../redux/auth/selectors';
import { useAppSelector } from '../../redux/hooks';

export const Header = () => {
  const isUserLoggedIn = useAppSelector(authSelectors.selectIsUserLoggedIn);

  const handleLogOut = async () => {
    try {
      await signOut(auth);
    } catch {
      // nothing to do
    }
  };

  return (
    <header className="py-3 w-full bg-green-300">
      <div className="container flex">
        <Link to="/" className="mr-auto">
          Logo
        </Link>
        <nav>
          <ul className="flex gap-5">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? 'text-white' : '')}
              >
                Home page
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/calculator"
                className={({ isActive }) => (isActive ? 'text-white' : '')}
              >
                Calculator Page
              </NavLink>
            </li>
            <li>
              {isUserLoggedIn ? (
                <NavLink
                  to="/user"
                  className={({ isActive }) => (isActive ? 'text-white' : '')}
                >
                  User Page
                </NavLink>
              ) : (
                <NavLink
                  to="/login"
                  className={({ isActive }) => (isActive ? 'text-white' : '')}
                >
                  Log In
                </NavLink>
              )}
            </li>
          </ul>
        </nav>
        {isUserLoggedIn && (
          <button onClick={handleLogOut} className="ml-5">
            Log Out
          </button>
        )}
      </div>
    </header>
  );
};
