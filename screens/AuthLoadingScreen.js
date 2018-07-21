import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
  StyleSheet
} from 'react-native';

export default class AuthLoadingScreen extends React.Component {
    constructor() {
        super();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        console.log( "=== _bootstrapAsync "); // choi180721 temp
        const userToken = await AsyncStorage.getItem('userToken');

        console.log( "=== userToken="+userToken); // choi180721 temp
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(userToken ? 'Main' : 'Auth');
    };

    componentDidMount() {
        this._bootstrapAsync();
    }

    // Render any loading content that you like here
    render() {
        console.log( "=== AuthLoadingScreen render."); // choi180721 temp
        return (
        <View style={styles.container}>
            <ActivityIndicator />
            <StatusBar barStyle="default" />
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
});
