import { onAuthStateChanged, User } from 'firebase/auth';
import { eventChannel } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';

import { auth } from '../../config';
import { getUserInfo } from '../../utils';

import { authSlice } from './slice';

type EmitterType = {
  user: User | null;
};

function createAuthStateChannel() {
  return eventChannel<EmitterType>((emitter) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      emitter({ user });
    });
    return unsubscribe;
  });
}

export function* authStateWatcher() {
  const authStateChannel = (yield call(createAuthStateChannel)) as ReturnType<
    typeof createAuthStateChannel
  >;

  while (true) {
    const { user } = (yield take(authStateChannel)) as EmitterType;
    if (!user) {
      yield put(authSlice.actions.setUserInfo(null));
    } else {
      const userInfo = getUserInfo(user);
      yield put(authSlice.actions.setUserInfo(userInfo));
    }
  }
}
