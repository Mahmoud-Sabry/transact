import React, { Component } from "react";
import { View, Image, Dimensions, StyleSheet, Text } from "react-native";
import {
  createDrawerNavigator,
  DrawerNavigatorItems
} from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import { Icon, Button } from "native-base";
import Cash from "../CashManagement";
import logo from "../../Images/logo_c.png";
var { height, width } = Dimensions.get("window");
import { LogOut } from "../helper";
import Dashboard from "../Dashboard";
import TCashiers from "../Charts";
import TCustomers from "../TopCustomers";
import TProducts from "../TopProducts";
import CashierShifts from "../CashierShifts";
import Receipts from "../Receipts";

const CustomDrawerContentComponent = props => (
  <View style={{ flex: 1, backgroundColor: "white" }}>
    <View style={styles.drawerHeader}>
      <Image style={styles.drawerImage} source={logo} />
    </View>
    <View>
      <DrawerNavigatorItems {...props} />
    </View>
    <Button onPress={() => LogOut()} transparent>
      <Icon style={{ color: "black" }} name="arrow-back" />
      <Text
        style={{
          color: "black",
          marginRight: width / 3 + 10,
          paddingTop: 10,
          paddingBottom: 10,
          fontSize: 20,
          fontFamily: "Montserrat"
        }}
      >
        Log out
      </Text>
    </Button>
  </View>
);

// const CustomDrawerContentComponent = props => (
//   <View style={{ flex: 1, backgroundColor: "white" }}>
//     <View style={styles.drawerHeader}>
//       <Image style={styles.drawerImage} source={logo} />
//     </View>
//     <View>
//       <DrawerItems {...props} />
//     </View>
//     <Button onPress={() => LogOut()} transparent>
//       <Icon style={{ color: "black" }} name="arrow-back" />
//       <Text
//         style={{
//           color: "black",
//           marginRight: width / 3 + 10,
//           paddingTop: 10,
//           paddingBottom: 10,
//           fontSize: 20,
//           fontFamily: "Montserrat"
//         }}
//       >
//         Log out
//       </Text>
//     </Button>
//   </View>
// );

const Apps = createDrawerNavigator(
  {
    Dashboard: { screen: Dashboard },
    TCashiers: { screen: TCashiers },
    TCustomers: { screen: TCustomers },
    TProducts: { screen: TProducts },
    Cash: {
      navigationOptions: {
        drawerLabel: ({ fontFamily }) => (
          <Text
            style={{
              paddingTop: 10,
              paddingBottom: 10,
              fontSize: 20,
              fontFamily: "Montserrat"
            }}
          >
            {" "}
            Cash Management{" "}
          </Text>
        ),
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require("../../Images/basket.png")}
            style={[styles.icon, { tintColor: tintColor }]}
          />
        )
      },
      screen: Cash
    },
    CashierShifts: {
      navigationOptions: {
        drawerLabel: ({ fontFamily }) => (
          <Text
            style={{
              paddingTop: 10,
              paddingBottom: 10,
              fontSize: 20,
              fontFamily: "Montserrat"
            }}
          >
            {" "}
            Cashier Shifts{" "}
          </Text>
        ),
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require("../../Images/cart.png")}
            style={[styles.icon, { tintColor: tintColor }]}
          />
        )
      },
      screen: CashierShifts
    },
    Receipts: {
      navigationOptions: {
        drawerLabel: ({ fontFamily }) => (
          <Text
            style={{
              paddingTop: 10,
              paddingBottom: 10,
              fontSize: 20,
              fontFamily: "Montserrat"
            }}
          >
            {" "}
            Receipts{" "}
          </Text>
        ),
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require("../../Images/coupon.png")}
            style={[styles.icon, { tintColor: tintColor }]}
          />
        )
      },
      screen: Receipts
    }
  },
  {
    initialRouteName: "Dashboard",
    drawerPosition: "left",
    contentComponent: CustomDrawerContentComponent,
    contentOptions: {
      activeTintColor: "#5badf3",
      fontFamily: "Montserrat"
    },
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle"
  }
);
export default createAppContainer(Apps);
const styles = StyleSheet.create({
  drawerHeader: {
    height: 70,
    justifyContent: "center",
    paddingLeft: 20,
    fontFamily: "Montserrat",
    borderBottomWidth: 3,
    borderBottomColor: "#dcddde",
    borderBottomEndRadius: 2,
    borderBottomStartRadius: 2
  },
  drawerImage: {
    width: 100,
    height: 25
  },
  icon: {
    // color: '#5badf3',
    width: 24,
    height: 24
  }
});
