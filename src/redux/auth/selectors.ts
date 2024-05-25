import { RootState } from '../store';

export const selectUserInfo = (state: RootState) => state.auth.user;
export const selectIsUserLoggedIn = (state: RootState) =>
  state.auth.user !== null;
export const selectIsUserFetching = (state: RootState) =>
  state.auth.isUserFetching;

export const authSelectors = {
  selectUserInfo,
  selectIsUserLoggedIn,
  selectIsUserFetching,
};
