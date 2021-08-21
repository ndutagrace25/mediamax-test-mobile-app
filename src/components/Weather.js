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
import {fetchWeather} from '../../actions/weatherActions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';

class Weather extends Component {
  state = {weatherData: []};

  componentDidMount() {
    this.props.fetchWeather();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.weatherData !== state.weatherData) {
      return {
        weatherData: props.weatherData,
      };
    }
  }

  render() {
    const {weatherData} = this.state;
    return (
      <View style={styles.container}>
        {/* Header Tabs */}
        <Navbar navigation={this.props.navigation} />
        {/* Listing the news */}
        <View style={styles.content}>
          <View style={styles.addCard}>
            <Text style={styles.headerText}>5 Day Forecast in Nairobi (3hrs difference)</Text>
          </View>
          {weatherData.length === 0 && <ActivityIndicator />}
          <FlatList
            data={weatherData}
            scrollEnabled={true}
            renderItem={({item}) => (
              <View key={item.dt} style={styles.item}>
                <Text style={styles.title}>
                  Date: {moment(item.dt_txt).format('LLLL')}
                </Text>
                <View style={styles.imageCard}>
                  <View style={styles.authorCard}>
                    <Text>
                      <Text style={styles.text}>Weather:</Text>{' '}
                      {item.weather[0].main}
                    </Text>
                    <Text>
                      <Text style={styles.text}>Description:</Text>{' '}
                      {item.weather[0].description}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={item => item.dt}
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
  text: {
    fontSize: hp('1.9%'),
    fontWeight: 'bold',
    marginRight: 8,
    opacity: 0.6,
    color: '#4caf50',
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
    marginRight: 10,
  },
});

const mapStateToProps = state => ({
  weatherData: state.weather.weatherData,
});

export default connect(mapStateToProps, {fetchWeather})(Weather);
