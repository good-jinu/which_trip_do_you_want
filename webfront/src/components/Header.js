import React from 'react';
import './Header.css';

class Header extends React.Component {
  constructor(props)
  {
    super(props);
    this.handle_thememode = this.handle_thememode.bind(this);
  }

  handle_thememode(e) {
    this.props.thememode_callback();
  }
  
  render() {
    return (
        <header id="header">
            <h1>관광지 추천 봇</h1>
            <input type="checkbox" id="switch" onChange={this.handle_thememode} /><label for="switch">Dark mode</label>
        </header>
    );
  }
}

export default Header;