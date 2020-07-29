import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity,FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux'

const ProduceTable = (props) => {

    let { data,enableScroll,prjid = '',prePage,nextPage,prePress,nextPress} = props;

    let toMateriel = () => {
        Actions.materiel({prjid})
    }

    let renderProduceList = (item,index) => {
        return (
            <View key={index} style={{ flexDirection: 'row' }}>
                <View style={[styles.produceTableCellItem, { width: 110,borderLeftWidth: 1 }]} >
                    <Text style={{ fontSize: 10, color: '#333' }}>{item.item.wpdesciption}</Text>
                </View>
                <View style={[styles.produceTableCellItem, { flex: 1, backgroundColor: '#EBD199' }]} >
                    <Text style={{ fontSize: 10, color: '#333' }}>{format(item.item.todoqty)}</Text>
                </View>
                <View style={[styles.produceTableCellItem, { flex: 1, backgroundColor: '#91E9BD' }]} >
                    <Text style={{ fontSize: 10, color: '#333' }}>{format(item.item.doneqty)}</Text>
                </View>
                <View style={[styles.produceTableCellItem, { flex: 1,backgroundColor: item.item.resqty >= 0 ?'#F48382':'#FFF' }]} >
                    <Text style={{ fontSize: 10, color: item.item.resqty >= 0 ? '#333' : '#F00' }}>{format(item.item.resqty)}</Text>
                </View>
                <View style={[styles.produceTableCellItem, { flex: 1 }]} >
                    <Text style={{ fontSize: 10, color: item.item.resqty >= 0 ? '#333' : '#F00' }}>{item.item.resqty >= 0 ? '達標' : '未達標'}</Text>
                </View>
            </View>
        )
    }

    let format = (input) => {
        if (input <= 999){
            return input;
        }
        let n = parseFloat(input).toFixed(2);
        let re = /(\d{1,3})(?=(\d{3})+(?:\.))/g;
        let res = n.replace(re, "$1,");
        return res.slice(0,res.length - 3);
    }

    return (
        <View>
            <View style={{ padding: 15 }}>
                <View style={styles.produceTable}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={[styles.produceTableHeaderItem, { width: 110, backgroundColor: '#9ED2EF',borderLeftWidth: 1}]} >
                            <Text style={{ fontSize: 12, color: '#333' }}>工序</Text>
                        </View>
                        <View style={[styles.produceTableHeaderItem, { flex: 1, backgroundColor: '#EBD199' }]} >
                            <Text style={{ fontSize: 12, color: '#333' }}>計劃數</Text>
                        </View>
                        <View style={[styles.produceTableHeaderItem, { flex: 1, backgroundColor: '#91E9BD' }]} >
                            <Text style={{ fontSize: 12, color: '#333' }}>完成數</Text>
                        </View>
                        <View style={[styles.produceTableHeaderItem, { flex: 1, backgroundColor: '#F48382' }]} >
                            <Text style={{ fontSize: 12, color: '#333' }}>{`多余數\n /欠數`}</Text>
                        </View>
                        <View style={[styles.produceTableHeaderItem, { flex: 1}]} >
                            <Text style={{ fontSize: 12, color: '#333' }}>狀況</Text>
                        </View>
                    </View>
                    <View
                        style={{ maxHeight:300}}
                        onStartShouldSetResponderCapture={enableScroll}>
                        <FlatList
                            data={data}
                            renderItem={renderProduceList}
                            keyExtractor={(item, index) => index.toString()}
                            showsHorizontalScrollIndicator={false}
                            bounces={false}
                            horizontal={false}
                            ListFooterComponent={()=>{
                                return (
                                    <View style={{ flexDirection: 'row',justifyContent:'center' }}>
                                        <Text>已加载全部</Text>
                                    </View>
                                )
                            }}
                            ListEmptyComponent={()=>{
                                return (
                                    <View style={{ flexDirection: 'row',justifyContent:'center' }}>
                                        <Text>暂无数据</Text>
                                    </View>
                                )
                            }}
                        />
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10,justifyContent:'space-between' }}>
                <TouchableOpacity disabled={prePage === 0} onPress={prePress} style={[styles.produceTableMenu, { width: 80, marginLeft: 8, marginRight: 8 }]}>
                    <Text style={{ fontSize: 13, color: '#333' }}>上一页</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toMateriel} style={[styles.produceTableMenu, { width: 195, marginLeft: 8, marginRight: 8 }]}>
                    <Text style={{ fontSize: 13, color: '#333' }}>工程單物料需求</Text>
                </TouchableOpacity>
                <TouchableOpacity disabled={nextPage === 0} onPress={nextPress} style={[styles.produceTableMenu, { width: 80, marginLeft: 8, marginRight: 8 }]}>
                    <Text style={{ fontSize: 13, color: '#333' }}>下一页</Text>
                </TouchableOpacity>
            </View>
        </View>
    )


}

const styles = StyleSheet.create({
    produceTable: {
        borderTopWidth: 1,
        borderColor: '#666',
    },
    produceTableHeaderItem: {
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#666'
    },
    produceTableCellItem: {
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#666'
    },
    produceTableMenu: {
        height: 37,
        backgroundColor: '#E3E3E3',
        borderWidth: 1,
        borderColor: '#999',
        justifyContent: 'center',
        alignItems: 'center'
    }
})


export default ProduceTable

