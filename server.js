//const http = require('http');
//const fs = require('fs');
//const path = require('path');
//const server = http.createServer();
//const { request, response } = require('express');
//const { resolve } = require('path');

//const { request } = require('express');
const express = require('express');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('database.json');
const database = new lowdb(adapter);
const app = express();

/*
const mime = {
    html: 'text/html',
    css: 'text/css',
    svg: 'image/svg+xml',
    js: 'text/javascript',
    mp3: 'audio/mpeg',
    ico: 'image/x-icon'
};*/

const songs = [{
        url: 'https://p.scdn.co/mp3-preview/a3b5cf9da8473c959c6833e75404379db9226ba7?cid=774b29d4f13844c495f206cafdad9c86',
        name: 'When Christmas Comes to Town',
        artist: 'Matthew Hall, Meagan Moore'
    },
    {
        url: 'https://p.scdn.co/mp3-preview/ad04264bcbf286030f90895dacdc2af00e586c99?cid=774b29d4f13844c495f206cafdad9c86',
        name: 'Spirit of the season',
        artist: 'Alan Silvestri'
    },
    {
        url: 'https://p.scdn.co/mp3-preview/729371ac317464304d4ca3511653bbe866ac7cef?cid=774b29d4f13844c495f206cafdad9c86',
        name: 'Suite from The Polar Express',
        artist: 'Alan Silvestri'
    }
];

app.use(express.static('public'));

function findSongs(searchWord) {
    let result = [];
    for (song of songs) {
        if (song.name.includes(searchWord)) {
            result.push(song);
        }
    }
    return result;
}

function findSongsByArtist(artist) {
    let result = [];
    for (song of songs) {
        if (song.artist.includes(artist)) {
            result.push(song);
        }
    }
    return result;
}

function getSong(title) {
    let index = 0;
    for (song of songs) {
        if (song.name === title) {
            index = songs.indexOf(song);
        }
    }
    return index;
}

app.get('/api/songs/search', (request, response) => {
    console.log('Request query = ', request.query);
    const param = request.url.split('?');
    //Option is either name or artist or both
    const option = param[1].split('=');
    const searchWord = option[1].replace(/%20/g, ' ');

    if (option[0] === 'name') { //If you search on name of song
        //When option[2] isn´t undefiend you have clicked on a song from the list
        if (option[2] != undefined) {
            let index = getSong(searchWord.split('&')[0]);
            response.send(JSON.stringify(songs[index]));
        } else { //Get all songs that matches the word
            let result = findSongs(searchWord);
            response.send(JSON.stringify(result));
        }
    } else { //If you have chosen artist
        let result = findSongsByArtist(searchWord);
        response.send(JSON.stringify(result));
    }
});

app.get('/api/songs/all', (request, response) => {
    response.send(JSON.stringify(songs));
});

app.listen(8000, () => {
    console.log('Server started');
});

/*
server.on('request', (request, response) => {
    console.log('------Request------');
    console.log('Request url: ', request.url);
    console.log('dirname: ', __dirname);
    console.log('File extension: ', path.extname(request.url));
    console.log('-------End request---------');

    if (request.url === '/') {
        const src = fs.createReadStream('index.html');
        src.pipe(response);
    } else if (request.url.includes('/api/songs/search')) {
        const param = request.url.split('?');
        let index = searchSong(param);
        response.end(JSON.stringify(songs[index]));
    } else if (request.url.includes('/api/songs/all')) {
        response.end(JSON.stringify(songs));
    } else {
        const baseUrl = __dirname + request.url;
        const src = fs.createReadStream(baseUrl);
        const type = mime[path.extname(baseUrl).slice(1)] || 'text/plain';

        src.on('open', () => {
            response.setHeader('Content-Type', type);

            if (type === 'audio/mpeg') {
                const stats = fs.statSync(__dirname + request.url);
                const fileSize = stats.size;
                response.setHeader('Content-Length', fileSize);
                response.setHeader('Accept-Ranges', 'bytes');
            }
            src.pipe(response);
        });
        src.on('error', () => {
            response.end('Sidan kan inte hittas');
        });
    }
});



server.listen(8000);*/