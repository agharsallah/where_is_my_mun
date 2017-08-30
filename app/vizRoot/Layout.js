import React, { Component } from 'react';
import {Link,NavLink,Route } from 'react-router';
import counterpart  from 'counterpart';
import Translate from 'react-translate-component';
import activeComponent from 'react-router-active-component'
import './layout.css'
counterpart.registerTranslations('en',require('./../../locales/en'));
counterpart.registerTranslations('fr',require('./../../locales/fr'));
counterpart.registerTranslations('ar',require('./../../locales/ar'));

class Layout extends Component {
    	constructor(props) {
            super(props);
            this.state = {
                value: 'en'
            };
        }
        componentWillMount() {
          counterpart.getLocale();
        }
        handleClick (event) {
            this.setState({event})
            counterpart.setLocale(event);
    	};
    render() {
        const sitetitle= <Translate type="text" content="navbar.sitetitle"/>
		const viz = <Translate type="text" content="navbar.viz"/>
		const about = <Translate type="text" content="navbar.about"/>
		const en = <Translate type="text" content="navbar.en"/>
		const fr = <Translate type="text" content="navbar.fr"/>
		const ar = <Translate type="text" content="navbar.ar"/>
		const language = <Translate type="text" content="navbar.language"/>
       let NavItem = activeComponent('li');	

        return (
            <div className="navbar navbar-inverse navbar-fixed-top">
            <div className="container">
                <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <Link className="navbar-brand" to='/' >{sitetitle}</Link>
                </div>
                <div className="navbar-collapse collapse">
                <ul className="nav navbar-nav navbar-right">
                    <NavItem to='/' >{viz}</NavItem>
                    <NavItem to='/about'  >{about}</NavItem>
                    <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{language}<span className="caret"></span></a>
                        <ul className="dropdown-menu">
                            <li><a href="#" onClick={this.handleClick.bind(this,"en")}>{en}</a></li>
                            <li><a href="#" onClick={this.handleClick.bind(this,"fr")}>{fr}</a></li>
                            <li><a href="#" onClick={this.handleClick.bind(this,"ar")}>{ar}</a></li> 
                        </ul>
                    </li>
                </ul>
                </div>
            </div>
            </div>
        );
    }
}

export default Layout;