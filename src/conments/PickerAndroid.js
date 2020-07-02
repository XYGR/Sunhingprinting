import React from 'react';
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

export default PickerAndroid;
