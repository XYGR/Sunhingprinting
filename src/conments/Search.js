import React,{Component} from 'react';
import {
    StyleSheet,
    Modal,
    Text,
    View,
    ScrollView,
    TextInput,
    Platform,
    StatusBar,
    NativeModules,
    TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux'

import {requireCustomerList,clearCustomerList} from '../store/modules/order';

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            statusBarHeight:0,
        }
    }

    componentDidMount(): void {
        if (Platform.OS === 'android'){
            this.setState({
                statusBarHeight:StatusBar.currentHeight
            })
        }else{
            NativeModules.StatusBarManager.getHeight(barHeight => {
                this.setState({
                    statusBarHeight:barHeight.height
                })
            });
        }
    }

    search = (value) => {
        value = value.trim();
        if (value.length > 0){
            this.props.getCustomerList({custno:value})
        }else{
            this.props.clearCustomerList()
        }
    }

    close = () =>{
        this.props.clearCustomerList();
        this.props.close();
    }

    choice = (custno) => {
        this.props.clearCustomerList();
        this.props.setValue(custno)
    }

    render() {
        let {statusBarHeight} = this.state
        let {customerList,visible} = this.props
        return (
            <Modal visible={visible} transparent={true}>
                <StatusBar translucent={true} backgroundColor='transparent'  barStyle="dark-content" />
                <View style={styles.searchMask}>
                    {
                        Platform.OS === 'ios' && <View style={{height:statusBarHeight,backgroundColor:'#F54645'}} />
                    }
                    <View style={styles.searchBar}>
                        <TextInput
                            style={styles.searchBarInp}
                            placeholder={'客戶代號'}
                            clearButtonMode={'while-editing'}
                            autoCapitalize={'none'}
                            onChangeText={this.search}                    />
                        <Text onPress={this.close} style={styles.searchBarText}>取消</Text>
                    </View>
                    <ScrollView bounces={false}>
                        {
                            customerList.map( item => {
                                return (
                                    <TouchableOpacity onPress={this.choice.bind(this,item.custno)} key={item.custno} style={styles.searchItem}>
                                        <Text>{item.custno}</Text>
                                        <Text>{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    searchMask:{
        position:'absolute',
        top:0,
        left:0,
        bottom:0,
        right:0,
        backgroundColor:'#fff'
    },
    searchBar:{
        height: 40,
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:15,
        paddingRight:15,
        backgroundColor:'#F8F8F8'
    },
    searchBarInp:{
        flex:1,
        height:30,
        borderRadius:40,
        backgroundColor:'#fff',
        padding:0,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 14,
        textAlignVertical:"center"
    },
    searchBarText:{
        fontSize:14,
        color:'#333',
        marginLeft:15,
    },
    searchItem:{
        height:40,
        marginLeft: 10,
        marginRight: 10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderBottomWidth:1,
        borderColor:'#F8F8F8'
    }

})

const mapStateToProps = (state) => ({
    customerList: state.order.customerList
})
const mapDispatchToProps = (dispatch) => ({
    getCustomerList(params){
        let action = requireCustomerList(params);
        dispatch(action)
    },
    clearCustomerList(){
        let action = clearCustomerList();
        dispatch(action)
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Search)
