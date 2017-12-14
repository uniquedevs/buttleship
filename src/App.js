import React, {Component} from 'react';
import './App.css';
import {shipGenerator} from './ShipGenerator';
import {BOARD_SIZE, STATE_MAP} from './config';
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
        this.setState({board : this.generateBoard()});
    }

    generateBoard() {
        let rows = [];
        for (let i = 0; i < BOARD_SIZE; i++) {
            let cells = [];
            for (let j = 0; j < BOARD_SIZE; j++) {
                let cell = 0;
                for (let s = 0; s < this.ships.length; s++) {
                    const ship = this.ships[s];
                    for (let c = 0; c < ship.length; c++) {
                        if (ship[c][0] === i && ship[c][1] === j) {
                            cell = s + 1;
                        }
                    }
                }
                cells.push(cell);
            }
            rows.push(cells);
        }
        return rows;
    }

    clickFire() {
        const   row = Math.floor(Math.random() * BOARD_SIZE),
                col = Math.floor(Math.random() * BOARD_SIZE),
                board = this.state.board
        ;
        let new_board = [...board],
            cell = new_board[row][col]
        ;
        if (cell === 0) {
            new_board[row][col] = BOARD_SIZE * BOARD_SIZE + 2;
        } else if (cell === BOARD_SIZE * BOARD_SIZE + 2 || cell === BOARD_SIZE * BOARD_SIZE + 1) {
            return this.clickFire();
        } else if (cell > 0 && cell <= this.ships.length) {
            new_board[row][col] = BOARD_SIZE * BOARD_SIZE + 1;
        }

        this.setState({board : new_board});
    }

    hit() {

    }

    render() {
        let board = this.state.board;

        return (
            <div>
                <div className="App">
                    {board.map( (row, r_idx) => {
                        return (<div className="row" key={r_idx}>
                        { row.map( (cell, c_idx) => (<Dot key={c_idx} status={STATE_MAP[cell]} val={cell}/>)) }
                        </div>)
                    })}
                </div>
                <input type="button" value="Fire!" onClick={this.clickFire.bind(this)}/>
            </div>
        );
    }
}

export default App;
