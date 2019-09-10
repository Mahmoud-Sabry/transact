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
class TopCustomers extends Component {
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
        Top Products{' '}
      </Text>
    ),
    drawerIcon: ({tintColor}) => (
      <Image
        source={require('../../Images/donut.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };
  constructor(props) {
    super(props);
    this.state = {
      chart: 'Selling',
      cashType: 'items',
      list: this.props.topSellingProduct,
      topSellingProduct: this.props.topSellingProduct,
      topGrossingProduct: this.props.topGrossingProduct,
    };
  }

  change(itemValue) {
    if (itemValue == 'Gross')
      this.setState({
        chart: itemValue,
        list: this.props.topGrossingProduct,
        cashType: 'EGP',
      });
    else if (itemValue == 'Selling')
      this.setState({
        chart: itemValue,
        list: this.props.topSellingProduct,
        cashType: 'items',
      });
  }
  renderCashManagementData = () => {
    console.log('renderCashManagementData => ', this.state.list);
    const {list} = this.state;

    return list.map(item => {
      console.log('list item', item);
      var cash = item.count == undefined ? item.profit : item.count;
      return (
        <View
          style={{
            paddingTop: 20,
            paddingLeft: 10,
            paddingBottom: 20,
            flexDirection: 'row',
            borderBottomColor: '#bbb',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat',
              flex: 2,
              fontSize: 20,
            }}>
            {item.product.title}{' '}
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
          <Body style={{paddingLeft: 0}}>
            <Title style={styles.TitleStyle}>Top Products</Title>
          </Body>
          <Right>
            <Picker
              selectedValue={this.state.chart}
              style={{height: 50, width: 125}}
              onValueChange={(itemValue, itemIndex) => this.change(itemValue)}>
              <Picker.Item label="Selling" value="Selling" />
              <Picker.Item label="Gross" value="Gross" />
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
    topSellingProduct: state.Dashboard.topSellingProduct,
    topGrossingProduct: state.Dashboard.topGrossingProduct,
  };
}

export default connect(mapStateToProps)(TopCustomers);

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
  button: {
    paddingLeft: 15,
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
});
