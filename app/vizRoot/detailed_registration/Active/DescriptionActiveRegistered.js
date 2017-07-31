import React, { Component } from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import ActionAutorenew from 'material-ui/svg-icons/action/autorenew';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Control from 'react-leaflet-control';
import Download from 'material-ui/svg-icons/File/file-download';
import { Link  } from 'react-router';

class DescriptionActiveRegistered extends Component {
    constructor(props){
        super(props);
                this.state={open: true} ;
    }
 handleOpen()  {
   //console.log('ddddd');
    this.setState({open: true});
  }
  
  handleClose ()  {
    this.setState({open: false});
    this.props.dontOpenAgain
  }

    render() {
    const actions = [
      <FlatButton
        label="OK"
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />
      
    ];

        return (
          <MuiThemeProvider>
            <div className="sourcePosition"  style={this.props.styleProp}>
              <RaisedButton label="Data Source" onTouchTap={this.handleOpen.bind(this)} onClick={this.handleOpen.bind(this)} />
        <Dialog
          title="Check the Raw data "
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
          autoScrollBodyContent={true}
          contentStyle={{width:"80%"}}
        >
        
          <div>
            
            <div className="col-md-12">
            
              <h2 className="col-md-8" style={{marginTop:"1rem"}}>Active Registred</h2>
            </div>

          </div>

        </Dialog>  
            </div>
            </MuiThemeProvider>

        );
    }
}

export default DescriptionActiveRegistered;