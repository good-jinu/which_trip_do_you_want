import React from 'react';
import { ChatBot, TipExplainer } from './section';
import './MainSection.css';

class MainSection extends React.Component {
    render() {
        return (
        <section id="section">
            <nav>
                <TipExplainer/>
            </nav>
            <ChatBot/>
        </section>
        );
    }
}

export default MainSection;