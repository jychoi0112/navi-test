import React from 'react';
import {
  ActivityIndicator,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import SignInScreen from '../screens/SignInScreen';

export default createStackNavigator({
    SignIn: SignInScreen
  });

