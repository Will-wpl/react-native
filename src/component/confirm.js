import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    Modal,
} from 'react-native';
export default class ConfirmDialog extends Component {
    constructor(props) {
        super(props);
        // 绑定事件
        this._onLeftPress = this._onLeftPress.bind(this);
        this._onRightPress = this._onRightPress.bind(this);
    }
    _onLeftPress() {
        if (this.props.onLeftPress) {   // 在设置了回调函数的情况下
            this.props.onLeftPress(this.props.pageName);  // 执行回调
        }
    }
    _onRightPress() {
        if (this.props.onRightPress) {   // 在设置了回调函数的情况下
            this.props.onRightPress(this.props.pageName);  // 执行回调
        }
    }
    render() {
        return (
            <Modal
                visible={this.props.visibility}
                transparent={true}
                animationType={'fade'}//none slide fade
                onRequestClose={() => this.setState({ visibility: false })}
            >
                <View style={Dialog.container}>
                    <View style={Dialog.modalContainer}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flex: 1 }}>
                                <Text style={Dialog.modalTitle}>{this.props.title}</Text>
                            </View>
                        </View>
                        {typeof(this.props.message)=="string"?<View style={{ flexDirection: "row"}}>
                                        <View style={{ flex: 1,alignItems:"center",paddingTop:15,paddingBottom:15}}>
                                            <Text style={Dialog.modalMessage}>{this.props.message}</Text>
                                        </View>
                                    </View>
                        :(this.props.message.length>0?this.props.message.map((item,index)=>{
                            return (<View style={index%2==0?{ flexDirection: "row"}:{flexDirection: "row",backgroundColor:"#f1f1f1"}}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={Dialog.modalMessage}>{item.label} : {item.text}</Text>
                                        </View>
                                    </View>)
                        }):<View style={{ flexDirection: "row"}}>
                                        <View style={{ flex: 1,alignItems:"center",paddingTop:15,paddingBottom:15}}>
                                            <Text style={Dialog.modalMessage}>确认上传吗？</Text>
                                        </View>
                                    </View>)}
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flex: 1}}>
                                <View style={Dialog.horizonLine} />
                            </View>
                        </View>
                        <View style={Dialog.row}>
                            <TouchableHighlight style={Dialog.leftBn} onPress={this.props.onLeftPress} underlayColor={'#FFFFFF'} >
                                <Text style={Dialog.leftBnText}>{this.props.buttonLeftName}</Text>
                            </TouchableHighlight>
                            <View style={Dialog.verticalLine} />
                            <TouchableHighlight style={Dialog.rightBn} onPress={this.props.onRightPress} underlayColor={'#FFFFFF'} >
                                <Text style={Dialog.rightBnText}>{this.props.buttonRightName}</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}
const Dialog = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft:60,
        marginRight:60,
        borderRadius: 10,
        backgroundColor: "white",
        alignItems: 'center'
    },
    modalTitle: {
        width: "100%",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        color: '#000000',
        backgroundColor: "#0096ff",
        fontSize: 16, color: "#fff",
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft:10
    },
    modalMessage: {
        color: '#333',
        fontSize: 14,
        marginTop:10,
        marginBottom:10,
        marginRight:20,
        marginLeft:20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    horizonLine: {
        backgroundColor: '#ddd',
        height: 0.5,
        alignSelf: 'stretch'
    },
    verticalLine: {
        backgroundColor: '#ddd',
        width: 1,
        alignSelf: 'stretch'
    },
    leftBn: {
        borderBottomLeftRadius: 3,
        padding: 10,
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    leftBnText: {
        fontSize: 16,
        color: '#8a8a8a',
    },
    rightBn: {
        borderBottomRightRadius: 3,
        padding: 10,
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightBnText: {
        fontSize: 16,
        color: '#00A9F2'
    }
})
