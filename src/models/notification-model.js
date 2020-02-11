import ContactModel from './contact-model';
import UserModel from './user-model';

class NotificationModel {
  constructor({
    id,
    contact_id,
    title,
    description,
    contact,
    user,
    task_type,
    created_ago,
    new_notification,
  }) {
    this.id = id;
    this.contactId = contact_id;
    this.title = title;
    this.description = description;
    this.taskType = task_type;
    this.createdAgo = `${created_ago} ago`;
    this.newNotification = new_notification;

    this.contact = new ContactModel(contact || {});
    this.user = new UserModel(user || {});
  }
}

export default NotificationModel;
