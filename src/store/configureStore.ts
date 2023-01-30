import { configureStore } from '@reduxjs/toolkit';
import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

import websocketMiddleWare from './middlewares/websocketMiddleware';
import reducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['provider', 'network', 'chainType', 'key', 'id', 'theme', 'address'],
};

const reducers = {
  ...reducer,
  user: persistReducer(userPersistConfig, reducer.user),
};

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: true,
      },
    })
      .concat(sagaMiddleware)
      .concat(websocketMiddleWare),
  devTools: true,
});

sagaMiddleware.run(rootSaga);
const persistor = persistStore(store);

export default { store, persistor };
