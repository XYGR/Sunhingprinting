import React, {Component} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  NativeModules,
  Platform,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Entypo';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {clearOrderState} from '../store/modules/order';
import {clearMaterielState} from '../store/modules/materiel';
import {clearProduceState} from '../store/modules/produce';
import {clearPurchaseState} from '../store/modules/purchase';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusBarHeight: 0,
    };
  }

  componentDidMount(): void {
    if (Platform.OS === 'android') {
      this.setState({
        statusBarHeight: StatusBar.currentHeight,
      });
    } else {
      NativeModules.StatusBarManager.getHeight((barHeight) => {
        this.setState({
          statusBarHeight: barHeight.height,
        });
      });
    }
  }

  exit = () => {
    AsyncStorage.removeItem('token', () => {
      Actions.replace('login');
    });
  };

  pop = () => {
    let {clearOrder, clearMateriel, clearProduce, clearPurchase} = this.props;
    clearOrder && clearOrder();
    clearMateriel && clearMateriel();
    clearProduce && clearProduce();
    clearPurchase && clearPurchase();
    Actions.pop();
  };

  render() {
    let {title = '', userInfo} = this.props;
    let {statusBarHeight} = this.state;
    return (
      <View
        style={[
          styles.header,
          {height: 44 + statusBarHeight, paddingTop: statusBarHeight},
        ]}>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <TouchableOpacity onPress={this.pop}>
          <Icon name="chevron-thin-left" size={30} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.name} onPress={this.exit}>
          {userInfo.username}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#F54645',
    paddingLeft: 5,
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    color: '#fff',
  },
  name: {
    fontSize: 12,
    color: '#fff',
  },
});

const mapStateToProps = (state) => ({
  userInfo: state.user.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
  clearOrder() {
    let action = clearOrderState();
    dispatch(action);
  },
  clearMateriel() {
    let action = clearMaterielState();
    dispatch(action);
  },
  clearProduce() {
    let action = clearProduceState();
    dispatch(action);
  },
  clearPurchase() {
    let action = clearPurchaseState();
    dispatch(action);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
