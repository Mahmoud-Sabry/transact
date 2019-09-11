import React, { Component } from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  RefreshControl,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Platform,
  FlatList
} from "react-native";
import cashActions from "../../redux/CashierShifts/actions";
const { fetchCashiersData, refresh } = cashActions;
var { height, width } = Dimensions.get("window");
import { formateDate, CustomNums } from "../helper";
import {
  ListItem,
  Header,
  Title,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Spinner,
  Thumbnail,
  Button,
  Toast,
  Root
} from "native-base";
import { connect } from "react-redux";
class CashierShifts extends Component {
  constructor(props) {
    super(props);
    this.viewabilityConfig = {
      waitForInteraction: true,
      viewAreaCoveragePercentThreshold: 95
    };
    this.state = {
      data: [],
      refreshing: false,
      cahierShift: {},
      loaded: false
    };
    this.props.fetchCashiersData();
  }
  componentWillReceiveProps({ data, cahierShift, refreshing }) {
    this.setState({
      data,
      cahierShift,
      refreshing,
      loaded: true
    });
  }
  _onRefresh = () => {
    this.props.refresh(true);
    this.props.fetchCashiersData().then(() => {
      this.props.refresh(false);
    });
  };

  keyExtractor = (item, index) => item.id;
  renderItem = ({ item }) => {
    console.log("renderItem = ({item})", item);

    var cashierEntryBalance =
      item.cashierEntryBalance == undefined ? 0 : item.cashierEntryBalance;
    var cashierCloseBalance =
      item.cashierCloseBalance == undefined
        ? "Not Saved"
        : item.cashierCloseBalance;
    var cashierExpectedBalance =
      item.cashierExpectedBalance == undefined
        ? "Still Logged in"
        : item.cashierExpectedBalance;
    var logoutTime =
      item.logoutTime == undefined ? "Still Logged in" : item.logoutTime;

    var deficit = item.deficit == undefined ? "white" : -1;
    var deficit_value = item.deficit == undefined ? "--" : item.deficit;
    if (deficit == -1) {
      deficit = item.deficit == 0 ? "#f6ffed" : -1;
      if (deficit == -1) deficit = item.deficit > 0 ? "#fff1f0" : "#f0f5ff";
    }
    var deficit_button = { color: "white", text: "0", onPress: () => {} };
    if (deficit_value == 0) {
      deficit_button.color = "#00d084";
      deficit_button.text = "0 EGP";
      deficit_button.onPress = null;
    } else if (deficit_value > 0) {
      deficit_button.color = "#eb144c";
      deficit_button.text = CustomNums(deficit_value) + " EGP";
      deficit_button.onPress = () =>
        Toast.show({
          text: "Cashier should return this amount",
          buttonText: "Okay",
          duration: 4000,
          type: "danger"
        });
    } else if (deficit_value < 0) {
      deficit_button.color = "#0693e3";
      deficit_button.text = CustomNums(deficit_value) + " EGP";
      deficit_button.onPress = () =>
        Toast.show({
          text: "Cashier should return this amount",
          buttonText: "Okay",
          duration: 4000,
          type: "warning"
        });
    } else {
      deficit_button.color = "gray";
      deficit_button.text = CustomNums(deficit_value) + " EGP";
      deficit_button.onPress = null;
    }
    var closeBalanceLabel = cashierCloseBalance == "Not Saved" ? " " : "EGP";
    return (
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={_ => [
          this.props.navigation.navigate("cashier", {
            ShiftID: item._id,
            cahierName: item.cashier.name,
            phone: item.cashier.phone,
            cashierEntryBalance: cashierEntryBalance,
            cashierCloseBalance: cashierCloseBalance,
            cashierExpectedBalance: cashierExpectedBalance,
            logoutTime:
              logoutTime == "Still Logged in"
                ? "Still Logged in"
                : formateDate(logoutTime),
            loginTime: formateDate(item.loginTime),
            deficit: deficit,
            deficit_value: deficit_value,
            cashierShiftRevenue:
              item.cashierShiftRevenue == undefined
                ? "0.00"
                : item.cashierShiftRevenue
          })
        ]}
        key={item._id}
      >
        <View style={styles.row_Left}>
          <TouchableOpacity
            style={[
              styles.status_button,
              { backgroundColor: deficit_button.color }
            ]}
            onPress={deficit_button.onPress}
          >
            <Text style={styles.deficit_Button_Text}>
              {" "}
              {deficit_button.text}{" "}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row_Body}>
          <Text style={{ fontFamily: "Montserrat" }}>
            {cashierEntryBalance} EGP
          </Text>
          <Text
            style={{ fontSize: 13, color: "gray", fontFamily: "Montserrat" }}
          >
            {cashierCloseBalance} {closeBalanceLabel}
          </Text>
        </View>
        <View style={styles.row_Right}>
          <Text
            style={{
              paddingTop: 5,
              fontSize: 13,
              color: "gray",
              fontFamily: "Montserrat"
            }}
          >
            {item.cashier.name}{" "}
          </Text>
          <Text
            style={{ fontSize: 13, color: "gray", fontFamily: "Montserrat" }}
          >
            {formateDate(item.loginTime)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    console.log("props21321", this.props);
    if (this.state.data.length <= 0) {
      console.log("in_cond", this.state.data);

      return (
        <Root>
          <View style={{ flex: 1 }}>
            <Header style={styles.HeaderStyle}>
              <StatusBar
                barStyle="dark-content"
                hidden={false}
                backgroundColor="white"
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
                <Title style={styles.TitleStyle}>Cashier Shifts</Title>
              </Body>
              {Platform.OS === "ios" ? <Right></Right> : []}
            </Header>

            <Spinner color="blue" />
          </View>
        </Root>
      );
    }

    return (
      <Root>
        <View style={{ flex: 1 }}>
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
              <Title style={styles.TitleStyle}>Cashier Shifts</Title>
            </Body>
            {Platform.OS === "ios" ? <Right></Right> : []}
          </Header>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
          >
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.props.data.data}
              renderItem={this.renderItem}
              viewabilityConfig={this.viewabilityConfig}
            />
          </ScrollView>
        </View>
      </Root>
    );
  }
}

function mapStateToProps(state) {
  console.log("mapStateToProps CashierShifts => State ", state);
  return {
    data: state.CashierShifts.data,
    refreshing: state.CashierShifts.refreshing,
    cahierShift: state.CashierShifts.cahierShift
  };
}

export default connect(
  mapStateToProps,
  { fetchCashiersData, refresh }
)(CashierShifts);

const styles = StyleSheet.create({
  status_button: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: width / 4,
    fontSize: 10,
    height: 50,
    borderRadius: 10,
    fontFamily: "Montserrat",
    backgroundColor: "gray"
  },
  row_Right: {
    flex: 1
  },
  row_Left: {
    flex: 1
  },
  row_Body: {
    flex: 1,
    paddingTop: 4
  },
  touchableOpacity: {
    padding: 5,
    flexDirection: "row"
  },
  deficit_Button_Text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 11,
    fontFamily: "Montserrat"
  },
  icon: {
    color: "#5badf3",
    width: 30,
    height: 30
  },
  pics: {
    width: 30,
    height: 30
  },
  HeaderStyle: {
    fontFamily: "Montserrat",
    backgroundColor: "white"
  },
  TitleStyle: {
    color: "#5badf3",
    fontFamily: "Montserrat",
    textAlign: "center"
  },
  deficit_Button: {
    height: 45,
    justifyContent: "center",
    width: width / 4,
    borderRadius: 10
  }
});
