import React, { Component } from 'react';
import {StyleSheet, Modal, Text, View, TouchableOpacity,Dimensions,TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

class Calendar extends Component {

    constructor() {
        super();
        let date = new Date();
        this.state = {
            choiceYear:date.getFullYear(),
            choiceMonth:date.getMonth() + 1,
            choiceDay:date.getDate(),
            previewYear:date.getFullYear(),
            previewMonth:date.getMonth() + 1,
            previewWeek:date.getDay(),
            itemWidth:(Dimensions.get("window").width - 72)/7,
            emptyList:[],
            dayList:[],
        }
    }

    initState = () => {
        let date = new Date();
        this.setState({
            choiceYear:date.getFullYear(),
            choiceMonth:date.getMonth() + 1,
            choiceDay:date.getDate(),
            previewYear:date.getFullYear(),
            previewMonth:date.getMonth() + 1,
            previewWeek:date.getDay(),
            emptyList:[],
            dayList:[],
        },()=>{
            this.diffDayList();
        })
    }

    componentDidMount() {
        this.diffDayList();
    }

    diffDayList = () =>{
        let {previewYear,previewMonth} = this.state;
        let emptyList = [];
        let dayList = []
        let maxDay = new Date(previewYear,previewMonth,0).getDate();
        let startWeek = new Date(previewYear,previewMonth - 1,1).getDay();
        for (let i = 0;i < startWeek;i++){
            emptyList.push(i);
        }
        for (let i = 1;i <= maxDay;i++){
            dayList.push(i);
        }
        this.setState({
            emptyList,
            dayList,
        })
    }

    prev = () => {
        let {previewYear,previewMonth} = this.state;
        if (previewMonth === 1){
            previewYear--;
            previewMonth = 12;
        }else{
            previewMonth--;
        }
        this.setState({
            previewYear,
            previewMonth,
        },()=>{
            this.diffDayList();
        })

    }

    next = () => {
        let {previewYear,previewMonth} = this.state;
        if (previewMonth === 12){
            previewYear++;
            previewMonth = 1;
        }else{
            previewMonth++;
        }
        this.setState({
            previewYear,
            previewMonth,
        },()=>{
            this.diffDayList();
        })
    }

    changeDay = (day) => {
        let {previewYear,previewMonth} = this.state;
        let date = new Date();
        date.setFullYear(previewYear)
        date.setMonth(previewMonth-1)
        date.setDate(day)
        this.setState({
            choiceYear:previewYear,
            choiceMonth:previewMonth,
            choiceDay:day,
            previewWeek:date.getDay()
        })
    }

    close = () => {
        this.initState();
        this.props.close && this.props.close();
    }

    define = () => {
        let {choiceYear,choiceMonth,choiceDay} = this.state;
        let result = `${choiceYear}-${choiceMonth}-${choiceDay}`;
        this.props.define && this.props.define(result);
        this.initState();
    }

    render() {
        let {choiceYear,choiceMonth,choiceDay,previewYear,previewMonth,itemWidth,emptyList,dayList,previewWeek} = this.state;
        let {visible} = this.props;
        let weeks = ["日", "一", "二", "三", "四", "五", "六"];
        return (
            <Modal transparent={true} visible={visible}>
                <TouchableWithoutFeedback onPress={this.close}>
                    <View style={[styles.calendarMask]}>
                        <View style={[styles.calendarWrap]}>
                            <View style={[styles.calendarHeader]}>
                                <Text style={[styles.calendarHeaderYear]}>{choiceYear}年</Text>
        <Text style={[styles.calendarHeaderMonth]}>{choiceMonth}月{choiceDay}日周{weeks[previewWeek]}</Text>
                            </View>
                            <View style={[styles.calendarBar]}>
                                <TouchableOpacity onPress={this.prev}>
                                    <Icon name="chevron-small-left" size={30} color="#000" />
                                </TouchableOpacity>
                                <Text>{previewYear}年{previewMonth}月</Text>
                                <TouchableOpacity onPress={this.next}>
                                    <Icon name="chevron-small-right" size={30} color="#000" />
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.calendarWeek]}>
                                <View style={[styles.calendarWeekItem,{height:itemWidth}]}>
                                    <Text style={{color:'#999'}}>日</Text>
                                </View>
                                <View style={[styles.calendarWeekItem,{height:itemWidth}]}>
                                    <Text style={{color:'#999'}}>一</Text>
                                </View>
                                <View style={[styles.calendarWeekItem,{height:itemWidth}]}>
                                    <Text style={{color:'#999'}}>二</Text>
                                </View>
                                <View style={[styles.calendarWeekItem,{height:itemWidth}]}>
                                    <Text style={{color:'#999'}}>三</Text>
                                </View>
                                <View style={[styles.calendarWeekItem,{height:itemWidth}]}>
                                    <Text style={{color:'#999'}}>四</Text>
                                </View>
                                <View style={[styles.calendarWeekItem,{height:itemWidth}]}>
                                    <Text style={{color:'#999'}}>五</Text>
                                </View>
                                <View style={[styles.calendarWeekItem,{height:itemWidth}]}>
                                    <Text style={{color:'#999'}}>六</Text>
                                </View>
                            </View>
                            <View style={[styles.calendarDay,{height:itemWidth*6}]}>
                                {
                                    emptyList.map((item)=>{
                                        return (
                                            <View key={item} style={{width:itemWidth,height:itemWidth}} />
                                        )
                                    })
                                }
                                {
                                    dayList.map((item)=>{
                                        let active = -1;
                                        if (choiceYear === previewYear && choiceMonth === previewMonth){
                                            active = choiceDay;
                                        }
                                        return (
                                            <TouchableOpacity key={item} onPress={()=>{this.changeDay(item)}}>
                                                <View style={[
                                                    styles.calendarDayItem,
                                                    {
                                                        width:itemWidth,
                                                        height:itemWidth,
                                                        borderRadius:itemWidth,
                                                        backgroundColor:active === item?'#F54645':'#fff'
                                                    }]} >
                                                    <Text style={{color:active === item?'#fff':'#000'}}>{item}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                            <View style={[styles.calendarFooter]}>
                                <View style={{width:itemWidth*1.5,alignItems:'center',justifyContent:'center'}}>
                                    <Text onPress={this.close} style={{color:'#F54645'}}>取消</Text>
                                </View>
                                <View style={{width:itemWidth*1.5,alignItems:'center',justifyContent:'center'}}>
                                    <Text onPress={this.define} style={{color:'#F54645'}}>确认</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

export default Calendar


const styles = StyleSheet.create({
    calendarMask:{
        position:'absolute',
        top:0,
        left:0,
        bottom:0,
        right:0,
        backgroundColor:'rgba(0,0,0,0.5)'
    },
    calendarWrap:{
        position:'absolute',
        top:80,
        right:36,
        left:36,
        backgroundColor: '#FFF'
    },
    calendarHeader:{
        height:86,
        padding:14,
        backgroundColor:'#F54645',
        justifyContent:'space-between'
    },
    calendarHeaderYear:{
        color:'#FFF'
    },
    calendarHeaderMonth:{
        color:'#FFF',
        fontSize:30
    },
    calendarBar:{
        height: 40,
        paddingLeft:4,
        paddingRight:4,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    calendarWeek:{
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    calendarWeekItem:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    calendarDay:{
        flexDirection: 'row',
        flexWrap:'wrap'
    },
    calendarDayItem:{
        justifyContent:'center',
        alignItems:'center',
    },
    calendarFooter:{
        height:50,
        flexDirection: 'row',
        justifyContent:'flex-end',
    }
})
