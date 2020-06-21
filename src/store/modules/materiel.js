import api from '../../utils/api';
import {queryPost} from '../../utils/axios';

//initialState
const initialState = {
    materielList:{
        data:[],
        pages:[]
    },
}

// types
const SET_MATERIEL_LIST = 'materiel/set_materiel_list';
const CLEAR_MATERIEL_STATE = 'materiel/clear_state';

// reducer
export default (state = initialState, action)=>{
    switch (action.type) {
        case SET_MATERIEL_LIST:
            return {
                ...state,
                materielList:action.value,
            }
        case CLEAR_MATERIEL_STATE:
            return initialState
        default :
            return state
    }
}

// 同步action
const setMaterielList = (value) =>({
    type :SET_MATERIEL_LIST,
    value
})
const clearState = (value) => ({
    type :CLEAR_MATERIEL_STATE,
    value
})

// 异步action
export const requireMaterielList = (query = {},params = {}) => async (dispatch) => {

    try {
        let result = await queryPost(api.MATERIEL_LIST,query,params);
        if (!result){
            return false
        }

        let filterDate = result.list.map((
            {prjid,mtypeno,partno,name,todoqty,doneqty,paperdoneqty,custpo,vname,purqty,factqty,purdate,plandate}
            )=>{
            return {
                prjid:prjid.trim(),
                mtypeno,
                partno,
                name,
                todoqty,
                doneqty,
                paperdoneqty,
                custpo,
                vname,
                purqty:purqty?purqty:0,
                factqty:factqty?factqty:0,
                purdate,
                plandate,
            }
        })

        result.list.forEach((ele,index) => {
            let poInspdetailList = [];
            ele.poOrderDetailList.forEach(element => {
                poInspdetailList.concat(element.poInspdetail)
            })
            filterDate[index].poInspdetailList = poInspdetailList
        });

        dispatch(setMaterielList({data: filterDate,pages:result.pages}))
    }catch (e) {
        console.error(e)
    }
}

export const clearMaterielState = () => (dispatch) => dispatch(clearState())
