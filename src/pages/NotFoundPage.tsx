import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div>
      <b>404</b>
      <b>Not Fount Page</b>
      <Link to="/">Login page</Link>
    </div>
  );
};
