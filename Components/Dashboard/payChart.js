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
export default class PayChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: ['#', '#58508d', '#bc5090'],
    };
  }

  renderData() {
    console.log('renderDataprops', this.props);

    let array = this.props.data;
    if (array.length > 0) {
      const data = [
        {
          name: 'Cash',
          count: array[0].paymentByCash,
          color: '#003f5c',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
        {
          name: 'Gift Card',
          count: array[0].paymentByGiftCard,
          color: '#58508d',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
        {
          name: 'Credit Card',
          count: array[0].paymentByCreditCard,
          color: '#bc5090',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
      ];
      return (
        <PieChart
          data={data}
          width={width}
          height={220}
          chartConfig={{
            backgroundGradientFrom: '#1E2923',
            backgroundGradientTo: '#08130D',
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            strokeWidth: 2, // optional, default 3
          }}
          accessor="count"
          backgroundColor="transparent"
          paddingLeft="0"
          absolute
        />
      );
    } else return <Text>Not Found</Text>;
  }

  render() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        {this.renderData()}
      </View>
    );
  }
}
const styles = StyleSheet.create({});
