const express = require("express"); //Import the express dependency
const app = express(); //Instantiate an express app, the main work horse of this server
const port = 3001; //Save the port number where your server will be listening

var client_id = "99fa3810e0464671aee6a90002a13b11";
var client_secret = "0c07e07e8a60434289588dabd224d249";
var redirect_uri = "http://localhost:3001/callback";

var SpotifyWebApi = require("spotify-web-api-node");
scopes = ["user-read-private", "user-read-email"];

var spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret,
  redirectUri: redirect_uri,
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/login", (req, res) => {
  var html = spotifyApi.createAuthorizeURL(scopes);
  console.log(html);
  res.json({ message: html + "&show_dialog=true" });
});

app.get("/callback", async (req, res) => {
  const { code } = req.query;
  console.log(code);
  try {
    var data = await spotifyApi.authorizationCodeGrant(code);
    const { access_token, refresh_token } = data.body;
    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);

    res.redirect("http://localhost:3001/home");
  } catch (err) {
    res.redirect("/#/error/invalid token");
  }
});

app.listen(port, () => {
  //server starts listening for any attempts from a client to connect at port: {port}
  console.log(`Now listening on port ${port}`);
});
