const path = require('path');
const express = require('express');
const encoder = require('./encoder.js');
const app = express();

const BASE_URL = 'localhost:3000/';

var options = {};
var connectionString = 'postgres://localhost:5432/urls';
var pgp = require('pg-promise')(options);
var db = pgp(connectionString);

var global_count = 0;

app.post('/encode', async (request, response) => {
  try {
    const url = request.query.url || null;
    if (url === null) {
      response.sendStatus(400);
      throw Exception(`fuuuuu, no url, it's a trap`);
    }
    console.log("Here's the filthy url they want us to encode:", url);
    console.log('Buttpunching this lazy ass DB to put your shit in...');
    let dbresp = await db.query(
        "INSERT INTO idurlmap(url) VALUES(${url}) RETURNING id",
        {url: request.query.url}
    );

    console.log('sending it to get encoded an shit');
    let encodedHash = encoder.encode(dbresp[0]['id']);

    response.send(`Here's your URL young lad: ${BASE_URL + encodedHash}\n`);
  } catch (err) {
    console.log('brilliant...you broke something');
  }
});

app.get('/:hash', async (request, response) => {
  let hash = request.params.hash || null;

  try {
    let decodedId = encoder.decode(hash);
    if (hash === null) {
      res.sendStatus(400);
      throw Exception('Hash was null -_-');
    }

    const dbresp = await db.query(
      "SELECT url FROM idurlmap WHERE id = ${id}",
      {id: decodedId}
    );

    response.redirect('https://' + dbresp[0]['url']);
  } catch (err) {
    console.log("shit didn't work bro", err);

    if (!response.headersSent) {
      return response.sendStatus(500);
    }
  }
});

app.listen(3000);
