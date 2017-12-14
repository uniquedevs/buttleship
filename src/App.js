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
        this.init();
    }

    init() {
        shipGenerator.empty()
            .placeShip(5)
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
            new_board[row][col] = STATE_MAP['missed'];

        } else if (cell === STATE_MAP['missed'] || cell === STATE_MAP['sink']) {
            return this.clickFire();

        } else if (cell > 0 && cell <= this.ships.length) {
            new_board.forEach( (board_row, idx) => {
                new_board[idx] = board_row.map( board_cell => board_cell === cell ? STATE_MAP['sink'] : board_cell)
            });
        }

        this.setState({board : new_board});

        if (this.isComplete()) {
            window.confirm('Game over');
            return this.init();
        }
    }

    isComplete() {
        const board = this.state.board;
        for (let i = 0; i < this.ships.length; i++) {
            let ship = this.ships[i];
            for (let j = 0; j < ship.length; j++) {
                let ship_cell = ship[j];
                if (board[ship_cell[0]][ship_cell[1]] !== STATE_MAP['sink'] ) {
                    return false;
                }
            }
        }
        return true;
    }

    render() {
        let board = this.state.board,
            getState = cell => Object.keys(STATE_MAP).find( key => STATE_MAP[key] === cell)
        ;

        return (
            <div>
                <div className="App">
                    {board.map( (row, r_idx) => {
                        return (<div className="row" key={r_idx}>
                        { row.map( (cell, c_idx) => (<Dot key={c_idx} status={getState(cell)}/>)) }
                        </div>)
                    })}
                </div>
                <input type="button" value="Fire!" onClick={this.clickFire.bind(this)}/>
            </div>
        );
    }
}

export default App;
