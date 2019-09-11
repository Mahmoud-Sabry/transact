import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Text,
  StatusBar,
  Dimensions,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
  ActionSheetIOS,
  Picker
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
var { height, width } = Dimensions.get("window");
class TopCustomers extends Component {
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
        Top Customers{" "}
      </Text>
    ),
    drawerIcon: ({ tintColor }) => (
      <Image source={require("../../Images/user.png")} style={[styles.icon]} />
    )
  };
  constructor(props) {
    super(props);
    this.state = {
      chart: "Revenue",
      cashType: "EGP",
      list: this.props.topCutomersByRevenue,
      topCutomersByRevenue: this.props.topCutomersByRevenue,
      topCustomersBySoldProduct: this.props.topCustomersBySoldProduct
    };
  }

  change(itemValue) {
    if (itemValue == "Product")
      this.setState({
        chart: itemValue,
        list: this.props.topCustomersBySoldProduct,
        cashType: "items"
      });
    else if (itemValue == "Revenue")
      this.setState({
        chart: itemValue,
        list: this.props.topCutomersByRevenue,
        cashType: "EGP"
      });
  }
  onSelectCategory() {
    const FEEDBACK_CATEGORIES = ["Revenue", "Product"];
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: FEEDBACK_CATEGORIES
        // destructiveButtonIndex: 0,
        // cancelButtonIndex: 0
      },
      buttonIndex => {
        if (FEEDBACK_CATEGORIES[buttonIndex] == "Product")
          this.setState({
            chart: FEEDBACK_CATEGORIES[buttonIndex],
            list: this.props.topCustomersBySoldProduct,
            cashType: "items"
          });
        else if (FEEDBACK_CATEGORIES[buttonIndex] == "Revenue")
          this.setState({
            chart: FEEDBACK_CATEGORIES[buttonIndex],
            list: this.props.topCutomersByRevenue,
            cashType: "EGP"
          });
      }
    );
  }
  IPhone_OS() {
    return (
      <TouchableOpacity
        style={{ paddingTop: 10, height: 50, width: 125 }}
        onPress={this.onSelectCategory.bind(this)}
      >
        <Text style={{ textAlign: "center", height: 50, width: 125 }}>
          {this.state.chart}
        </Text>
      </TouchableOpacity>
    );
  }
  Android_OS() {
    return (
      <Picker
        selectedValue={this.state.chart}
        style={{ height: 50, width: 125 }}
        onValueChange={(itemValue, itemIndex) => this.change(itemValue)}
      >
        <Picker.Item label="Revenue" value="Revenue" />
        <Picker.Item label="Product" value="Product" />
      </Picker>
    );
  }
  renderCashManagementData = () => {
    console.log("renderCashManagementData => ", this.state.list);
    const { list } = this.state;

    return list.map(item => {
      console.log("list item", item);
      var cash =
        item.customerProductsRevenue == undefined
          ? item.customerInvoices
          : item.customerProductsRevenue;
      return (
        <View
          style={{
            paddingTop: 20,
            paddingLeft: 10,
            paddingBottom: 20,
            flexDirection: "row",
            borderBottomColor: "#bbb",
            borderBottomWidth: StyleSheet.hairlineWidth
          }}
        >
          <Text
            style={{
              fontFamily: "Montserrat",
              flex: 2,
              fontSize: 20
            }}
          >
            {item.customer.name}{" "}
          </Text>
          <Text
            style={{
              flex: 1,
              fontFamily: "Montserrat",
              fontSize: 20,
              color: "#5badf3"
            }}
          >
            {cash} {this.state.cashType}
          </Text>
        </View>
      );
    });
  };
  render() {
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
          <Body style={{ paddingLeft: 0 }}>
            <Title style={styles.TitleStyle}>Top Customers</Title>
          </Body>
          <Right style={{ paddingLeft: 20 }}>
            {Platform.OS === "ios" ? this.IPhone_OS() : this.Android_OS()}
          </Right>
        </Header>
        {this.renderCashManagementData()}
      </View>
    );
  }
}

function mapStateToProps(state) {
  console.log("mapStateToProps in Dashboard => State ", state);
  return {
    topCutomersByRevenue: state.Dashboard.topCutomersByRevenue,
    topCustomersBySoldProduct: state.Dashboard.topCustomersBySoldProduct
  };
}

export default connect(mapStateToProps)(TopCustomers);

const styles = StyleSheet.create({
  icon: {
    color: "#5badf3",
    width: 30,
    height: 30
  },
  button: {
    paddingLeft: 15
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
    width: width / 2,
    fontFamily: "Montserrat",
    color: "#5badf3"
  },
  item: {
    width: width - 10,
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
    alignSelf: "center",
    width: width / 3,
    // padding: 2,
    fontSize: 15,
    color: "#dbdbdb",
    fontFamily: "Montserrat"
  }
});
