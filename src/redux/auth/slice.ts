import { UserInfo } from 'firebase/auth';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type State = {
  user: UserInfo | null;
};

const initialState: State = {
  user: null,
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
  },
});
