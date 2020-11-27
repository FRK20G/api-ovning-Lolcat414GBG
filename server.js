const http = require('http');
const fs = require('fs');
const path = require('path');
const server = http.createServer();


const mime = {
    html: 'text/html',
    css: 'text/css',
    svg: 'image/svg+xml',
    js: 'text/javascript',
    mp3: 'audio/mpeg',
    ico: 'image/x-icon'
};

//const insults = [{ "insult": "Were such things here as we do speak about? Or have we eaten on the insane root That takes the reason prisoner?", "play": "Macbeth" }, { "insult": "Never hung poison on a fouler toad", "play": "Rickard III" }, { "insult": "He thinks too much: such men are dangerous.", "play": "Julius Ceasar" }, { "insult": "Thou calledst me a dog before thou hadst a cause. But since I am a dog, beware my fangs.", "play": "The Merchant of Venice" }, { "insult": "Give me your hand...I can tell your fortune. You are a fool.", "play": "The Two Noble Kinsmen" }, { "insult": "He smells like a fish, a very ancient and fish-like smell, a kind of not-of-the-newest poor-John. A strange fish!", "play": "The Tempest" }, { "insult": "It is a tale Told by an idiot, full of sound and fury, Signifying nothing.", "play": "Macbeth" }, { "insult": "Alas, poor heart, that kiss is comfortless As frozen water to a starved snake", "play": "Titus Andronicus" }, { "insult": "He hath eaten me out of house and home; he hath put all substance into that fat belly of his.", "play": "Henry IV, Part 2" }, { "insult": "Out, you green-sickness carrion! Out, you baggage! You tallow-face!", "play": "Romeo and Juliet" }];
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

function searchSong(param) {
    const search = param[1].split('=');
    const searchWord = search[1].replace(/%20/g, ' ');
    let index = 0;
    console.log('Sökord: ', searchWord);
    songs.forEach(function(song) {
        console.log('Namn: ', song.name);
        console.log('Index: ', songs.indexOf(song));
        if (searchWord === song.name) {
            index = songs.indexOf(song);
        }
    });
    return index;
}

server.listen(8000);