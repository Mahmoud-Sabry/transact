import React, { Component } from "react";
import {
  Text,
  Image,
  Dimensions,
  ScrollView,
  View,
  StyleSheet,
  Platform,
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
  List,
  Thumbnail,
  Spinner
} from "native-base";
import Graph from "../Graph";
import Boxes from "./boxes";
var { height, width } = Dimensions.get("window");
import { connect } from "react-redux";
import dashActions from "../../redux/Dashboard/actions";
const { fetchGraphsData } = dashActions;
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //
      inventoryCount: 0,
      buyersCount: 0,
      cartSizeAverage: 0,
      cartValueAverage: 0,
      discount: 0,
      couponSoldCount: 0,
      unusedCouponAmount: 0,
      taxCollected: 0,
      //
      paymentMethods: [],
      topSellingProduct: [],
      topSellingCashiersByRevenue: [],
      //
      revenues: 0,
      profits: 0,
      salesCounts: 0,
      productSoldCounts: 0,
      salesCount: [],
      productSoldCount: [],
      revenue: [],
      profit: [],
      loaded: false
    };
    this.props.fetchGraphsData();
  }
  componentWillReceiveProps({
    inventoryCount,
    buyersCount,
    cartSizeAverage,
    cartValueAverage,
    discount,
    couponSoldCount,
    unusedCouponAmount,
    taxCollected,
    //

    topSellingProduct,
    paymentMethods,
    topSellingCashiersByRevenue,
    //
    revenues,
    profits,
    salesCounts,
    productSoldCounts,
    salesCount,
    productSoldCount,
    revenue,
    profit
  }) {
    this.setState({
      //
      inventoryCount,
      buyersCount,
      cartSizeAverage,
      cartValueAverage,
      discount,
      couponSoldCount,
      unusedCouponAmount,
      taxCollected,
      //
      topSellingProduct,
      paymentMethods,
      topSellingCashiersByRevenue,
      //
      revenues,
      profits,
      salesCounts,
      productSoldCounts,
      salesCount,
      productSoldCount,
      revenue,
      profit,
      loaded: true
    });
  }

  static navigationOptions = {
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
        Dashboard{" "}
      </Text>
    ),
    drawerIcon: ({ tintColor }) => (
      <Image source={require("../../Images/rates.png")} style={[styles.icon]} />
    )
  };
  send(array) {
    console.log("Array in Dashboard ", array);
    if (array.length >= 1) return array;
    else
      return [
        {
          name: "Seoul",
          population: 21500000,
          color: "rgba(131, 167, 234, 1)",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Toronto",
          population: 2800000,
          color: "#F00",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Beijing",
          population: 527612,
          color: "red",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "New York",
          population: 8538000,
          color: "#ffffff",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Moscow",
          population: 11920000,
          color: "rgb(0, 0, 255)",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        }
      ];
  }

  render() {
    console.log("proppsinDashboard", this.props);
    // return <Text>hi</Text>;
    if (!this.state.loaded)
      return (
        <View>
          <Header style={styles.HeaderStyle}>
            <StatusBar
              barStyle="dark-content"
              hidden={false}
              backgroundColor="white"
              // translucent={true}
            />
            <Left>
              <Button style={styles.button} transparent>
                <Icon
                  style={styles.icon}
                  name="menu"
                  onPress={() => this.props.navigation.openDrawer()}
                />
              </Button>
            </Left>
            <Body style={styles.BodyStyle}>
              <Title style={styles.TitleStyle}>Dashboard</Title>
            </Body>
          </Header>
          <Spinner color="blue" />
        </View>
      );
    return (
      <View style={styles.parent}>
        <Header style={styles.HeaderStyle}>
          <StatusBar
            barStyle="dark-content"
            hidden={false}
            backgroundColor="white"
            // translucent={true}
          />
          <Left>
            <Button style={styles.button} transparent>
              <Icon
                style={styles.icon}
                name="menu"
                onPress={() => this.props.navigation.openDrawer()}
              />
            </Button>
          </Left>
          <Body style={styles.BodyStyle}>
            <Title style={styles.TitleStyle}>Dashboard</Title>
          </Body>
        </Header>
        <ScrollView>
          <Boxes
            inventoryCount={this.state.inventoryCount}
            buyersCount={this.state.buyersCount}
            cartSizeAverage={this.state.cartSizeAverage}
            cartValueAverage={this.state.cartValueAverage}
            discount={this.state.discount}
            couponSoldCount={this.state.couponSoldCount}
            unusedCouponAmount={this.state.unusedCouponAmount}
            taxCollected={this.state.taxCollected}
          />
          <Graph
            label="Revenue"
            data_count={this.state.revenues}
            data={this.state.revenue}
            data_count_label="EPG"
          />
          <Graph
            label="Gross Profit"
            data_count={this.state.profits}
            data={this.state.profit}
            data_count_label="EGP"
          />
          <Graph
            label="Sale Count"
            data_count={this.state.salesCounts}
            data={this.state.salesCount}
            data_count_label=""
          />
          <Graph
            label="Sold Products"
            data_count={this.state.productSoldCounts}
            data={this.state.productSoldCount}
            data_count_label=""
          />
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  console.log("mapStateToProps in Dashboard => State ", state);
  return {
    //
    inventoryCount: state.Dashboard.inventoryCount,
    buyersCount: state.Dashboard.buyersCount,
    cartSizeAverage: state.Dashboard.cartSizeAverage,
    cartValueAverage: state.Dashboard.cartValueAverage,
    discount: state.Dashboard.discount,
    couponSoldCount: state.Dashboard.couponSoldCount,
    unusedCouponAmount: state.Dashboard.unusedCouponAmount,
    taxCollected: state.Dashboard.taxCollected,

    //
    paymentMethods: state.Dashboard.paymentMethods,
    topSellingProduct: state.Dashboard.topSellingProduct,
    topSellingCashiersByRevenue: state.Dashboard.topSellingCashiersByRevenue,

    //
    revenues: state.Dashboard.revenues,
    profits: state.Dashboard.profits,
    salesCounts: state.Dashboard.salesCounts,
    productSoldCounts: state.Dashboard.productSoldCounts,
    salesCount: state.Dashboard.salesCount,
    productSoldCount: state.Dashboard.productSoldCount,
    revenue: state.Dashboard.revenue,
    profit: state.Dashboard.profit
  };
}

export default connect(
  mapStateToProps,
  { fetchGraphsData }
)(Dashboard);

const styles = StyleSheet.create({
  BodyStyle: {
    paddingRight: Platform.OS === "ios" ? width / 3 : 0
  },
  parent: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: "#f4f5f7"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f5f7"
    // padding: 5,
    // margin: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
    // margin:5
    // backgroundColor:'white'
  },
  rows: {
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  item: {
    width: width / 2 - 10,
    height: height / 9,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "white",
    margin: 3,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: "#eeeeee"
    // padding: 5,
  },
  texts: {
    fontFamily: "Montserrat",
    alignSelf: "center",
    width: width / 3,
    padding: 2,
    fontSize: 15,
    color: "#dbdbdb"
  },
  pics: {
    width: 35,
    height: 35
  },
  icon: {
    color: "#5badf3",
    width: 30,
    height: 30
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
  TitleStyle: {
    fontFamily: "Montserrat",
    color: "#5badf3"
  },
  button: {
    // paddingLeft: 20
    // paddingBottom: Platform.OS === "ios" ? 30 : 0
  }
});
