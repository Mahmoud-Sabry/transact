import React, { Component } from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  RefreshControl,
  StatusBar,
  Dimensions,
  Text,
  Platform,
  FlatList,
  TouchableOpacity
} from "react-native";
import ReceiptsItem from "./ReceiptsItem";
import ReceiptsActions from "../../redux/Receipts/actions";
const { fetchReceiptsData, refresh } = ReceiptsActions;
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
  Button,
  Spinner
} from "native-base";
import { connect } from "react-redux";
class Receipts extends Component {
  constructor(props) {
    super(props);
    this.viewabilityConfig = {
      waitForInteraction: true,
      viewAreaCoveragePercentThreshold: 95
    };
    this.state = {
      data: [],
      refreshing: false,
      Receipt: {},
      decoded: {},
      loaded: false,
      tempData: []
    };
    this.props.fetchReceiptsData();
  }
  componentWillReceiveProps({ data, decoded, Receipt, refreshing }) {
    this.setState({
      data,
      Receipt,
      refreshing,
      decoded,
      loaded: true
    });
  }
  _onRefresh = () => {
    this.props.refresh(true);
    this.props.fetchReceiptsData().then(() => {
      this.props.refresh(false);
    });
  };

  renderReceiptsData = ({ item }) => {
    // console.log("renderReceiptsData => ", this.state.data);
    return <ReceiptsItem navigation={this.props.navigation} item={item} />;
  };

  keyExtractor = (item, index) => item.id;

  render() {
    console.log("Receipts Props", this.props);
    if (this.props.data.length <= 0)
      return (
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
              <Title style={styles.TitleStyle}>Receipts</Title>
            </Body>
            {Platform.OS === "ios" ? <Right></Right> : []}
          </Header>

          <Spinner color="blue" />
        </View>
      );
    return (
      // <Root>
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
            <Title style={styles.TitleStyle}>Receipts</Title>
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
            data={this.props.data}
            renderItem={this.renderReceiptsData}
            viewabilityConfig={this.viewabilityConfig}
          />
        </ScrollView>
      </View>
      // </Root>
    );
  }
}

function mapStateToProps(state) {
  console.log("mapStateToProps Receipts => State ", state);
  return {
    data: state.Receipts.data,
    refreshing: state.Receipts.refreshing,
    Receipt: state.Receipts.Receipt,
    decoded: state.Receipts.decoded
  };
}

export default connect(
  mapStateToProps,
  { fetchReceiptsData, refresh }
)(Receipts);

const styles = StyleSheet.create({
  row_Right: {
    flex: 1
  },
  row_Left: {
    flex: 1
  },
  row_Body: {
    flex: 1,
    paddingTop: 4
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  touchableOpacity: {
    padding: 5,
    flexDirection: "row"
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
    fontFamily: "Montserrat"
  },
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
  status_text: {
    fontSize: 10,
    fontFamily: "Montserrat"
  }
});
