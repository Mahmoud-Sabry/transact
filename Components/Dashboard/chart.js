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
export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: ['#003f5c', '#58508d', '#bc5090', '#ff6361', '#ffa600'],
    };
  }

  renderData() {
    console.log('renderDataprops', this.props);

    let array = this.props.data;
    if (array.length >= 1) {
      let count = 0;
      let data = [];
      array.forEach(item => {
        data.push({
          name: item.product.title,
          count: item.count,
          color: this.state.colors[count],
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        });
        count++;
      });
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
