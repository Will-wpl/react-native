import React, { Component } from "react";

import { Image, FlatList, StyleSheet, Text, Dimensions,View,TouchableOpacity,ScrollView,

 } from "react-native";
import NavBar from '../component/NavBar'
import BarcodeShow from './barCode'
import LocalImg from '../images'
const { width, height } = Dimensions.get('window')
export default class KeyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false
    };
  }

  componentDidMount() {
    
  }
  back() {
    this.props.navigator.pop()
  }
  goCamera(type){
    this.props.navigator.push({
      component: BarcodeShow,
        args: {
          type:type
        }
    });
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#f3f3f3" }}>
        <NavBar
          title="钥匙"
        />
        <ScrollView>
          <Text style={styles.title}>{"请选择扫码方式"}</Text>
          <TouchableOpacity onPress={this.goCamera.bind(this,"lock")}>
            <View style={{ flex: 1, padding: 15,height:280,alignItems: "center", backgroundColor: "#e84c3d", overflow: "hidden",justifyContent: "center" }}>
              <Image source={LocalImg.lock} style={styles.imgStyle} />
              <Text style={styles.text}>关锁</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.goCamera.bind(this,"unlock")}>
          <View style={{ flex: 1, padding: 15,height:280,alignItems: "center", backgroundColor: "#77b3d5", overflow: "hidden",justifyContent: "center" }}>
            <Image source={LocalImg.unlock} style={styles.imgStyle} />
            <Text style={styles.text}>解锁</Text>
          </View>
        </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  title: {
    fontSize: 18,
    paddingHorizontal: 16,
    paddingTop: 15,
    paddingBottom: 15,
    color: "#666",
  },
  imgStyle:{
    width: 128,height:128,borderRadius:100, 
    borderColor:"#fff",borderWidth:4, resizeMode: 'cover'
  },
  text:{
    fontSize:20,color:"#fff",marginTop:20
  }
});