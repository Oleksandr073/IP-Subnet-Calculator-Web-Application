import { UserInfo } from 'firebase/auth';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type State = {
  user: UserInfo | null;
  isUserFetching: boolean;
};

const initialState: State = {
  user: null,
  isUserFetching: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo(
      state: State,
      { payload: user }: PayloadAction<UserInfo | null>,
    ) {
      state.user = user;
    },
    setIsUserFetching(
      state: State,
      { payload: isUserFetching }: PayloadAction<boolean>,
    ) {
      state.isUserFetching = isUserFetching;
    },
    logOut() {},
  },
});
