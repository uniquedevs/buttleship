import React, {Component} from 'react';
import './App.css';
import {shipGenerator} from './ShipGenerator';

class App extends Component {
    componentDidMount() {
        shipGenerator.placeShip(5)
            .placeShip(5, 'L')
            .placeShip(1)
            .placeShip(1);

        console.log(shipGenerator.ships);
    }

    render() {
        return (
            <div className="App">
            </div>
        );
    }
}

export default App;
