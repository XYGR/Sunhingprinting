import {createStore, combineReducers, applyMiddleware} from 'redux';
// 引入thunk中间件
import thunk from 'redux-thunk';

// 导入各个reducer
import user from './modules/user';
import order from './modules/order';
import produce from './modules/produce';
import materiel from './modules/materiel';
import purchase from './modules/purchase';

// 合并reducer

const reducer = combineReducers({
    user,
    order,
    produce,
    materiel,
    purchase
})

// 导出
export default createStore(reducer, applyMiddleware(thunk));
