import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const OrderDetail = (props) => {

    let {style ={},data = {}} =props

    let format = (input) => {
        if (input === null){
            return ''
        }
        if (input <= 999){
            return input - parseInt(input) > 0?input:parseInt(input);
        }
        let n = parseFloat(input).toFixed(2);
        let re = /(\d{1,3})(?=(\d{3})+(?:\.))/g;
        let res = n.replace(re, "$1,");
        return res.slice(0,res.length - 3);
    }

    return (
        <View style={[styles.orderDetail,style]}>
            <View style={styles.orderDetailCell}>
                <Text style={styles.orderDetailName}>開單日期</Text>
                <Text style={styles.orderDetailValue}>{data.prjdate}</Text>
            </View>
            <View style={styles.orderDetailCell}>
                <Text style={styles.orderDetailName}>工程單</Text>
                <Text style={styles.orderDetailValue}>{data.prjid}</Text>
            </View>
            <View style={styles.orderDetailCell}>
                <Text style={styles.orderDetailName}>貨品名稱</Text>
                <Text style={styles.orderDetailValue}>{data.name}</Text>
            </View>
            <View style={styles.orderDetailCell}>
                <Text style={styles.orderDetailName}>類別</Text>
                <Text style={styles.orderDetailValue}>{data.cdProtypeName}</Text>
            </View>
            <View style={styles.orderDetailCell}>
                <Text style={styles.orderDetailName}>PO NO.</Text>
                <Text style={styles.orderDetailValue}>{data.custpo}</Text>
            </View>
            <View style={styles.orderDetailCell}>
                <Text style={styles.orderDetailName}>訂單數</Text>
                <Text style={styles.orderDetailValue}>{format(data.orderqty)}</Text>
            </View>
            <View style={styles.orderDetailCell}>
                <Text style={styles.orderDetailName}>入庫數</Text>
                <Text style={styles.orderDetailValue}>{format(data.madeqty)}</Text>
            </View>
            <View style={styles.orderDetailCell}>
                <Text style={styles.orderDetailName}>交貨期</Text>
                <Text style={styles.orderDetailValue}>{data.shipdate}</Text>
            </View>
            <View style={styles.orderDetailCell}>
                <Text style={styles.orderDetailName}>狀況</Text>
                <Text style={styles.orderDetailValue}>{data.status}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    orderDetail:{
        padding:15,
    },
    orderDetailCell:{
        flexDirection:'row',
        alignItems:'flex-start',
        marginBottom:10
    },
    orderDetailName:{
        width:80,
        fontSize:13,
        color:'#333',
    },
    orderDetailValue:{
        flex:1,
        fontSize:13,
        color:'#666',
    }


})

export default OrderDetail
