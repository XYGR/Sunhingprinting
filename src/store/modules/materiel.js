import api from '../../utils/api';
import {post} from '../../utils/axios';

//initialState
const initialState = {
    materielList:[]
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
export const requireMaterielList = (params = {}) => async (dispatch) => {
    try {
        let result = await post(api.MATERIEL_LIST,params);
        if (!result){
            return false
        }
        // console.log(JSON.stringify(result))
        let filterDate = result.map(({fid,prjid,mtypeno,partno,name1,todoqty,donedqty,paperdoneqty,pono,vendorno,purqty,factqty,purdate,plandate}) => ({
            fid,
            prjid:prjid.trim(),
            mtypeno,
            partno,
            name1:name1.trim(),
            todoqty,
            donedqty,
            paperdoneqty,
            pono:pono.trim(),
            vendorno:vendorno.trim(),
            purqty,
            factqty:factqty,
            purdate:purdate?purdate.split(" ")[0]:'',
            plandate:plandate?plandate.split(" ")[0]:''
        }))

        dispatch(setMaterielList(filterDate))
    }catch (e) {
        console.error(e)
    }
}

export const clearMaterielState = () => (dispatch) => dispatch(clearState())
