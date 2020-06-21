import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const ProduceDetail = (props) => {

    let {style ={},data = null} =props

    return (
        <View style={[styles.orderDetail,style]}>
            <View style={styles.orderDetailCell}>
                <Text style={styles.orderDetailName}>工程單</Text>
                <Text style={styles.orderDetailValue}>{data && data.prjid}</Text>
            </View>
            <View style={styles.orderDetailCell}>
                <Text style={styles.orderDetailName}>開單日期</Text>
                <Text style={styles.orderDetailValue}>{data && data.prjdate}</Text>
            </View>
            <View style={styles.orderDetailCell}>
                <Text style={styles.orderDetailName}>貨品名稱</Text>
                <Text style={styles.orderDetailValue}>{data && data.name}</Text>
            </View>
            <View style={styles.orderDetailCell}>
                <Text style={styles.orderDetailName}>類別</Text>
                <Text style={styles.orderDetailValue}>{data && data.cdProtypeName}</Text>
            </View>
            <View style={styles.orderDetailCell}>
                <Text style={styles.orderDetailName}>PO NO.</Text>
                <Text style={styles.orderDetailValue}>{data && data.custpo}</Text>
            </View>
            <View style={styles.orderDetailCell}>
                <Text style={styles.orderDetailName}>訂單數</Text>
                <Text style={styles.orderDetailValue}>{data && data.orderqty}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    orderDetail:{
        paddingLeft:15,
        paddingRight:15
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

export default ProduceDetail
