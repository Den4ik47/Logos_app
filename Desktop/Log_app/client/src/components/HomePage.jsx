import React,{ PropTypes } from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import TextField from 'material-ui/TextField';

const HomePage = (
  {
    onSubmit,
    text,
    onChange
  }
) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
   <div className="field-line">
        <TextField
          floatingLabelText="Your Name and Surname"
          name="text"
          value={text}
          onChange={onChange}
        />
      </div>
</form>
  </Card>


);
HomePage.propTypes = {
onSubmit: PropTypes.func.isRequired,
text:PropTypes.object.isRequired,
onChange: PropTypes.func.isRequired
};
export default HomePage;
