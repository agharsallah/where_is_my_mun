import React, { Component } from 'react';
import {Link} from 'react-router';

import counterpart  from 'counterpart';
import Translate    from 'react-translate-component';
import './sectionStyle.css'

class ProjectSection extends Component {
    
    render() {
            var imageLink="/img/"+this.props.img
            var redirectLink=this.props.redirect
            const READMORE= <Translate type="text" content="projectSection.READMORE"/>
        return (
            <div className="col-xs-12 col-sm-4">

                        <div className="card">
                            <Link to={redirectLink} className="img-card" > <img src={imageLink} /></Link>                  

                            <div className="card-content">
                                <h4 className="card-title">
                                  <Link to={redirectLink} >{this.props.title}</Link>
                                </h4>
                                <p className="">
                                {this.props.description}
                                </p>
                            </div>

                            <div className="card-read-more">
                                 <Link to={redirectLink} className="btn btn-link btn-block" >{READMORE}</Link>
                            </div>
                        </div>
                    </div>
        );
    }
}

export default ProjectSection;