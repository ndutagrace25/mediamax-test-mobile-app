import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Navbar} from '.';
import {connect} from 'react-redux';
import {fetchNews} from '../../actions/newsActions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';

class News extends Component {
  state = {newsData: []};

  componentDidMount() {
    this.props.fetchNews();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.newsData !== state.newsData) {
      return {
        newsData: props.newsData,
      };
    }
  }

  render() {
    const {newsData} = this.state;
    return (
      <View style={styles.container}>
        {/* Header Tabs */}
        <Navbar navigation={this.props.navigation} />
        {/* Listing the news */}
        <View style={styles.content}>
          <View style={styles.addCard}>
            <Text style={styles.headerText}>Latest News on Tech</Text>
          </View>
          {newsData.length === 0 && <ActivityIndicator />}
          <FlatList
            data={newsData}
            scrollEnabled={true}
            renderItem={({item}) => (
              <View key={item.url} style={styles.item}>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.imageCard}>
                  <Image source={{uri: item.urlToImage}} style={styles.image} />
                  <View style={styles.authorCard}>
                    <Text>Author: {item.author}</Text>
                    <Text>{moment(item.publishedAt).format('LLLL')}</Text>
                  </View>
                </View>
                <View style={styles.statusContainer}>
                  <Text>{item.content}</Text>
                </View>
              </View>
            )}
            keyExtractor={item => item.url}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4E4E4',
  },
  content: {
    marginVertical: 15,
    marginHorizontal: 10,
    flex: 1,
  },
  headerText: {
    fontSize: hp('1.9%'),
    fontWeight: 'bold',
    marginRight: 8,
    opacity: 0.6,
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 5,
    shadowOffset: {width: 10, height: 10},
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 3,
    backgroundColor: '#ffffff',
    zIndex: 999,
    flexDirection: 'column',
    marginRight: 5,
    // height: hp('25%'),
  },
  image: {
    width: 55,
    height: 55,
    marginRight: 15,
  },
  imageCard: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 12,
  },
  authorCard: {flexDirection: 'column'},
  statusContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  addCard: {
    flexDirection: 'row',
    alignContent: 'center',
    marginBottom: 5,
  },
  title: {
    fontWeight: 'bold',
  },
});

const mapStateToProps = state => ({
  newsData: state.news.newsData,
});

export default connect(mapStateToProps, {fetchNews})(News);
