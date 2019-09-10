import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  RefreshControl,
  StatusBar,
  FlatList,
} from 'react-native';
import cashActions from '../../redux/cashManagement/actions';
const {fetchData, refresh} = cashActions;
import {formateDate} from '../helper';
import {
  ListItem,
  Header,
  Title,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Spinner,
  Thumbnail,
} from 'native-base';
import red from '../../Images/red.png';
import green from '../../Images/green.png';
import {connect} from 'react-redux';
class CashManagement extends Component {
  static navigationOptions = {
    drawerLabel: ({fontFamily}) => (
      <Text style={{fontFamily: fontFamily}}> Cash Management </Text>
    ),
    drawerIcon: ({tintColor}) => (
      <Image
        source={require('../../Images/note.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  constructor(props) {
    super(props);
    this.viewabilityConfig = {
      waitForInteraction: true,
      viewAreaCoveragePercentThreshold: 95,
    };
    this.state = {
      data: [],
      isModalVisible: false,
      refreshing: false,
      comment: '',
      loaded: false,
    };
    this.props.fetchData();
  }
  componentWillReceiveProps({data, isModalVisible, refreshing, comment}) {
    this.setState({
      data,
      isModalVisible,
      refreshing,
      comment,
      loaded: true,
    });
  }
  _onRefresh = () => {
    this.props.refresh(true);
    this.props.fetchData().then(() => {
      this.props.refresh(false);
    });
  };

  renderCashManagementData = ({item}) => {
    // console.log('renderCashManagementData => ', this.state.data);
    // const {data} = this.state;

    // return data.map(item => {
    //   console.log('Naame10', item);

    var cash = item.cashIn == undefined ? green : red;
    var cash_amount = item.cashIn == undefined ? item.cashOut : item.cashIn;
    return (
      <ListItem
        onPress={_ => [
          this.props.navigation.navigate('Comment', {
            cash: cash_amount,
            cashType: item.cashIn == undefined ? 'CashOut' : 'CashIn',
            created: formateDate(item.createdAt),
            name: item.cashier.name,
            comment: item.comment,
          }),
        ]}
        key={item._id}
        avatar>
        <Left>
          <Thumbnail style={styles.pics} source={cash} />
        </Left>
        <Body>
          <Text style={{fontFamily: 'Montserrat'}}>{cash_amount} EGP</Text>
          <Text style={{fontFamily: 'Montserrat'}} note>
            {formateDate(item.createdAt)}
          </Text>
        </Body>
        <Right>
          <Text style={{fontFamily: 'Montserrat'}} note>
            {item.cashier.name}{' '}
          </Text>
        </Right>
      </ListItem>
    );
    // });
  };
  keyExtractor = (item, index) => item.id;

  render() {
    console.log('props1', this.props);
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
              <Button transparent>
                <Icon
                  style={styles.icon}
                  name="menu"
                  onPress={() => this.props.navi.navigation.openDrawer()}
                />
              </Button>
            </Left>
            <Body>
              <Title style={styles.TitleStyle}>Cash Management</Title>
            </Body>
          </Header>

          <Spinner color="blue" />
        </View>
      );
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
            <Button transparent>
              <Icon
                style={styles.icon}
                name="menu"
                onPress={() => this.props.navigation.openDrawer()}
              />
            </Button>
          </Left>
          <Body>
            <Title style={styles.TitleStyle}>Cash Management</Title>
          </Body>
        </Header>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.props.data}
            renderItem={this.renderCashManagementData}
          />
          {/* {this.renderCashManagementData()} */}
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  console.log('mapStateToProps => State ', state);
  return {
    data: state.CashManagement.data,
    isModalVisible: state.CashManagement.isModalVisible,
    refreshing: state.CashManagement.refreshing,
    comment: state.CashManagement.comment,
  };
}

export default connect(
  mapStateToProps,
  {fetchData, refresh},
)(CashManagement);

const styles = StyleSheet.create({
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
    color: '#5badf3',
    fontFamily: 'Montserrat',
  },
});
