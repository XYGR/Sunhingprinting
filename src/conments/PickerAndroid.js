import React from 'react';
import {StyleSheet} from 'react-native';
import {Picker} from '@react-native-community/picker';

const PickerAndroid = (props) => {

    let {value = '',onChange = null,secelt} = props

    return (
        <Picker
            selectedValue={value}
            // mode={'dropdown'}
            onValueChange={onChange}
            style={{fontSize:12,color:'#333'}}
        >
            {
                secelt.map(item => {
                    return (
                        <Picker.Item key={item.label} label={item.label} value={item.value} />
                    )
                })
            }
        </Picker>
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
        height:200,
        position:'absolute',
        left:0,
        bottom:0,
        right:0,
        backgroundColor:'#fff'
    }
})

export default PickerAndroid
