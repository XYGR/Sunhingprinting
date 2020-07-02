import React,{Component} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View, Platform} from 'react-native';
import {connect} from 'react-redux'

import PickerIOS from '../../../conments/PickerIOS';
import PickerAndroid from '../../../conments/PickerAndroid';
import Calendar from '../../../conments/Calendar';


class PurchaseForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pickerVisible:false,
            calendarVisible:false,
            thisPick:'',
            type:'01',
            typeIndex:0,
            startDate:'',
            endDate:'',
            vname:'',
            description:''
        }
    }

    setType = (itemValue,index) => {
        console.log(itemValue)
        this.setState({
            type:itemValue,
            typeIndex:index
        })
    }

    pickDate = (name) => {
        this.setState({
            thisPick:name,
            calendarVisible:true
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

    search = () => {
        let {type,vname,description,startDate,endDate} = this.state;
        let params = {
            vname,
            description,
            startDate,
            endDate,
            mtypeno:type
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

        this.props.search(params)
    }

    reset = () => {
        this.setState({
            pickerVisible:false,
            calendarVisible:false,
            thisPick:'',
            type:'01',
            typeIndex:0,
            startDate:'',
            endDate:'',
            vname:'',
            description:''
        })
    }

    render(){
        let {typeIndex,type,startDate,endDate,pickerVisible,calendarVisible} = this.state
        let {purchaseType} = this.props
        return (
            <View style={styles.formWarp}>
                <View style={[styles.formCell,{marginBottom:10}]}>
                    <View style={styles.formLabel}>
                        <Text style={{color:'#333',fontSize:14}}>類別</Text>
                    </View>
                    {
                        Platform.OS === 'ios' ? (
                            <TouchableOpacity
                                style={{flex:1,height: 36,justifyContent:'center',backgroundColor:'#EEE',borderColor: '#999', borderWidth: 1,borderRadius:10,paddingLeft:15}}
                                onPress={()=>{this.setState({pickerVisible:true})}}
                            >
                                <Text style={{fontSize:12,color:'#333'}}>{purchaseType[typeIndex].label}</Text>
                            </TouchableOpacity>
                        ):(
                            <View
                                style={{flex:1,height: 36,justifyContent:'center',backgroundColor:'#EEE',borderColor: '#999', borderWidth: 1,borderRadius:10,paddingLeft:15}}
                            >
                                <PickerAndroid secelt={purchaseType} value={type} onChange={this.setType} />
                            </View>
                        )
                    }
                </View>
                <View style={[styles.formCell,{marginBottom:10}]}>
                    <View style={styles.formLabel}>
                        <Text style={{color:'#333',fontSize:14}}>預交日期</Text>
                    </View>
                    <View style={{flex:1,flexDirection: 'row',justifyContent:'space-between',alignItems:'center'}}>
                        <TouchableOpacity onPress={this.pickDate.bind(this,'startDate')} style={
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
                        <TouchableOpacity onPress={this.pickDate.bind(this,'endDate')} style={
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
                <View style={[styles.formCell,{marginBottom:10}]}>
                    <View style={styles.formLabel}>
                        <Text style={{color:'#333',fontSize:14}}>供應商代號</Text>
                    </View>
                    <View style={{flex:1,height: 36,backgroundColor:'#E3E3E3',borderColor: '#999', borderWidth: 1,borderRadius:10,paddingLeft:15}}>
                        <TextInput
                            style={{flex:1,height: 36,fontSize:12,textAlignVertical:"center",padding:0}}
                            placeholder={'供應商代號'}
                            onChangeText={(vname) => {this.setState({vname})}}
                        />
                    </View>
                </View>
                <View style={styles.formCell}>
                    <View style={styles.formLabel}>
                        <Text style={{color:'#333',fontSize:14}}>物料名稱</Text>
                    </View>
                    <View style={{flex:1,height: 36,backgroundColor:'#E3E3E3',borderColor: '#999', borderWidth: 1,borderRadius:10,paddingLeft:15}}>
                        <TextInput
                            style={{flex:1,height: 36,fontSize:12,textAlignVertical:"center",padding:0}}
                            placeholder={'物料名稱'}
                            onChangeText={(description) => {this.setState({description})}}
                        />
                    </View>
                </View>
                <View style={{marginTop:20,marginLeft:70,flexDirection: 'row',justifyContent:'space-between'}}>
                    <TouchableOpacity
                        onPress={this.reset}
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
                        onPress={this.search}
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
                {
                    Platform.OS === 'ios' && <PickerIOS
                        secelt={purchaseType} visible={pickerVisible} value={type} onChange={this.setType} close={()=>{this.setState({pickerVisible:false})}}
                    />
                }
                <Calendar visible={calendarVisible} define={this.pickDefine} close={this.pickClose} />
            </View>
        );
    }

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

const mapStateToProps = (state) => ({
    purchaseType: state.purchase.purchaseType,
})
const mapDispatchToProps = (dispatch) => ({

})


export default connect(mapStateToProps,mapDispatchToProps)(PurchaseForm)
