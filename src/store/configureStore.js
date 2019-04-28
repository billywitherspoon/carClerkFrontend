import { createStore, combineReducers } from 'redux';

import indexReducer from './reducers/index';

const rootReducer = combineReducers({
	index: indexReducer
});

const configureStore = () => {
	return createStore(rootReducer);
};

export default configureStore;
