import React, { Component } from 'react';
import { AsyncStorage, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import ActionCreators from '../store/counter/actions';
import * as countSelectors from '../store/counter/reducer';

class Counter extends Component {
  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  componentWillMount() {
    this.props.dispatch(ActionCreators.loadCount());
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
    count: countSelectors.getCount(state)
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
