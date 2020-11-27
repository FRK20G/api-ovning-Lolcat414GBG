const searchAllBtn = document.querySelector('#searchAll');
const searchBtn = document.querySelector('#searchBtn');
const searchInput = document.querySelector('#searchInput');
const title = document.querySelector('#title');
const artist = document.querySelector('#artist');
const audio = document.querySelector('audio');
const allSongs = document.querySelector('.all-songs');

async function getSong(song) {
    const response = await fetch('http://localhost:8000/api/songs/search?name=' + song);
    const data = await response.json();

    console.log('Detta är datan--> ', data);
    progress.style.width = 0;
    title.innerHTML = data.name;
    artist.innerHTML = data.artist;
    audio.src = data.url;
}

async function getSongs() {
    const response = await fetch('http://localhost:8000/api/songs/all');
    const data = await response.json();

    console.log(data);

    data.forEach(function(song) {
        console.log(song.name, data.indexOf(song));
        allSongs.innerHTML += `<p id="${data.indexOf(song)}">${song.name}</p>- <i>${song.artist}</i>`;
    });
    allSongs.classList.toggle('hidden');
}

allSongs.addEventListener('click', function(event) {
    console.log(event.target.innerHTML);
    getSong(event.target.innerHTML);
});

searchBtn.addEventListener('click', function() {
    console.log(searchInput.value);
    getSong(searchInput.value);
});

searchAllBtn.addEventListener('click', function() {
    console.log(searchInput.value);
    getSongs();
});