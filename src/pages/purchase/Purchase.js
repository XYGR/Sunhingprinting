import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, Text, View} from 'react-native';

import Header from '../../conments/Header';
import PurchaseForm from './children/PurchaseForm';
import PurchaseTable from './children/PurchaseTable';
import PurchaseDetail from './children/PurchaseDetail';
import {
  requirePurchaseList,
  clearPurchaseState,
} from '../../store/modules/purchase';

class Purchase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '01',
      typeIndex: 0,
      filterIndex: 1,
      params: {},
      pageNo: 1,
      pageSize: 10,
      detailIndex: 0,
    };
  }

  changeFilter = (index) => {
    this.setState({
      filterIndex: index,
      detailIndex: 0,
    });
  };

  beforeSearch = (params) => {
    this.props.clearPurchase();
    this.setState(
      {
        params,
      },
      this.search,
    );
  };

  search = () => {
    let {params, pageNo, pageSize} = this.state;
    let {data} = this.props.purchaseList;
    this.props.getPurchaseList({pageNo, pageSize}, params, data);
  };

  loadMore = () => {
    let {pageNo} = this.state;
    let {data, pages} = this.props.purchaseList;
    if (pageNo < pages) {
      this.setState(
        {
          pageNo: ++pageNo,
        },
        () => {
          this.search(data);
        },
      );
    }
  };

  setDetailIndex = (index) => {
    this.setState({
      detailIndex: index,
    });
  };

  filterList = ['全部', '未交完貨', '已交完貨'];

  render() {
    let {filterIndex, detailIndex} = this.state;
    let {purchaseList} = this.props;
    let filterData = purchaseList.data.filter(({flag}) => {
      let result = false;
      switch (filterIndex) {
        case 0:
          result = true;
          break;
        case 1:
          result = flag === '0';
          break;
        case 2:
          result = flag === '1';
          break;
      }

      return result;
    });
    return (
      <ScrollView stickyHeaderIndices={[0]} bounces={false}>
        <Header title={'採購PO進度跟進'} />
        <PurchaseForm search={this.beforeSearch} />
        <View
          style={{
            height: 32,
            paddingLeft: 15,
            paddingRight: 15,
            backgroundColor: '#F54645',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 14, color: '#333'}}>狀況</Text>
          <View style={{flex: 1, paddingLeft: 30, flexDirection: 'row'}}>
            {this.filterList.map((item, index) => {
              return (
                <Text
                  onPress={this.changeFilter.bind(this, index)}
                  key={index}
                  style={{
                    marginRight: 25,
                    fontSize: 14,
                    color: filterIndex === index ? '#fff' : '#333',
                  }}>
                  {item}
                </Text>
              );
            })}
          </View>
        </View>
        <PurchaseTable
          data={filterData}
          index={detailIndex}
          loadMore={this.loadMore}
          setDetailIndex={this.setDetailIndex}
        />
        <PurchaseDetail
          list={
            filterData.length ? filterData[detailIndex].poInspdetailList : []
          }
          description={
            filterData.length ? filterData[detailIndex].description : ''
          }
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  purchaseList: state.purchase.purchaseList,
});
const mapDispatchToProps = (dispatch) => ({
  getPurchaseList(query, params, oldList) {
    let action = requirePurchaseList(query, params, oldList);
    dispatch(action);
  },
  clearPurchase() {
    let action = clearPurchaseState();
    dispatch(action);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Purchase);
