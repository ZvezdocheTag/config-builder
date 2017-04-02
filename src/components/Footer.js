import React, { Component } from 'react';

class Footer extends Component {

    handle = (text) => {
            
            this.props.actions.addRule(text)
    }

    showState = () => {
        console.log(this.props.generator)
    }

    render() {
        
        return (
            <footer>
                    <div className="this">
                        <h2>this is footer</h2>
                    </div>
                    <Button action={this.props} onSave={ this.handle } />
                    <button onClick={ this.showState }>Show state</button>
            </footer>
        );
    }
}

class Button extends Component {
    state = {
        text: this.props.text || ' Suleman '
    }

   btnH = () => {
       const text = this.state.text;
       this.props.onSave(text)
    //    console.log(this.props)
    }

    handleInput = (e) => {
        this.setState({ text: e.target.value })
    }

    render() {
            return (
        <div>
            <input type="text" onChange={ this.handleInput } />
            <button onClick={ this.btnH }>hello</button>
            </div>
    )
    }
}


export default Footer;