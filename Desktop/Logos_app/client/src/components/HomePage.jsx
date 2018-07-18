import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Link, IndexLink } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
const HomePage = ({
  project_name,
  onChange,
  onSubmit
}) => (
  <div>
  <Tabs >
  <Tab label="Home" value="Home">
  </Tab>
  <Tab label="History" value="History">
  </Tab>
  <Tab label="Logout" value="Logout" containerElement={<Link to="/logout"/>}>
  </Tab>
</Tabs>
<Card className="container">
<form action="/" onSubmit={onSubmit}>
<h2 className="card-heading">Create your new project</h2>
<div className="textfield">
<TextField 
hintStyle={{ textAlign: 'center', width: '100%' }}  
hintText="Please provide name of project" 
value={project_name}
onChange={onChange}
/>
</div>
<div className="button">
<RaisedButton
label="Add new project"
labelPosition="before"
containerElement="label"/>
</div>
</form>
<h2 className="card-heading">Your Project's</h2>

</Card>
</div>
);

HomePage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  project_name: PropTypes.string.isRequired
};

export default HomePage;
