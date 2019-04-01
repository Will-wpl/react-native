import React, { Component } from "react";
import { Text,
  View,BackAndroid,ScrollView,StyleSheet,AlertIOS,RefreshControl,TouchableOpacity,TouchableNativeFeedback,TouchableHighlight,
  Image,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
  Dimensions,
  ActivityIndicator,FlatList,
  Animated } from "react-native";
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons'
import Swiper from 'react-native-swiper'
import px2dp from '../util/index'
import SplashScreen from 'react-native-splash-screen'
import LocalImg from '../images'
import ShowList from '../component/list'
import data from '../server/data'
import My from './My'
import Setting from './Setting'
import LbsModal from '../component/LbsModal'
const isIOS = Platform.OS == "ios"
const { width, height } = Dimensions.get('window')
const headH = px2dp(isIOS?70:50)
const InputHeight = px2dp(28)
var REQUEST_URL =
  "https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      location: "大连甘井子区",
      scrollY: new Animated.Value(0),
      searchView: new Animated.Value(0),
      modalVisible: false,
      searchBtnShow: true,
      listLoading: false,
      isRefreshing: false,
      swiperShow:false,
      tabShow: false,
      modalType:""
    };
    this.SEARCH_BOX_Y = px2dp(isIOS?48:43);
    this.SEARCH_FIX_Y = headH-px2dp(isIOS?64:44);
    this.SEARCH_KEY_P = px2dp(58);
    this.SEARCH_DIFF_Y = this.SEARCH_FIX_Y-this.SEARCH_BOX_Y;
    this.SEARCH_FIX_DIFF_Y = headH-this.SEARCH_FIX_Y-headH;
    //this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    SplashScreen.hide();
    //this.fetchData();
    setTimeout(()=>{
      this.setState({
          swiperShow:true,
          tabShow:true
      });
    },0)
  }
  openLbs(){
    this.props.navigator.push({
        component: My,
        args: {}
    });
    //this.setState({modalVisible: true})
  }
  openSetting(){
    this.props.navigator.push({
      component: Setting,
      args: {}
  });
  }
  changeLocation(location){
    this.setState({location})
  }
  _renderTypes(){
    const w = width, h = px2dp(180)
    let renderSwipeView = (types, n) => {
      return (
        <View style={styles.typesView}>
          {
            types.map((item, i) => {
              let render = (
                <View style={[{width: w, height: h}, styles.typesItem]}>
                  <Image source={LocalImg["ad"+n]} style={{width: w, height: h}}/>
                </View>
              )
              return (
                isIOS?(
                  <TouchableHighlight style={{width: w, height: h}} key={i} onPress={() => {}}>{render}</TouchableHighlight>
                ):(
                  <TouchableNativeFeedback style={{width: w, height: h}} key={i} onPress={() => {}}>{render}</TouchableNativeFeedback>
                )
              )
            })
          }
        </View>
      )
    }
    if(this.state.swiperShow){
      return (
        <Swiper
          autoplay={true}
          style={{height: px2dp(180)}}
          paginationStyle={{ bottom: 10 }}
          dotStyle={{backgroundColor:'rgba(0,0,0,.2)', width: 6, height: 6}}
          activeDotStyle={{backgroundColor:'rgba(0,0,0,.5)', width: 6, height: 6}}>
          {renderSwipeView(['图1'], 1)}
          {renderSwipeView(['图2'], 2)}
        </Swiper>
      )
    }else{
      <View style={{height: px2dp(180), paddingHorizontal: 0}}>
        <Image source={LocalImg.ad1} style={{height: px2dp(180), width: width, resizeMode: 'cover'}}/>
      </View>
    }
  }
  _renderHeader(){
    return (
      <View style={styles.header}>
        <Animated.View style={[styles.lbsWeather]}>
          <TouchableWithoutFeedback onPress={this.openLbs.bind(this)}>
            <View style={styles.lbs}>
              <Icon name="ios-person" size={px2dp(25)} color="#fff" />
              {/* <Text style={{fontSize: px2dp(18), fontWeight: 'bold', color:"#fff", paddingHorizontal: 5}}>{this.state.location}</Text> */}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.openSetting.bind(this)}>
            <View style={styles.weather} >
              {/* <View style={{marginRight: 5}}>
                <Text style={{color: "#fff", fontSize: px2dp(11), textAlign: "center"}}>{"3°"}</Text>
                <Text style={{color: "#fff", fontSize: px2dp(11)}}>{"阵雨"}</Text>
              </View> */}
              <Icon name="ios-settings" size={px2dp(25)} color="#fff" />
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>
    )
  }

  _renderList(){
    if(this.state.tabShow){
      return (
        <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
          <ScrollableTabView 
          style={styles.tabViewStyle}
          initialPage={0}
          tabBarActiveTextColor='#0398ff'
          tabBarInactiveTextColor='#333'
          tabBarUnderlineStyle={styles.tabBarUnderline}
          renderTabBar={() => <DefaultTabBar />}>
            <ShowList tabLabel="工作中" data={data.lock}/>
            <ShowList tabLabel="已开锁" data={data.unlock}/>
          </ScrollableTabView>
        </View>
      )
    }
  }
  showModal(type){
    this.setState({modalVisible: true,modalType:type})
  }
  render() {
    // if (!this.state.loaded) {
    //   return this.renderLoadingView();
    // }
    return (
      <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
        {this._renderHeader()}
        <ScrollView
          style={styles.scrollView}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
          )}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
              colors={['#ddd', '#0398ff']}
              progressBackgroundColor="#ffffff"
            />
          }
        >
          <View style={{backgroundColor: "#fff"}}>
            {this._renderTypes()}
          </View>
          <View style={{backgroundColor: "#fff"}}>
            {this._renderList()}
          </View>
          {/* <FlatList
            data={this.state.data}
            renderItem={this.renderMovie}
            style={styles.list}
            keyExtractor={item => item.id}
          /> */}
        </ScrollView>
        <View style={{position:"absolute",zIndex:10,bottom:20,
                      right:10,borderRadius:10,overflow:"hidden",
                      borderStyle:"solid",backgroundColor:"#fff",
                      borderColor:"#ddd",borderWidth:1}}>
            <Text style={styles.clickBar} onPress={this.showModal.bind(this,'add')}>+</Text>
            <Text style={styles.clickBar} onPress={this.showModal.bind(this,'remove')}>-</Text>
          </View>
        <LbsModal
          modalVisible={this.state.modalVisible}
          type={this.state.modalType}
          location={this.state.location}
          setLocation={this.changeLocation.bind(this)}
          closeModal={(()=>this.setState({modalVisible: false})).bind(this)}
        />
      </View>
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  _onRefresh(){
    this.setState({isRefreshing: true});
    setTimeout(() => {
      this.setState({isRefreshing: false});
    }, 2000)
  }
  // renderMovie({ item }) {
  //   // { item }是一种“解构”写法，请阅读ES2015语法的相关文档
  //   // item也是FlatList中固定的参数名，请阅读FlatList的相关文档
  //   return (
  //     <View style={styles.container}>
  //       <Image
  //         source={{ uri: item.posters.thumbnail }}
  //         style={styles.thumbnail}
  //       />
  //       <View style={styles.rightContainer}>
  //         <Text style={styles.title}>{item.title}</Text>
  //         <Text style={styles.year}>{item.year}</Text>
  //       </View>
  //     </View>
  //   );
  // }
}

