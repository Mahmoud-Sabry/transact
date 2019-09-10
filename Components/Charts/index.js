import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Text,
  StatusBar,
  Dimensions,
  StyleSheet,
  View,
  Image,
  Picker,
} from 'react-native';
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
  Spinner,
} from 'native-base';
var {height, width} = Dimensions.get('window');
import dashActions from '../../redux/Dashboard/actions';
const {fetchGraphsData} = dashActions;
class Charts extends Component {
  static navigationOptions = {
    drawerLabel: ({fontFamily}) => (
      <Text
        style={{
          paddingTop: 10,
          paddingBottom: 10,
          fontSize: 20,
          fontFamily: 'Montserrat',
        }}>
        {' '}
        Top Cashiers{' '}
      </Text>
    ),
    drawerIcon: ({tintColor}) => (
      <Image
        source={require('../../Images/tag.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };
  constructor(props) {
    super(props);
    this.state = {
      chart: 'Revenue',
      list: this.props.topSellingCashiersByRevenue,
      topSellingCashiersByRevenue: this.props.topSellingCashiersByRevenue,
      topSellingCashiersBySoldProducts: this.props
        .topSellingCashiersBySoldProducts,
      topSellingCashiersByGrossProfit: this.props
        .topSellingCashiersByGrossProfit,
      cashType: 'EGP',
      loaded: false,
    };
  }

  change(itemValue) {
    if (itemValue == 'Profit')
      this.setState({
        chart: itemValue,
        list: this.props.topSellingCashiersByGrossProfit,
        cashType: 'EGP',
      });
    else if (itemValue == 'Product')
      this.setState({
        chart: itemValue,
        list: this.props.topSellingCashiersBySoldProducts,
        cashType: 'items',
      });
    else if (itemValue == 'Revenue')
      this.setState({
        chart: itemValue,
        list: this.props.topSellingCashiersByRevenue,
        cashType: 'EGP',
      });
  }
  renderCashManagementData = () => {
    console.log('renderCashManagementData => ', this.state.list);
    const {list} = this.state;

    return list.map(item => {
      console.log('list item', item);
      var cash = item.cashierRevenue == undefined ? null : item.cashierRevenue;
      if (item.cashierRevenue != undefined) cash = item.cashierRevenue;
      else if (item.soldProducts != undefined) cash = item.soldProducts;
      else if (item.profit != undefined) cash = item.profit;
      return (
        <View
          style={{
            paddingLeft: 10,
            paddingTop: 20,
            paddingBottom: 20,
            flexDirection: 'row',
            borderBottomColor: '#bbb',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}>
          <Text style={{flex: 2, fontFamily: 'Montserrat', fontSize: 20}}>
            {item.cashier.name}{' '}
          </Text>
          <Text
            style={{
              flex: 1,
              fontFamily: 'Montserrat',
              fontSize: 20,
              color: '#5badf3',
            }}>
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
          <Body style={{paddingLeft: width / 8}}>
            <Title style={styles.TitleStyle}>Top Cashiers</Title>
          </Body>
          <Right>
            <Picker
              selectedValue={this.state.chart}
              style={{fontFamily: 'Montserrat', height: 50, width: 125}}
              onValueChange={(itemValue, itemIndex) => this.change(itemValue)}>
              <Picker.Item label="Revenue" value="Revenue" />
              <Picker.Item label="Profit" value="Profit" />
              <Picker.Item label="Product" value="Product" />
            </Picker>
          </Right>
        </Header>
        {this.renderCashManagementData()}
      </View>
    );
  }
}

function mapStateToProps(state) {
  console.log('mapStateToProps in Dashboard => State ', state);
  return {
    topSellingCashiersByRevenue: state.Dashboard.topSellingCashiersByRevenue,
    topSellingCashiersBySoldProducts:
      state.Dashboard.topSellingCashiersBySoldProducts,
    topSellingCashiersByGrossProfit:
      state.Dashboard.topSellingCashiersByGrossProfit,
  };
}

export default connect(
  mapStateToProps,
  //   {fetchGraphsData},
)(Charts);

const styles = StyleSheet.create({
  icon: {
    color: '#5badf3',
    width: 24,
    height: 24,
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
  TitleStyle: {
    fontFamily: 'Montserrat',
    color: '#5badf3',
  },
  item: {
    width: width - 10,
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
  button: {
    paddingLeft: 15,
  },
});
