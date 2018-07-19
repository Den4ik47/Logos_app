import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Link, IndexLink } from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import {Tabs, Tab} from 'material-ui/Tabs';

const HomePage = ({
  project_name,
  onChange,
  onSubmit,
  Cards,
  errors,
  checked_project,
  start,
  check
  
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
<form action="/" onSubmit={onSubmit} id="forms">
<h2 className="card-heading">Create your new project</h2>
<div className="textfield">
<TextField 
hintStyle={{ textAlign: 'center', width: '100%' }}  
hintText="Please provide name of project" 
value={project_name}
onChange={onChange}
errorText={errors.name}
/>
</div>
<div className="button">
<RaisedButton
type="submit"
label="Add new project"
labelPosition="before"
containerElement="label" primary/>
</div>
</form>
<h2 className="card-heading">Your Project's</h2>
<div className="generate">

</div>

  <div>
  {Cards.map(function(object, i){
     return <div className="cards"  key={i}> 
                {[
                   // remove the key
                <Card><CardHeader title= {object.project_name} ><div className="buttons"><RaisedButton label="Check Me!" onClick={check}/></div>  </CardHeader> </Card> 
                
                ]}
            </div>; })}</div>}))}
</Card >
<div className="FloatingAction">
<FloatingActionButton className="element" onClick={start}>
Start
   </FloatingActionButton> 
    <FloatingActionButton className="element">
    Stop
      </FloatingActionButton>
</div>
</div>
);

HomePage.propTypes = {
  errors: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  project_name: PropTypes.string.isRequired,
  Cards:PropTypes.array.isRequired,
  checked_project:PropTypes.string.isRequired,
  start:PropTypes.func.isRequired,
  check:PropTypes.func.isRequired
};

export default HomePage;
