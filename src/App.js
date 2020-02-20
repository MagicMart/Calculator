import React from "react";
import "./styles.css";

function Display({ input }) {
  return <div className="display">{Number(input)}</div>;
}

function Calculator() {
  const [input, setInput] = React.useState(["0"]);

  const totalCalc = () => {
    const operations = {
      "+": (x, y) => x + y,
      "-": (x, y) => x - y,
      x: (x, y) => x * y,
      "/": (x, y) => x / y
    };
    const [x, o, y] = input;
    return operations[o](Number(x), Number(y));
  };

  const numberClick = e => {
    const val = e.target.value;
    setInput(c => {
      const [x, op, y = "0"] = c;
      // a space will indicate end of input of x
      if (x.slice(-1) === " " && op === undefined) {
        // start again with fresh number
        return ["0" + val];
      } else if (op === undefined) {
        if (val === "." && x.includes(".")) return c;
        return [x + val];
      } else {
        if (val === "." && y.includes(".")) return c;
        return [x, op, y + val];
      }
    });
  };
  const handleOperation = e => {
    const val = e.target.value;
    setInput(c => {
      const [x, , y] = c;
      if (y !== undefined) {
        return [String(totalCalc()), val];
      }
      return [x, val];
    });
  };

  const equals = () => {
    setInput(c => {
      if (c.length !== 3) {
        return c;
      } else {
        // add a space on the end to indicate end of input
        return [String(totalCalc()) + " "];
      }
    });
  };

  const percent = () => {
    if (input.length !== 3) {
      return;
    }
  };

  const clear = () => {
    setInput(["0"]);
  };
  return (
    <div className="container">
      <Display input={input[2] || input[0]} />
      <div className="row">
        <input onClick={numberClick} type="button" value="7" />
        <input onClick={numberClick} type="button" value="8" />
        <input onClick={numberClick} type="button" value="9" />
        <input onClick={handleOperation} type="button" value="+" />
        <input onClick={handleOperation} type="button" value="-" />
      </div>
      <div className="row">
        <input onClick={numberClick} type="button" value="4" />
        <input onClick={numberClick} type="button" value="5" />
        <input onClick={numberClick} type="button" value="6" />
        <input onClick={handleOperation} type="button" value="x" />
        <input onClick={handleOperation} type="button" value="/" />
      </div>
      <div className="row">
        <input onClick={numberClick} type="button" value="1" />
        <input onClick={numberClick} type="button" value="2" />
        <input onClick={numberClick} type="button" value="3" />
        <input onClick={equals} type="button" value="=" />
        <input onClick={clear} type="button" value="C" />
      </div>
      <div className="row">
        <input onClick={numberClick} type="button" value="0" />
        <input onClick={numberClick} type="button" value="00" />
        <input onClick={numberClick} type="button" value="." />
        <input onClick={percent} type="button" value="%" />
      </div>
    </div>
  );
}

export default Calculator;
