import React from 'react';
import {StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const MaterielTable = (props) => {

    let {data = [],style = {},loadMore,index,setDetailIndex} = props;
    let renderOrderList = (item) => {
        let type = {
            '01':'咭紙',
            '02':'坑紙',
            '03':'輔料',
            '04':'膠片',
            '06':'紙箱',
            '07':'客料',
            '08':'配件',
            '09':'外發加工',
            '10':'成品'
        }
        return (
            <View style={styles.orderTabListItem}>
                <View style={[styles.orderTabLeftItem,{height:30,borderTopWidth:1}]}>
                    <Text style={{fontSize:12,color:'#333'}}>{item.item.prjid}</Text>
                </View>
                <View style={[styles.orderTabLeftItem,{height:30}]}>
                    <Text style={{fontSize:12,color:'#333'}}>{type[item.item.mtypeno]}</Text>
                </View>
                <View style={[styles.orderTabLeftItem,{height:30}]}>
                    <Text style={{fontSize:12,color:'#333'}}>{item.item.partno}</Text>
                </View>
                <View style={[styles.orderTabLeftItem,{height:50,paddingLeft:4,paddingRight:4}]}>
                    <Text style={{fontSize:12,color:'#333'}}>{item.item.name}</Text>
                </View>
                <View style={[styles.orderTabLeftItem,{height:30}]}>
                    <Text style={{fontSize:12,color:'#333'}}>{format(item.item.todoqty)}</Text>
                </View>
                <View style={[styles.orderTabLeftItem,{height:30}]}>
                    <Text style={{fontSize:12,color:'#333'}}>{format(item.item.doneqty)}</Text>
                </View>
                <View style={[styles.orderTabLeftItem,{height:30}]}>
                    <Text style={{fontSize:12,color:'#333'}}>{format(item.item.paperdoneqty)}</Text>
                </View>
                <View style={[styles.orderTabLeftItem,{height:30}]}>
                    <Text style={{fontSize:12,color:'#333'}}>{item.item.custpo}</Text>
                </View>
                <View style={[styles.orderTabLeftItem,{height:30}]}>
                    <Text style={{fontSize:12,color:'#333'}}>{item.item.vname}</Text>
                </View>
                <View style={[styles.orderTabLeftItem,{height:30}]}>
                    <Text style={{fontSize:12,color:'#333'}}>{format(item.item.purqty)}</Text>
                </View>
                <View style={[styles.orderTabLeftItem,{height:30}]}>
                    <Text style={{fontSize:12,color:'#333'}}>{format(item.item.factqty)}</Text>
                </View>
                <View style={[styles.orderTabLeftItem,{height:30}]}>
                    <Text style={{fontSize:12,color:'red'}}>{format(item.item.purqty - item.item.factqty)}</Text>
                </View>
                <View style={[styles.orderTabLeftItem,{height:30}]}>
                    <Text style={{fontSize:12,color:'#333'}}>{item.item.purdate}</Text>
                </View>
                <View style={[styles.orderTabLeftItem,{height:30}]}>
                    <Text style={{fontSize:12,color:'#333'}}>{item.item.plandate}</Text>
                </View>
                <TouchableOpacity onPress={()=>{setDetailIndex(item.index)}} style={[styles.orderTabLeftItem,{height:30}]}>
                    {
                        item.index === index?
                            <Icon name={'chevrons-down'} size={20} color={'#F1761B'} />:
                            <Icon name={'chevrons-up'} size={20} color={'#333'} />
                    }
                </TouchableOpacity>
            </View>
        )
    }

    let format = (input) => {
        let n = parseFloat(input).toFixed(2);

        let re = /(\d{1,3})(?=(\d{3})+(?:\.))/g;

        let res = n.replace(re, "$1,");

        return res.slice(0,res.length - 3);
    }

    let tabHeader = ['工程單','類別','序號','物料','定量','已切數','計劃數','PONO','供應商','訂單數','已收貨數','未交貨數','下單日期','預交日期','收貨明细']

    return (
        <View style={[styles.materielTable,style]}>
            <View style={styles.materielTableLeft}>
                {
                    tabHeader.map((item,index) => {
                        return (
                            <View key={index} style={[styles.orderTabLeftItem,{height:index === 3?50:30,borderTopWidth:index ===0?1:0}]}>
                                <Text style={{fontSize:12,color:'#333'}}>{item}</Text>
                            </View>
                        )
                    })
                }
            </View>
            <FlatList
                data={data}
                renderItem={renderOrderList}
                keyExtractor={(item,index) => index.toString()}
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
    materielTable:{
        flexDirection: 'row',
        marginBottom:15
    },
    materielTableLeft:{
        width:75,
        backgroundColor:'#9ED2EF',
        borderRightWidth:1,
        borderColor:'#666'
    },
    orderTabLeftItem:{
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth:1,
        borderColor:'#666'
    },
    orderTabListItem:{
        width:75,
        borderRightWidth:1,
        borderColor:'#666',
    }
})

export default MaterielTable
