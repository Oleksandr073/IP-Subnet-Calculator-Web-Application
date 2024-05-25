import { signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';

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
      <div className="container mx-auto flex">
        <Link to="/" className="mr-auto">
          Logo
        </Link>
        <nav>
          <ul className="flex gap-5">
            <li>
              <Link to="/">Home page</Link>
            </li>
            <li>
              <Link to="/calculator">Calculator Page</Link>
            </li>
            <li>
              {isUserLoggedIn ? (
                <Link to="/user">User Page</Link>
              ) : (
                <Link to="/login">Log In</Link>
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
