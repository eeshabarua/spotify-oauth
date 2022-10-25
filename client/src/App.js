import React from "react";
import logo from "./logo.svg";
import Button from "@mui/material/Button";
import "./App.css";

function App() {
  const [data, setData] = React.useState(null);
  const [url, setUrl] = React.useState("");

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  React.useEffect(() => {
    fetch("/login")
      .then((res) => res.json())
      .then((url) => setUrl(url.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>

        {url.length === 0 ? <p>Loading...</p> : <p>{url}</p>}
        {url.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <a href={url}> Login to Spotify</a>
        )}
      </header>
    </div>
  );
}

export default App;
