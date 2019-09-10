import React, {Component} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  ImageBackground,
  StatusBar,
} from 'react-native';
import {connect} from 'react-redux';
import {formateDate, CustomNums} from '../helper';
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
  Spinner,
  Thumbnail,
  Toast,
} from 'native-base';
var {height, width} = Dimensions.get('window');
import cashActions from '../../redux/ShiftList/actions';
const {fetchCashiersShiftData, refresh} = cashActions;
class CashierShift extends Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    this.state = {
      data: [],
      refreshing: [],
      loaded: false,
      ShiftID: navigation.getParam('ShiftID', 'NO-ShiftID'),
      cahierName: navigation.getParam('cahierName', 'NO-cahierName'),
      cashierEntryBalance: navigation.getParam(
        'cashierEntryBalance',
        'NO-cashierEntryBalance',
      ),
      cashierCloseBalance: navigation.getParam(
        'cashierCloseBalance',
        'NO-cashierCloseBalance',
      ),
      cashierExpectedBalance: navigation.getParam(
        'cashierExpectedBalance',
        'NO-cashierExpectedBalance',
      ),
      logoutTime: navigation.getParam('logoutTime', 'NO-logoutTime'),
      loginTime: navigation.getParam('loginTime', 'NO-loginTime'),
      deficit: navigation.getParam('deficit', 'NO-deficit'),
      deficit_value: navigation.getParam('deficit_value', 'NO-deficit_value'),
      cashierShiftRevenue: navigation.getParam(
        'cashierShiftRevenue',
        'NO-cashierShiftRevenue',
      ),
      phone: navigation.getParam('phone', 'NO-phone'),
      loaded: false,
    };
    console.log('logayafestates', this.state);

    this.props.fetchCashiersShiftData(this.state.ShiftID);
  }
  componentWillReceiveProps(nextProps) {
    console.log('nextProps_in_cashier_shifts', nextProps);
    let {data, refreshing} = nextProps;

    this.setState({
      data,
      refreshing,
      loaded: true,
    });
  }
  _onRefresh = () => {
    this.props.refresh(true);
    this.props.fetchCashiersShiftData().then(() => {
      this.props.refresh(false);
    });
  };
  format(number) {
    return Math.round(number * 100) / 100;
  }

  renderShiftListData = () => {
    // alert('aaaa');

    console.log('sssssssssss', this.state);
    const {data} = this.state;
    return data.map((item, index) => {
      var count = 0;
      item.cart.forEach(element => {
        count += element.quantity;
      });
      var count_label = count > 1 ? 'items' : 'item';

      return (
        <ListItem
          onPress={_ =>
            this.props.navigation.navigate('ShiftReceipt', {
              item: data[index],
              goto: 'cashier',
            })
          }
          key={item._id}
          avatar>
          <Left></Left>
          <Body>
            <Text style={{fontFamily: 'Montserrat'}}>
              {item.finalPrice} EGP
            </Text>
            <Text style={{fontFamily: 'Montserrat'}} note>
              {count} {count_label}
            </Text>
          </Body>
          <Right>
            <Text style={{fontFamily: 'Montserrat'}} note>
              {formateDate(item.createdAt)}
            </Text>
          </Right>
        </ListItem>
      );
    });
  };
  render() {
    console.log('props23', this.props);
    if (!this.state.loaded)
      return (
        <View style={{flex: 1}}>
          <Header style={styles.HeaderStyle}>
            <StatusBar
              barStyle="dark-content"
              hidden={false}
              backgroundColor="white"
              // translucent={true}
            />
            <Left>
              <Button
                onPress={_ => [this.props.navigation.navigate('Cashiers')]}
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
              onPress={_ => [this.props.navigation.navigate('Cashiers')]}
              transparent>
              <Icon name="arrow-back" style={[styles.icon]} />
            </Button>
          </Left>
          <Body></Body>
        </Header>
        <View style={styles.Container}>
          <View style={styles.Title}>
            <Text style={{fontSize: 40, fontFamily: 'Montserrat'}}>
              {this.format(this.state.deficit_value)} EGP
            </Text>
            <Text style={{fontSize: 15, fontFamily: 'Montserrat'}}>
              Open Balance: {this.state.cashierEntryBalance}
            </Text>
            <Text style={{fontSize: 15, fontFamily: 'Montserrat'}}>
              Close Balance: {this.state.cashierCloseBalance}
            </Text>
            <Text style={{fontSize: 15, fontFamily: 'Montserrat'}}>
              Log in: {this.state.loginTime}
            </Text>
            <Text style={{fontSize: 15, fontFamily: 'Montserrat'}}>
              Log out: {this.state.logoutTime}
            </Text>
          </View>
          <View
            style={{
              height: height / 7,
              backgroundColor: '#ffffff',
              borderWidth: 0.5,
              borderColor: '#bbbec1',
            }}>
            <Text
              style={{
                fontSize: 15,
                color: '#caced1',
                paddingLeft: 20,
                paddingTop: 10,
                fontFamily: 'Montserrat',
              }}>
              Cashier Information
            </Text>
            <Text
              style={{
                fontSize: 15,
                paddingLeft: 20,
                paddingTop: 10,
                fontFamily: 'Montserrat',
              }}>
              Name: {this.state.cahierName}
            </Text>
            <Text
              style={{
                fontSize: 15,
                paddingLeft: 20,
                paddingTop: 10,
                fontFamily: 'Montserrat',
              }}>
              Phone: {this.state.phone}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#ffffff',
              //   borderWidth: 0.5,
              //   borderColor: '#bbbec1',
              marginTop: 15,
              //   paddingBottom: 100,
              //   marginBottom: 100,
              //   overflow: 'visible',
              //   justifyContent: 'center',
            }}>
            {/* // > */}
            <Text
              style={{
                fontSize: 15,
                color: '#caced1',
                paddingLeft: 20,
                paddingTop: 10,
                fontFamily: 'Montserrat',
              }}>
              Cashier Shift
            </Text>
            <View style={styles.row}>
              <View style={styles.item}>
                <Text style={styles.texts}>Shift Revenue</Text>
                <Text style={[styles.texts, {color: '#788eec'}]}>
                  {this.format(this.state.cashierShiftRevenue)} EGP
                </Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.texts}>Expected balace</Text>
                <Text style={[styles.texts, {color: '#788eec'}]}>
                  {this.format(this.state.cashierExpectedBalance)} EGP
                </Text>
              </View>
            </View>
            <Text
              style={{
                fontSize: 15,
                color: '#caced1',
                paddingLeft: 20,
                paddingTop: 10,
                fontFamily: 'Montserrat',
              }}>
              Shift Sales
            </Text>
            <ScrollView style={{height: height / 3 + 30}}>
              {this.renderShiftListData()}
            </ScrollView>
          </View>
        </View>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  console.log('CashierShift ', state);
  return {
    data: state.ShiftList.data,
    refreshing: state.ShiftList.refreshing,
  };
}

export default connect(
  mapStateToProps,
  {fetchCashiersShiftData, refresh},
)(CashierShift);

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#f4f5f7',
    paddingBottom: 30,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  Title: {
    fontFamily: 'Montserrat',
    height: height / 5,
    paddingLeft: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#f4f5f7',
    borderWidth: 0.5,
    borderColor: '#bbbec1',
  },
  HeaderStyle: {
    // marginTop: 5,
    // marginLeft: 8,
    // marginRight: 8,
    // borderRadius: 5,
    // borderBottomColor: 'black',
    fontFamily: 'Montserrat',
    backgroundColor: 'white',
    // color: 'black',
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
    margin: 3,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#eeeeee',
    // padding: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
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
