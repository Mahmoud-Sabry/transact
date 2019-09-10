import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
var {height, width} = Dimensions.get('window');

export default class CommentModel extends Component {
  constructor(props) {
    super(props);
  }

  AddFriend() {
    this.props.changeModalVisibility(false);
  }
  closeModal = () => {
    this.props.changeModalVisibility(false);
  };

  render() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        disabled={true}
        style={styles.contentContainer}>
        <View style={[styles.modal]}>
          <View style={styles.headerView}>
            <Text style={styles.header}> Cashier Comment </Text>
            <TouchableHighlight
              onPress={() => this.closeModal()}
              style={styles.touchableHighlight}
              underlayColor={'#1890ff'}>
              <Text style={styles.text}>X</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.commentView}>
            <Text style={styles.comment}> {this.props.comment} </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  buttonsView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchableHighlight: {
    // backgroundColor: '#1890ff',
    // paddingVertical: 10,
    alignSelf: 'center',
    alignItems: 'center',
    // borderRadius: 10,
    margin: 2,
  },
  text: {
    margin: 5,
    fontSize: 20,
    color: 'red',
    fontFamily: 'Lobster-Regular',
  },
  modal: {
    width: width,
    height: height,
    // paddingTop: 10,
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    // borderRadius: 10,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchstyle: {
    backgroundColor: 'rgba(116, 123, 178, 0.05)',
    height: height / 8,
    borderColor: 'white',
    flexDirection: 'row',
    borderBottomWidth: 0.1,
    width: width,
  },
  header: {
    flex: 6,
    fontSize: 25,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  comment: {
    fontSize: 20,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  headerView: {
    flex: 1,
    flexDirection: 'row',
  },
  commentView: {
    flex: 3,
    justifyContent: 'center',
    alignContent: 'center',
    margin: 2,
    // alignSelf:'center'
  },
});
