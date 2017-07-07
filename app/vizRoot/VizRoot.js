import React, { Component } from 'react';
import ProjectSection from './ProjectSection.js' ;
import counterpart  from 'counterpart';
import Translate    from 'react-translate-component';
import Layout from './Layout' ;
import './layout.css'

class VizRoot extends Component {
    render() {
        return (
            <div>
            <Layout/>
             <section className="wrapper">
    <div className="container-fostrap">
        <div>
            <h1 className="heading" style={{marginTop:"7%",marginBottom:"4%" }}>
                Under Development Projects 
            </h1>
        </div>
            <div className="content">
                <div className="container">
                    <div className="row">
                        <ProjectSection img="universities.png" redirect="viz/dailyreg" title="Tunisia Election data" description="Election data is a repository of Tunisia's Election Data, which is done in order to make data driven stratigy by the Tunisian election observers 'Mourakiboun'" />
                        <ProjectSection img="universities.png" redirect="viz/dailyreg" title="Tunisia Election data" description="Election data is a repository of Tunisia's Election Data, which is done in order to make data driven stratigy by the Tunisian election observers 'Mourakiboun'" />
                    </div>
                </div>
            </div>
            </div>
            </section>
            </div>
        );
    }
}

export default VizRoot;