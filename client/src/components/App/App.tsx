import React from 'react';
import './App.scss';
import Navbar from '../Navbar/Navbar';
import SecTable from "../SecTable/SecTable";

export class App extends React.Component<any, any> {
  render() {
    return (
      <div className='App'>
        <Navbar/>
        <SecTable></SecTable>
      </div>
    );
  }
}

export default App;
