import thunk from "redux-thunk";
import {createStore, combineReducers, applyMiddleware} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';

//import filtersReducer from "../reducers/filters";
import authReducer from "../reducers/auth";

//esto de aca abajo hace que cuando importe el default de este archivo, obtenga el store ya creado y configurado con sus reducers
const storeGenerator =()=>{
    const store = createStore(
        combineReducers({
            //filter:filtersReducer,
            auth:authReducer
        }),
        composeWithDevTools(applyMiddleware(thunk)));

    return store;
};

export default storeGenerator;
