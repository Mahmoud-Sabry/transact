import React, {Component} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
var {height, width} = Dimensions.get('window');
export default class Boxes extends Component {
  format(number) {
    return Math.round(number * 100) / 100;
  }
  render() {
    // console.log(' formatter ', formatter.format(this.props.cartValueAverage));
    return (
      <View>
        <View style={styles.rows}>
          <View style={styles.row}>
            <View style={styles.item}>
              <Text style={styles.texts}> Inventory Count </Text>
              <Text style={[styles.texts, {color: '#788eec'}]}>
                {' '}
                {this.props.inventoryCount}{' '}
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.texts}> Customer Count </Text>
              <Text style={[styles.texts, {color: '#788eec'}]}>
                {' '}
                {this.props.buyersCount}{' '}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.item}>
              <Text style={styles.texts}> Avg Cart Size </Text>
              <Text style={[styles.texts, {color: '#788eec'}]}>
                {' '}
                {this.format(this.props.cartSizeAverage)}{' '}
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.texts}> Avg Cart Value </Text>
              <Text style={[styles.texts, {color: '#788eec'}]}>
                {this.format(this.props.cartValueAverage)} EGP
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.item}>
              <Text style={styles.texts}> Discounts </Text>
              <Text style={[styles.texts, {color: '#788eec'}]}>
                {this.props.discount} EGP
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.texts}> GiftCards Issued</Text>
              <Text style={[styles.texts, {color: '#788eec'}]}>
                {' '}
                {this.props.couponSoldCount}{' '}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.item}>
              <Text style={styles.texts}> Unused GiftCards </Text>
              <Text style={[styles.texts, {color: '#788eec'}]}>
                {this.format(this.props.unusedCouponAmount)} EGP
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.texts}> Tax Collected </Text>
              <Text style={[styles.texts, {color: '#788eec'}]}>
                {this.format(this.props.taxCollected)} EGP
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  rows: {
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    width: width / 2 - 10,
    height: height / 9,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    margin: 3,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#eeeeee',
    // padding: 5,
  },
  texts: {
    alignSelf: 'center',
    width: width / 3,
    // padding: 2,
    fontSize: 15,
    color: '#dbdbdb',
    fontFamily: 'Montserrat',
  },
});
