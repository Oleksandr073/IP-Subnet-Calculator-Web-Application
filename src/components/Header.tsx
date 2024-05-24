import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header>
      <div className="container mx-auto px-4 flex">
        <nav>
          <ul>
            <li>
              <Link to="/">Login Page</Link>
            </li>
            <li>
              <Link to="/calculator">Calculator Page</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
