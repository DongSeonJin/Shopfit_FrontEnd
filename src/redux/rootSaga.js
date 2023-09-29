// rootSaga.js
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([
    // ...다른 사가들 추가
  ]);
}
