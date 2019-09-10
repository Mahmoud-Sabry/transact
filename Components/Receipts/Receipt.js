import React, {Component} from 'react';

import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
} from 'react-native';
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
  Text,
} from 'native-base';
import Barcode from 'react-native-barcode-builder';
import {connect} from 'react-redux';
import cashActions from '../../redux/Receipts/actions';
const {fetchSETTING} = cashActions;

var {height, width} = Dimensions.get('window');
class Receipt extends Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    this.state = {
      setting: null,
      loaded: false,
      item: navigation.getParam('item', 'NO-item'),
      barcode: navigation.getParam('barcode', 'NO-barcode'),
      decoded: navigation.getParam('decoded', 'NO-decoded'),
      cashier: navigation.getParam('cashier', 'NO-cashier'),
      issued_first: navigation.getParam('issued_first', 'NO-issued_first'),
      issued_last: navigation.getParam('issued_last', 'NO-issued_last'),
      createdAt: navigation.getParam('createdAt', 'NO-createdAt'),
      subTotal: navigation.getParam('subTotal', 999),
      items: navigation.getParam('items', 'NO-items'),
      status: navigation.getParam('status', 'NO-status'),
      //
      paymentMethod: {},
      cart: [],
      discount: 0,
      shipping: 0,
      tax: 0,
      finalPrice: 0,
      pCash: '',
      pCoupon: '',
      pCredit: '',
      Cash: '',
      Coupon: '',
      Credit: '',
      barcode: '',
      //
      ReceiptID: 0,
    };
    this.props.fetchSETTING();
  }
  // componentWillMount() {}

  calculate() {
    const {item} = this.state;
    var paymentMethod =
      item.paymentMethod == undefined ? {} : item.paymentMethod;
    var discount = item.cartTotal - item.discountedCartTotal;
    this.setState({
      paymentMethod: paymentMethod,
      cart: this.state.item.cart,
      discount: discount,
      shipping: item.shipping,
      tax: item.tax,
      finalPrice: item.finalPrice,
      pCash:
        item.paymentMethod !== undefined && item.paymentMethod.cash > 0
          ? item.paymentMethod.cash
          : -1,
      pCoupon:
        item.paymentMethod !== undefined && item.paymentMethod.coupon > 0
          ? item.paymentMethod.coupon
          : -1,
      pCredit:
        item.paymentMethod !== undefined &&
        item.paymentMethod.creditcardAmount > 0
          ? item.paymentMethod.creditcardAmount
          : -1,

      barcode: item.barcode,
    });
    console.log('calculate =>', this.state);
  }

  componentWillReceiveProps({setting}) {
    this.setState({
      setting,
      loaded: true,
    });
    this.calculate();
  }
  // format(number) {
  //   return Math.round(number * 100) / 100;
  // }

  rendercartData = () => {
    // alert('aaaa');
    const {cart} = this.state;
    var itemPrice = 0;
    var quantity = 0;
    var totPrice = 0;
    return cart.map(item => {
      itemPrice = item.pricing.sell;
      quantity = item.quantity;
      totPrice = itemPrice * quantity;
      var path = 'https://stagingbe.transacthq.com'.concat(
        item.product.img.slice(9),
      );

      return (
        <ListItem
          style={{paddingTop: 5, flexDirection: 'row'}}
          key={item._id}
          avatar>
          <Image
            style={styles.image}
            source={{
              uri: path,
            }}
          />
          <View style={{paddingLeft: 5, width: width / 3}}>
            <Text style={{fontSize: 10, fontFamily: 'Montserrat'}}>
              {item.product.title}
            </Text>
          </View>
          <View style={{width: width / 3, flexDirection: 'row'}}>
            <Text style={{paddingLeft: 20, fontFamily: 'Montserrat'}}>
              {quantity}
            </Text>
            <Text style={{paddingLeft: 35, fontFamily: 'Montserrat'}}>
              {itemPrice}
            </Text>
          </View>
          <View>
            <Text style={{fontFamily: 'Montserrat'}}>{totPrice}</Text>
          </View>
        </ListItem>
      );
    });
  };
  CustomNums(number) {
    return Math.round(number * 100) / 100;
  }

  render() {
    console.log('STATEINRENDER', this.state);

    var uri = 'https://stagingbe.transacthq.com'.concat(
      this.state.setting
        ? this.state.setting.normalPrinterSetting.logo.slice(9)
        : this.state.decoded.clientID.logo.slice(9),
    );
    if (this.state.setting == null)
      //!this.state.loaded &&
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
              <Button
                onPress={_ => [this.props.navigation.navigate('Receipts')]}
                transparent>
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
            // translucent={true}
          />
          <Left>
            <Button
              onPress={_ => [this.props.navigation.navigate('Receipts')]}
              transparent>
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
                uri: uri,
              }}
            />
            <Barcode value={this.state.barcode} format="CODE128" />
            <View
              style={{
                height: height / 6,
                backgroundColor: '#ffffff',
              }}>
              <View style={styles.row2}>
                <View style={styles.item2}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#caced1',
                      paddingLeft: 20,
                      paddingTop: 5,
                      fontFamily: 'Montserrat',
                    }}>
                    From
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      paddingLeft: 20,
                      paddingTop: 2,
                      fontFamily: 'Montserrat',
                    }}>
                    {this.state.decoded.clientID.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      paddingLeft: 20,
                      paddingTop: 2,
                      fontFamily: 'Montserrat',
                    }}>
                    {this.state.decoded.clientID.address}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      paddingLeft: 20,
                      paddingTop: 2,
                      fontFamily: 'Montserrat',
                    }}>
                    {this.state.decoded.clientID.phone}
                  </Text>
                </View>
                <View style={[styles.item2, {paddingLeft: 25}]}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#caced1',
                      // paddingLeft: 20,
                      paddingTop: 5,
                      fontFamily: 'Montserrat',
                    }}>
                    Details
                  </Text>
                  <Text style={{fontSize: 15, fontFamily: 'Montserrat'}}>
                    {this.state.createdAt}
                  </Text>
                  <Text style={{fontSize: 15, fontFamily: 'Montserrat'}}>
                    {this.state.cashier}
                    {this.state.issued_first} {this.state.issued_last}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: '#ffffff',
                // marginTop: 15,
              }}>
              <Text
                style={{
                  fontSize: 25,
                  textAlign: 'center',
                  fontFamily: 'Montserrat',
                }}>
                {this.state.setting.normalPrinterSetting.header}
              </Text>

              <ListItem avatar>
                <Left style={{width: width / 3}}>
                  <Text style={{fontFamily: 'Montserrat'}}>Item</Text>
                </Left>
                <Body style={{paddingLeft: 40, flexDirection: 'row'}}>
                  <Text style={{fontFamily: 'Montserrat'}}>Qty </Text>
                  <Text style={{fontFamily: 'Montserrat'}}> Price </Text>
                </Body>
                <Right>
                  <Text style={{fontFamily: 'Montserrat'}}> Total</Text>
                </Right>
              </ListItem>

              {this.rendercartData()}
              <View style={{paddingLeft: width / 2}}>
                <View style={styles.row}>
                  <Text style={styles.texts}>Subtotal</Text>
                  <Text
                    style={[styles.texts, {paddingLeft: 30, color: '#788eec'}]}>
                    {this.state.subTotal}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.texts}>Discount</Text>
                  <Text
                    style={[styles.texts, {paddingLeft: 30, color: '#788eec'}]}>
                    {this.state.discount}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.texts}>Shipping</Text>
                  <Text
                    style={[styles.texts, {paddingLeft: 30, color: '#788eec'}]}>
                    {this.state.shipping}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.texts}>Tax</Text>
                  <Text
                    style={[styles.texts, {paddingLeft: 30, color: '#788eec'}]}>
                    {this.state.tax}
                  </Text>
                </View>
                <View style={[styles.row]}>
                  <Text style={[styles.texts, {color: 'black', fontSize: 25}]}>
                    Total
                  </Text>
                  <Text
                    style={[
                      styles.texts,
                      {
                        color: 'black',
                        paddingTop: 5,
                        fontSize: 20,
                        paddingLeft: 30,
                        color: '#788eec',
                      },
                    ]}>
                    {this.CustomNums(this.state.item.finalPrice)}
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  fontSize: 20,
                  textAlign: 'left',
                  paddingLeft: 10,
                  fontFamily: 'Montserrat',
                }}>
                {this.state.pCash <= 0 &&
                this.state.pCredit <= 0 &&
                this.state.pCoupon <= 0
                  ? ''
                  : 'Payment Methods'}
              </Text>
              <Text style={styles.paymentMethods}>
                {this.state.pCash <= 0 ? '' : this.state.pCash}{' '}
                {this.state.pCash <= 0 ? '' : 'EGP Paid in Cash'}
              </Text>
              <Text style={styles.paymentMethods}>
                {this.state.pCredit <= 0 ? '' : this.state.pCredit}{' '}
                {this.state.pCredit <= 0 ? '' : 'EGP Paid by Credit'}
              </Text>
              <Text style={styles.paymentMethods}>
                {this.state.pCoupon <= 0 ? '' : this.state.pCoupon}{' '}
                {this.state.pCoupon <= 0 ? '' : 'EGP Paid by Cash'}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  textAlign: 'left',
                  paddingLeft: 10,
                  fontFamily: 'Montserrat',
                }}>
                {this.state.setting.normalPrinterSetting.note}
              </Text>
              <Text
                style={{
                  fontSize: 25,
                  textAlign: 'center',
                  fontFamily: 'Montserrat',
                }}>
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
  console.log('mReceiptProps Receipts => State ', state);
  return {
    setting: state.Receipts.setting,
  };
}

