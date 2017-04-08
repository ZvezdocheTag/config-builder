import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'

const Aside = () => {
    return (
        <aside className="result">
            <h2>Result</h2>
            <div className="result__form">
                <code className="result__code">
                    var hello = "Hello world"

                    function hi() {
                        `alert(hello)`
                    }
                </code>
            </div>

        </aside>   
    )
}

const Container = () => {
    return(
        <div className="generator">
            <h2>Generator</h2>
        </div> 
    )
}

const Card = () => {
    return (
        <div className="card"></div>
    )
}

class Content extends Component {

    constructor() {
        super();
        this.state = {
            gists: null,
            text: this.text || ' Hello '
        }
        // EVENT SHOULD BE BINDING IN CONSTRUCTOR
        this.handlerS = this.handlerS.bind(this)
    }


    handlerS(e) {

        for(let key in this.state.gists) {
            console.log(this.state.gists[key])
        }

    }
    componentDidMount() {
        const myHeader = new Headers();

        var myInit = {
            method: 'GET',
            headers: myHeader,
            mode: 'cors',
            cache: 'default'
        }
        fetch('https://raw.githubusercontent.com/stylelint/stylelint/9c7c38a7785fbfeb96fff1f75b68b5babb960847/lib/rules/index.js', myInit)
        .then(res => {
            return res.text();
        })
        .then(gists => {
            let cut = gists.match(/{([^}]*)}/gi)[0];
            console.log(cut.slice(1, cut.length -1 ).split(','))
            this.setState({ gists })
        })
    }
    render() {
        const st = this.state;
        console.log(this.state)
        return (
            <div className="main-content">
                <button onClick={ this.handlerS }>  CLICK  </button>
                <p> {this.state.text }</p>
                <Container /> 
                <Aside />
            </div>
        );
    }
}

Content.propTypes = {

};

export default Content;