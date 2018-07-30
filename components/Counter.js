import React, { Component } from 'react';
import { AsyncStorage, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ActionCreators from '../store/counter/actions';

class Counter extends Component {
  constructor(props, context) {
    super(props, context);
  }

  async getItem() {
    try {
      const value = await AsyncStorage.getItem('CNTTEXT');
      if (value !== null) {
        // We have data!!
        this.props.setCount( value );
      }
     } catch (error) {
       // Error retrieving data
       console.log("=== getItem() error="+error);
     }
  }

  componentWillMount() {
    this.getItem();
  }

  render() {
    return (
      <View style={s.container}>
        <Text style={{ fontSize: 20 }}>개수: {this.props.count}</Text>
        <TouchableOpacity style={s.upButton} onPress={() => this.props.countUp(1)}>
          <Text style={{ fontSize: 20 }}>+1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.upButton} onPress={() => this.props.countUp(2)}>
          <Text style={{ fontSize: 20 }}>+2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.downButton} onPress={() => this.props.countUp(-1)}>
          <Text style={{ fontSize: 20 }}>-1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.downButton} onPress={() => this.props.countUp(-2)}>
          <Text style={{ fontSize: 20 }}>-2</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center'
  },
  upButton: {
    marginLeft: 20,
    backgroundColor: 'cyan',
    padding: 10,
    borderRadius: 20
  },
  downButton: {
    marginLeft: 20,
    backgroundColor: 'pink',
    padding: 10,
    borderRadius: 20
  },
});

function mapStateToProps(state) {
  return {
    count: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    countUp: (num) => {
      dispatch(ActionCreators.countUp(num));
    },
    countDown: (num) => {
      dispatch(ActionCreators.countDown(num));
    },
    setCount: (num) => {
      dispatch(ActionCreators.setCount(num));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
