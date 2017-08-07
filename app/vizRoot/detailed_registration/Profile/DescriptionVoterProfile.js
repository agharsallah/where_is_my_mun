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

class DescriptionVoterProfile extends Component {
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
              <RaisedButton label="Map Manual" onTouchTap={this.handleOpen.bind(this)} onClick={this.handleOpen.bind(this)} />
        <Dialog
          title="Visualization description "
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
          autoScrollBodyContent={true}
          contentStyle={{width:"80%"}}
        >
        
          <div>
            
            <div className="col-md-12">
              <h4 style={{marginTop:"1rem"}}>This map shows the voter profile by age and sexe. Data source from  <a href="http://www.isie.tn/actualites/2017/08/07/statistiques-quotidiennes-de-loperation-dinscription-06-08-2017/">ISIE</a> </h4>
              
              <div>
                <div className="col-md-6" style={{top:"100px"}}> You can use the slider to visualize diffrent age tranches  </div>
                <div className="col-md-6" style={{textAlign:"center",marginTop:"2rem"}}><img  style={{height:"200px"}} src="/img/slider.PNG" /></div>
                <br/>
              </div>

              <div>
                <div className="col-md-6" style={{top:"100px"}}> You can Change the map delimitation  </div>
                <div className="col-md-6" style={{textAlign:"center",marginTop:"2rem"}}><img  style={{height:"200px"}} src="/img/munToggle.PNG" /></div>
                <br/>
              </div>

              <div>
                <div className="col-md-6" style={{top:"100px"}}> You can get additional infos when hover on the map or the chart  </div>
                <div className="col-md-6" style={{textAlign:"center",marginTop:"2rem"}}><img style={{height:"250px"}} src="/img/hover.PNG" /></div>
              </div>
              
              <h4 style={{marginTop:"2rem"}}>You can Drag the map Right and Left.<br/><br/> you can also zoom in and out by scrolling or double clicking</h4>          

              </div>

          </div>

        </Dialog>  
            </div>
            </MuiThemeProvider>

        );
    }
}

export default DescriptionVoterProfile;