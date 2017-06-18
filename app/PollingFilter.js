import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class PollingFilter extends Component {
    constructor(props){
        super(props);
        this.state=({value:"all"})
    }
   logChange(val) {
       console.log(val);
  if (val!==null) {
     this.setState({value:val.value}); 
     this.props.setZoom(val.value)
       console.log("Selected: " + val.value);
  }
  
    }
    render() {
        console.log(this.props.polling);
        var options=[];
        this.props.polling.map(function(object,i){
            options.push({value:object.latitude+";"+object.longitude,label:object.center})
        })
       
        return (
            <div className='pollingfilter'>
             <Select
 clearable="false"
  name="form-field-name"
  value={this.state.value}
  options={options}
  onChange={this.logChange.bind(this)}
/>   
            </div>
        );
    }
}

export default PollingFilter;