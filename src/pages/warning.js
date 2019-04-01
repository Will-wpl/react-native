import React, { Component } from "react";
import { Image, FlatList, StyleSheet,Dimensions, Text, View, Modal, ScrollView, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import LocalImg from '../images'
import NavBar from '../component/NavBar'
import MenuBar from '../component/MenuBar'
import { Table, TableWrapper, Row } from 'react-native-table-component';
import SideMenu from 'react-native-side-menu'
let {width,height} = Dimensions.get('window');
export default class WarningPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      data: [],
      loaded: false,
      modalVisible: false,
      tableHead: ['锁编号', '机构名称', '工作状态', '剩余电量'],
      tableData: [
        ["1.锁0001", "机构1", "工作正常", "电量剩余90%"], ["1.锁0001", "机构1", "工作正常", "电量剩余90%"],
        ["1.锁0001", "机构1", "工作正常", "电量剩余60%"], ["1.锁0001", "机构1", "工作正常", "电量剩余90%"],
        ["1.锁0001", "机构1", "工作异常", "电量剩余90%"], ["1.锁0001", "机构1", "工作正常", "电量剩余90%"],
        ["1.锁0001", "机构1", "工作正常", "电量剩余90%"], ["1.锁0001", "机构1", "工作正常", "电量剩余35%"],
        ["1.锁0001", "机构1", "工作正常", "电量剩余90%"], ["1.锁0001", "机构1", "工作正常", "电量剩余90%"],
        ["1.锁0001", "机构1", "工作正常", "电量剩余20%"], ["1.锁0001", "机构1", "工作异常", "电量剩余90%"],
        ["1.锁0001", "机构1", "工作正常", "电量剩余90%"], ["1.锁0001", "机构1", "工作正常", "电量剩余90%"],
        ["1.锁0001", "机构1", "工作正常", "电量剩余90%"], ["1.锁0001", "机构1", "工作正常", "电量剩余90%"],
        ["1.锁0001", "机构1", "工作正常", "电量剩余90%"], ["1.锁0001", "机构1", "工作正常", "电量剩余90%"],
        ["1.锁0001", "机构1", "工作正常", "电量剩余90%"], ["1.锁0001", "机构1", "工作正常", "电量剩余90%"],
        ["1.锁0001", "机构1", "工作正常", "电量剩余90%"], ["1.锁0001", "机构1", "工作正常", "电量剩余90%"]
      ]
    };
  }
  componentDidMount() {

  }
  showFlter() {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }
  filterData(type,data){
    console.log(type);
  }
  render() {
    return (
      <SideMenu
        menu={<MenuBar onSelectMenuItem={this.showFlter.bind(this)} filter={this.filterData.bind(this)} />}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => {
          this.setState({
            isOpen: isOpen,
          })
        }}
        bounceBackOnOverdraw={true}
        menuPosition={'right'}
        openMenuOffset={0.8*width}
        edgeHitWidth={200}
      >
        <View style={{ flex: 1, backgroundColor: "#fff", overflow: "hidden" }}>
          <NavBar
            title="设备警告"
            rightIcon="ios-funnel"
            rightPress={this.showFlter.bind(this)}
          />
          <Table borderStyle={{ borderColor: '#f1f1f1' }}>
            <Row data={this.state.tableHead} style={styles.header} textStyle={styles.text} />
          </Table>
          <ScrollView style={styles.scrollView}>
            <Table borderStyle={{ borderColor: '#C1C0B9' }}>
              {
                this.state.tableData.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    style={[styles.row, index % 2 && { backgroundColor: '#fff' }]}
                    textStyle={styles.text}
                  />
                ))
              }
            </Table>
          </ScrollView>
        </View>
      </SideMenu>
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
  header: { height: 50, backgroundColor: '#f1f1f1' },
  text: { textAlign: 'center', fontWeight: '100', fontSize: 14, color: "#666" },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' }
})
