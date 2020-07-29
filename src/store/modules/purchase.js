import api from '../../utils/api';
import {queryPost} from '../../utils/axios';

//initialState
const initialState = {
  purchaseList: {
    data: [],
    pages: [],
  },
  purchaseType: [
    {label: '咭紙', value: '01'},
    {label: '坑紙', value: '02'},
    {label: '輔料', value: '03'},
    {label: '膠片', value: '04'},
    {label: '紙箱', value: '06'},
    {label: '客料', value: '07'},
    {label: '配件', value: '08'},
    {label: '外發加工', value: '09'},
    {label: '成品', value: '10'},
  ],
};

// types
const SET_PURCHASE_LIST = 'purchase/set_purchase_list';
const CLEAR_PURCHASE_STATE = 'purchase/clear_state';

// reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PURCHASE_LIST:
      return {
        ...state,
        purchaseList: action.value,
      };
    case CLEAR_PURCHASE_STATE:
      return initialState;
    default:
      return state;
  }
};

// 同步action
const setPurchaseList = (value) => ({
  type: SET_PURCHASE_LIST,
  value,
});
const clearState = (value) => ({
  type: CLEAR_PURCHASE_STATE,
  value,
});

// 异步action
export const requirePurchaseList = (
  query = {},
  params = {},
  oldList = [],
) => async (dispatch) => {
  try {
    let result = await queryPost(api.PURCHASE_LIST, query, params);
    if (!result) {
      return false;
    }
    let filterDate = result.list.map(
      ({
        pono,
        partno,
        specdesc,
        description,
        purdate,
        plandate,
        purqty,
        factqty,
        vname,
        poInspdetailList,
        flag,
      }) => {
        return {
          pono: pono.trim(),
          partno: partno.trim(),
          specdesc: specdesc ? specdesc.trim() : '',
          description: description ? description.trim() : '',
          purdate: purdate ? purdate.split(' ')[0] : '',
          plandate: plandate ? plandate.split(' ')[0] : '',
          purqty,
          factqty,
          vname,
          flag,
          poInspdetailList: poInspdetailList.map(
            ({inspno, inspdate, inspqty, secqty}) => ({
              inspno: inspno ? inspno.trim() : '',
              inspdate: inspdate ? inspdate.split(' ')[0] : '',
              inspqty,
              secqty,
            }),
          ),
        };
      },
    );
    let data = oldList.concat(filterDate);
    dispatch(setPurchaseList({data: data, pages: result.pages}));
  } catch (e) {
    console.error(e);
  }
};
export const clearPurchaseState = () => (dispatch) => dispatch(clearState());
