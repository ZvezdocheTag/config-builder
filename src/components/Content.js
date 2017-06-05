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

const Card = (props, chooseValue) => {
    // let item = props.value
    let data = props.data;
    let value;

    if(data.hasOwnProperty('value')) {
            value = data.value

    } else {
        value = ["No result"]
    }

    console.log(chooseValue)
    return (
        <div className="card">
            <div className="card__count">{data.id}</div>
            <div className="card__name">{data.name}</div>
            <ul>
   
                { typeof data["sub"] !== "undefined" ? data.code.map((item, i) => <li key={i}>
                    <div>{item.title}</div>
                    <div>{item.code}</div>
                    </li>)  : <li></li>}
            </ul>
        </div>
    )
}

class Content extends Component {

    constructor() {
        super();
        this.state = {
            gists: null,
            text: [],
            currentCard: 0,
            plus: function() {
               
            }
        }
        // EVENT SHOULD BE BINDING IN CONSTRUCTOR
        this.handlerS = this.handlerS.bind(this)
    }

    cuts(arr) {
        let res = arr.map((item, i) => {
            let index = item.indexOf(':');
            let rule;
            let value;
            let obj = {};
            // console.log(item)
            if(index !== -1) {
                rule = item.slice(0, index).trim();
                value = item.slice(index + 1, item.length).trim();
                
                if(value.indexOf('|') !== -1) {
                    value = value.split('|');
                }
                obj['name'] = rule;
                obj['value'] = value;
                obj['id'] = i;
                 
                return obj;
            }
            return item;
        })

        return res;
    } 

    parseValue(arr) {
        return arr;
    }

    handlerS(e) {
        console.log(e.target, "PROP")
        this.setState({
            currentCard: this.state.currentCard + 1
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
        fetch('/message.json')
        .then(res => {
            return res.json();
        })
        .then(gists => {
            this.setState({ text: this.parseValue(gists) })
            return gists;
        })


    }
    render() {
        const func = this.handlerS
        const chooseValue = this.chooseValue
        const st = this.state;
        const data = st.text.length ? st.text : [{ name: "DATA DONT LOAD"}]
        // console.log(chooseValue)
        return (
            <div className="main-content">
                <button onClick={ this.handlerS }>  CLICK  </button>
                <ul>
                    <Card data={data[st.currentCard]}></Card>
                </ul>
                <Aside />
            </div>
        );
    }
}

Content.propTypes = {

};

export default Content;

