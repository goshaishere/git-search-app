import { createStore, applyMiddleware} from "redux"
import {combineReducers } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reposReducer from "./reposReducer"

const rootReducer = combineReducers({
    repos: reposReducer,
})  

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))


//сюда импортируем редюсеры и собираем их в рут редюсер
//создаем стор из редюсеров