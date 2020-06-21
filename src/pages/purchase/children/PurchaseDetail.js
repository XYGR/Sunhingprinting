import React from 'react';
import {StyleSheet, View, Text} from 'react-native';


const PurchaseDetail = (props) => {

    let {list = []} = props
    
    return (
        <View style={styles.materielDetail}>
            <View style={{height:30,flexDirection:'row',backgroundColor:'#9ED2EF'}}>
                <View style={styles.materielDetailItem}>
                    <Text style={styles.materielDetailItemText}>收貨單</Text>
                </View>
                <View style={styles.materielDetailItem}>
                    <Text style={styles.materielDetailItemText}>日期</Text>
                </View>
                <View style={styles.materielDetailItem}>
                    <Text style={styles.materielDetailItemText}>已交貨數</Text>
                </View>
                <View style={styles.materielDetailItem}>
                    <Text style={styles.materielDetailItemText}>未交貨數</Text>
                </View>
            </View>
            {
                list.map((item,index) => {
                    return (
                        <View style={{height:30,flexDirection:'row'}} key={index}>
                            <View style={styles.materielDetailItem}>
                                <Text style={styles.materielDetailItemText}>{item.inspno}</Text>
                            </View>
                            <View style={styles.materielDetailItem}>
                                <Text style={styles.materielDetailItemText}>{item.prodDate}</Text>
                            </View>
                            <View style={styles.materielDetailItem}>
                                <Text style={styles.materielDetailItemText}>{item.inspqty}</Text>
                            </View>
                            <View style={styles.materielDetailItem}>
                                <Text style={styles.materielDetailItemText}>{item.inspqty - item.secqty}</Text>
                            </View>
                        </View>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    materielDetail:{
        marginLeft:15,
        marginRight:15,
        marginBottom:38,
        borderTopWidth:1,
        borderLeftWidth:1,
        borderColor:'#666'
    },
    materielDetailItem:{
        flex:1,
        borderBottomWidth:1,
        borderRightWidth:1,
        borderColor:'#666',
        justifyContent:'center',
        alignItems:'center'
    },
    materielDetailItemText:{
        fontSize:12,
        color:'#333'
    }
})


export default PurchaseDetail
