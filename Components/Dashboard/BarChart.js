import React, {Component} from 'react';
import {StyleSheet, View, Text, Dimensions, Button} from 'react-native';
var {height, width} = Dimensions.get('window');
import {
  Container,
  Header,
  Spinner,
  Tab,
  Tabs,
  TabHeading,
  Icon,
} from 'native-base';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
// import console = require('console');
export default class Barchart extends Component {
  constructor(props) {
    super(props);
  }

  renderData() {
    let array = this.props.data;
    let chart_data = [];
    let labels = [];
    let data = [];
    if (array.length >= 1) {
      array.forEach(item => {
        console.log('item =>', item);
        labels.push(item.cashier.name);
        data.push(item.cashierRevenue);
      });
      chart_data = {
        labels: labels,
        datasets: [
          {
            data: data,
          },
        ],
      };
      return (
        <BarChart
          style={styles.graphStyle}
          data={chart_data}
          width={width - 10}
          height={220}
          chartConfig={{
            backgroundGradientFrom: '#342f53',
            backgroundGradientTo: '#342f53',
            color: (opacity = 10) => `rgba(255, 99, 97, ${opacity})`,
            strokeWidth: 2, // optional, default 3
          }}
        />
      );
    } else return <Text>Not Found</Text>;
  }

  render() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.chartHeader}> Cashiers By Revenues </Text>
        {this.renderData()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  graphStyle: {
    backgroundColor: 'white',
    // count: 3,
    marginBottom: 10,
    borderRadius: 10,
  },
  chartHeader: {
    fontSize: 25,
    color: '#212529',
  },
});
