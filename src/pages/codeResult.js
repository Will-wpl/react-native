import React, { Component } from "react";
import HttpUtil from '../server/server'
import { Image, FlatList, StyleSheet, Text, Dimensions,View,TouchableOpacity,ScrollView,ProgressBarAndroid} from "react-native";
import NavBar from '../component/NavBar'
import LocalImg from '../images'
import BluetoothSerial from 'react-native-bluetooth-serial'
import Toast from 'react-native-root-toast';
const { width, height } = Dimensions.get('window')
export default class CodeResultPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      loading: false,
      showFail:false,
      lockconnect:false,
      text:'蓝牙配对中...'
    };
  }
  componentWillMount () {
    BluetoothSerial.on('bluetoothEnabled', () => Toast.show('Bluetooth enabled'))
    BluetoothSerial.on('bluetoothDisabled', () => Toast.show('Bluetooth disabled'))
    BluetoothSerial.on('error', (err) => console.log(`Error: ${err.message}`))
    BluetoothSerial.on('connectionLost', () => {
        Toast.show(`Connection to device has been lost`)
    })
  }
  componentDidMount() {
    this.getCodeInfo();
  }
  inSertLog(user,msg,type){
    HttpUtil.get(`/SL_Record/save?usercode=${user}&msg=${msg}&type=${type}`)
    .then((result) => {}).catch(error => console.error(error))
  }
  getCodeInfo() {
    HttpUtil.get(`/SL_Lock/getbylockcode?lockcode=${this.props.LockCode}`)
        .then((result) => {
            if(result.macaddress){
              this.setState({loading:true,data:result})
              BluetoothSerial.connect(result.macaddress).then(() => {
                this.setState({text:"配对成功，开锁信息发送中..."});
                BluetoothSerial.write("open").then(() => {
                  this.setState({text:"消息发送成功，设备处理中..."});
                }).catch((err) => {
                  this.setState({text:"消息发送失败",showFail:true});
                });
              }).catch((err) => {
                this.setState({text:"配对失败，请重新连接设备",showFail:true});
                //this.inSertLog("DingXiaoLong","failed","linklock");
              });
              BluetoothSerial.on('read', (str) => {
                this.setState({loading:false});
                this.inSertLog("DingXiaoLong","success","linklock");
              })
              // BluetoothSerial.connect(result.macaddress,(err, status, deviceName)=>{
              //   if(status){
              //     this.setState({text:"配对成功，开锁信息发送中..."})
              //     BluetoothSerial.write("open", (err)=>{});
              //     BluetoothSerial.setDataAvailableCallback((e) =>{
              //       BluetoothSerial.read((err, string)=> {
              //         this.setState({loading:false});
              //         this.inSertLog("DingXiaoLong","success","linklock");
              //       })
              //     })
              //   }else{
              //     this.setState({lockconnect:true,showFail:true});
              //     this.inSertLog("DingXiaoLong","failed","linklock");
              //   }
              // });
            }else{
              this.setState({showFail:true})
              //this.inSertLog("DingXiaoLong","no lock data","openlock");
            }
        })
        .catch(error => console.error(error))
        //this.forceUpdate();
  }
  getbluetooth(){
    this.setState({loading:false});
  }
  back() {
    this.props.navigator.pop()
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <NavBar
          title="锁状态"
          leftIcon="ios-arrow-back"
          leftPress={this.back.bind(this)}
        />{
          !this.state.showFail?(this.state.loading?<ScrollView>
          <Text style={styles.title}>{"连接锁"}</Text>
          <View style={styles.box}><ProgressBarAndroid style={styles.loading} styleAttr='Inverse'  color='#0098FF' /></View>
          <View style={styles.box}><Text>{this.state.text}</Text></View>
        </ScrollView>:<ScrollView>
          <Text style={styles.title}>{"锁信息"}</Text>
          <View style={styles.box}><Image source={LocalImg['yes']} style={styles.imgStyle} /></View>
          <View style={styles.box}><Text>开锁成功</Text></View>
          <View style={styles.item}><Text>Mac地址：{this.state.data.MacAddress}</Text></View>
          <View style={styles.item}><Text>更新时间：{this.state.data.Updatetime}</Text></View>
        </ScrollView>):
        <ScrollView>
          <Text style={styles.title}>{"锁信息"}</Text>
          <View style={styles.box}><Image source={LocalImg['error']} style={styles.imgStyle} /></View>
          <View style={styles.box}><Text>{this.state.text}</Text></View>
        </ScrollView>
        }
        
      </View>
    );
  }
}

var styles = StyleSheet.create({
  title: {
    fontSize: 18,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    color: "#666",
    backgroundColor:"#f1f1f1",
    fontSize:15
  },
  loading:{
    width: 80,height:80,borderRadius:100,
  },
  box:{
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  item:{
    paddingHorizontal:26,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: "#f6f6f6",
  },
  imgStyle:{
    width: 128,height:128,borderRadius:100, 
    borderColor:"#fff",borderWidth:4, resizeMode: 'cover'
  },
  text:{
    fontSize:20,color:"#fff",marginTop:20
  }
});