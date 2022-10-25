import React from "react";
import logo from "./logo.svg";
import Button from "@mui/material/Button";
import "./App.css";

function App() {
  const [data, setData] = React.useState(null);
  const [url, setUrl] = React.useState(null);

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

        {!url ? (
          <p>Loading...</p>
        ) : (
          <Button color="success" variant="contained" href={url} size="large">
            Login to Spotify
          </Button>
        )}
      </header>
    </div>
  );
}

export default App;
