import { useState, useEffect } from "react";

import "./App.css";
import toast from "react-hot-toast";

function App() {
  const [length, setLength] = useState(10);
  const [numAllowed, setnumAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [pass, setPass] = useState(null);
  const [Copy, setCopy] = useState("Copy");

  useEffect(() => {
    setCopy("Copy")
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "1234567890";
    if (charAllowed) str += "!@#$%^&*()_-+=<>?/{}[]";
    for (let i = 0; i < length; i++){
      let idx = Math.floor(Math.random() * str.length);
      pass += str.charAt(idx);
    }
    setPass(pass);
  }, [numAllowed, charAllowed, length]);

  function copyToClipboard() {
    setCopy("Copied!");
    toast.success("Copied to Clipboard!");
    pass.style.backgroundColor = "black"
    window.navigator.clipboard.writeText(pass);
  }

  return (
    <div className="flex justify-center items-center w-full ">
      <div
        className="w-auto rounded-lg border border-r-zinc-300
       p-10 shadow-lg shadow-black flex flex-col justify-center items-center gap-y-10"
      >
        <h2 className="text-3xl uppercase font-semibold">
          Generate Your PassWord!
        </h2>

        <div className="flex gap-2 w-11/12">
          <input
            type="text"
            value={pass}
            className="rounded-lg border p-2 font-semibold text-xl border-r-zinc-300 w-[100%]"
          />
          <button onClick={copyToClipboard} className="hover:scale-90 hover">
            {Copy}
          </button>
        </div>

        <div className="flex gap-x-3 justify-between text-xl font-semibold items-center">
          <div>
            <p className="font-semibold">Length : {length}</p>
            <input
              type="range"
              name="length"
              min={6}
              max={30}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
          </div>

          <label className="flex items-center gap-x-2">
            <p>Numbers</p>
            <input
              type="checkbox"
              name="numAllowed"
              value={numAllowed}
              onChange={() => setnumAllowed((prev) => !prev)}
            />
          </label>

          <label className="flex items-center gap-x-2">
            <p>Characters</p>
            <input
              type="checkbox"
              name="charAllowed"
              value={charAllowed}
              onChange={() => setcharAllowed((prev) => !prev)}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
