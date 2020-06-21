import React, { Component } from 'react';
import {View, StyleSheet, Text, ScrollView, Dimensions} from 'react-native';
import {connect} from 'react-redux';

import {requireOrderList} from '../../store/modules/order'

import Header from '../../conments/Header';
import OrderForm from './children/OrderForm';
import OrderTable from './children/OrderTable';
import OrderDetail from './children/OrderDetail';
import OrderDetailMenu from './children/OrderDetailMenu';
import Calendar from '../../conments/Calendar';
import Search from '../../conments/Search';

class Order extends Component {

    constructor() {
        super();
        this.state = {
            calendarVisible:false,
            detailVisible:false,
            searchVisible:false,
            custno:'',
            custpo:'',
            startDate:'',
            endDate:'',
            thisPick:'',
            filterIndex:0,
            pageNo:1,
            pageSize:10,
            detailIndex:0,
        }
    }

    pickDate = (name) => {
        this.setState({
            calendarVisible:true,
            thisPick:name
        })
    }

    setCustno = (custno) =>{
        this.setState({
            custno,
            searchVisible:false
        })
    }

    setCustpo = (custpo) =>{
        this.setState({
            custpo
        })
    }

    pickDefine = (date) => {
        let {thisPick} = this.state
        this.setState({
            calendarVisible:false,
            [thisPick]:date
        })
    }

    pickClose = () => {
        this.setState({
            calendarVisible:false
        })
    }

    beforeSearch = () =>{
        this.setState({
            pageNo:1,
            pageSize:10
        },this.search)
    }

    search = (oldList = []) => {
        let {custno,custpo,startDate,endDate,pageNo,pageSize} = this.state;
        let params = {
            custno,
            custpo,
            startDate,
            endDate
        }
        let keys = Object.keys(params);
        keys.forEach((key)=>{
            if (params[key].trim().length < 1 ){
                delete params[key];
                return false;
            }
            if (key === 'startDate'){
                params[key] += ' 00:00:00'
            }else if(key === 'endDate'){
                params[key] += ' 23:59:59'
            }
        })
        console.log(params)
        this.props.getOrderList({pageNo,pageSize},params,oldList)
    }

    reset = () => {
        this.setState({
            custno:'',
            custpo:'',
            startDate:'',
            endDate:'',
        })
    }

    loadMore = () => {
        let {pageNo} = this.state;
        let {data,pages} = this.props.orderList
        if (pageNo < pages){
            this.setState({
                pageNo:++pageNo
            },()=>{
                this.search(data)
            })
        }
    }

    changeType = (index) => {
        this.setState({
            filterIndex:index,
            detailVisible:false
        })
    }

    showDetail = (index) =>{
        this.setState({
            detailIndex:index,
            detailVisible:true
        })
    }

    filterList = ['全部','待審核','待生產','已投產','待發貨','已完成']

    render() {
        let {calendarVisible,startDate,endDate,filterIndex,detailVisible,detailIndex,searchVisible,custno,custpo} = this.state;
        let {data,pages} = this.props.orderList;
        return (
            <View style={{minHeight:Dimensions.get("window").height}}>
                <ScrollView stickyHeaderIndices={[0]} bounces={false}>
                    <Header title={'客戶PO訂單'} />
                    <OrderForm
                        startDate={startDate}
                        endDate={endDate}
                        pickDate={this.pickDate}
                        search={this.beforeSearch}
                        reset={this.reset}
                        setCustno={()=>{this.setState({searchVisible:true})}}
                        setCustpo={this.setCustpo}
                        custno={custno}
                        custpo={custpo}
                    />
                    <Search visible={searchVisible} setValue={this.setCustno} close={()=>{this.setState({searchVisible:false})}} />
                    <Calendar visible={calendarVisible} define={this.pickDefine} close={this.pickClose} />
                    <View style={styles.orderType}>
                        <Text style={{fontSize:14,color:'#333'}}>狀況</Text>
                        <View style={{flex:1,paddingLeft:30,flexDirection:'row',justifyContent:'space-between'}}>
                            {
                                this.filterList.map((item,index) =>{
                                    return (
                                        <Text onPress={this.changeType.bind(this,index)} key={index} style={{fontSize:14,color:filterIndex === index?'#fff':'#333'}}>{item}</Text>
                                    )
                                })
                            }
                        </View>
                    </View>
                    <OrderTable
                        style={{display:pages === 0?'none':(detailVisible?'none':'flex')}}
                        data={data}
                        loadMore={this.loadMore}
                        showDetail={this.showDetail}
                        filterIndex={filterIndex}
                    />
                    <OrderDetail style={{display:pages === 0?'none':(detailVisible?'flex':'none')}} data={data[detailIndex]} />
                </ScrollView>
                <OrderDetailMenu
                    style={{display:pages === 0?'none':(detailVisible?'flex':'none')}}
                    index={detailIndex}
                    total={data.length}
                    next={this.showDetail}
                    data={data[detailIndex]}
                    exit={()=>{this.setState({detailVisible:false})}}
                />
            </View>

        );
    }
}



const styles = StyleSheet.create({
    orderType:{
        height:32,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor:'#F54645',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
    }
});


const mapStateToProps = (state) => ({
    orderList: state.order.orderList
})
const mapDispatchToProps = (dispatch) => ({
    getOrderList(query,params,oldList){
        let action = requireOrderList(query,params,oldList);
        dispatch(action)
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Order)
