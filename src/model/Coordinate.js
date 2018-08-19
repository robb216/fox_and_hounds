class Coordinate {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    equals(coordinate) {
        let result = false;
            if (this.x === coordinate.x && this.y === coordinate.y) {
                result = true;
            }
        return result;
    }

    add(coordinate) {
        const resultX = this.x + coordinate.x;
        const resultY = this.y + coordinate.y;
        
        return new Coordinate(resultX, resultY);
    }

    isValidCoordinate(boardSize = 999) {
        let result = false;

        if (this.x >= 0 && this.x < boardSize && this.y >= 0 && this.y < boardSize) {
            result = true;
        }

        return result;
    }

    getProximateSpaces(boardSize) {
        let possibleSpaces = [];
        let result = [];

        possibleSpaces.push(this.add(new Coordinate(1, 1)));
        possibleSpaces.push(this.add(new Coordinate(-1, 1)));
        possibleSpaces.push(this.add(new Coordinate(1, -1)));
        possibleSpaces.push(this.add(new Coordinate(-1, -1)));

        for (let index in possibleSpaces) {
            if (possibleSpaces[index].isValidCoordinate(boardSize)) {
                result.push(possibleSpaces[index]);
            }
        }

        return result;
    }

    getDistance(coordinate) {
        let xDistance = this.x - coordinate.x;
        let yDistance = this.y - coordinate.y;
        
        return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    }
}

export default Coordinate;