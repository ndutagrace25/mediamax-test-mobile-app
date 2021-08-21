import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {Todo, Weather, News} from './src/components';

// Screens and their routes
const navigator = createStackNavigator(
  {
    Todo: Todo,
    Weather: Weather,
    News: News,
  },
  {
    initialRouteName: 'Todo',
    defaultNavigationOptions: {
      title: 'Todo List',
      header: null,
    },
  },
  {
    navigationOptions: {
      header: null,
    },
  },
);

export default createAppContainer(navigator);
