import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native';
import Barcode from 'react-native-smart-barcode';
import NavBar from '../component/NavBar';
import ConfirmDialog from '../component/confirm';
import CodeResultPage from './codeResult';
import Toast from 'react-native-root-toast';
import HttpUtil from '../server/server'
export default class BarcodeShow extends Component {
    //构造方法
    constructor(props) {
        super(props);
        this.state = {
            viewAppear: false,
            modalVisibility:false,
            LockCode:""
        };
    }
    componentDidMount() {
        //启动定时器
        this.timer = setTimeout(
            () => this.setState({viewAppear: true}),
            250
        );
    }
    componentWillUnmount() {
        //清楚定时器
        this.timer && clearTimeout(this.timer);
    }
    openResultPage(){
        this.props.navigator.push({
          component: CodeResultPage,
          args: {LockCode:this.state.LockCode}
      });
    }
    leftPress(){
        this.props.navigator.pop()
    }
    _onBarCodeRead = (e) => {
        // console.log(`e.nativeEvent.data.type = ${e.nativeEvent.data.type}, e.nativeEvent.data.code = ${e.nativeEvent.data.code}`)
        this._stopScan();
        //this.setState({modalVisibility:true,LockCode:e.nativeEvent.data.code});
        HttpUtil.get(`/SL_Order/save?lockcode=${e.nativeEvent.data.code}`)
        .then((result) => {this.leftPress();Toast.show("开锁命令已提交！");})
        .catch(error => console.error(error))
        // Alert.alert("锁编号为", e.nativeEvent.data.code, [
        //     {text: '开锁', onPress: () => this._startScan()},
        // ])
    };

    _startScan = (e) => {
        this._barCode.startScan()
    };

    _stopScan = (e) => {
        this._barCode.stopScan()
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <NavBar
                    title="扫码"
                    leftIcon="ios-arrow-back"
                    leftPress={this.leftPress.bind(this)}
                    />
                {this.state.viewAppear ?
                    <Barcode style={{flex: 1,}} ref={component => this._barCode = component}
                             onBarCodeRead={this._onBarCodeRead}/>
                    : null
                }
                {/* <ConfirmDialog title="锁编号" message={this.state.LockCode} ref="_customModal" visibility={this.state.modalVisibility}
                    buttonLeftName="取消" buttonRightName="确认开锁"
                    onLeftPress={() => {
                    this.setState({modalVisibility:false})
                    }}
                    onRightPress={() => {
                    //Toast.show("已退出登录！")
                    this.openResultPage();
                    this.setState({modalVisibility:false});
                    }}
                /> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});