import { createStore } from 'redux';
import reducer from '../reducer';
//same as import reducer from '../reducer/index.js';

//this listens for updates in our store from all our reducers
export default () => createStore(reducer);
