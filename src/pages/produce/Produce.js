import React, { Component } from 'react';
import {ScrollView, View} from 'react-native';
import {connect} from 'react-redux'

import Header from '../../conments/Header';
import ProduceForm from './children/ProduceForm';
import ProduceDetail from './children/ProduceDetail';
import ProduceTable from './children/ProduceTable';
import {requireProduceList} from '../../store/modules/produce';

class Produce extends Component{

    constructor(props) {
        super(props);
        this.state = {
            prjid:'',
            custpo:'',
            custno:'',
            pageNo:1,
            pageSize:10,
            choiceIndex:0,
            scrollEnabled:true
        }
    }

    componentDidMount(): void {
        let {prjid} = this.props;
        if (prjid){
            this.setState({
                prjid
            },this.search)
        }
    }

    search = () => {
        let {prjid,custno,custpo,pageNo,pageSize} = this.state;
        let params = {
            prjid,
            custno,
            custpo,
        }
        let keys = Object.keys(params);
        keys.forEach((key)=>{
            if (params[key].trim().length < 1 ){
                delete params[key];
                return false;
            }
        })
        let {data} = this.props.produceList;
        this.props.getProduceList({pageNo,pageSize},params,data)
    }

    reset = () => {
        this.setState({
            prjid:'',
            custpo:'',
            custno:'',
            pageNo:1,
            pageSize:10,
            choiceIndex:0
        })
    }

    setValue = (key,value) => {
        this.setState({
            [key]:value
        })
    }

    loadMore = () => {
        console.log('loadMore')
        let {pageNo} = this.state;
        let {pages} = this.props.produceList
        if (pageNo < pages){
            this.setState({
                pageNo:++pageNo
            },()=>{
                this.search()
            })
        }
    }

    render() {
        let {prjid,custno,custpo,choiceIndex,scrollEnabled} = this.state;
        let {data} = this.props.produceList
        return (
            <View onStartShouldSetResponderCapture={() => {
                this.setState({ scrollEnabled: true });
            }}>
                <ScrollView stickyHeaderIndices={[0]} bounces={false} scrollEnabled={scrollEnabled}>
                    <Header title={'生產進度查詢'}  />
                    <ProduceForm prjid={prjid} custno={custno} custpo={custpo} setValue={this.setValue} search={this.search} reset={this.reset} />
                    <ProduceDetail data={data[choiceIndex]?data[choiceIndex]:null} />
                    <ProduceTable
                        data={data}
                        changeIndex={(index)=>{this.setState({choiceIndex:index})}}
                        index={choiceIndex}
                        loadMore={this.loadMore}
                        enableScroll={()=>{this.setState({scrollEnabled:false})}}
                    />
                </ScrollView>
            </View>
        )
    }

}

const mapStateToProps = (state) => ({
    produceList: state.produce.produceList
})
const mapDispatchToProps = (dispatch) => ({
    getProduceList(query,params,oldList){
        let action = requireProduceList(query,params,oldList);
        dispatch(action)
    }
})


export default connect(mapStateToProps,mapDispatchToProps)(Produce)
