import React,{Component} from 'react';
import {StyleSheet, View, Text, ImageBackground, Dimensions, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {requireUserInfo} from '../../store/modules/user';
import api from '../../utils/api';
import {post} from '../../utils/axios';

class Boot extends Component{

    constructor(props) {
        super(props);
        this.state = {
            message:'正在连接服务器....',
            color:'#333'
        }
    }

    componentDidMount = async() => {
        const token = await AsyncStorage.getItem('token');
        console.log('token:'+token)
        if (token === null){
            this.props.navigation.replace('login');
        }else{
            let user = await post(api.TOKEN);
            if (user !== null && user !== undefined ){
                this.props.setUserInfo(user);
                this.props.navigation.replace('home');
            }else{
                AsyncStorage.removeItem('token',()=>{
                    this.props.navigation.replace('login');
                })
            }
        }
    };

    render() {
        let {message,color} = this.state
        return (
            <ImageBackground
                source={require('../../assets/boot.jpeg')}
                style={{width:Dimensions.get("window").width,height:Dimensions.get("window").height}}
            >
                <StatusBar translucent={true} backgroundColor='transparent'  barStyle="dark-content" />
                <View style={[styles.bootMessage,{width:Dimensions.get("window").width}]}>
                    <Text style={{color:color}}>{message}</Text>
                </View>
            </ImageBackground>
        );
    }

}

const styles = StyleSheet.create({
    bootMessage:{
        height:40,
        position:'absolute',
        bottom:40,
        justifyContent:'center',
        alignItems:'center'
    }

})

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
    setUserInfo(userInfo){
        let action = requireUserInfo(userInfo);
        dispatch(action)
    }
})


export default connect(mapStateToProps,mapDispatchToProps)(Boot);
