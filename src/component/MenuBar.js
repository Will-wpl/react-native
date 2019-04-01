import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,TextInput,
    View,
    TouchableOpacity
} from 'react-native';
import Button from './Button'
import Toast from 'react-native-root-toast';
export default class MenuBar extends Component {
    constructor(props){
        super(props);
        this.state={
            minEle:"",
            maxEle:"",
            btnType:{
                yc:false,zc:false,ele20:false,ele50:false,eleValue:false
            }
        }
    }
    //函数回调
    selectSideMenu(){
        this.props.onSelectMenuItem();
    }
    filterData(type,data){
        let btnType = this.state.btnType;
        btnType[type] = !btnType[type];
        this.setState({btnType:btnType});
        if(type=="eleValue"){
            if(this.state.minEle==""){
                Toast.show("最小电量不能为空")
                return;
            }
            if(this.state.maxEle==""){
                Toast.show("最大电量不能为空")
                return;
            }
            if(this.state.maxEle<=this.state.minEle){
                Toast.show("最小电量不能大于最大电量")
                return;
            }
            this.props.filter(type,data);
        }else{
            this.props.filter(type);
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>工作状态筛选</Text>
                <View style={{flexDirection:"row"}}>
                    <Button style={styles.button} onPress={this.filterData.bind(this,"yc")}><Text style={[styles.buttonstyle,this.state.btnType["yc"]?styles.buttonstyleSelected:""]}>工作异常</Text></Button>
                    <Button style={styles.button} onPress={this.filterData.bind(this,"zc")}><Text style={[styles.buttonstyle,this.state.btnType["zc"]?styles.buttonstyleSelected:""]}>工作正常</Text></Button>
                </View>
                <Text style={styles.title}>电量筛选</Text>
                <View style={{flexDirection:"row"}}>
                    <Button style={styles.button} onPress={this.filterData.bind(this,"ele20")}><Text style={[styles.buttonstyle,this.state.btnType["ele20"]?styles.buttonstyleSelected:""]}>电量低于20%</Text></Button>
                    <Button style={styles.button} onPress={this.filterData.bind(this,"ele50")}><Text style={[styles.buttonstyle,this.state.btnType["ele50"]?styles.buttonstyleSelected:""]}>电量低于50%</Text></Button>
                </View>
                <Text style={styles.title}>电量范围</Text>
                <View style={{flexDirection:"row",justifyContent:"center"}}>
                    <TextInput underlineColorAndroid="transparent" keyboardType={"numeric"} onChangeText={(minEle) => this.setState({ minEle })}
                        value={this.state.minEle} autoCapitalize={"none"} ref={"minEle"}
                        style={styles.textInput} placeholder="请输入最低电量" placeholderTextColor="#aaa" />
                        <Text style={styles.text}> — </Text>
                    <TextInput underlineColorAndroid="transparent" keyboardType={"numeric"} onChangeText={(maxEle) => this.setState({ maxEle })}
                        value={this.state.maxEle} autoCapitalize={"none"} ref={"maxEle"}
                        style={styles.textInput} placeholder="请输入最高电量" placeholderTextColor="#aaa" />
                </View>
                <View style={{flexDirection:"row",justifyContent:"center"}}>
                <Button style={styles.button2} onPress={this.filterData.bind(this,"eleValue",{min:this.state.minEle,max:this.state.maxEle})}><Text style={[styles.buttonstyle2,this.state.btnType["eleValue"]?styles.buttonstyleSelected:""]}>确定</Text></Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    title:{
        backgroundColor:"#f1f1f1",
        padding:10
    },
    text:{
    color:"#666",height:40,marginTop:25
    },
    button:{
     marginTop:15,marginBottom:15,marginLeft:10,marginRight:10,
     borderRadius: 6, overflow: "hidden"
    },
    button2:{
        borderRadius:10, overflow: "hidden", paddingLeft:20,paddingRight:20,flex:1
    },
    buttonstyle:{
      backgroundColor: "#f1f1f1", alignItems: "center", justifyContent: "center",
      padding:10,color:"#666"
    },
    buttonstyle2:{
        borderRadius: 6,
        backgroundColor: "#56d176",color:"#fff",
        padding:10,width:"100%",textAlign:"center"
    },
    buttonstyleSelected:{
        backgroundColor: "#0096ff",color:"#fff"
    },
    textInput: {
        marginTop:15,marginBottom:15,
        borderWidth:1,
        borderColor:"#ddd",
        paddingVertical: 0,
        padding:10,
        marginLeft:20,
        marginRight:20,
        height:40,
        fontSize: 13,
        borderRadius:5
    }
});