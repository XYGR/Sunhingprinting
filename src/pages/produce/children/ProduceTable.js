import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity,FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux'

const ProduceTable = (props) => {

    let { data, changeIndex, index = 0, loadMore } = props;

    let toMateriel = () => {
        Actions.materiel({ prjid: data[index].prjid })
    }

    let renderProduceList = (item) => {

        return (
            <TouchableOpacity onPress={() => { changeIndex(index) }} key={index} style={{ flexDirection: 'row' }}>
                <View style={[styles.produceTableCellItem, { width: 110,borderLeftWidth: 1 }]} >
                    <Text style={{ fontSize: 10, color: '#333' }}>{item.item.wpdesciption}</Text>
                </View>
                <View style={[styles.produceTableCellItem, { flex: 1, backgroundColor: '#EBD199' }]} >
                    <Text style={{ fontSize: 10, color: '#333' }}>{item.item.todoqty}</Text>
                </View>
                <View style={[styles.produceTableCellItem, { flex: 1, backgroundColor: '#91E9BD' }]} >
                    <Text style={{ fontSize: 10, color: '#333' }}>{item.item.doneqty}</Text>
                </View>
                <View style={[styles.produceTableCellItem, { flex: 1,color: item.item.resqty >= 0 ? '#333' : '#F00' }]} >
                    <Text style={{ fontSize: 10, color: '#333' }}>{item.item.resqty}</Text>
                </View>
                <View style={[styles.produceTableCellItem, { flex: 1 }]} >
                    <Text style={{ fontSize: 10, color: item.item.resqty >= 0 ? '#333' : '#F00' }}>{item.item.resqty >= 0 ? '達標' : '未達標'}</Text>
                </View>
            </TouchableOpacity>
        )
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
                        <View style={[styles.produceTableHeaderItem, { flex: 1}]} >
                            <Text style={{ fontSize: 12, color: '#333' }}>{`多余數\n /欠數`}</Text>
                        </View>
                        <View style={[styles.produceTableHeaderItem, { flex: 1}]} >
                            <Text style={{ fontSize: 12, color: '#333' }}>狀況</Text>
                        </View>
                    </View>
                    <FlatList
                        data={data}
                        renderItem={renderProduceList}
                        keyExtractor={(item, index) => index.toString()}
                        showsHorizontalScrollIndicator={false}
                        bounces={false}
                        onEndReached={loadMore}
                        onEndReachedThreshold={0.2}
                    />
                </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10,justifyContent:"center" }}>
                <TouchableOpacity onPress={toMateriel} style={[styles.produceTableMenu, { width: 195, marginLeft: 8, marginRight: 8 }]}>
                    <Text style={{ fontSize: 13, color: '#333' }}>工程單物料需求</Text>
                </TouchableOpacity>
            </View>
        </View>

    )


}

const styles = StyleSheet.create({
    produceTable: {
        height:430,
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

