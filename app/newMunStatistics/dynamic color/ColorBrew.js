import React, { Component } from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import ActionAutorenew from 'material-ui/svg-icons/action/autorenew';

import ColorSeries from "./ColorSeries";
class ColorBrew extends Component {
    constructor(props){
        super(props);
                this.state={open: false} ;
    }
 handleOpen()  {
    this.setState({open: true});
  }
  
  handleClose ()  {
    this.setState({open: false});
  }

    render() {
    const actions = [
      <FlatButton
        label="OK"
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />
      
    ];
    const c1=["#0096d6","#005288","#BBDEFB"]
    const c2=["#E91E63","#880E4F","#F8BBD0"]
    const c3=["#4CAF50","#1B5E20","#C8E6C9"]
    const c4=["#795548","#4E342E","#D7CCC8"]
    
        return (
            <div className="yeartoggle" style={{ left: "1%",top: "40%"}}>
              <RaisedButton label="Change Map Color" onTouchTap={this.handleOpen.bind(this)} icon={<ActionAutorenew />}/>
        <Dialog
          title="Choose color sets "
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
          autoScrollBodyContent={true}
          contentStyle={{width:"18%"}}
        >
        
        <div>
        <ColorSeries colorRange={c1} keys="a"  />
        <ColorSeries colorRange={c2} keys="b" />
        <ColorSeries colorRange={c3} keys="b" />
        <ColorSeries colorRange={c4} keys="b" />
        </div>
        </Dialog>  
            </div>
        );
    }
}

export default ColorBrew;