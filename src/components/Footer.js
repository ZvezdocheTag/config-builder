import React, { Component } from 'react';

class Footer extends Component {

    handle = (id, text) => {
            
            this.props.actions.addRule(text)
    }

    render() {
        console.log(this.props)
        return (
            <footer>
                    <div className="this">
                        <h2>this is footer</h2>
                    </div>
                    <Button action={this.props} onSave={ this.handle } />
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