import Separator from "./components/Separator";
import Subtitle from "./components/Subtitle";
import SimpleButton from "./components/buttons/SimpleButtons";
import SimpleInput from "./components/inputs/SimpleInput";

function App() {
  return (
    <div className="flex flex-col">
      <h1 className="mt-12 font-bold text-3xl text-blue-600">
        Welcome to CSS animations components.
      </h1>
      <p className="mt-2 text-md  px-12">
        This project is for practice my CSS abilities in general, feel free to try
        anything, the code of everything here is also in GitHub.
      </p>
      <Separator />
      <Subtitle title="Inputs" />

      <SimpleInput />
      <Separator />
      <Subtitle title="Buttons" />
      <SimpleButton />
      <Separator />
      <Subtitle title="Custom elements" />
      <p className="mt-2 text-md  px-12">Some items doesnt have interactivity 💀</p>
    </div>
  );
}

export default App;
