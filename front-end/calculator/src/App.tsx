import { useState } from "react";
import "./App.css";
import Button from "./components/button";

function App() {
  const [result, setResult] = useState("0");
  const [currentOp, setCurrentOp] = useState("");
  const [history, setHistory] = useState([]);

  const handleButtonClick = (character: string) => {
    setResult("0");
    setCurrentOp((oldValue) => oldValue + character);
  };

  const handleResult = () => {
    const regex = /^[0-9+\-*/().\s]+$/;

    if (regex.test(currentOp)) {
      try {
        const result: number = eval(currentOp);
        const lastValue = history[history.length - 1];

        if (lastValue !== result && lastValue !== currentOp) {
          setHistory((oldValue) => [...oldValue, currentOp]);
        }

        setResult(result.toString());
        setCurrentOp(result.toString());
      } catch (error) {
        setResult("Error");
      }
    }
  };

  const handleHistory = (value: string) => {
    setCurrentOp(value);
    setResult("0");
  };

  const handleDelete = () => {
    setResult("0");
    setCurrentOp("");
  };

  return (
    <main className="flex flex-row h-screen items-center justify-center">
      <section className="bg-neutral-800 w-80 px-2 py-2 rounded-md h-[25rem]">
        <h1 className="text-sm">Calculator</h1>
        <div className="w-[19rem] h-16 bg-neutral-950 py-2 px-1 rounded-md mx-auto mt-2">
          <h2 className="text-2xl justify-center h-[100%] py-1 text-white">
            {result !== "0" ? result : currentOp}
          </h2>
        </div>
        <div
          id="calculator-div"
          className="w-[19rem] mx-auto mt-2 grid grid-cols-4 bg-neutral-950 rounded-md"
        >
          <Button func={handleButtonClick} title={"1"}></Button>
          <Button func={handleButtonClick} title={"2"}></Button>
          <Button func={handleButtonClick} title={"3"}></Button>
          <Button func={handleButtonClick} title={"+"}></Button>
          <Button func={handleButtonClick} title={"4"}></Button>
          <Button func={handleButtonClick} title={"5"}></Button>
          <Button func={handleButtonClick} title={"6"}></Button>
          <Button func={handleButtonClick} title={"-"}></Button>
          <Button func={handleButtonClick} title={"7"}></Button>
          <Button func={handleButtonClick} title={"8"}></Button>
          <Button func={handleButtonClick} title={"9"}></Button>
          <Button func={handleButtonClick} title={"*"}></Button>
        </div>

        <div className="flex flex-row">
          <button
            id="calculate"
            onClick={handleResult}
            className="px-2 py-1 bg-green-700 text-white rounded-sm w-[15rem] h-8 mt-2"
          >
            Calculate
          </button>
          <button
            id="calculate"
            onClick={handleDelete}
            className="px-2 py-1 bg-red-700 ml-2 text-white rounded-sm w-[4rem] h-8 mt-2"
          >
            AC
          </button>
        </div>
      </section>
      <section
        id="history"
        className="bg-neutral-800 w-80  h-[25rem] ml-5 rounded-md px-2 py-2 overflow-y-auto overflow-x-hidden"
      >
        {history.map((item) => {
          return (
            <h2
              onClick={() => handleHistory(item)}
              className="text-2xl text-white text-opacity-50 px-2 py-1 truncate bg-neutral-900 my-1 rounded-md bg-opacity-50 hover:bg-opacity-100 transition-colors duration-200 cursor-pointer customOverflow"
            >
              {item}
            </h2>
          );
        })}
      </section>
    </main>
  );
}

export default App;
