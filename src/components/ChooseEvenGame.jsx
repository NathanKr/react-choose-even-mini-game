import React, { Component, Fragment } from "react";
import Message from "./Message";
import Item from "./Item";

class ChooseEvenGame extends Component {
  LOCAL_STORAGE_KEY = "choose_even_history_key";
  NUM_ITEMS = 10;
  ROWS = 2;
  state = { items: [], gameOver: false, gameSeconds: 0, history: [] };
  timerHandle = null;

  startCounter = () => {
    this.setState({ gameSeconds: 0 });
    this.timerHandle = setInterval(() => {
      this.setState({ gameSeconds: this.state.gameSeconds + 1 });
    }, 1000);
  };

  getHistory = () => {
    let jsonHistory = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    return jsonHistory ? JSON.parse(jsonHistory) : [];
  };

  appendToHistory = (secondsElapsed) => {
    let historyArray = this.getHistory();
    historyArray.push(secondsElapsed);
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(historyArray));
  };

  stopTimer = () => {
    clearInterval(this.timerHandle);
    this.timerHandle = null;
  };

  isAllOdd = items => {
    const foundEven = items.find((it) => this.isEven(it.number));
    return !foundEven;
  };

  startGame = () => {
    let items;
    do {
      items = this.shuffle();
    } while (this.isAllOdd(items)); //7/12/2021 : fixed from !
    this.startCounter();
  };

  isEven = (number) => number % 2 == 0;

  isGameOver = () => {
    for (let index = 0; index < this.state.items.length; index++) {
      const item = this.state.items[index];
      if (this.isEven(item.number) && !item.clicked) {
        //even and not clicked
        return false;
      }
    }

    return true;
  };

  stopGame = () => {
    this.stopTimer();
    this.appendToHistory(this.state.gameSeconds);
  };

  shuffle() {
    const items = [];
    for (let index = 0; index < this.NUM_ITEMS; index++) {
      const item = {
        number: 1 + Math.floor(Math.random() * 20),
        clicked: false,
      };
      items.push(item);
    }
    this.setState({ items });
    return items;
  }

  render() {
    const { items, gameOver, gameSeconds } = this.state;
    const elements = items.map((item, index) => (
      <Fragment key={index}>
      <Item
        clicked={item.clicked}
        
        number={item.number}
        clickHandler={() => {
          // --- item.clicked = true; --> 7/12/2021 : do not muatate state directly, 
          // --- fixed below by using newItems
          const newItems = [...items]
          newItems[index].clicked = true;
          this.setState({ items : newItems, gameOver: this.isGameOver() });
          if (!this.isEven(item.number)) {
            // --- punish
            this.setState({ gameSeconds: gameSeconds + 1 });
          }
          if (this.isGameOver()) {
            this.stopGame();
          }
        }}
      />
      {(index + 1)% (this.NUM_ITEMS / this.ROWS) == 0 ? <br /> : ''}
      </Fragment>
    ));

    const history = (
      <Fragment>
        <button
          onClick={() => {
            this.setState({ history: this.getHistory() });
          }}
        >
          Show History
        </button>
        {this.state.history.map((it, index) => (
          <p key={index}>{it}</p>
        ))}
      </Fragment>
    );

    return (
      <>
        <h2>Click even</h2>
        <button disabled={!this.isGameOver()} onClick={this.startGame}>
          Start
        </button>
        <br />
        {elements}
        <Message gameOver={gameOver} gameSeconds={gameSeconds} />
        {history}
      </>
    );
  }
}

export default ChooseEvenGame;
