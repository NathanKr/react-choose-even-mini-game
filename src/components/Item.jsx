const Item = ({ clickHandler, number , clicked}) => {
  return (
    <button disabled={clicked} onClick={clickHandler}>
      {number}
    </button>
  );
};

export default Item;
