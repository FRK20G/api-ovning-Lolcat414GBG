# API övning

## Instruktioner

Fortsätt på din musikspelare som du har gjort eller använd [denna](https://github.com/FRK20G/project-audio-player). I denna uppgift ska du skapa upp ett API som din musikspelare ska kunna anropa. En användare ska kunna söka på låtar som denna vill spela upp i musikspelaren.

### Endpoints ###

Endpoint: ```/api/songs/search```

Example request: ```/api/search?name=Spirit of the season```

Example request: ```/api/search?artist=Alan Silvestri```

*Params*
| Param | Value | Example |
| ----------- | ----------- | ----------- | 
| name | String | Spirit of the season |
| artist | String | Alan Silvestri |

**Svar från API**

Svaret från ditt API ska vara i form av ett JSON-objekt. Det ska innehålla `name`, `artist`, `url`.

Exempel:
```
{
    url: https://p.scdn.co/mp3-preview/729371ac317464304d4ca3511653bbe866ac7cef?cid=774b29d4f13844c495f206cafdad9c86,
    name: Suite from The Polar Express,
    artist: Alan Silvestri
}
```
----

Endpoint: `/api/songs/all`

**Svar från API**

Svaret från ditt API ska vara i form av ett JSON-objekt. Det ska returnera en array med alla låtar där varje låt är ett objekt.

Exempel:
```
[
    {
        url: https://p.scdn.co/mp3-preview/729371ac317464304d4ca3511653bbe866ac7cef?cid=774b29d4f13844c495f206cafdad9c86,
        name: Suite from The Polar Express,
        artist: Alan Silvestri
    },
    {
        url: https://p.scdn.co/mp3-preview/729371ac317464304d4ca3511653bbe866ac7cef?cid=774b29d4f13844c495f206cafdad9c86,
        name: Suite from The Polar Express,
        artist: Alan Silvestri
    },
    {
        url: https://p.scdn.co/mp3-preview/729371ac317464304d4ca3511653bbe866ac7cef?cid=774b29d4f13844c495f206cafdad9c86,
        name: Suite from The Polar Express,
        artist: Alan Silvestri
    }
]
```


### Låtar ###
-----
URL: https://p.scdn.co/mp3-preview/a3b5cf9da8473c959c6833e75404379db9226ba7?cid=774b29d4f13844c495f206cafdad9c86

Namn: When Christmas Comes to Town

Artist: Matthew Hall, Meagan Moore

-----

URL: https://p.scdn.co/mp3-preview/ad04264bcbf286030f90895dacdc2af00e586c99?cid=774b29d4f13844c495f206cafdad9c86

Namn: Spirit of the season

Artist: Alan Silvestri

-----

URL: https://p.scdn.co/mp3-preview/729371ac317464304d4ca3511653bbe866ac7cef?cid=774b29d4f13844c495f206cafdad9c86

Namn: Suite from The Polar Express

Artist: Alan Silvestri
