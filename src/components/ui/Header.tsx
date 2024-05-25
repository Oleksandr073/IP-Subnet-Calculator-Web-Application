import clsx from 'clsx';
import { Link, NavLink } from 'react-router-dom';

import { authSelectors } from '../../redux/auth/selectors';
import { authSlice } from '../../redux/auth/slice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import { Logo } from './Logo';

export const Header = () => {
  const dispatch = useAppDispatch();

  const isUserLoggedIn = useAppSelector(authSelectors.selectIsUserLoggedIn);

  const handleLogOut = () => {
    dispatch(authSlice.actions.logOut());
  };

  return (
    <header className="py-3 w-full bg-blue-300 fixed">
      <div className="container flex items-center">
        <Link to="/" className="mr-auto font-medium" title="IP Calculator">
          <Logo />
        </Link>
        <nav>
          <ul className="flex items-center gap-5">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  clsx(
                    'py-2 px-1 font-medium transition-[color] duration-300 hover:text-blue-700',
                    {
                      'text-white': isActive,
                    },
                  )
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/calculator"
                className={({ isActive }) =>
                  clsx(
                    'py-2 px-1 font-medium transition-[color] duration-300 hover:text-blue-700',
                    {
                      'text-white': isActive,
                    },
                  )
                }
              >
                Calculator
              </NavLink>
            </li>
            <li>
              {isUserLoggedIn ? (
                <NavLink
                  to="/user"
                  className={({ isActive }) =>
                    clsx(
                      'py-2 px-1 font-medium transition-[color] duration-300 hover:text-blue-700',
                      {
                        'text-white': isActive,
                      },
                    )
                  }
                >
                  User
                </NavLink>
              ) : (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    clsx(
                      'py-2 px-1 font-medium transition-[color] duration-300 hover:text-blue-700',
                      {
                        'text-white': isActive,
                      },
                    )
                  }
                >
                  Log In
                </NavLink>
              )}
            </li>
          </ul>
        </nav>
        {isUserLoggedIn && (
          <button
            onClick={handleLogOut}
            className="ml-5 py-2 px-1 font-medium transition-[color] duration-300 hover:text-blue-700"
          >
            Log Out
          </button>
        )}
      </div>
    </header>
  );
};
