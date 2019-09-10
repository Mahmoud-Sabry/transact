import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
var {height, width} = Dimensions.get('window');
import {formateDate, CustomNums} from '../helper';
export default class ReceiptsItem extends Component {
  renderReceiptsItem() {
    console.log('ReceiptItemProps', this.props);

    const {item} = this.props;
    let cashier = '';
    let issued_first = 0;
    let issued_last = 0;
    let createdAt = '';
    let totalPrice = 0;
    let items = 0;
    let status;
    let statusColor;
    cashier = item.cashier == undefined ? '' : item.cashier.name;
    issued_first = cashier == '' ? item.clientAdmin.firstName : '';
    issued_last = issued_first == '' ? '' : item.clientAdmin.lastName;
    createdAt = item.createdAt;
    totalPrice = item.cartTotal;
    let subTotal = item.discountedCartTotal;
    console.log('ReceiptNums', item, subTotal);

    items = 0;
    item.cart.forEach(element => {
      items += element.quantity;
    });
    status = item.status == undefined ? 'No status' : item.status.name;
    statusColor = item.status == undefined ? 'gray' : item.status.color;
    return (
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={_ => [
          this.props.navigation.navigate('Receipt', {
            item: item,
            goto: 'Receipts',
          }),
        ]}
        key={item._id}>
        <View style={styles.row_Left}>
          <TouchableOpacity
            style={[styles.status_button, {backgroundColor: statusColor}]}>
            <Text style={styles.status_text}>{status}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row_Body}>
          <Text style={{fontFamily: 'Montserrat'}}>{totalPrice} EGP</Text>
          <Text style={{fontFamily: 'Montserrat'}}>{items}</Text>
        </View>
        <View style={styles.row_Right}>
          <Text style={{fontSize: 13, color: 'gray', fontFamily: 'Montserrat'}}>
            {cashier}
            {issued_first} {issued_last}
          </Text>
          <Text style={{fontSize: 13, color: 'gray', fontFamily: 'Montserrat'}}>
            {formateDate(createdAt)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  render() {
    return <View>{this.renderReceiptsItem()}</View>;
  }
}

const styles = StyleSheet.create({
  row_Right: {
    flex: 1,
  },
  row_Left: {
    flex: 1,
  },
  row_Body: {
    flex: 1,
    paddingTop: 4,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  touchableOpacity: {
    padding: 5,
    flexDirection: 'row',
  },
  icon: {
    color: '#5badf3',
    width: 24,
    height: 24,
  },
  pics: {
    width: 30,
    height: 30,
  },
  HeaderStyle: {
    fontFamily: 'Montserrat',
    backgroundColor: 'white',
  },
  TitleStyle: {
    color: '#5badf3',
    fontFamily: 'Montserrat',
  },
  status_button: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: width / 4,
    fontSize: 10,
    height: 50,
    borderRadius: 10,
    fontFamily: 'Montserrat',
    backgroundColor: 'gray',
  },
  status_text: {
    fontSize: 10,
    fontFamily: 'Montserrat',
  },
});