export default connect(
  mapStateToProps,
  {fetchSETTING},
)(Receipt);

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#f4f5f7',
  },
  paymentMethods: {
    fontSize: 15,
    textAlign: 'left',
    paddingLeft: 10,
    color: '#5badf3',
    fontFamily: 'Montserrat',
  },
  Container: {
    margin: 5,
    backgroundColor: '#ffffff',
  },
  image: {
    width: 50,
    height: 50,
    // borderRadius: 25,
  },
  image2: {
    width: width,
    height: 100,
    // borderRadius: 30,
    alignSelf: 'center',
  },
  Title: {
    fontFamily: 'Montserrat',
    height: height / 5,
    paddingLeft: 2,
    flexDirection: 'row',
  },
  HeaderStyle: {
    fontFamily: 'Montserrat',
    backgroundColor: 'white',
  },
  icon: {
    color: '#5badf3',
    width: 24,
    height: 24,
  },

  item: {
    width: width / 2 - 10,
    height: height / 9,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  item2: {
    width: width - 170,
  },
  row: {
    paddingLeft: 30,
    marginBottom: 5,
    flexDirection: 'row',
  },
  row2: {
    flexDirection: 'row',
  },
  texts: {
    width: width / 5,
    fontSize: 15,
    fontFamily: 'Montserrat',
  },
});
