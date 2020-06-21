import React,{useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Search from '../../../conments/Search';

const ProduceForm = (props) => {

    let {prjid,custno,custpo,setValue,setParam,search,reset} = props;

    const [searchVisible,setSearchVisible] = useState(false)

    let setCustno = (value) => {
        setSearchVisible(false)
        setParam('custno',value)
    }

    return (
        <View style={styles.formWarp}>
            <View style={[styles.formCell,{marginBottom:10}]}>
                <View style={styles.formLabel}>
                    <Text style={{color:'#333',fontSize:14}}>工程單</Text>
                </View>
                <View style={{flex:1,height: 36,backgroundColor:'#E3E3E3',borderColor: '#999', borderWidth: 1,borderRadius:10,paddingLeft:15}}>
                    <TextInput
                        style={{flex:1,height: 36,fontSize:12,textAlignVertical:"center",padding:0}}
                        placeholder={'工程單'}
                        value={prjid}
                        onChangeText={(value) => setValue('prjid',value)}
                    />
                </View>
            </View>
            <View style={[styles.formCell,{marginBottom:10}]}>
                <View style={styles.formLabel}>
                    <Text style={{color:'#333',fontSize:14}}>PO條件</Text>
                </View>
                <View style={{flex:1,height: 36,backgroundColor:'#E3E3E3',borderColor: '#999', borderWidth: 1,borderRadius:10,paddingLeft:15}}>
                    <TextInput
                        style={{flex:1,height: 36,fontSize:12,textAlignVertical:"center",padding:0}}
                        placeholder={'PO條件'}
                        value={custpo}
                        onChangeText={(value) => setValue('custno',value)}
                    />
                </View>
            </View>
            <View style={[styles.formCell]}>
                <View style={styles.formLabel}>
                    <Text style={{color:'#333',fontSize:14}}>客戶代號</Text>
                </View>
                <TouchableOpacity
                    style={{flex:1,height: 36,justifyContent:'center',backgroundColor:'#EEE',borderColor: '#999', borderWidth: 1,borderRadius:10,paddingLeft:15}}
                    onPress={()=>{setSearchVisible(true)}}
                >
                    <Text style={{fontSize:12,color:'#333'}}>{custno}</Text>
                </TouchableOpacity>
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
            <Search visible={searchVisible} setValue={setCustno} close={() => setSearchVisible(false)} />
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


export default ProduceForm
