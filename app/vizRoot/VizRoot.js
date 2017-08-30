import React, { Component } from 'react';
import ProjectSection from './ProjectSection.js' ;
import Translate    from 'react-translate-component';
const _t = Translate.translate;
import Layout from './Layout' ;
import './layout.css'

class VizRoot extends Component {
    

    
    render() {
        const detailedRegTitle= <Translate type="text" content="vizroot.detailedRegTitle"/>
        const detailedRegDesc= <Translate type="text" content="vizroot.detailedRegDesc"/>

        const dailyRegLineTitle= <Translate type="text" content="vizroot.dailyRegLineTitle"/>
        const dailyRegLineDesc= <Translate type="text" content="vizroot.dailyRegLineDesc"/>
        
        const dailyRegTitle= <Translate type="text" content="vizroot.dailyRegTitle"/>
        const dailyRegDesc= <Translate type="text" content="vizroot.dailyRegDesc"/>
        
        const newmunTitle= <Translate type="text" content="vizroot.newmunTitle"/>
        const newmunDesc= <Translate type="text" content="vizroot.newmunDesc"/>

        const statisticsTitle= <Translate type="text" content="vizroot.statisticsTitle"/>
        const statisticsDesc= <Translate type="text" content="vizroot.statisticsDesc"/>

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
                                <ProjectSection img="detailed_reg.PNG" redirect="/detailedgov" title={detailedRegTitle} description={detailedRegDesc} />
                                <ProjectSection img="daily_reg_line.PNG" redirect="/dailyregcharts" title={dailyRegLineTitle}  description={dailyRegLineDesc} />
                                <ProjectSection img="daily_reg.PNG" redirect="/dailyreg" title={dailyRegTitle} description={dailyRegDesc} />
                            </div>
                             <div className="row">
                                <ProjectSection img="newmun.PNG" redirect="/newmun" title={newmunTitle} description={newmunDesc} />
                                <ProjectSection img="statistics.PNG" redirect="/statistics" title={statisticsTitle} description={statisticsDesc} />
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