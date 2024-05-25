import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { eventChannel } from 'redux-saga';
import { call, fork, put, take, takeEvery } from 'redux-saga/effects';

import { auth } from '../../config';
import { getUserInfo } from '../../utils';

import { authSlice } from './slice';

type EmitterType = {
  user: User | null;
};

function createAuthStateChangeChannel() {
  return eventChannel<EmitterType>((emitter) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      emitter({ user });
    });
    return unsubscribe;
  });
}

function* logOutWorker() {
  try {
    yield call(signOut, auth);
  } catch {
    // nothing to do
  }
}

function* logOutWatcher() {
  yield takeEvery(authSlice.actions.logOut, logOutWorker);
}

export function* authStateWatcher() {
  const authStateChannel = (yield call(
    createAuthStateChangeChannel,
  )) as ReturnType<typeof createAuthStateChangeChannel>;

  while (true) {
    const { user } = (yield take(authStateChannel)) as EmitterType;
    if (!user) {
      yield put(authSlice.actions.setUserInfo(null));
    } else {
      const userInfo = getUserInfo(user);
      yield put(authSlice.actions.setUserInfo(userInfo));
      yield fork(logOutWatcher);
    }
  }
}