var styles = StyleSheet.create({
  tabViewStyle:{
    height:140*px2dp(data.lock.length>data.unlock.length?data.lock.length:data.unlock.length)
  },
  tabBarUnderline:{
    backgroundColor: '#0398ff',
    height: 2,
  },
  header: {
    backgroundColor: "#0398ff",
    height: headH,
    paddingTop: px2dp(isIOS?30:10),
    paddingHorizontal: 16
  },
  typesView: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  clickBar:{
    width:px2dp(30),
    fontSize:22,
    height:px2dp(30),
    lineHeight:px2dp(30),
    textAlign: "center"
  },
  typesItem: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  lbsWeather: {
    height: InputHeight,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  placeholder: {
    height: InputHeight,
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    borderRadius: px2dp(14),
    backgroundColor: "#fff",
    alignItems: "center"
  },
  lbs: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  weather: {
    flexDirection: "row",
    alignItems: "center"
  },
  textInput:{
    flex: 1,
    fontSize: 13,
    paddingLeft: 10,
    paddingRight: 10,
    height: InputHeight,
    borderRadius: px2dp(14),
    backgroundColor: "#fff"
  },
  searchHeadBox: {
    height: InputHeight,
    flexDirection: "row",
    alignItems: "center"
  },
  searchBtn: {
    borderRadius: InputHeight,
    height: InputHeight,
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  keywords: {
    marginTop: px2dp(14),
    flexDirection: "row"
  },
  scrollView: {
    paddingBottom: px2dp(0)
  },
  recom: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginTop: 10,
    flexWrap: "wrap"
  },
  card: {
    backgroundColor: "#fff",
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 16
  },
  business: {
    backgroundColor: "#fff",
    marginTop: 10,
    paddingVertical: 16
  },
  time: {
    paddingHorizontal: 3,
    backgroundColor: "#333",
    fontSize: px2dp(11),
    color: "#fff",
    marginHorizontal: 3
  },
  recomItem: {
    width: width/2,
    height: 70,
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "row"
  },
  recomWrap: {
    flex: 1,
    height: 70,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  lTimeScrollView: {
  },
  lTimeList: {
    backgroundColor:"#fff",
    alignItems: "center"
  },
  qtag: {
    fontSize: 12,
    borderWidth: 1,
    color: "#00abff",
    borderColor: "#00abff",
    paddingHorizontal: 4,
    paddingVertical: 3,
    borderRadius: 5
  },
  gift: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#fff"
  },
  fixSearch: {
    backgroundColor: "#0398ff",
    height: isIOS ? 64 : 42,
    paddingTop: isIOS ? 20 : 0,
    paddingHorizontal: 16,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  rightContainer: {
    flex: 1
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: "center"
  },
  year: {
    textAlign: "center"
  },
  thumbnail: {
    width: 53,
    height: 81
  },
  list: {
    paddingTop: 20,
    backgroundColor: "#F5FCFF"
  }
});