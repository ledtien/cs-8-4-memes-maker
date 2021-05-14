import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    async function getMemes() {
      const response = await fetch("http://localhost:5000/api/memes");
      const json = await response.json();
      console.log({ json });
      setMemes(json.data);
    }
    getMemes();
  }, []);
  return (
    <div className="App">
      {memes.map((m) => {
        const url =
          "http://localhost:5000/" + m.outputMemePath.split("public/")[1];
        return <img src={url} style={{ height: 400, width: 400 }}></img>;
      })}
    </div>
  );
}

export default App;
