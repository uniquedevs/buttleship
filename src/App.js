import React, {Component} from 'react';
import './App.css';
import {shipGenerator} from './ShipGenerator';
import {BOARD_SIZE} from './config';
import Dot from './Dot';


class App extends Component {
    ships = [];
    state = {
        board : []
    };

    componentDidMount() {
        shipGenerator.placeShip(5)
            .placeShip(5, 'L')
            .placeShip(1)
            .placeShip(1);

        this.ships = shipGenerator.ships;

        console.log(this.generateBoard());
    }

    generateBoard() {
        let rows = [],
            ships_cells = [].concat(...this.ships);
        console.log(ships_cells);
        for (let i = 0; i < BOARD_SIZE; i++) {
            let cells = [];
            for (let j = 0; j < BOARD_SIZE; j++) {
                let cell = 0;
                for (let s = 0; s < ships_cells.length; s++) {
                    if (ships_cells[s][0] === i && ships_cells[s][1] === j) {
                        cell = 1;
                    }
                }
                cells.push(cell);
            }
            rows.push(cells);
        }
        return rows;
    }

    render() {
        let rows = [];
        for (let i = 0; i < BOARD_SIZE; i++) {
            let cell = [];
            for (let j = 0; j < BOARD_SIZE; j++) {
                cell.push(<Dot key={j}/>);
            }
            rows.push(<div key={i} className="row">{cell}</div>);
        }
        return (
            <div className="App">
                {rows}
            </div>
        );
    }
}

export default App;
