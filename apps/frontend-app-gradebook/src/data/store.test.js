import { applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { createLogger } from 'redux-logger';
import { createMiddleware } from 'redux-beacon';
import Segment from '@redux-beacon/segment';

import actions from './actions';
import selectors from './selectors';
import reducers from './reducers';
import eventsMap from './services/segment/mapping';
import { configuration } from '../config';

import exportedStore, { createStore } from './store';

jest.mock('./reducers', () => 'REDUCER');
jest.mock('./actions', () => 'ACTIONS');
jest.mock('./selectors', () => 'SELECTORS');
jest.mock('./services/segment/mapping', () => 'EVENTS MAP');

jest.mock('redux-logger', () => ({
  createLogger: () => 'logger',
}));
jest.mock('redux-thunk', () => 'thunkMiddleware');
jest.mock('../config', () => ({
  configuration: {
    SEGMENT_KEY: 'a-fake-segment-key',
  },
}));
jest.mock('redux-beacon', () => ({
  createMiddleware: jest.fn((map, model) => ({ map, model })),
}));
jest.mock('@redux-beacon/segment', () => () => 'Segment');
jest.mock('redux', () => ({
  applyMiddleware: (...middleware) => ({ applied: middleware }),
  createStore: (reducer, middleware) => ({ reducer, middleware }),
}));
jest.mock('redux-devtools-extension/logOnlyInProduction', () => ({
  composeWithDevTools: (middleware) => ({ withDevTools: middleware }),
}));

describe('store aggregator module', () => {
  describe('exported store', () => {
    it('is generated by createStore', () => {
      expect(exportedStore).toEqual(createStore());
    });
    it('creates store with connected reducers', () => {
      expect(createStore().reducer).toEqual(reducers);
    });
    describe('middleware', () => {
      describe('if SEGMENT_KEY is in the configuration', () => {
        it('also adds segment middleware from eventMap', () => {
          expect(createStore().middleware).toEqual(
            composeWithDevTools(applyMiddleware(
              thunkMiddleware,
              createLogger(),
              createMiddleware(eventsMap, Segment()),
            )),
          );
        });
      });
      describe('if no SEGMENT_KEY', () => {
        const key = configuration.SEGMENT_KEY;
        beforeEach(() => {
          configuration.SEGMENT_KEY = false;
        });
        it('exports thunk and logger middleware, composed and applied with dev tools', () => {
          expect(createStore().middleware).toEqual(
            composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger())),
          );
        });
        afterEach(() => {
          configuration.SEGMENT_KEY = key;
        });
      });
    });
  });
  describe('dev exposed tools', () => {
    beforeEach(() => {
      window.store = undefined;
      window.actions = undefined;
      window.selectors = undefined;
    });
    it('exposes redux tools if in development env', () => {
      process.env.NODE_ENV = 'development';
      const store = createStore();
      expect(window.store).toEqual(store);
      expect(window.actions).toEqual(actions);
      expect(window.selectors).toEqual(selectors);
    });
    it('does not expose redux tools if in production env', () => {
      process.env.NODE_ENV = 'production';
      createStore();
      expect(window.store).toEqual(undefined);
      expect(window.actions).toEqual(undefined);
      expect(window.selectors).toEqual(undefined);
    });
  });
});
