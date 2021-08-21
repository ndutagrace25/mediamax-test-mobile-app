import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Navbar, AddTodo, UpdateStatus} from '.';
import {connect} from 'react-redux';
import {fetchTodos, addTodo, updateStatusTodo} from '../../actions/todoActions';
import {pencil, add} from '../images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';

class Todo extends Component {
  state = {
    allTodos: [],
    showAddModal: false,
    ['showEditModal']: false,
  };

  componentDidMount() {
    //   calling fetchTodo function from action
    this.props.fetchTodos();
  }

  // open/close AddModal modal
  openModalAddModal = () => {
    const {showAddModal} = this.state;
    this.setState({
      showAddModal: !showAddModal,
    });
  };

  // open/close Edit modal
  openEditModal = id => {
    this.setState({
      [`showEditModal${id}`]: true,
    });
  };

  // close Edit modal
  closeEditModal = id => {
    this.setState({
      [`showEditModal${id}`]: false,
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (props.allTodos !== state.allTodos) {
      return {
        allTodos: props.allTodos,
      };
    }
  }

  componentDidUpdate(prevProps, prevState) {
    //   update to do list once an item is added or updated
    if (
      prevProps.addResponse !== this.props.addResponse ||
      prevProps.updateResponse !== this.props.updateResponse
    ) {
      this.props.fetchTodos();
    }
  }

  //   update todo status to either to-do, on-hold, or complete
  updateStatus = () => {};

  render() {
    const {allTodos, showAddModal} = this.state;
    return (
      <View style={styles.container}>
        {/* Header Tabs */}
        <Navbar navigation={this.props.navigation} />
        {/* Listing the todos */}
        <View style={styles.content}>
          <View style={styles.addCard}>
            <Text style={styles.headerText}>Todo List</Text>
            <TouchableOpacity onPress={this.openModalAddModal}>
              <Image source={add} style={styles.addImage} />
              <Modal isVisible={showAddModal}>
                <View style={{flex: 1}}>
                  <AddTodo
                    openModal={this.openModalAddModal}
                    addTodo={this.props.addTodo}
                  />
                </View>
              </Modal>
            </TouchableOpacity>
          </View>
          <FlatList
            data={allTodos}
            scrollEnabled={true}
            renderItem={({item}) => (
              <View key={item.id} style={styles.item}>
                <Text>{item.task}</Text>
                <View style={styles.statusContainer}>
                  <Text>
                    Status:{' '}
                    {item.status === 'To do' ? (
                      <Text style={{color: '#2196f3'}}>{item.status}</Text>
                    ) : item.status === 'On hold' ? (
                      <Text style={{color: '#d50000'}}>{item.status}</Text>
                    ) : (
                      <Text style={{color: '#4caf50'}}>{item.status}</Text>
                    )}
                  </Text>
                  <TouchableOpacity onPress={() => this.openEditModal(item.id)}>
                    <Image source={pencil} style={styles.image} />
                    <Modal isVisible={this.state[`showEditModal${item.id}`]}>
                      <View style={{flex: 1}}>
                        <UpdateStatus
                          closeEditModal={this.closeEditModal}
                          addTodo={this.props.addTodo}
                          id={item.id}
                          task={item.task}
                          status={item.status}
                          updateStatusTodo={this.props.updateStatusTodo}
                        />
                      </View>
                    </Modal>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={item => item.id}
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
    height: hp('15%'),
  },
  image: {
    width: 15,
    height: 15,
    marginRight: 15,
  },
  addImage: {
    width: 25,
    height: 25,
    marginRight: 15,
  },
  statusContainer: {
    justifyContent: 'space-between',
    marginTop: 10,
    flexDirection: 'row',
  },
  addCard: {
    flexDirection: 'row',
    alignContent: 'center',
    marginBottom: 5,
  },
});

const mapStateToProps = state => ({
  allTodos: state.todo.allTodos,
  addResponse: state.todo.addResponse,
  updateResponse: state.todo.updateResponse,
});

export default connect(mapStateToProps, {
  fetchTodos,
  addTodo,
  updateStatusTodo,
})(Todo);
