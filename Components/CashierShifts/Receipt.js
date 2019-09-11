import React, { Component } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
  StatusBar
} from "react-native";
import {
  ListItem,
  Container,
  Header,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Spinner,
  Text
} from "native-base";
import Barcode from "react-native-barcode-builder";
import ReceiptActions from "../../redux/ShiftReceipt/actions";
import { formateDate } from "../helper";
const { fetchDecoded, fetchSETTING } = ReceiptActions;
import { connect } from "react-redux";
var { height, width } = Dimensions.get("window");
class Receipt extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.getinfo();
    this.state = {
      item: navigation.getParam("item", "NO-item"),
      goto: navigation.getParam("goto", "Cashier"),
      decoded: this.props.decoded,
      setting: this.props.setting,
      loaded: false
    };
    console.log("State __=> ", this.state);
  }

  async getinfo() {
    await this.props.fetchSETTING();
    await this.props.fetchDecoded();
  }
  componentWillReceiveProps({ setting, decoded }) {
    this.setState({
      setting,
      decoded,
      loaded: true
    });
  }

  rendercartData = () => {
    console.log("agaaaaaaa ", this.state.item.cart);

    const cart = this.state.item.cart;
    var itemPrice = 0;
    var quantity = 0;
    var totPrice = 0;
    var path = "";
    return cart.map(item => {
      itemPrice = item.pricing.sell;
      quantity = item.quantity;
      totPrice = itemPrice * quantity;
      path = "https://stagingbe.transacthq.com".concat(
        item.product.img.slice(9)
      );

      return (
        <ListItem
          style={{ paddingTop: 5, flexDirection: "row" }}
          key={item._id}
          avatar
        >
          <Image
            style={styles.image}
            source={{
              uri: path
            }}
          />
          <View style={{ width: width / 3 }}>
            <Text style={{ fontFamily: "Montserrat" }}>
              {item.product.title}
            </Text>
          </View>
          <View style={{ width: width / 3, flexDirection: "row" }}>
            <Text style={{ paddingLeft: 20, fontFamily: "Montserrat" }}>
              {quantity}
            </Text>
            <Text style={{ paddingLeft: 35, fontFamily: "Montserrat" }}>
              {itemPrice}
            </Text>
          </View>
          <View>
            <Text style={{ fontFamily: "Montserrat" }}>{totPrice}</Text>
          </View>
        </ListItem>
      );
    });
  };
  CustomNums(number) {
    return Math.round(number * 100) / 100;
  }

  render() {
    console.log("State in Receipt aaa", this.state);
    // var uri =
    //   'https://stagingbe.transacthq.com/uploads/clientLogo/logo-5c6ac2fa8a81f91712096c11.jpeg';
    var uri = "https://stagingbe.transacthq.com".concat(
      this.state.setting
        ? this.state.setting.normalPrinterSetting.logo.slice(9)
        : "/uploads/clientLogo/logo-5c6ac2fa8a81f91712096c11.jpeg"
    );
    if (!(this.state.setting != null && this.state.decoded != null))
      return (
        <View>
          <Header style={styles.HeaderStyle}>
            <StatusBar
              barStyle="dark-content"
              hidden={false}
              backgroundColor="white"
            />
            <Left>
              <Button
                onPress={_ => [this.props.navigation.navigate(this.state.goto)]}
                transparent
              >
                <Icon name="arrow-back" style={[styles.icon]} />
              </Button>
            </Left>
            <Body></Body>
          </Header>
          <Spinner color="blue" />
        </View>
      );
    return (
      <Container>
        <Header style={styles.HeaderStyle}>
          <StatusBar
            barStyle="dark-content"
            hidden={false}
            backgroundColor="white"
          />
          <Left>
            <Button
              onPress={_ => [this.props.navigation.navigate(this.state.goto)]}
              transparent
            >
              <Icon name="arrow-back" style={[styles.icon]} />
            </Button>
          </Left>
          <Body></Body>
        </Header>
        <View style={styles.parent}>
          <ScrollView style={styles.Container}>
            <Image
              style={[styles.image2]}
              source={{
                uri: uri
              }}
            />
            <Barcode value={this.state.item.barcode} format="CODE128" />
            <View>
              <View style={styles.row2}>
                <View
                  style={[
                    styles.item2,
                    {
                      paddingLeft: 10
                    }
                  ]}
                >
                  <Text
                    style={[
                      styles.fromTexts,
                      {
                        color: "#caced1",
                        paddingTop: 5
                      }
                    ]}
                  >
                    From
                  </Text>
                  <Text style={styles.fromTexts}>
                    {this.state.decoded.clientID.name}
                  </Text>
                  <Text style={styles.fromTexts}>
                    {this.state.decoded.clientID.address}
                  </Text>
                  <Text style={styles.fromTexts}>
                    {this.state.decoded.clientID.phone}
                  </Text>
                </View>
                <View style={[styles.item2, { paddingLeft: 25 }]}>
                  <Text
                    style={[
                      styles.fromTexts,
                      {
                        color: "#caced1"
                      }
                    ]}
                  >
                    Details
                  </Text>
                  <Text style={{ fontSize: 15, fontFamily: "Montserrat" }}>
                    {formateDate(this.state.item.createdAt)}
                  </Text>
                  <Text style={{ fontSize: 15, fontFamily: "Montserrat" }}>
                    {this.state.item.cashier
                      ? this.state.item.cashier.name
                      : ""}
                    {this.state.item.clientAdmin
                      ? this.state.item.clientAdmin.firstName
                      : ""}{" "}
                    {this.state.item.clientAdmin
                      ? this.state.item.clientAdmin.lastName
                      : ""}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: "#ffffff"
                // marginTop: 15,
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  textAlign: "center",
                  fontFamily: "Montserrat"
                }}
              >
                {this.state.setting.normalPrinterSetting.header}
              </Text>

              <ListItem avatar>
                <Left style={{ width: width / 3 }}>
                  <Text style={{ fontFamily: "Montserrat" }}>Item</Text>
                </Left>
                <Body style={{ paddingLeft: 40, flexDirection: "row" }}>
                  <Text style={{ fontFamily: "Montserrat" }}>Qty </Text>
                  <Text style={{ fontFamily: "Montserrat" }}> Price </Text>
                </Body>
                <Right>
                  <Text style={{ fontFamily: "Montserrat" }}> Total</Text>
                </Right>
              </ListItem>

              {this.rendercartData()}
              <View style={{ paddingLeft: width / 2 }}>
                <View style={styles.row}>
                  <Text style={styles.texts}>Subtotal</Text>
                  <Text
                    style={[
                      styles.texts,
                      { paddingLeft: 30, color: "#788eec" }
                    ]}
                  >
                    {this.state.item.discountedCartTotal}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.texts}>Discount</Text>
                  <Text
                    style={[
                      styles.texts,
                      { paddingLeft: 30, color: "#788eec" }
                    ]}
                  >
                    {this.state.item.cartTotal -
                      this.state.item.discountedCartTotal}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.texts}>Shipping</Text>
                  <Text
                    style={[
                      styles.texts,
                      { paddingLeft: 30, color: "#788eec" }
                    ]}
                  >
                    {this.state.item.shipping}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.texts}>Tax</Text>
                  <Text
                    style={[
                      styles.texts,
                      { paddingLeft: 30, color: "#788eec" }
                    ]}
                  >
                    {this.state.item.tax}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.texts}>Service Tax</Text>
                  <Text
                    style={[
                      styles.texts,
                      { paddingLeft: 30, color: "#788eec" }
                    ]}
                  >
                    {this.state.item.serviceTax}
                  </Text>
                </View>
                <View style={[styles.row]}>
                  <Text
                    style={[styles.texts, { color: "black", fontSize: 25 }]}
                  >
                    Total
                  </Text>
                  <Text
                    style={[
                      styles.texts,
                      {
                        color: "black",
                        fontSize: 20,
                        paddingLeft: 30,
                        paddingTop: 5,
                        color: "#788eec"
                      }
                    ]}
                  >
                    {this.CustomNums(this.state.item.finalPrice)}
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  fontSize: 20,
                  textAlign: "left",
                  paddingLeft: 10,
                  fontFamily: "Montserrat"
                }}
              >
                {this.state.item.paymentMethod != undefined &&
                (this.state.item.paymentMethod.cash > 0 ||
                  this.state.item.paymentMethod.coupon > 0)
                  ? "Payment Methods"
                  : ""}
              </Text>
              <Text style={styles.paymentMethods}>
                {this.state.item.paymentMethod != undefined &&
                this.state.item.paymentMethod.cash > 0
                  ? this.state.item.paymentMethod.cash
                  : ""}{" "}
                {this.state.item.paymentMethod != undefined &&
                this.state.item.paymentMethod.cash > 0
                  ? "EGP Paid in Cash"
                  : ""}
              </Text>
              <Text style={styles.paymentMethods}>
                {this.state.item.paymentMethod != undefined &&
                this.state.item.paymentMethod.coupon > 0
                  ? this.state.item.paymentMethod.coupon
                  : ""}{" "}
                {this.state.item.paymentMethod != undefined &&
                this.state.item.paymentMethod.coupon > 0
                  ? "EGP Paid by coupon"
                  : ""}
              </Text>
              <Text style={styles.paymentMethods}>
                {this.state.item.paymentMethod != undefined &&
                this.state.item.paymentMethod.creditcardAmount > 0
                  ? this.state.item.paymentMethod.creditcardAmount
                  : ""}{" "}
                {this.state.item.paymentMethod != undefined &&
                this.state.item.paymentMethod.creditcardAmount > 0
                  ? "EGP Paid by Credit"
                  : ""}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  textAlign: "left",
                  paddingLeft: 10,
                  fontFamily: "Montserrat"
                }}
              >
                {this.state.setting.normalPrinterSetting.note}
              </Text>
              <Text
                style={{
                  fontSize: 25,
                  textAlign: "center",
                  fontFamily: "Montserrat"
                }}
              >
                {this.state.setting.normalPrinterSetting.footer}
              </Text>
            </View>
          </ScrollView>
        </View>
      </Container>
    );
  }
}
function mapStateToProps(state) {
  console.log("Cashier Shift Receipts  => State ", state);
  return {
    decoded: state.ShiftReceipt.decoded,
    setting: state.ShiftReceipt.setting
  };
}

