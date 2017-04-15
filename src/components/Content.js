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

const Card = (props) => {
    // let item = props.value
    let data = props.data;
    let value;

    if(data.hasOwnProperty('value')) {
            value = data.value

    } else {
        value = ["No result"]
    }

    let handleClick = (e) => {
        console.log(props)

    }
    return (
        <div className="card" key={data.id}>
            <div className="card__count">{data.id}</div>
            <div className="card__name">{data.name}</div>
            <ul>
   
                { typeof value !== 'string' ? value.map((item, i) => <li key={i} onClick={props.pro}>{item}</li>) : <li onClick={props.pro}>{ value }</li>  }
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

    handlerS(e) {
        console.log(e.target)
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
        // fetch('https://raw.githubusercontent.com/stylelint/stylelint/9c7c38a7785fbfeb96fff1f75b68b5babb960847/lib/rules/index.js', myInit)
        fetch('https://raw.githubusercontent.com/stylelint/stylelint/9c7c38a7785fbfeb96fff1f75b68b5babb960847/docs/user-guide/example-config.md', myInit)
        .then(res => {
            return res.text();
        })
        .then(gists => {
            let cut = gists.match(/{([^]*)}/gi)[0];
            let start = '"rules":';
            let startcut = cut.indexOf(start) + start.length
            cut = cut.slice(startcut, cut.length -1 ).split(',');
            cut = cut.slice(1, cut.length - 1)

            this.setState({ text: this.cuts(cut) })
        })


    }
    render() {
        console.log(this)
        const func = this.handlerS
        const st = this.state;
        const data = st.text.length ? st.text : [{ name: "DATA DONT LOAD"}]

        return (
            <div className="main-content">
                <button onClick={ this.handlerS }>  CLICK  </button>
                <ul>
                    <Card data={data[st.currentCard]} pro={ func }></Card>
                </ul>
                {/*<Container> 
                    
                </Container> */}
                <Aside />
            </div>
        );
    }
}

Content.propTypes = {

};

export default Content;

