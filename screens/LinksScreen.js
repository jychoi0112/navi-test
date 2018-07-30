import React from 'react';
import { ActivityIndicator, View, Text, FlatList, ScrollView, StyleSheet } from 'react-native';
import { List, ListItem, SearchBar } from "react-native-elements";
import { ExpoLinksView } from '@expo/samples';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
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
      page : 1,
      refreshing : true,
      seed: this.state.seed + 1
    },
    () => {
      this.makeRemoteRequest();
    })
  }

  handleLoadMore = () => {
    this.setState({
      page: this.state.page + 1
    },
    () => {
      this.makeRemoteRequest();
    })
  }

  render() {
    return (
        <List style={styles.container}
        containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}
        >
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
            onEndReached={this.handleLoadMore}
            onEndThreshold={100}
          />
        </List>
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
