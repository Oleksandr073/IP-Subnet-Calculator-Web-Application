import { authSlice } from './auth/slice';
import { counterReducer } from './counter/slice';

const rootReducer = {
  counter: counterReducer,
  auth: authSlice.reducer,
};

export default rootReducer;
