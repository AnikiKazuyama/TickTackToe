import React, { Component } from 'react';

import CSSModules from 'react-css-modules';

import styles from './style.scss';

import ApiServices from '../../utils/ApiService';

class User extends Component {
    
    render() {
        return(
            <section className="wrapper-profile">
                <div className="profile">
                    <header>
                        <div className="avatar"></div>
                        <div className="info">
                            <h3>{this.props.username}</h3>
                            <span>ONLINE</span>
                        </div>
                    </header>
                    <main>
                        <button onClick={ this.props.exit }>Выйти</button>
                        <button onClick={ this.props.enter }>Войти в комнату</button>
                    </main>
                </div>
            </section>
        );
    }
}

export default CSSModules(User, styles);