import React, { Component } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  ImageBackground,
  StatusBar
} from "react-native";
import {
  ListItem,
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  List,
  Thumbnail
} from "native-base";
var { height, width } = Dimensions.get("window");
export default class cashierComment extends Component {
  render() {
    const { navigation } = this.props;
    const cash = navigation.getParam("cash", "NO-Cash");
    const cashType = navigation.getParam("cashType", "NO-cashType");
    const created = navigation.getParam("created", "NO-Date");
    const name = navigation.getParam("name", "NO-name");
    const comment = navigation.getParam("comment", "NO-comment");
    return (
      <Container>
        <Header style={styles.HeaderStyle}>
          <StatusBar
            barStyle="dark-content"
            hidden={false}
            backgroundColor="white"
            // translucent={true}
          />
          <Left>
            <Button
              onPress={_ => [this.props.navigation.navigate("Cash")]}
              transparent
            >
              <Icon name="arrow-back" style={[styles.icon]} />
            </Button>
          </Left>
          <Body></Body>
        </Header>
        <View style={styles.Container}>
          <View style={styles.Title}>
            <Text style={{ fontSize: 40, fontFamily: "Montserrat" }}>
              {cash} EGP
            </Text>
            <Text style={{ fontSize: 15, fontFamily: "Montserrat" }}>
              {cashType}
            </Text>
            <Text style={{ fontSize: 15, fontFamily: "Montserrat" }}>
              {created}
            </Text>
          </View>
          <View
            style={{
              height: height / 9,
              backgroundColor: "#ffffff",
              borderWidth: 0.5,
              borderColor: "#bbbec1"
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color: "#caced1",
                paddingLeft: 20,
                paddingTop: 10,
                fontFamily: "Montserrat"
              }}
            >
              Cashier Information
            </Text>
            <Text
              style={{
                fontSize: 15,
                paddingLeft: 20,
                paddingTop: 10,
                fontFamily: "Montserrat"
              }}
            >
              {name}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#ffffff",
              borderWidth: 0.5,
              borderColor: "#bbbec1",
              marginTop: 15,
              paddingBottom: height / 6,
              marginBottom: height / 6,
              overflow: "visible",
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color: "#caced1",
                paddingLeft: 20,
                paddingTop: 10,
                fontFamily: "Montserrat"
              }}
            >
              Cashier Comment
            </Text>
            <ScrollView>
              <Text
                style={{
                  fontSize: 15,
                  paddingLeft: 20,
                  paddingTop: 10,
                  paddingRight: 10,
                  fontFamily: "Montserrat"
                  //   paddingBottom: 20,
                }}
              >
                {comment}
              </Text>
            </ScrollView>
          </View>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#f4f5f7",
    paddingBottom: 30
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  Title: {
    fontFamily: "Montserrat",
    height: height / 6,
    paddingLeft: 20,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#f4f5f7",
    borderWidth: 0.5,
    borderColor: "#bbbec1"
  },
  HeaderStyle: {
    // marginTop: 5,
    // marginLeft: 8,
    // marginRight: 8,
    // borderRadius: 5,
    // borderBottomColor: 'black',
    fontFamily: "Montserrat",
    backgroundColor: "white"
    // color: 'black',
  },
  icon: {
    color: "#5badf3",
    width: 30,
    height: 30
  }
});
