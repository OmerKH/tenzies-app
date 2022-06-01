import "./App.css";
import { nanoid } from "nanoid";
import Die from "./components/Die";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(newDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const sameVal = dice.every((die) => die.value === firstValue);
    if (allHeld && sameVal) {
      setTenzies(true);
    }
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function newDice() {
    const diceArray = [];
    for (let i = 0; i < 10; i++) {
      diceArray.push(generateNewDie());
    }
    return diceArray;
  }

  const rollDice = () => {
    if (!tenzies) {
      setDice((prevDice) =>
        prevDice.map((qube) => {
          return qube.isHeld ? qube : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      setDice(newDice());
    }
  };

  const holdDice = (id) => {
    setDice((prevDice) =>
      prevDice.map((qube) => {
        return id === qube.id ? { ...qube, isHeld: !qube.isHeld } : qube;
      })
    );
  };

  const myDice = dice.map((die) => {
    return (
      <Die
        value={die.value}
        key={die.id}
        isHeld={die.isHeld}
        holdDice={() => holdDice(die.id)}
      />
    );
  });

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{myDice} </div>
      <button className="rolling" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
