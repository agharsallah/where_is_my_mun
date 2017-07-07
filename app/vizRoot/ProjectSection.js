import React, { Component } from 'react';

import counterpart  from 'counterpart';
import Translate    from 'react-translate-component';
import './sectionStyle.css'

class ProjectSection extends Component {
    
    render() {
            var imageLink="/img/"+this.props.img
            var redirectLink=this.props.redirect
        return (
            <div className="col-xs-12 col-sm-4">
                        <div className="card">
                            <a className="img-card" href={redirectLink}>
                            <img src={imageLink} />
                          </a>
                            <div className="card-content">
                                <h4 className="card-title">
                                    <a href={redirectLink}>{this.props.title}
                                  </a>
                                </h4>
                                <p className="">
                                {this.props.description}
                                </p>
                            </div>
                            <div className="card-read-more">
                                <a href={redirectLink} className="btn btn-link btn-block">
                                    Read More
                                </a>
                            </div>
                        </div>
                    </div>
        );
    }
}

export default ProjectSection;