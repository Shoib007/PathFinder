import React, { useEffect, useState } from 'react';
import './PathFinder.css';
import Node from './Node';
import AstarAlgo from '../Algorithm/AstarAlgo';

const cols = 25;
const rows = 20;

const NODE_START_ROW = 0;
const NODE_END_ROW = rows - 1;

const NODE_START_COL = 0;
const NODE_END_COL = cols - 1;





export default function PathFinder() {
    const [Grid, setGrid] = useState([]);
    const [path, setPath] = useState([]);
    const [visitedNode, setVisitedNode] = useState([]);

    useEffect(() => {
        initializerGrid();
    }, [])


    const initializerGrid = () => {
        const grid = new Array(rows);

        for (let i = 0; i < cols; i++) {
            grid[i] = new Array(cols);
        }

        createSpot(grid);
        setGrid(grid);


        addingNeighbours(grid);

        const startNode = grid[NODE_START_ROW][NODE_START_COL];
        startNode.isWall = false;
        const endNode = grid[NODE_END_ROW][NODE_END_COL];
        // startNode.isWall = false;
        let path = AstarAlgo(startNode, endNode);
        setPath(path.path);
        setVisitedNode(path.visitedNode);
    }

    const resetMatrix = () => {
        initializerGrid();

        let n = visitedNode.length;
        for (let i = 0; i < n; i++) {
            const node = visitedNode[i];
            if((node.x !== 0 && node.y !== 0) || (node.x !== n-1 && node.y !== n-1)){
                document.getElementById(`node-${node.x}-${node.y}`).className = "node";
            }
        }
    }


    const createSpot = (grid) => {

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                grid[i][j] = new Spot(i, j);
            }
        }
    }

    //Adding Neighbours to each Spot

    const addingNeighbours = (grid) => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                grid[i][j].addNeighbours(grid);
            }
        }
    }

    // Spot Constructor

    function Spot(i, j) {
        this.x = i; //row
        this.y = j; //col
        this.isStart = this.x === NODE_START_ROW && this.y === NODE_START_COL;
        this.isEnd = this.x === NODE_END_ROW && this.y === NODE_END_COL;
        this.g = 0;
        this.f = 0;
        this.h = 0;
        this.neighbours = [];
        this.previous = undefined;
        this.isWall = false;
        if (Math.random(1) < 0.2) {
            this.isWall = true
        }
        this.addNeighbours = function (grid) {
            let i = this.x
            let j = this.y;
            if (i > 0) this.neighbours.push(grid[i - 1][j]);
            if (i < rows - 1) this.neighbours.push(grid[i + 1][j]);
            if (j > 0) this.neighbours.push(grid[i][j - 1]);
            if (j < cols - 1) this.neighbours.push(grid[i][j + 1]);
        }
    }


    const gridWithNode = (
        <div>
            {
                Grid.map((row, rowIndex) => {
                    return (
                        <div key={rowIndex} className='rowWrapper'>
                            {
                                row.map((col, colIndex) => {
                                    const { isStart, isEnd, isWall } = col;
                                    return <Node key={colIndex} isStart={isStart} isEnd={isEnd} row={rowIndex} col={colIndex} isWall={isWall} spot={col} />;
                                })
                            }
                        </div>
                    );
                })
            }
        </div>
    )


    const animatePath = (shortedPath) => {
        let n = shortedPath.length;
        for (let i = 0; i < n; i++) {
            setTimeout(() => {
                const node = shortedPath[i];
                document.getElementById(`node-${node.x}-${node.y}`).className = "node node-shortest-path";
            }, 2 * i);

        }
    }

    const visualizePath = () => {
        let n = visitedNode.length;
        for (let i = 0; i <= n; i++) {
            if (i === n) {
                setTimeout(() => {
                    animatePath(path);
                }, 4 * i);
            } else {
                setTimeout(() => {
                    const node = visitedNode[i];
                    document.getElementById(`node-${node.x}-${node.y}`).className = "node node-visited";
                }, 4 * i);
            }

        }
    };


    return (
        <div className='Wrapper'>
            <h1 className='algoName' style={{ textAlign: 'center' }}> A * Algorithm <span style={{ fontSize: '0.4rem' }}>(More Stuff are being add)</span> </h1>
            <button id="algoButton" onClick={visualizePath}>Visualize</button>
            {gridWithNode}
            <div className={`${path.error === 404 ? "pathNotFound" : ""}`}>
                <button id="resetBtn" onClick={resetMatrix}>RESET</button>
            </div>
        </div>
    );
}
