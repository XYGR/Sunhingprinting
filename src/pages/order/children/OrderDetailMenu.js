import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import ImagePreview from '../../../conments/ImagePreview';

const OrderDetailMenu = (props) => {
    let {style ={},next,index,total,data,exit} = props;

    const [imagePreviewVisible,setImagePreviewVisible] = useState(false);
    const [imageUrl,setImageUrl] = useState([])

    let toProduce = () => {
        exit()
        Actions.produce({prjid:data.prjid})
    }

    let previewImage = () => {
        let url;
        if (data.productpic !== null){
            url = data.productpic.slice(3)
        }else {
            url = 'notfind.jpg'
        }
        setImageUrl([{url:`https://app.sunhingprinting.com/files/${url}`}])
        setImagePreviewVisible(true)
    }

    let previewPdf = () => {
        let path,path1,url;
        console.log(data.productpic);
        console.log(data.pdffile);
        path = encodeURIComponent(`${data.pdffile}`);
        path1 = encodeURIComponent(`${data.productpic}`);
        url = `https://app.sunhingprinting.com/printing/user/syRightuser/manage/savetpW?path=${path}&path1=${path1}`;
        setImageUrl([{url}])
        setImagePreviewVisible(true)
    }

    return (
        <View style={[styles.orderDetailMenu,{width:Dimensions.get("window").width},style]}>
            <TouchableOpacity
                style={styles.orderDetailMenuItem}
                disabled={index === total -1}
                onPress={()=>{next(++index)}}
            >
                <Text style={styles.orderDetailMenuItemText}>下一頁</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toProduce} style={[styles.orderDetailMenuItem,{marginLeft:2}]}>
                <Text style={styles.orderDetailMenuItemText}>生產進度</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={previewImage} style={[styles.orderDetailMenuItem,{marginLeft:2,marginRight:2}]}>
                <Text style={styles.orderDetailMenuItemText}>產品圖</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={previewPdf} style={[styles.orderDetailMenuItem,{marginRight:2}]}>
                <Text style={styles.orderDetailMenuItemText}>產品詳細</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={exit} style={styles.orderDetailMenuItem}>
                <Text style={styles.orderDetailMenuItemText}>退出</Text>
            </TouchableOpacity>
            <ImagePreview visible={imagePreviewVisible} imageUrl={imageUrl} close={()=>{setImagePreviewVisible(false)}} />
        </View>
    )
}

const styles = StyleSheet.create({
    orderDetailMenu:{
        height:36,
        flexDirection:'row',
        justifyContent:'space-between',
        bottom:0
    },
    orderDetailMenuItem:{
        flex:1,
        borderWidth:1,
        borderColor:"#999",
        backgroundColor:'#E3E3E3',
        alignItems:'center',
        justifyContent:'center'
    },
    orderDetailMenuItemText:{
        fontSize:13,
        color:'#333'
    }
})


export default OrderDetailMenu;
