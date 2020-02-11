import ApiService from './api-service';
import TaskModel from '../models/task-model';
import TimeZone from 'react-native-timezone';

class TasksService {
  static create = async ({contactId, params}) => {
    const timeZone = await TimeZone.getTimeZone();

    return ApiService.post({
      url: `contacts/${contactId}/tasks`,
      body: JSON.stringify({
        task: params,
        zone: timeZone,
      }),
    }).then(task => new TaskModel(task));
  };

  static types() {
    return ApiService.get({
      url: 'task_types',
    }); //.then(taskTypes => taskTypes.map(taskType))
  }
}

export default TasksService;