export default connect(
  mapStateToProps,
  { fetchDecoded, fetchSETTING }
)(Receipt);

const styles = StyleSheet.create({
  fromTexts: {
    fontSize: 15,
    // paddingLeft: 20,
    paddingTop: 2,
    fontFamily: "Montserrat"
  },
  parent: {
    flex: 1,
    backgroundColor: "#f4f5f7"
  },
  paymentMethods: {
    fontSize: 15,
    textAlign: "left",
    paddingLeft: 10,
    color: "#5badf3",
    fontFamily: "Montserrat"
  },
  Container: {
    // margin: 5,
    paddingBottom: Platform.OS === "ios" ? 15 : 5,
    backgroundColor: "#ffffff"
  },
  image: {
    width: 50,
    height: 50
    // borderRadius: 25,
  },
  image2: {
    width: width - 10,
    height: 100,
    // borderRadius: 30,
    alignSelf: "center"
  },
  Title: {
    fontFamily: "Montserrat",
    height: height / 5,
    paddingLeft: 2,
    flexDirection: "row"
  },
  HeaderStyle: {
    fontFamily: "Montserrat",
    backgroundColor: "white"
  },
  icon: {
    color: "#5badf3",
    width: 30,
    height: 30
  },

  item: {
    width: width / 2 - 10,
    height: height / 9,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "white"
  },
  item2: {
    width: width - 170
  },
  row: {
    paddingLeft: 30,
    marginBottom: 5,
    flexDirection: "row"
  },
  row2: {
    flexDirection: "row"
  },
  texts: {
    width: width / 5,
    fontSize: 15,
    fontFamily: "Montserrat"
  }
});
