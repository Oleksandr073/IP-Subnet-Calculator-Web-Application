import clsx from 'clsx';
import { signOut } from 'firebase/auth';
import { Link, NavLink } from 'react-router-dom';

import { auth } from '../../config';
import { authSelectors } from '../../redux/auth/selectors';
import { useAppSelector } from '../../redux/hooks';

import { Logo } from './Logo';

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
    <header className="py-3 w-full bg-green-300 fixed">
      <div className="container flex items-center">
        <Link to="/" className="mr-auto" title="IP Calculator">
          <Logo />
        </Link>
        <nav>
          <ul className="flex items-center gap-5">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => clsx({ 'text-white': isActive })}
              >
                Home page
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/calculator"
                className={({ isActive }) => clsx({ 'text-white': isActive })}
              >
                Calculator Page
              </NavLink>
            </li>
            <li>
              {isUserLoggedIn ? (
                <NavLink
                  to="/user"
                  className={({ isActive }) => clsx({ 'text-white': isActive })}
                >
                  User Page
                </NavLink>
              ) : (
                <NavLink
                  to="/login"
                  className={({ isActive }) => clsx({ 'text-white': isActive })}
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
