import { SignInBlock } from '../../components';
import { SignOutBlock } from '../../components/blocks';
import { authSelectors } from '../../redux/auth/selectors';
import { useAppSelector } from '../../redux/hooks';

export const LoginPage = () => {
  const isUserLoggedIn = useAppSelector(authSelectors.selectIsUserLoggedIn);
  return (
    <div>
      {isUserLoggedIn ? (
        <SignOutBlock />
      ) : (
        <div>
          <p>Login Page</p>
          <SignInBlock />
        </div>
      )}
    </div>
  );
};
