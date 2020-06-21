import React from 'react';
import {StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native';

const OrderTable = (props) => {

    let {data = [],style = {},loadMore,showDetail,filterIndex} = props;
    let renderOrderList = (item) => {
        let {status,state} = item.item;
        let stateZH = '';
        if (state === '1'){
            switch (status) {
                case "01":
                    stateZH = '待生產';
                    break;
                case "02":
                    stateZH = '已投產';
                    break;
                case "03":
                    stateZH = '已完成';
                    break;
            }
        }else {
            stateZH = '未審核'
        }

        return (
            <View style={styles.orderTabListItem}>
                <View style={[styles.orderTabLeftItem,{height:30,borderTopWidth:1}]}>
                    <Text style={{fontSize:12,color:'#333'}}>{item.item.prjdate}</Text>
                </View>
                <View style={[styles.orderTabLeftItem,{height:30}]}>
                    <Text style={{fontSize:12,color:'#333'}}>{item.item.prjid}</Text>
                </View>
                <View style={[styles.orderTabLeftItem,{height:100,paddingLeft:4,paddingRight:4}]}>
                    <Text style={{fontSize:12,color:'#333'}}>{item.item.name}</Text>
                </View>
                <View style={[styles.orderTabLeftItem,{height:30}]}>
                    <Text style={{fontSize:12,color:'#333'}}>{item.item.cdProtypeName}</Text>
                </View>
                <View style={[styles.orderTabLeftItem,{height:30}]}>
                    <Text style={{fontSize:12,color:'#333'}}>{item.item.custpo}</Text>
                </View>
                <View style={[styles.orderTabLeftItem,{height:30}]}>
                    <Text style={{fontSize:12,color:'#333'}}>{item.item.orderqty?item.item.orderqty.toLocaleString():0}</Text>
                </View>
                <View style={[styles.orderTabLeftItem,{height:30}]}>
                    <Text style={{fontSize:12,color:'#333'}}>{item.item.madeqty?item.item.madeqty.toLocaleString():0}</Text>
                </View>
                <View style={[styles.orderTabLeftItem,{height:30}]}>
                    <Text style={{fontSize:12,color:'#333'}}>{item.item.shipdate}</Text>
                </View>
                <View style={[styles.orderTabLeftItem,{height:30}]}>
                    <Text style={{fontSize:12,color:'#333'}}>{stateZH}</Text>
                </View>
                <TouchableOpacity onPress={()=>{showDetail(item.index)}} style={[styles.orderTabLeftItem,{height:30}]}>
                    <Text style={{fontSize:12,color:'#333'}}>&gt;</Text>
                </TouchableOpacity>
            </View>
        )
    }


    let tabHeader = ['開單日期','工程單','貨品名稱','類別','PO NO.','訂單數','入庫數','交貨期','狀況','選擇要看'];

    let filterData = data.filter(({state,status,prjendflag}) => {
        let result = false
        switch (filterIndex) {
            case 0:
                result = true;
                break;
            case 1:
                result = state === '0';
                break;
            case 2:
                result = status === '01';
                break;
            case 3:
                result = status === '02';
                break;
            case 4:
                result = prjendflag === '0';
                break;
            case 5:
                result = status === '03';
                break;
        }
        return result
    })

    return (
        <View style={[styles.orderTab,style]}>
            <View style={styles.orderTabLeft}>
                {
                    tabHeader.map((item,index) => {
                        return (
                            <View key={index} style={[styles.orderTabLeftItem,{height:index === 2?100:30,borderTopWidth:index === 0?1:0}]}>
                                <Text style={{fontSize:12,color:'#333'}}>{item}</Text>
                            </View>
                        )
                    })
                }
            </View>
            <FlatList
                data={filterData}
                renderItem={renderOrderList}
                keyExtractor={(item) => item.prjid}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                bounces={false}
                onEndReached={loadMore}
                onEndReachedThreshold={0.2}
            />
    </View>
    )
}

const styles = StyleSheet.create({
    orderTab:{
        flexDirection: 'row',
        marginTop:15,
        marginBottom:15
    },
    orderTabLeft:{
        width:75,
        backgroundColor:'#9ED2EF',
        borderRightWidth:1,
        borderColor:'#666'
    },
    orderTabLeftItem:{
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth:1,
        borderColor:'#666',
        overflow:"hidden",
    },
    orderTabListItem:{
        width:75,
        borderRightWidth:1,
        borderColor:'#666'
    }
})

export default OrderTable
