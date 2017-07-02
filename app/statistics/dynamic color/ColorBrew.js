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
    const c1=chroma.scale(['#9ecae1','#084594']).mode('lch').colors(6);
    const c2=chroma.scale(['#fc9272','#99000d']).mode('lch').colors(6);
    const c3=chroma.scale(['#a1d99b','#005a32']).mode('lch').colors(6);
    const c4=chroma.scale(['#fec44f','#8c2d04']).mode('lch').colors(6);
    
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