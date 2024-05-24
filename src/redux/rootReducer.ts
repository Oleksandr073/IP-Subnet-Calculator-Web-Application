import { authSlice } from './auth/slice';

const rootReducer = {
  auth: authSlice.reducer,
};

export default rootReducer;
