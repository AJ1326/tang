import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './modules/index.js';
import sagas from './sagas';
import thunk from 'redux-thunk';

export default function configureStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();
  // Logger to check the state change
  const logger = store => next => action => {
    let result = next(action)
    return result
  }

  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(sagaMiddleware, thunk),
      typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f,
    ),
  );

  // run the available sagas
  sagaMiddleware.run(sagas);
  return store;
}