import React from 'react';
import {connect} from 'react-redux';
import {
  getContactList,
  resetContactList,
  setContactList,
  setSelectedContactList
} from '../redux/modules/actions/contactListAction.js';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  ActivityIndicator,
  RefreshControl,
  Platform,
} from 'react-native';
import Image from 'react-native-remote-svg';
import theme from '../constants/theme';
import ContactListCard from '../components/contactListCard/ContactListCard.js';
import TextField from '../components/formFields/TextField';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Loading from './Loading';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contactsFetched: false,
      selectedContact: {},
      searchByContactName: '',
      isJoinContactList: true,
      pageSize: 10,
      pageOffset: 0,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', route => {
      this.onRefresh();
    });
  }

  componentWillUnmount() {
    this.props.resetContactList();
  }

  handleLoadContactListList = () => {
    if (!this.state.isLoading && !this.state.searchByContactName && !this.state.contactsFetched) {
      this.setState(
        {
          pageSize: this.state.pageSize,
          pageOffset: this.state.pageOffset + 10,
          isJoinContactList: true
        },
        this.getContactListData,
      );
    }
  };

  fetchingContactlogsStarted = () => {
    this.setState(
      {
        isLoading: (this.state.searchByContactName === 'true'),
      },
      this.getNextContactListData,
    );
  };

  fetchingContactlogsCompleted = fetchedContactListCount => {
    this.setState({
      isLoading: false,
      contactsFetched:
        fetchedContactListCount <= this.props.contactListData.length ? true : false,
    });
  };

  getNextContactListData = async () => {
    this.props.getContactList({
      pageOffset: this.state.pageOffset,
      pageSize: this.state.pageSize,
      searchString: this.state.searchByContactName,
      isJoinContactList: this.state.isJoinContactList,
      fetchingContactlogsCompleted: this.fetchingContactlogsCompleted,
    });
  };

  getContactListData = () => {
    if (!this.state.isLoading && !this.state.contactsFetched) {
      this.fetchingContactlogsStarted();
    }
  };

  renderFooterView = () => {
    return this.state.isLoading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };

  onRefresh = () => {
    this.setState(
      {
        pageSize: 10,
        pageOffset: 0,
        contactsFetched: false,
        isJoinContactList: false,
      },
      () =>
      this.fetchingContactlogsStarted(),
    );
  };

  handleSelectedContact = contact => {
    this.setState({
      selectedContact: contact
    },
    () => {
      this.props.setSelectedContactList({
        selectedContact: this.state.selectedContact
      })
      this.props.navigation.navigate('Home');
    })
  }

  handleTextChange = searchName => {
    this.setState({
      searchByContactName: searchName
    },  ()=>{
      this.onRefresh();
    });
  };

  render() {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <TextField
          value={this.state.searchByContactName}
          placeholder="Search by contact name..."
          onChangeText={this.handleTextChange}
          style={[styles.inputTopMargin]}
          returnKeyType="done"
        />
        <Loading />
        {this.props.contactListData.length > 0 ? (
          <View>
            <FlatList
              keyExtractor={(item, index) => String(index + '-' + item._id)}
              data={this.props.contactListData}
              style={styles.flatList}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isLoading}
                  onRefresh={this.onRefresh}
                />
              }
              renderItem={item => (
                <View style={styles.contactListContainer}>
                  <ContactListCard
                    contactData={item.item}
                    contactName={item.item.name}
                    onPress={() => {this.handleSelectedContact(item.item)}}
                  />
                </View>
              )}
              ListFooterComponent={this.renderFooterView}
              onEndReached={this.handleLoadContactListList}
              onEndReachedThreshold={Platform.OS === 'ios' ? 0 : 1}
            />
          </View>
        ) : ( 
          <View style={styles.noContactDataFoundContainer}>
            <Text style={styles.noContactDataFoundHeading}>Oops !!</Text>
            <Text style={styles.noContactDataFoundText}>
              No Contact founnd with the given name.
            </Text>
            <Image
              style={styles.noContactDataFoundImage}
              source={require('../../assets/images/contactReport/not_found.svg')}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp('100%'),
    backgroundColor: theme.background.light,
  },
  contactListContainer: {
    paddingBottom: 10,
  },
  flatList: {
    marginTop: 10,
    marginBottom: 70,
  },
  loader: {
    marginTop: 10,
    alignItems: 'center',
  },
  noContactDataFoundContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  noContactDataFoundHeading: {
    color: theme.text.dark,
    fontFamily: 'Bitter-Regular',
    fontSize: 24,
    letterSpacing: 0,
    lineHeight: 31,
    textAlign: 'center',
  },
  noContactDataFoundText: {
    color: theme.text.dark,
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 19,
    textAlign: 'center',
    marginTop: 12,
    paddingHorizontal: 30,
  },
  noContactDataFoundImage: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
    width: 256,
    marginTop: 50,
    marginBottom: 50,
  },
});

export default connect(
  ({contactList}) => ({
    contactListData: contactList.contactListData || [],
  }),
  {
    getContactList,
    setContactList,
    setSelectedContactList,
    resetContactList,
  },
)(Contact);
