class TaskModel {
  constructor({
    id,
    user,
    created_at,
    created_by,
    user_id,
    task_type_id,
    title,
    send_at,
    description,
    type,
  }) {
    this.id = id;
    this.user = user;
    this.createdAt = created_at;
    this.createdBy = created_by;
    this.userId = user_id;
    this.title = title;
    this.taskTypeId = task_type_id;
    this.sendAt = send_at || new Date();
    this.description = description;

    this.type = type;
  }

  formattedSendAt = () => {
    const {sendAt} = this;

    const year = sendAt.getFullYear();
    const month = sendAt.getMonth() + 1;
    const day = sendAt.getDate();
    const hours = sendAt.getHours();
    const minutes = sendAt.getMinutes();

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  toParams = () => ({
    created_by: this.createdBy,
    user_id: this.userId,
    description: this.description,
    task_type_id: this.taskTypeId,
    title: this.title,
    send_at: this.sendAt,
  });
}

export default TaskModel;
