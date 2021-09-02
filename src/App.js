import { nanoid } from "nanoid";
import { useState, useMemo } from "react";
import { Button, Grid } from "@material-ui/core";
import "./null_styles.css";
import "./App.css";

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let array = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
let arr = shuffle(array);

function App() {
  let [resultArr, setResultArr] = useState([]);
  let [shuffledArray, setShuffledArray] = useState([]);

  let preveusClickNumber = null;
  let prevIndex = null;

  function handleClick(number, e, index) {
    if (prevIndex === index) {
      preveusClickNumber = null;
      prevIndex = null;
    }
    if (preveusClickNumber === null) {
      preveusClickNumber = number;
      prevIndex = index;
      e.target.classList.add("targeted");
    } else {
      if (preveusClickNumber === number) {
        setResultArr([...resultArr, number]);
      } else {
        e.target.classList.add("secTarget");
        setTimeout(() => {
          setResultArr([...resultArr]);
        }, 500);
      }
      preveusClickNumber = null;
      prevIndex = null;
    }
  }

  useMemo(() => {
    setShuffledArray(
      arr.map((item, index) =>
        resultArr.includes(item) ? (
          <Grid item xs={3} key={nanoid()} className="colored">
            {item}
          </Grid>
        ) : (
          <Grid
            item
            xs={3}
            key={nanoid()}
            className="item"
            onClick={(e) => handleClick(item, e, index)}
          >
            {item}
          </Grid>
        )
      )
    );
  }, [resultArr]);

  if (resultArr.length === arr.length / 2 && resultArr.length > 0) {
    let answer = window.confirm(`Congratulations !!!\nContinue ?`);
    console.log(answer);
  }

  function handleReset() {
    setResultArr([]);
    setShuffledArray(
      shuffle(array).map((item, index) => (
        <Grid
          item
          xs={3}
          key={nanoid()}
          className="item"
          onClick={(e) => handleClick(item, e, index)}
        >
          {item}
        </Grid>
      ))
    );
  }

  return (
    <>
      <div id="field">
        <Grid container spacing={3}>
          {shuffledArray}
        </Grid>
      </div>
      <div id="btnWrapper">
        <Button onClick={handleReset} color="primary">
          Reset
        </Button>
      </div>
    </>
  );
}

export default App;
