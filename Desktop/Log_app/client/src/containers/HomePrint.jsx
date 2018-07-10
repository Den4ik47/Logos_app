import React, { PropTypes } from 'react';
import HomePage from '../components/HomePage.jsx';


class HomePrint extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);


    // set the initial component state
    this.state = {
      text:''
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.change.bind(this);
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
    const text = encodeURIComponent(this.state.text);
    const formData = `text=${text}`;
    console.log("Breakpoint");
    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/print/print');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

      } else {
        // failure

        // change the component state
      }
    });
    xhr.send(formData);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
 change(event) {
   const field = event.target.text;
   text[field] = event.target.value;

   this.setState({
     text
   });
 }
  render() {
    return (
      <HomePage
        onSubmit={this.processForm}
        text={this.state.text}
        onChange={this.changeUser}
      />
    );
  }

}

HomePrint.contextTypes = {
  router: PropTypes.object.isRequired
};

export default HomePrint;
