import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../Reducer';
const initState = {};
const store = createStore(rootReducer, initState);
export default store;
