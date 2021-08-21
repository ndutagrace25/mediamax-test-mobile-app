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

class UpdateStatus extends Component {
  state = {
    task: '',
    status: 'To do',
    radio_props: [
      {label: 'To do', value: 'To do'},
      {label: 'On hold', value: 'On hold'},
      {label: 'Complete', value: 'Complete'},
    ],
  };

  componentDidMount() {
    const {status, task} = this.props;
    this.setState({status, task});
  }

  //   set selected status
  setStatus = status => {
    this.setState({status});
  };

  //   set task input
  handleInput = task => {
    this.setState({task});
  };

  //   update status of the task
  updateTask = () => {
    const {task, status} = this.state;
    const {id} = this.props;

    let data = {task, status, id};

    this.props.updateStatusTodo(data);

    this.props.closeEditModal(id);
  };

  render() {
    const {radio_props, status} = this.state;
    const {id, task} = this.props;
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>Update Status</Text>
          <Text style={styles.text}>{task}</Text>
          <RadioForm
            radio_props={radio_props}
            initial={status}
            onPress={value => {
              this.setStatus(value);
            }}
          />
        </View>
        <View style={styles.buttonsCard}>
          <TouchableOpacity
            onPress={() => this.props.closeEditModal(id)}
            style={styles.closeButton}>
            <Text style={styles.btnLabel}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.updateTask}
            style={styles.updateButton}>
            <Text style={styles.btnLabel}>Update Status</Text>
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
  updateButton: {
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

export default UpdateStatus;
