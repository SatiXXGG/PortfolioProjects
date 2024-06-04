import { useState } from "react";
import "./App.css";
import Button from "./components/button";
import { evaluate } from "mathjs";
import { BUTTON_LIST } from "./variables/calculator";

function App() {
  const [result, setResult] = useState("0");
  const [currentOp, setCurrentOp] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  const handleButtonClick = (character: string) => {
    setResult("0");
    setCurrentOp((oldValue) => oldValue + character);
  };

  const handleResult = () => {
    const regex = /^[0-9+\-*/().\s]+$/;

    if (regex.test(currentOp)) {
      try {
        const result: number = evaluate(currentOp);
        const lastValue = history[history.length - 1];

        if (lastValue !== result.toString() && lastValue !== currentOp) {
          setHistory((oldValue: string[]) => [...oldValue, currentOp]);
        }

        setResult(result.toString());
        setCurrentOp(result.toString());
      } catch (error) {
        setResult("Invalid operation");
      }
    }
  };

  const renderHistoryItem = (item: string, index: number) => (
    <h2
      onClick={() => handleHistory(item)}
      key={index}
      className="text-2xl text-white text-opacity-50 px-2 py-1 truncate bg-neutral-900 my-1 rounded-md bg-opacity-50 hover:bg-opacity-100 transition-colors duration-200 cursor-pointer customOverflow"
    >
      {item}
    </h2>
  );

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
      <section className="bg-neutral-800 w-80 px-2 py-2 rounded-md ">
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
          {BUTTON_LIST.map((character: string, index: number) => {
            return (
              <Button key={index} title={character} func={handleButtonClick}></Button>
            );
          })}
        </div>

        <div className="flex flex-row">
          <button
            id="calculate"
            onClick={handleResult}
            className="px-2 py-1 bg-green-700 text-white rounded-sm w-[15rem] h-8 mt-2"
            aria-label="calculate-result"
          >
            Calculate
          </button>
          <button
            id="calculate"
            aria-label="Clear"
            onClick={handleDelete}
            className="px-2 py-1 bg-red-700 ml-2 text-white rounded-sm w-[4rem] h-8 mt-2"
          >
            AC
          </button>
        </div>
      </section>
      <section
        id="history"
        className="bg-neutral-800 w-80   ml-5 rounded-md px-2 py-2 overflow-y-auto overflow-x-hidden"
      >
        {history.map(renderHistoryItem)}
      </section>
    </main>
  );
}

export default App;
