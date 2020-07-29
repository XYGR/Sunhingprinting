import React from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import {connect} from 'react-redux';

import Boot from '../pages/boot/Boot';
import Login from '../pages/login/Login';
import Home from '../pages/home/Home';
import Order from '../pages/order/Order';
import Materiel from '../pages/materiel/Materiel';
import Produce from '../pages/produce/Produce';
import Purchase from '../pages/purchase/Purchase';

const AppRouter = (props) => {
  return (
    <Router sceneStyle={{backgroundColor: 'white'}}>
      <Stack key="root">
        {/* 配置路由规则 */}
        {/* 注意，所有的路由规则，都应该写到这个位置 */}
        {/* 第一个 Scene 就是默认要展示的首页 */}
        {/* key 属性，表示路由的规则名称，将来可以使用这个 key ，进行编程式导航，每一个路由规则，都应该提供一个 唯一的key， key不能重复 */}
        <Scene key="boot" component={Boot} hideNavBar={true} />
        <Scene key="login" component={Login} title="" hideNavBar={true} />
        <Scene key="home" component={Home} hideNavBar={true} />
        <Scene
          key="order"
          component={Order}
          // onExit={props.clearOrder()}
          hideNavBar={true}
        />
        <Scene
          key="materiel"
          component={Materiel}
          // onExit={props.clearMateriel()}
          hideNavBar={true}
        />
        <Scene
          key="produce"
          component={Produce}
          // onExit={props.clearProduce()}
          hideNavBar={true}
        />
        <Scene
          key="purchase"
          component={Purchase}
          // onExit={props.clearPurchase()}
          hideNavBar={true}
        />
      </Stack>
    </Router>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  // clearOrder() {
  //   let action = clearOrderState();
  //   dispatch(action);
  // },
  // clearMateriel() {
  //   let action = clearMaterielState();
  //   dispatch(action);
  // },
  // clearProduce() {
  //   let action = clearProduceState();
  //   dispatch(action);
  // },
  // clearPurchase() {
  //   let action = clearPurchaseState();
  //   dispatch(action);
  // },
});

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
