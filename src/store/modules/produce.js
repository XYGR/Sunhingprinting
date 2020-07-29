import api from '../../utils/api';
import {queryPost} from '../../utils/axios';

//initialState
const initialState = {
  produceList: {
    data: [],
    prePage: 0,
    nextPage: 0,
  },
};

// types
const SET_PRODUCE_LIST = 'produce/set_produce_list';
const CLEAR_PRODUCE_STATE = 'produce/clear_state';

// reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCE_LIST:
      return {
        ...state,
        produceList: action.value,
      };
    case CLEAR_PRODUCE_STATE:
      return initialState;
    default:
      return state;
  }
};

// 同步action
const setProduceList = (value) => ({
  type: SET_PRODUCE_LIST,
  value,
});
const clearState = (value) => ({
  type: CLEAR_PRODUCE_STATE,
  value,
});

// 异步action
export const requireProduceList = (query = {}, params = {}) => async (
  dispatch,
) => {
  try {
    let result = await queryPost(api.PRODUCE_LIST, query, params);
    let {prePage, nextPage, list} = result;
    let data = list.map(
      ({
        prjid,
        prjdate,
        name,
        cdProtypeName,
        custpo,
        orderqty,
        joPrjdetailwpList,
      }) => ({
        prjid,
        prjdate: prjdate ? prjdate.split(' ')[0] : '',
        name,
        cdProtypeName,
        custpo,
        orderqty,
        joList: joPrjdetailwpList.map(({wpdesciption, todoqty, doneqty}) => ({
          wpdesciption,
          todoqty,
          doneqty: doneqty ? doneqty : 0,
          resqty: (doneqty ? doneqty : 0) - todoqty,
        })),
      }),
    );
    dispatch(setProduceList({data, prePage, nextPage}));
  } catch (e) {
    console.error(e);
  }
};

export const clearProduceState = () => (dispatch) => dispatch(clearState());
