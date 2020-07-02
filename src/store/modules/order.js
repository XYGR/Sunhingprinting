import api from '../../utils/api';
import {queryPost,post} from '../../utils/axios';

//initialState
const initialState = {
    orderList:{
        data:[],
        pages:0
    },
    customerList:[]
}

// types
const SET_ORDER_LIST = 'order/set_order_list';
const SET_CUSTOMER_LIST = 'order/set_customer_list';
const CLEAR_ORDER_STATE = 'order/clear_state';

// reducer
export default (state = initialState, action)=>{
    switch (action.type) {
        case SET_ORDER_LIST:
            return {
                ...state,
                orderList:action.value,
            }
        case SET_CUSTOMER_LIST:
            return {
                ...state,
                customerList:action.value,
            }
        case CLEAR_ORDER_STATE:
            return initialState
        default :
            return state
    }
}

// 同步action
const setOrderList = (value) =>({
    type :SET_ORDER_LIST,
    value
})
const setCustomerList = (value) =>({
    type :SET_CUSTOMER_LIST,
    value
})

const clearState = (value) => ({
    type :CLEAR_ORDER_STATE,
    value
})

// 异步action
export const requireOrderList = (query = {},params = {},oldList = []) => async (dispatch) => {

    try {
        let result = await queryPost(api.ORDER_LIST,query,params);
        if (!result){
            return false
        }

        let filterDate = result.list.map(({prjid,prjdate,name,cdProtypeName,custpo,orderqty,madeqty,shipdate,state,status,prjendflag,productpic,pdffile})=>{
            return {
                prjid,
                prjdate:prjdate?prjdate.split(" ")[0]:'',
                name,
                cdProtypeName,
                custpo,
                orderqty,
                madeqty,
                shipdate:shipdate?shipdate.split(" ")[0]:'',
                state,
                status,
                prjendflag,
                productpic,
                pdffile
            }
        })
        let data = oldList.concat(filterDate);
        dispatch(setOrderList({data: data,pages:result.pages}))
    }catch (e) {
        console.error(e)
    }
}

export const requireCustomerList = (params = {}) => async (dispatch) => {

    try {
        let result = await post(api.CUSTOMER_LIST,params);
        if (!result){
            return false
        }
        let filterDate = result.map(({custno,name}) =>({
            custno,
            name
        }));
        dispatch(setCustomerList(filterDate))
    }catch (e) {
        console.error(e)
    }
}

export const clearCustomerList = () => (dispatch) => dispatch(setCustomerList([]))

export const clearOrderState = () => (dispatch) => dispatch(clearState())
