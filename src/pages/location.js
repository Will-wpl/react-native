import React, { Component } from "react";
import { MapView, Marker, Polyline } from 'react-native-amap3d'
import { Image, FlatList, StyleSheet, Text, View, Modal, ScrollView, TouchableWithoutFeedback } from "react-native";
import LocalImg from '../images'
import NavBar from '../component/NavBar'
import Toast from 'react-native-root-toast';
import { Table, TableWrapper, Row } from 'react-native-table-component';
export default class LocationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      modalVisible: false,
      locationEnabled: true,
      showslocationbutton: false,
      mLatitude: 0,
      mLongitude: 0,
      zoomLevel: 17,
      tableHead: ['工作中 ：3', '异常 ：3', '电量低于20% ：3'],
      tableData: [
        ["1.锁0001", "工作正常", "电量剩余90%"], ["1.锁0003", "工作正常", "电量剩余20%"],
        ["1.锁0001", "工作异常", "电量剩余90%"], ["1.锁0001", "工作正常", "电量剩余90%"],
        ["1.锁0001", "工作正常", "电量剩余90%"], ["1.锁0001", "工作正常", "电量剩余90%"],
        ["1.锁0001", "工作正常", "电量剩余90%"], ["1.锁0001", "工作异常", "电量剩余20%"],
        ["1.锁0001", "工作正常", "电量剩余90%"], ["1.锁0001", "工作正常", "电量剩余90%"],
        ["1.锁0001", "工作正常", "电量剩余20%"], ["1.锁0001", "工作正常", "电量剩余90%"]
      ]
    };
  }

  componentDidMount() {
  }
  closeModal() {
    this.setState({
      modalVisible: false
    })
  }
  showModal() {
    this.setState({
      modalVisible: true
    })
  }
  toPosition(nativeEvent) {
    if (this.state.mLatitude != 0 && this.state.mLatitude != 0) {
      //this.setState({locationEnabled:false});//停止定位
      return;
    }
    this.setState({
      mLatitude: nativeEvent.latitude,
      mLongitude: nativeEvent.longitude,
      zoomLevel: 18,
      showslocationbutton: true
    })
    //Toast.show(JSON.stringify(nativeEvent));
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff", overflow: "hidden" }}>
        <MapView
          style={StyleSheet.absoluteFill}
          zoomLevel={this.state.zoomLevel}
          tilt={45}
          mapType='standard'
          locationInterval={2000} //定位间隔(ms)，默认 2000
          distanceFilter={10}     //定位的最小更新距离
          locationEnabled={this.state.locationEnabled}  //开启定位
          showslocationbutton={this.state.showslocationbutton}
          showsCompass={true}
          showsscale={true}
          showsTraffic={true}
          region={{
            latitude: this.state.mLatitude,
            longitude: this.state.mLongitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          //onlocation 启动定位显示  regison  中的显示区域
          onLocation={({ nativeEvent }) => { this.toPosition(nativeEvent) }}
        //onlocation={({nativeEvent}) =>alert(nativeEvent.latitude)}
        //onLocation={({nativeEvent}) =>{this.toPosition(nativeEvent)}}
        />
        <TouchableWithoutFeedback onPress={this.showModal.bind(this)}>
          <View style={{ position: "absolute", zIndex: 10, bottom: 0, padding: 15, width: "100%", paddingBottom: 0 }}>
            <Table borderStyle={{ borderColor: '#0398ff' }}>
              <Row data={this.state.tableHead} style={[styles.header, {
                borderTopLeftRadius: 6,
                borderTopRightRadius: 6
              }]} textStyle={styles.text} />
            </Table>
          </View>
        </TouchableWithoutFeedback>
        <Modal
          style={styles.wrap}
          animationType={'slide'}
          onRequestClose={() => { }}
          visible={this.state.modalVisible}
        >
          <NavBar
            title={""}
            rightIcon="ios-close"
            rightPress={this.closeModal.bind(this)}
          />
          {/* <View style={styles.searchView}>
          <TextInput ref="search" style={styles.textInput} underlineColorAndroid="transparent" placeholder="请输入地址" placeholderTextColor="#666"/>
        </View> */}
          <Table borderStyle={{ borderColor: '#0398ff' }}>
            <Row data={this.state.tableHead} style={styles.header} textStyle={styles.text} />
          </Table>
          <ScrollView style={styles.scrollView}>
            <Table borderStyle={{ borderColor: '#C1C0B9' }}>
              {
                this.state.tableData.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
                    textStyle={styles.text2}
                  />
                ))
              }
            </Table>
          </ScrollView>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: "#fff",
    marginLeft: 15,
    marginRight: 15,
  },
  title: {
    fontSize: 13,
    paddingHorizontal: 16,
    paddingTop: 15,
    paddingBottom: 10,
    color: "#666"
  },
  scrollView: {
    backgroundColor: "#f3f3f3"
  },
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#0398ff' },
  text: { textAlign: 'center', fontWeight: '100', fontSize: 14, color: "#fff" },
  text2: { textAlign: 'center', fontWeight: '100', fontSize: 14, color: "#666" },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' },
  marker: {
    backgroundColor: '#009688',
    alignItems: 'center',
    borderRadius: 5,
    padding: 5,
  },
  markerText: {
    color: '#fff',
  }
})
