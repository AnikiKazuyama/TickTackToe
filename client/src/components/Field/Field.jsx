import React, { Component } from 'react';

import CSSModules from 'react-css-modules';

import styles from './style.scss';

class Field extends Component {
    render() {
        return(
            <div className="field-container">
                { this.renderField(3, 3) }
            </div>
        );
    }

    renderField(rowCount, colCount){

        let rows = [];

        for(let i = 0; i < rowCount; i++){
            rows.push(<div className="field-row">
                { this.renderCol(colCount) }   
            </div>)
        }

        return rows;
    }

    renderCol(colCount){
        let cols = [];

        for(let i = 0; i < colCount; i++){
            cols.push(<div className="field-col"></div>)
        }

        return cols;
    }
}

export default CSSModules(Field, styles);