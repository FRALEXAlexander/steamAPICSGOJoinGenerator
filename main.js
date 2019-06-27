var express = require('express');
var request = require('request');

var app = express();

app.get('/', function (httpRequest, httpResponse) {
    httpResponse.send('Hello, World!');
});



app.get('/getID/:name', function (httpRequest, httpResponse) {
    var name = httpRequest.params.name;

    var requrl = (urlID + name);
    console.log(requrl);
    request.get(requrl, function (error, steamHttpResponse, steamHttpBody) {

        console.log(JSON.parse(steamHttpBody).response.steamid);
        var playerID = JSON.parse(steamHttpBody).response.steamid;
        var playerURL = urlPlayer + playerID ;
        request.get(playerURL, function (error, steamHttpResponse, steamHttpBody) {
            var lobbyID = JSON.parse(steamHttpBody).response.players[0].lobbysteamid;
            console.log(lobbyID);

            httpResponse.send('steam://joinlobby/730/' + lobbyID + '/' + playerID);
        });

    });

    
});


var urlID = 'http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=B9B0662A433838592F83B955667F2693&vanityurl=';

var urlPlayer = 'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=B9B0662A433838592F83B955667F2693&format=json&steamids=';




var port = 4000;
var server = app.listen(port);
console.log('Listening on port ' + port);