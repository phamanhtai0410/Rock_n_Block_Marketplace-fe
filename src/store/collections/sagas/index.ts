import { fork } from 'redux-saga/effects';

import createCollectionListener from './createCollection';
import editCollection from './editCollection';
import { watchGetCollectionActivity } from './getCollectionActivity';
import { watchGetCollectionChart } from './getCollectionChart';
import getCollections from './getCollections';
import { watchGetCollectionTradeData } from './getCollectionTradeData';
import getMaxRoyalty from './getMaxRoyalty';
import getMyCollections from './getMyCollections';
import getSingleCollection from './getSingleCollection';
import getTopCollectionPeriod from './getTopCollectionPeriod';
import getTopCollections from './getTopCollections';

export default function* collectionsSagas() {
  yield fork(createCollectionListener);
  yield fork(getSingleCollection);
  yield fork(getCollections);
  yield fork(getTopCollections);
  yield fork(editCollection);
  yield fork(getMyCollections);
  yield fork(getMaxRoyalty);
  yield fork(getTopCollectionPeriod);
  yield fork(watchGetCollectionActivity);
  yield fork(watchGetCollectionTradeData);
  yield fork(watchGetCollectionChart);
}
