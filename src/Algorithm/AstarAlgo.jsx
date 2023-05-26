function AstarAlgo(startNode, endNode) {
    let openSet = [];
    let closeSet = [];
    let path = [];
    let visitedNode = []

    openSet.push(startNode);

    while (openSet.length > 0) {
        let leastIndex = 0
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[leastIndex].f) {
                leastIndex = i;
            }
        }

        let current = openSet[leastIndex];
        visitedNode.push(current);
        if (current === endNode) {

            let temp = current;
            path.push(temp);
            while(temp.previous){
                path.push(temp.previous);
                temp = temp.previous;
            }
            return {path,visitedNode}
        }

        openSet = openSet.filter(elem => elem !== current);
        closeSet.push(current);

        let neighbours = current.neighbours;
        for (let i = 0; i < neighbours.length; i++) {
            let neighbour = neighbours[i];
            if (!closeSet.includes(neighbour) && !neighbour.isWall) {
                let tempG = current.g + 1;
                let newPath = false;
                if (openSet.includes(neighbour)) {
                    neighbour.g = tempG;
                    newPath = true;
                } else {
                    neighbour.g = tempG;
                    newPath = true;
                    openSet.push(neighbour);
                }

                if (newPath) {
                    neighbour.h = heruistic(neighbour, endNode);
                    neighbour.f = neighbour.g + neighbour.h;
                    neighbour.previous = current;
                }

            }

        }
    }
    return {path,visitedNode, error : "no path found"}
}


function heruistic(a, b) {
    const d = Math.abs(a.x - a.y) + Math.abs(b.x - b.y);
    return d
}

export default AstarAlgo;