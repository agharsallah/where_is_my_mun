import React, { Component } from 'react';

class ColorSeries extends Component {
    constructor(props){
        super(props);
        this.state={selectedseries:null}
    }

  testclick(e){
      this.setState({selectedseries:this.props.colorRange});
      let colorRange = this.props.colorRange;
      this.props.getBrewer(colorRange);
  }
  

  
    render() {
         var rows=[];
      let colorRange=this.props.colorRange
      for (var i = 0; i < colorRange.length; i++) {
          let key=`${this.props.keys} ${i}`
          rows.push(<div key={key} className='square' style={{background:colorRange[i]}} />)
      }
        return (
             <div id="squareBrew"  onClick={this.testclick.bind(this)}>
                {rows}
            </div>
        );
    }
}

export default ColorSeries;