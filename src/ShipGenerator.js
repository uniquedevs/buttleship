import {BOARD_SIZE, L_SHIP_ASPECT_RATIO} from './config';

class ShipGenerator {

    _ships = [];

    placeShip(...args) {
        const locations = ShipGenerator.generateShip(...args);
        if (this.collision(locations)) {
            this.placeShip(...args)
        } else {
            this._ships.push(locations);
        }
        return this;
    }

    static generateShip(ship_size, ship_type) {
        let direction = [1, 0],
            ship_width = ship_type === 'L' ?  Math.floor(ship_size * L_SHIP_ASPECT_RATIO) : ship_size * direction[1],
            ship_height = ship_type === 'L' ?  ship_size - ship_width : ship_size * direction[0],
            row = Math.floor(Math.random() * (BOARD_SIZE - ship_height)),
            col = Math.floor(Math.random() * (BOARD_SIZE - ship_width)),
            locations = [], i = 0
        ;

        for (i = 0; i < ship_size; i++) {
            let location = [row + i * direction[0], col + i * direction[1]],
                ship_leverage = Math.floor(ship_size * L_SHIP_ASPECT_RATIO)
                ;
            locations.push(location);
            if (ship_type === 'L' && i === ship_leverage) {
                row = row + i * direction[0] - ship_leverage * direction[1];
                col = col + i * direction[1] - ship_leverage * direction[0];
                direction = [direction[1], direction[0]];
            }
        }

        return locations;
    }

    collision(locations) {
        for (let i = 0; i < this._ships.length; i++) {
            let ship = this._ships[i];
            for (let j = 0; j < locations.length; j++) {
                if (ship.indexOf(locations[j]) >= 0) {
                    return true;
                }
            }
        }
        return false;
    }

    get ships(){
        return this._ships;
    }
}

export const shipGenerator = new ShipGenerator();