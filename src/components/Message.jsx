import React from "react";

const Message = ({ gameOver, gameSeconds }) => {
  return (
    <>
      <p>seconds : {gameSeconds}</p>
      {gameOver ? <h5>Game over</h5> : ""}
    </>
  );
};

export default Message;
