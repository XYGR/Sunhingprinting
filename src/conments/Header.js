import React,{Component} from 'react';
import {View, StatusBar, StyleSheet, TouchableOpacity,Text,NativeModules,Platform} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Entypo';
import {connect} from 'react-redux';
import AsyncStorage from "@react-native-community/async-storage";


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            statusBarHeight:0,
        }
    }

    componentDidMount(): void {
        console.log(`当前运行环境:${Platform.OS}`)
        if (Platform.OS === 'android'){
            this.setState({
                statusBarHeight:StatusBar.currentHeight
            })
            console.log(`状态栏高度:${StatusBar.currentHeight}`);
        }else{
            NativeModules.StatusBarManager.getHeight(barHeight => {
                this.setState({
                    statusBarHeight:barHeight.height
                })
                console.log(`状态栏高度:${barHeight.height}`);
            });
        }
    }

    exit = () => {
        AsyncStorage.removeItem('token',()=>{
            Actions.replace('login');
        })
    }

    render(){
        let {title = '',userInfo} = this.props;
        let {statusBarHeight} = this.state
        return (
            <View style={[styles.header,{height:44 + statusBarHeight,paddingTop:statusBarHeight}]}>
                <StatusBar translucent={true} backgroundColor='transparent'  barStyle="dark-content" />
                <TouchableOpacity onPress={Actions.pop}>
                    <Icon name="chevron-thin-left" size={30} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.name} onPress={this.exit} >{userInfo.username}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header:{
        backgroundColor:'#F54645',
        paddingLeft:5,
        paddingRight:15,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    title:{
        fontSize:16,
        color:'#fff'
    },
    name:{
        fontSize:12,
        color:'#fff'
    }
})

const mapStateToProps = state => ({
    userInfo:state.user.userInfo
})

const mapDispatchToProps = dispatch => ({

})


export default connect(mapStateToProps,mapDispatchToProps)(Header)
