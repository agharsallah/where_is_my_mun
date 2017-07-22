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

class SourceButton extends Component {
    constructor(props){
        super(props);
                this.state={open: false} ;
    }
 handleOpen()  {
   //console.log('ddddd');
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
    const c1=chroma.scale(['#9ecae1','#084594']).mode('lch').colors(6);
    const c2=chroma.scale(['#fc9272','#99000d']).mode('lch').colors(6);
    const c3=chroma.scale(['#a1d99b','#005a32']).mode('lch').colors(6);
    const c4=chroma.scale(['#fec44f','#8c2d04']).mode('lch').colors(6);
    
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
              <RaisedButton 
                icon={<Download />} 
                containerElement={<Link to="/file/registrationcenter.pdf" target="_blank" onClick={(event) => {event.preventDefault(); window.open(this.makeHref("route"))}}/>} 
                label="Registration Center"
              />
              <p className="col-md-8" style={{marginTop:"1rem"}}>Download the Registration center (data from ISIE)</p>
            </div>
            
            <div className="col-md-12" style={{marginTop:"2rem"}}>
              <RaisedButton 
                icon={<Download />} 
                containerElement={<Link to="/file/dailyStat-06-07.pdf" target="_blank" onClick={(event) => {event.preventDefault(); window.open(this.makeHref("route"))}}/>} 
                label="Registration Center"
              />
              <p className="col-md-8" style={{marginTop:"1rem"}}>Download the daily registration number (data from ISIE)</p>
            </div>

            <div className="col-md-12" style={{marginTop:"2rem"}}>
              <RaisedButton 
                icon={<Download />} 
                containerElement={<Link to="/file/eligiblevoters.xlsx" target="_blank" onClick={(event) => {event.preventDefault(); window.open(this.makeHref("route"))}}/>} 
                label="Registration Center"
              />
              <p className="col-md-8" >Download the number of eligible voters in 2014 missing 18 to 19 age range  (data from INS)</p>
            </div>

          </div>

        </Dialog>  
            </div>
            </MuiThemeProvider>

        );
    }
}

export default SourceButton;