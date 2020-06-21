import React, { Component } from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {connect} from 'react-redux';

import Header from '../../conments/Header';
import MaterielForm from './children/MaterielForm';
import MaterielTable from './children/MaterielTable';
import MaterielDetail from './children/MaterielDetail';
import {requireMaterielList} from '../../store/modules/materiel';

class Materiel extends Component{

    constructor(props) {
        super(props);
        this.state = {
            prjid:'',
            custpo:'',
            custno:'',
            pageNo:1,
            pageSize:10,
            detailIndex:0,
        }
    }

    componentDidMount() {
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
        this.props.getMaterielList({pageNo,pageSize},params)
    }

    setParam = (key,value) => {
        this.setState({
            [key]:value
        })
    }

    loadMore = () => {
        let {pageNo} = this.state;
        let {data,pages} = this.props.materielList
        if (pageNo < pages){
            this.setState({
                pageNo:++pageNo
            },()=>{
                this.search(data)
            })
        }
    }

    setDetailIndex = (index) => {
        this.setState({
            detailIndex:index
        })
    }

    setValue = (key,value) => {
        this.setState({
            [key]:value
        })
    }

    render() {
        let {materielList} = this.props;
        let {prjid,custno,custpo,detailIndex} = this.state;

        return (
            <ScrollView stickyHeaderIndices={[0]} bounces={false}>
                <Header title={'工程單物料需求'}  />
                <MaterielForm prjid={prjid} custno={custno} custpo={custpo} search={this.search} setParam={this.setParam} setValue={this.setValue} />
                <MaterielTable data={materielList.data} loadMore={this.loadMore} index={detailIndex} setDetailIndex={this.setDetailIndex} />
                <MaterielDetail list={materielList.length?materielList[detailIndex].poInspdetailList:[]} />
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({

})

const mapStateToProps = (state) => ({
    materielList: state.materiel.materielList
})
const mapDispatchToProps = (dispatch) => ({
    getMaterielList(query,params){
        let action = requireMaterielList(query,params);
        dispatch(action)
    }
})


export default connect(mapStateToProps,mapDispatchToProps)(Materiel)
