import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Navbar = ({navigation}) => {
  // navigate to weather screen
  const navigateToWeatherScreen = () => {
    navigation.navigate('Weather');
  };
  // navigate to Todo screen
  const navigateToToDoScreen = () => {
    navigation.navigate('Todo');
  };
  // navigate to news screen
  const navigateToNewsScreen = () => {
    navigation.navigate('News');
  };
  return (
    <View style={styles.headerCard}>
      <TouchableOpacity onPress={navigateToToDoScreen}>
        <Text style={styles.appName}>Todo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToWeatherScreen}>
        <Text style={styles.appName}>Weather</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToNewsScreen}>
        <Text style={styles.appName}>Latest News</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerCard: {
    padding: 5,
    backgroundColor: '#0971CE',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  appName: {
    fontWeight: 'bold',
    color: '#e0e0e0',
    fontSize: hp('2.5%'),
    fontFamily: 'Cochin',
  },
});

export default Navbar;
