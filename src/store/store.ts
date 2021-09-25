import { createStore, applyMiddleware, compose } from 'redux';
import createSagasMiddlerware from 'redux-saga';
import reducers from './reducers';
import sagas from './sagas';

const sagasMiddleware = createSagasMiddlerware();

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const enhancer = composeEnhancers(applyMiddleware(sagasMiddleware));
const store = createStore(reducers, enhancer);

sagasMiddleware.run(sagas);

export default store;
