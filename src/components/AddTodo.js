import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {showMessage} from 'react-native-flash-message';

class AddTodo extends Component {
  state = {
    task: '',
    status: 'To do',
    radio_props: [
      {label: 'To do', value: 'To do'},
      {label: 'On hold', value: 'On hold'},
      {label: 'Complete', value: 'Complete'},
    ],
  };

  //   set selected status
  setStatus = status => {
    this.setState({status});
  };

  //   set task input
  handleInput = task => {
    this.setState({task});
  };

  //   add a to-do item
  addTask = () => {
    const {task, status} = this.state;
    // validate for empty input
    if (task === '') {
      showMessage({
        message: 'Error',
        description: 'Task should not be empty',
        type: 'error',
        icon: 'error',
        duration: 5000,
      });
      this.props.openModal();
    } else {
      let data = {task, status};

      this.props.addTodo(data);
      this.setState({task: ''});
      this.props.openModal();
    }
  };

  render() {
    const {radio_props} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.inputCard}>
          <Text style={styles.text}>Enter a task</Text>
          <TextInput
            style={styles.input}
            textAlignVertical={'center'}
            keyboardType="default"
            onChangeText={this.handleInput}
          />
        </View>
        <View>
          <Text style={styles.text}>Select Status</Text>
          <RadioForm
            radio_props={radio_props}
            initial={0}
            onPress={value => {
              this.setStatus(value);
            }}
          />
        </View>
        <View style={styles.buttonsCard}>
          <TouchableOpacity
            onPress={this.props.openModal}
            style={styles.closeButton}>
            <Text style={styles.btnLabel}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.addTask} style={styles.addButton}>
            <Text style={styles.btnLabel}>Add Task</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E4E4E4',
    paddingHorizontal: 20,
    borderRadius: 3,
    paddingVertical: 25,
  },
  buttonsCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    borderTopColor: '#bdbdbd',
    borderTopWidth: 1,
    paddingTop: 6,
  },
  closeButton: {
    backgroundColor: '#607d8b',
    padding: 10,
    justifyContent: 'center',
    borderRadius: 4,
  },
  btnLabel: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#2e7d32',
    padding: 10,
    justifyContent: 'center',
    borderRadius: 4,
  },
  input: {
    width: responsiveWidth(80),
    height: responsiveHeight(6.4),
    marginTop: responsiveHeight(0.4),
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#fff',
    borderColor: '#F4B334',
    borderWidth: 1,
    borderRadius: 4,
    color: '#0D47A1',
    paddingLeft: responsiveWidth(2),
    fontSize: responsiveFontSize(2.4),
    padding: 0,
    margin: 0,
  },
  inputCard: {
    marginBottom: 12,
  },
  text: {
    marginVertical: 8,
  },
});

export default AddTodo;
