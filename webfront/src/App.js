import React from 'react';
import { Header, MainSection } from "./components";
import './App.css';

class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      classname: "light_mode"
    };
  }

  render() {
    return (
      <div className={this.state.classname} id="App">
        <Header thememode_callback={() => {
          if(this.state.classname == "light_mode")
          {
            this.setState({ classname: "dark_mode"});
          }
          else if(this.state.classname == "dark_mode")
          {
            this.setState({classname: "light_mode"});
          }
        }}/>
        <MainSection/>
      </div>
    );
  }
}

export default App;
