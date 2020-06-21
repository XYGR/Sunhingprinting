import React from 'react';
import {Modal, StyleSheet, View, Text} from 'react-native';
import {Picker} from '@react-native-community/picker';

const PickerIOS = (props) => {

    let {value = '',onChange = null,visible = false,secelt,close = null} = props;

    return (
        <Modal transparent={true} visible={visible} >
                <View style={[styles.pickerMask]}>
                    <View style={[styles.pickerBody]}>
                        <View style={[styles.pickerBodyBar]}>
                            <Text onPress={close} style={{fontSize:16,color:'#000'}}>确定</Text>
                        </View>
                        <Picker
                            selectedValue={value}
                            onValueChange={onChange}
                        >
                            {
                                secelt.map(item => {
                                    return (
                                        <Picker.Item key={item.label} label={item.label} value={item.value} />
                                    )
                                })
                            }
                        </Picker>
                    </View>
                </View>
        </Modal>
    )

}

const styles = StyleSheet.create({
    pickerMask:{
        position:'absolute',
        top:0,
        left:0,
        bottom:0,
        right:0,
        backgroundColor:'rgba(0,0,0,0.5)'
    },
    pickerBody:{
        height:240,
        position:'absolute',
        left:0,
        bottom:0,
        right:0,
        backgroundColor:'#fff'
    },
    pickerBodyBar:{
        height: 30,
        paddingLeft:15,
        paddingRight:15,
        justifyContent:'center',
        alignItems:'flex-end'
    }
})

export default PickerIOS
