import { UserInformation } from '../../components/blocks';
import { authSelectors } from '../../redux/auth/selectors';
import { useAppSelector } from '../../redux/hooks';

export const UserPage = () => {
  const userInfo = useAppSelector(authSelectors.selectUserInfo);
  return (
    <div className="container py-5">
      <h2 className="font-bold text-2xl mb-4">User Information</h2>

      {userInfo && <UserInformation userInfo={userInfo} />}
    </div>
  );
};
