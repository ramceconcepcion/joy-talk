import { createStore } from 'redux';
import reducers from './reducers';

import { entries } from '../misc/usrs';

export function configureStore() {
    return createStore(reducers);
}