import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import ListGroupReducer from "./ListGroup/reducer/reducer";
import ListChildrenReducer from "./ListChildren/reducer/reducer";

const root = combineReducers({ListGroup: ListGroupReducer, ListChildren: ListChildrenReducer});

const enchancer = applyMiddleware(thunk)

export default createStore(root, enchancer);