import React from 'react';
import { ActivityIndicator, View, Text, FlatList, StyleSheet } from 'react-native';
import { List, ListItem, SearchBar } from "react-native-elements";
import { connect } from 'react-redux';

class AddressBookScreen extends React.Component {
  static navigationOptions = {
    title: 'Address Book',
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });
    setTimeout( () => {
      fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false, refreshing: false });
      });
    }, 1500)
  };

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  handleRefresh = () => {
    this.setState({
      refreshing : true
    },
    () => {
      this.makeRemoteRequest();
    })
  }

  render() {
    return (
      <View>
          <FlatList style={styles.list}
            data={this.state.data}
            renderItem={({ item }) => (
              <ListItem
                roundAvatar
                title={`${item.name.first} ${item.name.last}`}
                subtitle={item.email}
                avatar={{ uri: item.picture.thumbnail }}
                containerStyle={{ borderBottomWidth: 0 }}
              />
            )}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
            keyExtractor={item => item.email}
            ItemSeparatorComponent={this.renderSeparator}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            onEndThreshold={100}
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#ff0000',
  },
});

function mapStateToProps(state) {
  return {
    count: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadAddrBook: () => {
      dispatch(AddrBookActionCreators.loadAddrBook());
    },
    saveAddrBook: () => {
      dispatch(AddrBookActionCreators.saveAddrBook());
    },
    addAddrBook: (newAddr) => {
      dispatch(AddrBookActionCreators.addAddrBook(newAddr));
    },
    removeAddrBook: (index) => {
      dispatch(AddrBookActionCreators.removeAddrBook(index));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressBookScreen);
