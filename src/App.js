import { container } from "./components/NavBar";
import NavBar from "./components/NavBar";
import { useState } from "react";

function App() {
  const [toggle, setToggle] = useState(true);
  const [inputValue, setInputValue] = useState("");

  return (
    <container.Provider value={{ toggle, setToggle, inputValue, setInputValue }}>
      <div className="App">
        <NavBar />
      </div>
    </container.Provider>
  );
}

export default App;
