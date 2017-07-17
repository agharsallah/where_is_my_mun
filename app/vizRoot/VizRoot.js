import React, { Component } from 'react';
import ProjectSection from './ProjectSection.js' ;
import Translate    from 'react-translate-component';
const _t = Translate.translate;
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
                            {_t('vizroot.title')} {/*raw data to viz*/}
                        </h1>
                    </div>

                    <div className="content">
                        <div className="container">
                            <div className="row">
                                <ProjectSection img="newmun.PNG" redirect="viz/detailedgov" title="Registered Citizens per Sexe & Age" description="Visualizing registered citizens per Age and Sexe until 10-07-2017 - (data provided by ISIE)" />
                                <ProjectSection img="daily_reg.PNG" redirect="viz/dailyregcharts" title="Daily Registration Number (Charts)  " description="Analyzing the registration and updates of the municipal election density in Time -data Daily updatable- (data provided by ISIE)" />
                                <ProjectSection img="daily_reg.PNG" redirect="viz/dailyreg" title="Daily Registration Number (gouvernorate map) " description="Analyzing the distribution of the registration and updates in the municipal election -data Daily updatable- (data provided by ISIE)" />
                            </div>
                             <div className="row">
                                <ProjectSection img="newmun.PNG" redirect="viz/newmun" title="Municipalities Insight" description="Get insight about the municipalities Old, New, Extended ones" />
                                <ProjectSection img="statistics.PNG" redirect="viz/statistics" title="Municipalities filter" description="Filter the 350 municipalities based on Population and Area" />
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