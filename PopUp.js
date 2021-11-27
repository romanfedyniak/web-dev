import { Modal, Dimensions, TouchableWithoutFeedback, StyleSheet, View, Text } from "react-native";
import React from 'react';
import { StatusBar } from "expo-status-bar";
import CheckBox from 'expo-checkbox';

const deviceHeight = Dimensions.get('window').height

export class Popup extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            show: false,
            checkbox: {
                services: false,
                parking: false,
                kiwi: false,
                ewings: false,
            },
        }
    }
    
    open() {
        this.setState({show:true})
    }
    close() {
        this.setState({show:false})
    }

    getCheckbox() {
        return this.state.checkbox;
    }
    
    renderOutsideTouchable(onTouch){
        const view = <View style={{flex:1,width:'100%'}}></View>
        if(!onTouch) return view

        return(
            <TouchableWithoutFeedback onPress={onTouch} style={{flex:1,width:'100%'}}>
                {view}
            </TouchableWithoutFeedback>
        )
    }

    renderTitle = () => {
        const {title} = this.props
        return(
            <View>
                <Text style={{
                    color:'#182E44',
                    fontSize:22,
                    fontWeight:'500',
                    margin:15,
                    alignSelf:'center'
                }}>
                    {title}
                </Text>
            </View>
        )
    }

    renderContent = () => {
        return (
            <View>
                <View style={styles.container}>
                    <Text style={styles.text}>Services</Text>
                    <CheckBox onValueChange={(state) => {this.state.checkbox.services = state; this.setState(this.state)}} value={this.state.checkbox.services} disabled={false} style={styles.check}/>
                </View>
                <View style={styles.container}>
                    <Text style={styles.text}>Parking</Text>
                    <CheckBox onValueChange={(state) => {this.state.checkbox.parking = state; this.setState(this.state)}} value={this.state.checkbox.parking} disabled={false} style={styles.check}/>
                </View>
                <View style={styles.container}>
                    <Text style={styles.text}>Kiwi</Text>
                    <CheckBox onValueChange={(state) => {this.state.checkbox.kiwi = state; this.setState(this.state)}} value={this.state.checkbox.kiwi} disabled={false} style={styles.check}/>
                </View>
                <View style={styles.container}>
                    <Text style={styles.text}>E-wings</Text>
                    <CheckBox onValueChange={(state) => {this.state.checkbox.ewings = state; this.setState(this.state)}} value={this.state.checkbox.ewings} disabled={false} style={styles.check}/>
                </View>
            </View>
        )
    }

    render() {
        let {show} = this.state
        const {onTouchOutside} = this.props
        return(
            <View>
                <StatusBar visible={false}></StatusBar>
                    <Modal
                    animationType={'slide'}
                    transparent={true}
                    visible={show}
                    onRequestClose={this.close}>
                    <View style={{
                        flex:1,
                        backgroundColor:'#000000AA',
                        justifyContent:'flex-end',}}>
                            {this.renderOutsideTouchable(onTouchOutside)}
                        <View style={{
                            backgroundColor:'yellow',
                            width:'100%',
                            borderTopRightRadius:10,
                            borderTopLeftRadius:10,
                            paddingHorizontal:10,
                            maxHeight: deviceHeight*0.5,
                        }}>
                            {this.renderTitle()}
                            {this.renderContent()}
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        container:{
            alignItems:'baseline',
            flexDirection:'row',
            paddingBottom:40,
            paddingLeft:40,
        },
        text:{
            fontSize:20,
            paddingRight:20,
        },
        check:{
            top:-2,
        }
    }
)