import { UserInformation } from '../../components/blocks';
import { Button } from '../../components/ui';
import { authSelectors } from '../../redux/auth/selectors';
import { authSlice } from '../../redux/auth/slice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

export const UserPage = () => {
  const dispatch = useAppDispatch();

  const userInfo = useAppSelector(authSelectors.selectUserInfo);

  const handleLogOut = () => {
    dispatch(authSlice.actions.logOut());
  };

  return (
    <div className="container py-5">
      <h2 className="font-bold text-2xl mb-4">User Information</h2>

      {userInfo && (
        <div className="mb-4">
          <UserInformation userInfo={userInfo} />
        </div>
      )}

      <Button text="Log Out" onClick={handleLogOut} />
    </div>
  );
};
