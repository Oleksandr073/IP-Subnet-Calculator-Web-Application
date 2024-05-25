import { Button } from '../components/ui';

export const NotFoundPage = () => {
  return (
    <div className="container py-20 flex flex-col items-center">
      <div className="mb-2">
        <p className="font-bold text-8xl">404</p>
      </div>
      <div className="mb-4">
        <b className="font-bold text-2xl">Not Fount Page</b>
      </div>
      <Button text="Home Page" isAppLink to="/" />
    </div>
  );
};
