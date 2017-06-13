import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios' ;
import { indexOf } from 'underscore';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import counterpart  from 'counterpart';
import Translate    from 'react-translate-component';
const _t = Translate.translate;
counterpart.registerTranslations('en',require('./../locales/en'));
counterpart.registerTranslations('fr',require('./../locales/fr'));
counterpart.registerTranslations('ar',require('./../locales/ar'));
const gouvernorates =["Ariana","Beja","BenArous","Bizerte","Gabes","Gafsa","Jendouba","Kairouan","Kasserine","Kebili","Mannouba","Kef","Mahdia","Medenine","Monastir","Nabeul","Sfax","SidiBouzid","Siliana","Sousse","Tataouine","Tozeur","Tunis","Zaghouan"]

class App extends Component {
    
    constructor(props){
        super(props);
         this.state=({gouv:'',disabled:true})
    }
    
    componentWillMount() {
        counterpart.setLocale('ar');
    }
    handleTranslation(e){
        console.log(e.target.dataset.value);
        counterpart.setLocale(e.target.dataset.value)
    }
    ChosenGouv(chosenRequest){
 
        this.setState({gouv:chosenRequest});
        console.log(chosenRequest);
        if (indexOf(gouvernorates, chosenRequest)!=-1) {
            this.setState({disabled:false});
        }else{
         this.setState({disabled:true});   
        }
        
    }
    handleClick(){
        //send value from the input to parent
        console.log("click",this.state.gouv);
        let qString="http://mymunicipality.nadhra.tn:3000/api/isie/"+this.state.gouv;
        axios({
            method: 'get',
            url: qString,
            headers: {
                'name': 'Isie',
                'password': 'Isie@ndDi'
            }
        })
    .then(response=>{
        //console.log(response.data.data)
                console.log('we got data frm db');
                console.log(response);
         this.props.getGouv(response.data.data)
        }
    )
    .catch(function (error) {
        console.log(error);
    });           
    }

    render() {
        return (
   <div>
   <div>
        <IconButton onTouchTap={this.handleTranslation.bind(this)} tooltip="Arabic">
            <FontIcon className="flag-icon flag-icon-tn" data-value='ar'/>
        </IconButton>

         <IconButton onTouchTap={this.handleTranslation.bind(this)} tooltip="French">
            <FontIcon className="flag-icon flag-icon-fr" data-value='fr'/>
        </IconButton>

         <IconButton onTouchTap={this.handleTranslation.bind(this)} tooltip="English">
            <FontIcon className="flag-icon flag-icon-gb" data-value='en'/>
        </IconButton>
    </div>
   <div className="row titleTop">
   
				<div className="col-md-8 col-md-offset-2 text-center gtco-heading">
					<h2>{_t('AutoSuggest.Title')}</h2>
					<p>{_t('AutoSuggest.SubTitle')}</p>
				</div>
			</div>
    <div className="col-md-12">
        <div className="col-md-2"></div>
        
        <div className="col-md-7">
        <AutoComplete
          dataSource={gouvernorates}
          filter={AutoComplete.fuzzyFilter}
          maxSearchResults={5}
          floatingLabelText={_t('AutoSuggest.InputGuide')}
          fullWidth={true}
          onNewRequest={this.ChosenGouv.bind(this)}
        />
        </div>

        <div className="col-md-1" style={{marginTop:"3%"}}>
         <RaisedButton onTouchTap={this.handleClick.bind(this)} disabled={this.state.disabled} label={_t('AutoSuggest.SubmitButton')}  />
        </div>

         <div className="col-md-2"></div>
      </div>
      
    <div className="footer">
      <div className="footercontainer">
              <a href='#'><img src="/img/ISIE.PNG" className="fa btn btn-space" alt="DI" height="80" width="150"/></a>
              
      </div>
    </div>

    </div>
        );
    }
}

export default App;