import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {requireUserInfo} from '../../store/modules/user';
import {post} from '../../utils/axios';
import api from '../../utils/api';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            userNo:'',
            password:''
        }
    }

    login = () => {
        let {userNo,password} = this.state;
        if (userNo.trim().length < 1){
            Toast.show('请输入用戶代號', {
                duration: Toast.durations.SHORT, // toast显示时长
                position: Toast.positions.CENTER, // toast位置
                delay: 0, // toast显示的延时
            });
            return false
        }else if (password.trim().length < 1){
            Toast.show('请输入密碼', {
                duration: Toast.durations.SHORT, // toast显示时长
                position: Toast.positions.CENTER, // toast位置
                delay: 0, // toast显示的延时
            });
            return false
        }
        post(api.LOGIN,{userNo,password}).then( res => {
            this.props.setUserInfo(res);
            AsyncStorage.setItem('token',res.datas).then( ()=>{
                this.props.navigation.replace('home');
            })
        }).catch( error => {

        })
    }

    render() {

        return (
            <ImageBackground
                source={require('../../assets/bg.jpeg')}
                style={{width:Dimensions.get("window").width,height:Dimensions.get("window").height}}>
                <StatusBar translucent={true} backgroundColor='transparent'  barStyle="dark-content" />
                <View style={styles.loginLogo}>
                    <Image source={require('../../assets/logo.png')} style={{width:100,height:100}}  />
                </View>
                <View style={styles.loginName}>
                    <Text style={styles.loginNameText}>新興印刷控股有限公司</Text>
                </View>
                <View style={styles.loginForm}>
                    <View style={styles.loginFormCell}>
                        <Icon name="user" size={26} color="#333" />
                        <TextInput
                            style={{flex:1,height: 40,fontSize:14,marginLeft:10,textAlignVertical:"center",padding:0,color: '#333'}}
                            placeholder={'用戶代號'}
                            onChangeText={(text => {this.setState({userNo:text})})}
                            autoCapitalize={'none'}
                        />
                    </View>
                    <View style={[styles.loginFormCell,{marginTop:26}]}>
                        <Icon name="lock1" size={26} color="#333" />
                        <TextInput
                            style={{flex:1,height: 40,fontSize:14,marginLeft:10,textAlignVertical:"center",padding:0}}
                            placeholder={'密碼'}
                            secureTextEntry={true}
                            autoCapitalize={'none'}
                            onChangeText={(text => {this.setState({password:text})})}
                        />
                    </View>
                    <TouchableOpacity style={styles.loginFormSubmit} onPress={this.login}>
                        <Text style={{fontSize:15,color:'#333'}}>登入</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    loginLogo:{
        marginTop:110,
        alignItems:'center'
    },
    loginName:{
        marginTop:15,
        alignItems:'center'
    },
    loginNameText:{
        fontSize:18,
        color:'#333'
    },
    loginForm:{
        marginTop:60,
        paddingLeft:62,
        paddingRight:62
    },
    loginFormCell:{
        height:40,
        paddingLeft:10,
        paddingRight: 10,
        borderBottomWidth:1,
        borderBottomColor:'#333',
        flexDirection:'row',
        alignItems:'center'
    },
    loginFormSubmit:{
        height: 44,
        borderWidth:1,
        borderColor:'#C2C9D2',
        borderRadius:44,
        backgroundColor:'#E9EAEE',
        alignItems:'center',
        justifyContent:'center',
        marginTop:65
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

export default connect(mapStateToProps,mapDispatchToProps)(Login);
