import { useState } from "react";
import "./App.css";
import Header from "./components.js/header";
import Profile from "./pages/profile";
import Typer from "./components.js/typer";
import paragraphData from "./data";

function App() {
  const [isShown, setisShown] = useState(false);
  return (
    <div className="App">
      <Header toggle={setisShown} />

      {isShown ? <Profile /> : <Typer paragraph={paragraphData} />}
    </div>
  );
}

export default App;
