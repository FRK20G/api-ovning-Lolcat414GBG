const searchAllBtn = document.querySelector('#searchAll');
const searchBtn = document.querySelector('#searchBtn');
const searchInput = document.querySelector('#searchInput');
const selectOption = document.querySelector('#selectOption');
const title = document.querySelector('#title');
const artist = document.querySelector('#artist');
const audio = document.querySelector('audio');
const allSongsWrapper = document.querySelector('.all-songs');


async function getSong(song, author) {
    const response = await fetch('http://localhost:8000/api/songs/search?name=' + song + '&artist=' + author);
    const data = await response.json();
    displaySongInPlayer(data);
}

async function getSongs(song) {
    const response = await fetch('http://localhost:8000/api/songs/search?name=' + song);
    const data = await response.json();
    displayAllSongs(data);
}

async function getSongsByArtist(query) {
    const response = await fetch('http://localhost:8000/api/songs/search?artist=' + query);
    const data = await response.json();
    displayAllSongs(data);
}

async function getAllSongs() {
    const response = await fetch('http://localhost:8000/api/songs/all');
    const data = await response.json();
    displayAllSongs(data);
}

function displaySongInPlayer(data) {
    progress.style.width = 0;
    title.innerHTML = data.name;
    artist.innerHTML = data.artist;
    audio.src = data.url;
}

function displayAllSongs(songs) {
    allSongsWrapper.innerHTML = '';
    for (song of songs) {
        allSongsWrapper.innerHTML += `<p id="${songs.indexOf(song)}">${song.name}</p>-<i> ${song.artist}</i>`;
    }
    allSongsWrapper.classList.remove('hidden');
}

allSongsWrapper.addEventListener('click', (event) => {
    getSong(event.target.innerHTML, event.target.nextElementSibling.innerHTML);
});

searchBtn.addEventListener('click', () => {
    if (selectOption.value === 'artist') {
        getSongsByArtist(searchInput.value);
    } else {
        getSongs(searchInput.value);
    }
});

searchAllBtn.addEventListener('click', () => {
    getAllSongs();
});