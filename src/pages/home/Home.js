import React,{Component} from 'react';
import { Dimensions, Image, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';


class Home extends Component {

    render() {
        return (
            <ImageBackground
                source={require('../../assets/bg.jpeg')}
                style={{width:Dimensions.get("window").width,height:Dimensions.get("window").height}}>
                <StatusBar translucent={true} backgroundColor='transparent'  barStyle="dark-content" />
                <View style={styles.homeLogo}>
                    <Image source={require('../../assets/logo.png')} style={{width:65,height:65}}  />
                </View>
                <View style={styles.homeName}>
                    <Text style={styles.homeNameText}>新興印刷控股有限公司</Text>
                </View>
                <View style={{paddingLeft:50,paddingRight:50}}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.push('order')}} style={[styles.homeNav,{marginTop:50}]}>
                        <Text style={styles.homeNavText}>客戶PO訂單</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.props.navigation.push('produce')}} style={[styles.homeNav,{marginTop:25}]}>
                        <Text style={styles.homeNavText}>生產進度查詢</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.props.navigation.push('materiel')}} style={[styles.homeNav,{marginTop:25}]}>
                        <Text style={styles.homeNavText}>工程單物料需求</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.props.navigation.push('purchase')}} style={[styles.homeNav,{marginTop:25}]}>
                        <Text style={styles.homeNavText}>採購PO進度跟進</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }

}


const styles = StyleSheet.create({
    homeLogo:{
        marginTop:114,
        alignItems:'center'
    },
    homeName:{
        marginTop:15,
        alignItems:'center'
    },
    homeNameText:{
        fontSize:15,
        color:'#333'
    },
    homeNav:{
        height:44,
        backgroundColor:'#E5E9EC',
        borderRadius:15,
        borderWidth:1,
        borderColor:'#999',
        justifyContent:'center',
        alignItems:'center'
    },
    homeNavText:{
        fontSize: 14,
        color: '#333'
    }
})

export default Home
