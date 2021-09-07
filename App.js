import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, Image, ScrollView } from 'react-native';
import { RadioButton } from 'react-native-paper';
import * as firebase from 'firebase';
import { firebaseConfig } from './config'
import logo from './logo.jpeg'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app(); // if already initialized, use that one
}


export default class App extends Component {
  constructor() {
    super()
    this.state = {
      isSelected: 'Zoom',
      Roll_No: "",
    }
  }

  validate = (str) => {
    if (str.indexOf("IJ") != 0) return false
    else if (str.length != 9) return false
    else return true
  }


  sendData = () => {
    const postData = {
      Roll_No: this.state.Roll_No,
      Platform: this.state.isSelected,
      time: new Date().toLocaleTimeString()
    }
    const User = firebase.database().ref("users/" + new Date().toGMTString().slice(5, 11))
    if (this.validate(this.state.Roll_No)) {
      User.push(postData)
      Alert.alert("Your Data Have Been Saved Successfully !!")
    }
    else Alert.alert("Please Enter Correct Roll No.")
  }


  render() {

    const image = logo;
    const styles = StyleSheet.create({
      container: {
        height: 80,
        width: '100%',
        backgroundColor: 'aqua',
        alignItems: 'center',
        paddingTop: '10%',
        position: 'absolute',
        elevation: 1
      },
      body: {
        margin: '10%',
        padding: 10,
      },
      btn: {
        width: 'auto',
        marginTop: '3%',
      },
      image: {
        width: '100%',
        height: 400,
        resizeMode: 'stretch'
      }

    });
    return (
      <>
        <View style={styles.container}>
          <Text style={{ fontSize: 20 }}>Inner Journey Attendance</Text>
        </View>
        <ScrollView>

          <View style={{ marginTop: '23%' }}>
            <Image source={image} style={styles.image} ></Image>
          </View>
          <View style={styles.body}>
            <Text style={{ fontSize: 20 }}>Enter Your Roll Number</Text>
            <TextInput
              style={{ borderWidth: 1, padding: '2%', marginTop: '3%' }}
              onChangeText={text => this.setState({ Roll_No: text })}
              autoCapitalize="characters"
              placeholder="Roll No."
              keyboardType="default"
            />
            <Text style={{ marginTop: '3%', fontSize: 20 }}>Platform</Text>
            <View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                <RadioButton
                  style={{ color: 'black' }}
                  value="first"
                  status={this.state.isSelected === 'Zoom' ? 'checked' : 'unchecked'}
                  onPress={() => this.setState({ isSelected: 'Zoom' })}
                />
                <Text>Zoom</Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                <RadioButton
                  value="second"
                  status={this.state.isSelected === 'Youtube' ? 'checked' : 'unchecked'}
                  onPress={() => this.setState({ isSelected: 'Youtube' })}
                />
                <Text>Youtube</Text>
              </View>


            </View>
            <View style={styles.btn}>
              <Button
                onPress={this.sendData}
                title="I am Attending"
              />
            </View>
          </View>
        </ScrollView>
      </>
    )
  }
}


