import React, { PropTypes } from 'react';
import HomePage from '../components/HomePage.jsx';

class HomeClient extends React.PureComponent {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);
    
    // set the initial component state
    this.state = {
    project_name:''
      }

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const project_name = encodeURIComponent(this.state.project_name);
    const formData = `project_name=${project_name}`;
 
    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/project/add');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
        console.log(xhr.response);
      } else {

console.log(xhr.response.message);
      }
    });
    xhr.send(formData);
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const project_name = event.target.value;

    this.setState({
        project_name
    });
  }
  /**
   * Render the component.
   */
  render() {
    return (
      <HomePage
        onSubmit={this.processForm}
        onChange={this.changeUser}
        project_name={this.state.project_name}
      />
    );
  }

}

HomeClient.contextTypes = {
  router: PropTypes.object.isRequired
};

export default HomeClient;
