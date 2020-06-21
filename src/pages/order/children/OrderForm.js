import React from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

const OrderForm = (props) => {

    let {startDate,endDate,pickDate,search,reset,setCustno,setCustpo,custno,custpo} = props

    return (
        <View style={styles.formWarp}>
            <View style={[styles.formCell,{marginBottom:10}]}>
                <View style={styles.formLabel}>
                    <Text style={{color:'#333',fontSize:14}}>客戶代號</Text>
                </View>
                <TouchableOpacity
                    style={{flex:1,height: 36,justifyContent:'center',backgroundColor:'#EEE',borderColor: '#999', borderWidth: 1,borderRadius:10,paddingLeft:15}}
                    onPress={setCustno}
                >
                    <Text style={{fontSize:12,color:'#333'}}>{custno}</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.formCell,{marginBottom:10}]}>
                <View style={styles.formLabel}>
                    <Text style={{color:'#333',fontSize:14}}>開單日期</Text>
                </View>
                <View style={{flex:1,flexDirection: 'row',justifyContent:'space-between',alignItems:'center'}}>
                    <TouchableOpacity onPress={()=>{pickDate('startDate')}} style={
                        {
                            width:105,height: 36,
                            backgroundColor:'#EEE',
                            borderColor: '#999',
                            borderWidth: 1,
                            borderRadius:10,
                            justifyContent:'center',
                            alignItems:'center'
                        }
                    } >
                        <Text>{startDate}</Text>
                    </TouchableOpacity>
                    <Text style={{color:'#333',fontSize:14}}>TO</Text>
                    <TouchableOpacity onPress={()=>{pickDate('endDate')}} style={
                        {
                            width:105,height: 36,
                            backgroundColor:'#EEE',
                            borderColor: '#999',
                            borderWidth: 1,
                            borderRadius:10,
                            justifyContent:'center',
                            alignItems:'center'
                        }
                    } >
                        <Text>{endDate}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.formCell}>
                <View style={styles.formLabel}>
                    <Text style={{color:'#333',fontSize:14}}>PO條件</Text>
                </View>
                <View style={{flex:1,height: 36,backgroundColor:'#E3E3E3',borderColor: '#999', borderWidth: 1,borderRadius:10,paddingLeft:15}}>
                    <TextInput
                        style={{flex:1,height: 36,fontSize:12,textAlignVertical:"center",padding:0}}
                        placeholder={'PO條件'}
                        onChangeText={setCustpo}
                        value={custpo}
                    />
                </View>
            </View>
            <View style={{marginTop:20,marginLeft:70,flexDirection: 'row',justifyContent:'space-between'}}>
                <TouchableOpacity
                    onPress={reset}
                    style={{
                    width:110,
                    height:36,
                    backgroundColor:'#E3E3E3',
                    borderColor: '#999',
                    borderWidth: 1,
                    borderRadius:10,
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                    <Text style={{fontSize:13,color:'#333'}}>重置</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={search}
                    style={{
                    width:110,
                    height:36,
                    backgroundColor:'#E3E3E3',
                    borderColor: '#999',
                    borderWidth: 1,
                    borderRadius:10,
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                    <Text style={{fontSize:13,color:'#333'}}>搜索</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}


const styles = StyleSheet.create({
    formWarp:{
        paddingBottom:20,
        paddingTop:20,
        paddingLeft:15,
        paddingRight:15,
    },
    formCell:{
        height: 36,
        flexDirection: 'row',
    },
    formLabel:{
        width:70,
        height: 36,
        justifyContent: 'center',
    },
})


export default OrderForm
