import React from "react";
import { calculateWinner } from "..";
import { Square } from "./square";

export class Board extends React.Component<{}, {squares:Array<string>, xIsNext: boolean}> {

    constructor(props: any) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    renderSquare(i: number) {
      return <Square 
        value={this.state.squares[i]}
        onClick={()=>this.handleClick(i)} />;
    }

    handleClick(i: number) {
        const squares = this.state.squares.slice(); // create a copy of the array
        if (calculateWinner(squares) || squares[i]) {
            return;
        }      
        squares[i] = this.state.xIsNext? 'X': 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }
  
    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
          status = 'Winner: ' + winner;
        } else {
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }    
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }