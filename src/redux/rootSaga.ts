import { all, type AllEffect, fork, type ForkEffect } from 'redux-saga/effects';

import { authStateWatcher } from './auth/sagas';

export default function* rootSaga(): Generator<
  AllEffect<ForkEffect<void>>,
  void,
  unknown
> {
  yield all([fork(authStateWatcher)]);
}
