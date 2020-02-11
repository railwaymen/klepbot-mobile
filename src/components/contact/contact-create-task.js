import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import ModalHeader from '../shared/modal-header';
import {Header3} from '../shared/header';
import TextInputGroup from '../shared/text-input-group';
import TaskModel from '../../models/task-model';
import TasksService from '../../services/tasks-service';
import UsersService from '../../services/users-service';
import DatePickerModal from '../shared/date-picker';
import SelectList from '../shared/select-list';
import AlertsContext from '../../contexts/alerts-context';

class ContactCreateTask extends Component {
  static contextType = AlertsContext;

  state = {
    task: new TaskModel({}),
    taskTypes: [],
    users: [],
    isScrollEnabled: true,
  };

  componentDidMount() {
    UsersService.all().then(users => {
      this.setState({users});
    });

    TasksService.types().then(taskTypes => {
      this.setState({taskTypes});
    });
  }

  onChange = ({name, value}) => {
    console.log({name, value});
    let {task} = this.state;

    task[name] = value;

    this.setState({task});
  };

  onChangeSendAt = (_event, date) => {
    let {task} = this.state;

    task.sendAt = date;

    this.setState({task});
  };

  onToggleCalendar = () => {
    this.setState(state => ({
      isCalendarOpen: !state.isCalendarOpen,
    }));
  };

  onSubmit = () => {
    const {
      state: {task},
      props: {close, contactId},
      context: {pushMessage},
    } = this;

    const params = task.toParams();

    return TasksService.create({contactId, params})
      .then(() => {
        pushMessage({description: 'Copied!', type: 'popup'});
      })
      .catch(() => {
        pushMessage({
          description: 'There was an error while trying to save',
          type: 'toast',
        });
      })
      .finally(() => {
        close();
      });
  };

  toggleMainScroll = () => {
    this.setState(state => ({
      isScrollEnabled: !state.isScrollEnabled,
    }));
  };

  render() {
    const {
      props: {close},
      state: {
        task: {title, description, sendAt, formattedSendAt, userId, taskTypeId},
        users,
        isScrollEnabled,
        taskTypes,
      },
    } = this;

    return (
      <View style={styles.container}>
        <ModalHeader onSave={this.onSubmit} onCancel={close}>
          <Header3 style={styles.header}>{formattedSendAt()}</Header3>
        </ModalHeader>
        <ScrollView
          style={styles.scroll}
          scrollEnabled={isScrollEnabled}
          invertStickyHeaders={false}>
          <View style={styles.scrollContainer}>
            <TextInputGroup
              label="Title"
              name="title"
              value={title}
              onChange={this.onChange}
            />
            <TextInputGroup
              label="Description"
              name="description"
              value={description}
              onChange={this.onChange}
            />
            <SelectList
              list={users}
              displayKey="fullName"
              toggleMainScroll={this.toggleMainScroll}
              onSelect={this.onChange}
              returnKey="id"
              name="userId"
              selectedId={userId}
            />
            <SelectList
              list={taskTypes}
              displayKey="name"
              toggleMainScroll={this.toggleMainScroll}
              onSelect={this.onChange}
              returnKey="id"
              name="taskTypeId"
              selectedId={taskTypeId}
            />
            <DatePickerModal value={sendAt} onChange={this.onChangeSendAt} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
  },
  header: {
    textAlign: 'center',
  },
  scroll: {
    flex: 1,
  },
  form: {
    justifyContent: 'center',
    flex: 1,
  },
  scrollContainer: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
};

export default ContactCreateTask;
