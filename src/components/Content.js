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
            text: []
        }
        // EVENT SHOULD BE BINDING IN CONSTRUCTOR
        this.handlerS = this.handlerS.bind(this)
    }


    handlerS(e) {
        let arr = this.state.gists;

        let res = arr.map((item, i) => {
            let index = item.indexOf(':');
            if(index !== -1) {
                item = item.slice(0, index);
                return item;
            }
            return item;
        })

        this.setState({
            text: res
        })


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
            cut = cut.slice(1, cut.length -1 ).split(',');
            // console.log(cut)
            this.setState({ gists: cut })
        })
    }
    render() {
        const st = this.state;
        // console.log(this.state)
        return (
            <div className="main-content">
                <button onClick={ this.handlerS }>  CLICK  </button>
                <ul>
                        {
                    this.state.text.map((item, i) => {
                        return (
                            <li key={i}>{item}</li>
                        )
                    })
                }
                </ul>
                <Container /> 
                <Aside />
            </div>
        );
    }
}

Content.propTypes = {

};

export default Content;