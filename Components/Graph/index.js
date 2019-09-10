import React, {Component} from 'react';
import {StyleSheet, View, Text, Dimensions, Button} from 'react-native';
// import {Dimensions} from 'react-native';
var {height, width} = Dimensions.get('window');
import {connect} from 'react-redux';
import dashActions from '../../redux/Dashboard/actions';
const {fetchGraphsData} = dashActions;
import {
  Container,
  Header,
  Spinner,
  Tab,
  Tabs,
  TabHeading,
  Icon,
} from 'native-base';
import {LineChart} from 'react-native-chart-kit';
// import console = require('console');
export default class Graphs extends Component {
  constructor(props) {
    super(props);
  }

  renderData = array => {
    // console.log("")
    if (array.length >= 1) {
      return (
        <LineChart
          data={{
            labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat'],
            datasets: [
              {
                data: array,
              },
            ],
          }}
          width={Dimensions.get('window').width - 50} // from react-native
          height={220}
          //   yAxisLabel={' '}
          chartConfig={{
            backgroundColor: '#3068cc', //#651f9a      #e26a00
            backgroundGradientFrom: '#3068cc',
            backgroundGradientTo: '#3068cc',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 10,
            },
          }}
          bezier
          style={{
            margin: 10,
            borderRadius: 10,
          }}
        />
      );
    } else return [];
  };
  render() {
    // if (!this.state.loaded)
    //   return (
    //     <View>
    //       <Spinner color="blue" />
    //     </View>
    //   );
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.graph}>
          <Text style={styles.text}>{this.props.label}</Text>
          <Text style={styles.text2}>
            {this.props.data_count} {this.props.data_count_label}
          </Text>
          {this.renderData(this.props.data)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    alignSelf: 'center',
    fontSize: 15,
    fontFamily: 'Montserrat',
  },
  text2: {
    alignSelf: 'center',
    fontSize: 25,
    fontFamily: 'Montserrat',
  },
  graph: {
    width: width - 10,
    // height: height / 9,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#3068cc',
    margin: 3,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#eeeeee',
  },
});
