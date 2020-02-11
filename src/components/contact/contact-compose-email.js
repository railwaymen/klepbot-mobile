import React, {Component} from 'react';
import ModalHeader from '../shared/modal-header';
import {View, ScrollView, Clipboard} from 'react-native';
import EmailTemplatesService from '../../services/email-templates-service';
import Template from '../email-templates/template-list-item';
import {Header3} from '../shared/header';
import CurrentUser from '../../helpers/current-user';
import GradientButton from '../shared/gradient-button';
import EmailBodyView from '../email-templates/email-body-view';
import AlertsContext from '../../contexts/alerts-context';

class ContactComposeEmail extends Component {
  static contextType = AlertsContext;

  state = {
    templates: [],
    preparedTemplate: '',
    selectedTemplateId: null,
  };

  componentDidMount() {
    EmailTemplatesService.all().then(templates => {
      this.setState({templates});
    });
  }

  onSelectTemplate = async ({template, id}) => {
    const {replaceAttributesForEmailTemplate} = this.props.contact;
    const user = await CurrentUser.get();
    const {signature} = user;

    this.setState({
      selectedTemplateId: id,
      preparedTemplate: replaceAttributesForEmailTemplate(template, signature),
    });
  };

  onSave = () => {
    const {
      state: {preparedTemplate},
      props: {close},
      context: {pushMessage},
    } = this;

    Clipboard.setString(preparedTemplate);
    pushMessage({description: 'Copied!', type: 'popup'});

    close();
  };

  render() {
    const {
      props: {
        close,
        contact: {email},
      },
      state: {templates, selectedTemplateId, preparedTemplate},
    } = this;

    return (
      <View style={styles.container}>
        <ModalHeader onSave={this.onSubmit} onCancel={close} />
        <View style={styles.emailBody}>
          <Header3>{email}</Header3>
          <EmailBodyView template={preparedTemplate} />
          <GradientButton onPress={this.onSave}>
            Compose and copy
          </GradientButton>
        </View>
        <View style={styles.emailTemplates}>
          <ScrollView>
            {templates.map(template => (
              <Template
                key={template.id}
                {...template}
                onSelect={this.onSelectTemplate}
                selectedTemplateId={selectedTemplateId}
              />
            ))}
          </ScrollView>
        </View>
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
  button: {
    backgroundColor: '#DE90E8',
    color: '#eee',
  },
  emailBody: {
    flex: 2,
    marginTop: 12,
  },
  emailTemplates: {
    flex: 1,
  },
};

export default ContactComposeEmail;
