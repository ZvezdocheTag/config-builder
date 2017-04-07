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
    render() {
        return (
            <div className="main-content">
                <Container /> 
                <Aside />
            </div>
        );
    }
}

Content.propTypes = {

};

export default Content;