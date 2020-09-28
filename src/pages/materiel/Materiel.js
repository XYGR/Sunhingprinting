import React, { Component } from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {connect} from 'react-redux';

import Header from '../../conments/Header';
import MaterielForm from './children/MaterielForm';
import MaterielTable from './children/MaterielTable';
import {requireMaterielList} from '../../store/modules/materiel';

class Materiel extends Component{

    constructor(props) {
        super(props);
        this.state = {
            prjid:'',
            custpo:'',
            custno:'',
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
        let {prjid,custpo,pageNo,pageSize} = this.state;
        let params = {
            prjid,
            custpo,
        }
        let keys = Object.keys(params);
        keys.forEach((key)=>{
            if (params[key].trim().length < 1 ){
                delete params[key];
                return false;
            }
        })
        this.props.getMaterielList(params)
    }

    setParam = (key,value) => {
        this.setState({
            [key]:value
        })
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
                <MaterielTable data={materielList} index={detailIndex} setDetailIndex={this.setDetailIndex} />
                {/*<MaterielDetail list={materielList.length?materielList[detailIndex].vmap:[]} />*/}
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
    getMaterielList(params){
        let action = requireMaterielList(params);
        dispatch(action)
    }
})


export default connect(mapStateToProps,mapDispatchToProps)(Materiel)
