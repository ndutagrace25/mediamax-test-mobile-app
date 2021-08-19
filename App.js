import React, {Component} from 'react';
import {View, Text} from 'react-native';
import axios from 'axios';

class App extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    console.log('object');
    axios
      .get(`http://169.239.171.26/todo`)
      .then(response => {
        console.log('getting here');
        this.setState({
          data: response.data,
        });
        console.log(response.data);
      })
      .catch(error => {
        console.log('getting error');
        console.log(error);
      });
  }

  render() {
    console.log(this.state.data);
    return (
      <View>
        <Text>Hello</Text>
      </View>
    );
  }
}

export default App;
