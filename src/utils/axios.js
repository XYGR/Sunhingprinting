import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-root-toast';
import {Actions} from 'react-native-router-flux';

axios.defaults.timeout = 30000;
axios.defaults.baseURL = 'https://app.sunhingprinting.com/';

export const get = async (url, params = {})=>{
    let toast = Toast.show('加载中....', {
        duration: axios.defaults.timeout, // toast显示时长
        position: Toast.positions.CENTER, // toast位置
        delay: 0, // toast显示的延时
    });
    try {
        let token = await AsyncStorage.getItem('token');
        console.log(`token:${token}`)
        axios.defaults.headers.token = token;
        // 处理参数
        let paramsStr = '';
        Object.entries(params).forEach(([key, value], index)=>{
            paramsStr += (index === 0) ? '?' : '&'
            paramsStr += `${key}=${encodeURIComponent(value)}`
        })
        // 发送请求,得到响应对象
        let response = await axios.get(`${url}${paramsStr}`);
        // 解析数据，当成文本解析
        let result = response.data;
        // 解析完成，得到结果
        Toast.hide(toast)
        if(result.code === '0000'){
            return result.data;
        }else{
            Toast.show(result.msg, {
                duration: Toast.durations.SHORT, // toast显示时长
                position: Toast.positions.CENTER, // toast位置
                delay: 0, // toast显示的延时
                shadow: true,
            });
            if (result.code === '0003'){
                AsyncStorage.removeItem('token')
                Actions.replace('login')
            }
        }
    } catch (error) {
        let message = ''
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1){
            message = '请求超时请检查网络连接!'
        }else{
            console.error(error);
            message = '请求出现错误！'
        }
        Toast.hide(toast)
        Toast.show(message, {
            duration: Toast.durations.SHORT, // toast显示时长
            position: Toast.positions.CENTER, // toast位置
            delay: 0, // toast显示的延时
            shadow: true,
        });
    }
}

export const post = async (url, params = {})=>{
    let toast = Toast.show('加载中....', {
        duration: axios.defaults.timeout, // toast显示时长
        position: Toast.positions.CENTER, // toast位置
        delay: 0, // toast显示的延时
    });
    try {
        let token = await AsyncStorage.getItem('token');
        console.log('token',token)
        axios.defaults.headers.token = token;
        // 发送请求
        let response = await axios.post(url, params);
        // 接收到响应，处理数据
        let result = await response.data;
        Toast.hide(toast)
        if(response.status === 200 && result.code === "0000"){
            result.data.datas = result.datas;
            delete result.datas;
            return result.data;
        }else{
            Toast.show(result.msg, {
                duration: Toast.durations.SHORT, // toast显示时长
                position: Toast.positions.CENTER, // toast位置
                delay: 0, // toast显示的延时
                shadow: true,
            });
            if (result.code === '0003'){
                AsyncStorage.removeItem('token')
                Actions.replace('login')
            }
        }
    } catch (error) {
        let message = ''
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1){
            message = '请求超时请检查网络连接!'
        }else{
            console.error(error);
            message = '请求出现错误！'
        }
        Toast.hide(toast)
        Toast.show(message, {
            duration: Toast.durations.SHORT, // toast显示时长
            position: Toast.positions.CENTER, // toast位置
            delay: 0, // toast显示的延时
            shadow: true,
        });
    }
}

export const queryPost = async (url, query = {},params = {})=>{
    let toast = Toast.show('加载中....', {
        duration: axios.defaults.timeout, // toast显示时长
        position: Toast.positions.CENTER, // toast位置
        delay: 0, // toast显示的延时
    });
    try {
        let token = await AsyncStorage.getItem('token');
        console.log('token',token)
        axios.defaults.headers.token = token;
        // 处理参数
        let queryStr = '';
        Object.entries(query).forEach(([key, value], index)=>{
            queryStr += (index === 0) ? '?' : '&';
            queryStr += `${key}=${encodeURIComponent(value)}`;
        })
        // 发送请求
        let response = await axios.post(url+queryStr,params);
        // 接收到响应，处理数据
        let result = response.data;
        Toast.hide(toast)
        if(result.code === "0000"){
            return result.data;
        }else{
            Toast.show(result.msg, {
                duration: Toast.durations.SHORT, // toast显示时长
                position: Toast.positions.CENTER, // toast位置
                delay: 0, // toast显示的延时
                shadow: true,
            });
            if (result.code === '0003'){
                AsyncStorage.removeItem('token')
                Actions.replace('login')
            }
        }
    } catch (error) {
        let message = ''
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1){
            message = '请求超时请检查网络连接!'
        }else{
            console.error(error);
            message = '请求出现错误！'
        }
        Toast.hide(toast)
        Toast.show(message, {
            duration: Toast.durations.SHORT, // toast显示时长
            position: Toast.positions.CENTER, // toast位置
            delay: 0, // toast显示的延时
            shadow: true,
        });
    }
}

export default {
    get,
    post,
    queryPost
}
