import React from 'react';
import axios from 'axios';
import './MainSection.css';

class MainSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            chatbot: []
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleKeyPress(event){
        if(event.key == 'Enter'){
            this.handleSubmit();
        }
    }
    
    handleSubmit() {
        this.setState({value: ''});
        axios({
            method:'post',
            url:'/req',
            data: this.state.value,
            headers: {
                'Content-Type': 'text/plain'
            }
        })
        .then(res => {
            this.setState({chatbot: [...this.state.chatbot, res.data]});
        })
        .catch(err => {
            console.error(err);
        });
    }

    render() {
        return (
        <section id="section">
            <nav>
                nav area
            </nav>
            <article>
                <input type="text" value={this.state.value} onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
                <br/>
                <button type="submit" className="btn" onClick={this.handleSubmit}>Send</button>
                <br/>
                <ul>
                    {this.state.chatbot.map(item => (
                        <li>{item}</li>
                    ))}
                </ul>
            </article>
        </section>
        );
    }
}
  
export default MainSection;