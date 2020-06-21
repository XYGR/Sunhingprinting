import api from '../../utils/api';
import {queryPost} from '../../utils/axios';

//initialState
const initialState = {
    produceList:{
        data:[],
        pages:0
    },
}

// types
const SET_PRODUCE_LIST = 'produce/set_produce_list';
const CLEAR_PRODUCE_STATE = 'produce/clear_state';

// reducer
export default (state = initialState, action)=>{
    switch (action.type) {
        case SET_PRODUCE_LIST:
            return {
                ...state,
                produceList:action.value,
            }
        case CLEAR_PRODUCE_STATE:
            return initialState
        default :
            return state
    }
}

// 同步action
const setProduceList = (value) =>({
    type :SET_PRODUCE_LIST,
    value
})
const clearState = (value) => ({
    type :CLEAR_PRODUCE_STATE,
    value
})

// 异步action
export const requireProduceList = (query = {},params = {},oldList) => async (dispatch) => {

    try {
        let result = await queryPost(api.PRODUCE_LIST,query,params);
        if (!result){
            dispatch(setProduceList({data: [],pages:0}))
            return false
        }
        let filterDate = result.list.map(({prjid,wpdesciption,todoqty,doneqty,joProject})=>{
            return {
                prjid,
                wpdesciption,
                todoqty:todoqty?todoqty:0,
                doneqty:doneqty?doneqty:0,
                resqty: (doneqty?doneqty:0) - (todoqty?todoqty:0),
                prjdate:joProject.prjdate.split(" ")[0],
                name:joProject.name,
                cdProtypeName:joProject.cdProtypeName,
                custpo:joProject.custpo,
                orderqty:joProject.orderqty,
            }
        })
        let data = oldList.concat(filterDate);
        dispatch(setProduceList({data: data,pages:result.pages}))
    }catch (e) {
        console.error(e)
    }
}

export const clearProduceState = () => (dispatch) => dispatch(clearState())
