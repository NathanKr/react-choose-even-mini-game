import "./App.css";
import React, { Component } from "react";

class App extends Component {
  // ********* Task ChooseEven
  // --- rand 10 numbers integer between 1,20
  // --- show them on the dom on a row
  // --- start clock
  // --- click all even numbers and mark per click (greyed ? disabled ?)
  // --- show elapsed second and 'Game Over' after success

  // ******** advanced
  // --- click odd number will punish by adding 1 sec to the time
  // --- put time in history (local storage)
  // --- show history
  // --- show items in two rows
  // --- start button
  // --- display elapsed seconds and 'Game Over' in Message component
  // --- display each number in Item component

  // *********** Design
  // --- state ?
  // --- props ?
  // --- component  ?

  NUM_ITEMS = 10;
  state = { items: [], gameOver: false, gameSeconds: 0 };
  timerHandle = null;

  startCounter = () => {
    this.setState({ gameSeconds: 0 });
    this.timerHandle = setInterval(() => {
      this.setState({ gameSeconds: this.state.gameSeconds + 1 });
    }, 1000);
  };

  stopTimer = () => {
    clearInterval(this.timerHandle);
    this.timerHandle = null;
  };

  startGame = () => {
    this.startCounter();
    const items = [];
    for (let index = 0; index < this.NUM_ITEMS; index++) {
      const item = {
        number: 1 + Math.floor(Math.random() * 20),
        clicked: false,
      };
      items.push(item);
    }
    this.setState({ items });
  };

  componentDidMount() {
    this.startGame();
  }

  isGameOver = () => {
    for (let index = 0; index < this.state.items.length; index++) {
      const item = this.state.items[index];
      if (item.number % 2 == 0) {
        //even
        if (!item.clicked) {
          return false;
        }
      }
    }

    return true;
  };

  stopGame = () => {
    this.stopTimer();
  };

  render() {
    const { items, gameOver, gameSeconds } = this.state;
    const elements = items.map((item, index) => (
      <button
        disabled={item.clicked}
        onClick={() => {
          items[index].clicked = true;
          this.setState({ items, gameOver: this.isGameOver() });
          if (this.isGameOver()) {
            this.stopGame();
          }
        }}
        key={index}
      >
        {item.number}
      </button>
    ));

    return (
      <div className="App">
        <h2>Click even</h2>
        {elements}
        <p>seconds : {gameSeconds}</p>
        {gameOver ? <h5>Game over</h5> : ""}
      </div>
    );
  }
}

export default App;
