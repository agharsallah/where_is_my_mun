import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';

class IrieButtonFilter extends Component {
    render() {
        return (
            <Checkbox
            key='a'
                label="Irie"
                onCheck={event => this.props.getIrieButton(event.target.value)}
            />
        );
    }
}

export default IrieButtonFilter;