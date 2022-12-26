import { useState } from "react";
import "./App.css";
import Header from "./components.js/header";
import Profile from "./pages/profile";
import Typer from "./components.js/typer";
import paragraphData from "./data";
import { Route, Routes } from "react-router-dom";
import SignInPage from "./pages/sign-in";
import { AuthContextProvider } from "./context/AuthContext";
import Protected from "./components.js/Protected";

function App() {
  const [isShown, setisShown] = useState(false);
  return (
    <div className="App">
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route
            path="/home"
            element={
              <Protected>
                <div>
                  <Header toggle={setisShown} />
                  {isShown ? <Profile /> : <Typer paragraph={paragraphData} />}
                </div>
              </Protected>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
