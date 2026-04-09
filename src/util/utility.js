const { VITE_API_URL, VITE_CLIENT_ID, VITE_CLIENT_SECRET, VITE_API_TOKEN } =
  import.meta.env;

export async function generateAccessToken() {
  const res = await fetch(`${VITE_API_TOKEN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(VITE_CLIENT_ID + ":" + VITE_CLIENT_SECRET),
    },
    body: "grant_type=client_credentials",
  });
  const data = await res.json();
  return data;
}

export function generateRandomNumber() {
  return Date.now();
}

// {
//   "tracks": {
//     "href": "https://api.spotify.com/v1/search?offset=0&limit=2&query=kings%20college%20choir&type=track&locale=en-US,en;q%3D0.9",
//     "limit": 2,
//     "next": "https://api.spotify.com/v1/search?offset=2&limit=2&query=kings%20college%20choir&type=track&locale=en-US,en;q%3D0.9",
//     "offset": 0,
//     "previous": null,
//     "total": 4,
//     "items": [
//       {
//         "album": {
//           "album_type": "album",
//           "artists": [
//             {
//               "external_urls": {
//                 "spotify": "https://open.spotify.com/artist/4NJhFmfw43RLBLjQvxDuRS"
//               },
//               "href": "https://api.spotify.com/v1/artists/4NJhFmfw43RLBLjQvxDuRS",
//               "id": "4NJhFmfw43RLBLjQvxDuRS",
//               "name": "Wolfgang Amadeus Mozart",
//               "type": "artist",
//               "uri": "spotify:artist:4NJhFmfw43RLBLjQvxDuRS"
//             },
//             {
//               "external_urls": {
//                 "spotify": "https://open.spotify.com/artist/60adCptqwRkANTtVja0bvf"
//               },
//               "href": "https://api.spotify.com/v1/artists/60adCptqwRkANTtVja0bvf",
//               "id": "60adCptqwRkANTtVja0bvf",
//               "name": "Academy of Ancient Music",
//               "type": "artist",
//               "uri": "spotify:artist:60adCptqwRkANTtVja0bvf"
//             },
//             {
//               "external_urls": {
//                 "spotify": "https://open.spotify.com/artist/0ugRf6ECGBFRCHlv9iG1No"
//               },
//               "href": "https://api.spotify.com/v1/artists/0ugRf6ECGBFRCHlv9iG1No",
//               "id": "0ugRf6ECGBFRCHlv9iG1No",
//               "name": "Stephen Cleobury",
//               "type": "artist",
//               "uri": "spotify:artist:0ugRf6ECGBFRCHlv9iG1No"
//             },
//             {
//               "external_urls": {
//                 "spotify": "https://open.spotify.com/artist/0f3PsS9IQ6whvNMFFKnpjl"
//               },
//               "href": "https://api.spotify.com/v1/artists/0f3PsS9IQ6whvNMFFKnpjl",
//               "id": "0f3PsS9IQ6whvNMFFKnpjl",
//               "name": "Choir of King's College, Cambridge",
//               "type": "artist",
//               "uri": "spotify:artist:0f3PsS9IQ6whvNMFFKnpjl"
//             }
//           ],
//           "external_urls": {
//             "spotify": "https://open.spotify.com/album/2wNvwhS6pLo6jFydj10KCt"
//           },
//           "href": "https://api.spotify.com/v1/albums/2wNvwhS6pLo6jFydj10KCt",
//           "id": "2wNvwhS6pLo6jFydj10KCt",
//           "images": [
//             {
//               "height": 640,
//               "width": 640,
//               "url": "https://i.scdn.co/image/ab67616d0000b273c8c19812fce13a624773b3c0"
//             },
//             {
//               "height": 300,
//               "width": 300,
//               "url": "https://i.scdn.co/image/ab67616d00001e02c8c19812fce13a624773b3c0"
//             },
//             {
//               "height": 64,
//               "width": 64,
//               "url": "https://i.scdn.co/image/ab67616d00004851c8c19812fce13a624773b3c0"
//             }
//           ],
//           "is_playable": true,
//           "name": "Mozart: Requiem Realisations",
//           "release_date": "2013-04-08",
//           "release_date_precision": "day",
//           "total_tracks": 23,
//           "type": "album",
//           "uri": "spotify:album:2wNvwhS6pLo6jFydj10KCt"
//         },
//         "artists": [
//           {
//             "external_urls": {
//               "spotify": "https://open.spotify.com/artist/4NJhFmfw43RLBLjQvxDuRS"
//             },
//             "href": "https://api.spotify.com/v1/artists/4NJhFmfw43RLBLjQvxDuRS",
//             "id": "4NJhFmfw43RLBLjQvxDuRS",
//             "name": "Wolfgang Amadeus Mozart",
//             "type": "artist",
//             "uri": "spotify:artist:4NJhFmfw43RLBLjQvxDuRS"
//           },
//           {
//             "external_urls": {
//               "spotify": "https://open.spotify.com/artist/2tsOm9CPRD4SbZagsqAhj4"
//             },
//             "href": "https://api.spotify.com/v1/artists/2tsOm9CPRD4SbZagsqAhj4",
//             "id": "2tsOm9CPRD4SbZagsqAhj4",
//             "name": "Michael Finnissy",
//             "type": "artist",
//             "uri": "spotify:artist:2tsOm9CPRD4SbZagsqAhj4"
//           },
//           {
//             "external_urls": {
//               "spotify": "https://open.spotify.com/artist/60adCptqwRkANTtVja0bvf"
//             },
//             "href": "https://api.spotify.com/v1/artists/60adCptqwRkANTtVja0bvf",
//             "id": "60adCptqwRkANTtVja0bvf",
//             "name": "Academy of Ancient Music",
//             "type": "artist",
//             "uri": "spotify:artist:60adCptqwRkANTtVja0bvf"
//           },
//           {
//             "external_urls": {
//               "spotify": "https://open.spotify.com/artist/0ugRf6ECGBFRCHlv9iG1No"
//             },
//             "href": "https://api.spotify.com/v1/artists/0ugRf6ECGBFRCHlv9iG1No",
//             "id": "0ugRf6ECGBFRCHlv9iG1No",
//             "name": "Stephen Cleobury",
//             "type": "artist",
//             "uri": "spotify:artist:0ugRf6ECGBFRCHlv9iG1No"
//           },
//           {
//             "external_urls": {
//               "spotify": "https://open.spotify.com/artist/0f3PsS9IQ6whvNMFFKnpjl"
//             },
//             "href": "https://api.spotify.com/v1/artists/0f3PsS9IQ6whvNMFFKnpjl",
//             "id": "0f3PsS9IQ6whvNMFFKnpjl",
//             "name": "Choir of King's College, Cambridge",
//             "type": "artist",
//             "uri": "spotify:artist:0f3PsS9IQ6whvNMFFKnpjl"
//           }
//         ],
//         "disc_number": 1,
//         "duration_ms": 169666,
//         "explicit": false,
//         "external_ids": {
//           "isrc": "GBMY51300208"
//         },
//         "external_urls": {
//           "spotify": "https://open.spotify.com/track/3oHSL6pt9LpNrQZuQGu9wL"
//         },
//         "href": "https://api.spotify.com/v1/tracks/3oHSL6pt9LpNrQZuQGu9wL",
//         "id": "3oHSL6pt9LpNrQZuQGu9wL",
//         "is_local": false,
//         "is_playable": true,
//         "name": "Requiem, K. 626: Lacrimosa",
//         "track_number": 8,
//         "type": "track",
//         "uri": "spotify:track:3oHSL6pt9LpNrQZuQGu9wL"
//       },
//       {
//         "album": {
//           "album_type": "album",
//           "artists": [
//             {
//               "external_urls": {
//                 "spotify": "https://open.spotify.com/artist/4aXXDj9aZnlshx7mzj3W1N"
//               },
//               "href": "https://api.spotify.com/v1/artists/4aXXDj9aZnlshx7mzj3W1N",
//               "id": "4aXXDj9aZnlshx7mzj3W1N",
//               "name": "Lin-Manuel Miranda",
//               "type": "artist",
//               "uri": "spotify:artist:4aXXDj9aZnlshx7mzj3W1N"
//             }
//           ],
//           "external_urls": {
//             "spotify": "https://open.spotify.com/album/1kCHru7uhxBUdzkm4gzRQc"
//           },
//           "href": "https://api.spotify.com/v1/albums/1kCHru7uhxBUdzkm4gzRQc",
//           "id": "1kCHru7uhxBUdzkm4gzRQc",
//           "images": [
//             {
//               "height": 640,
//               "width": 640,
//               "url": "https://i.scdn.co/image/ab67616d0000b273d72fb5571087bca0a2fed008"
//             },
//             {
//               "height": 300,
//               "width": 300,
//               "url": "https://i.scdn.co/image/ab67616d00001e02d72fb5571087bca0a2fed008"
//             },
//             {
//               "height": 64,
//               "width": 64,
//               "url": "https://i.scdn.co/image/ab67616d00004851d72fb5571087bca0a2fed008"
//             }
//           ],
//           "is_playable": true,
//           "name": "Hamilton (Original Broadway Cast Recording)",
//           "release_date": "2015-09-25",
//           "release_date_precision": "day",
//           "total_tracks": 46,
//           "type": "album",
//           "uri": "spotify:album:1kCHru7uhxBUdzkm4gzRQc"
//         },
//         "artists": [
//           {
//             "external_urls": {
//               "spotify": "https://open.spotify.com/artist/4aXXDj9aZnlshx7mzj3W1N"
//             },
//             "href": "https://api.spotify.com/v1/artists/4aXXDj9aZnlshx7mzj3W1N",
//             "id": "4aXXDj9aZnlshx7mzj3W1N",
//             "name": "Lin-Manuel Miranda",
//             "type": "artist",
//             "uri": "spotify:artist:4aXXDj9aZnlshx7mzj3W1N"
//           },
//           {
//             "external_urls": {
//               "spotify": "https://open.spotify.com/artist/3twuAojvYNrlWZpMkxLm3P"
//             },
//             "href": "https://api.spotify.com/v1/artists/3twuAojvYNrlWZpMkxLm3P",
//             "id": "3twuAojvYNrlWZpMkxLm3P",
//             "name": "Daveed Diggs",
//             "type": "artist",
//             "uri": "spotify:artist:3twuAojvYNrlWZpMkxLm3P"
//           },
//           {
//             "external_urls": {
//               "spotify": "https://open.spotify.com/artist/6G3sPhnj4JBCsBVBGvZnkk"
//             },
//             "href": "https://api.spotify.com/v1/artists/6G3sPhnj4JBCsBVBGvZnkk",
//             "id": "6G3sPhnj4JBCsBVBGvZnkk",
//             "name": "Okieriete Onaodowan",
//             "type": "artist",
//             "uri": "spotify:artist:6G3sPhnj4JBCsBVBGvZnkk"
//           },
//           {
//             "external_urls": {
//               "spotify": "https://open.spotify.com/artist/3cR4rhS2hBWqI7rJEBacvN"
//             },
//             "href": "https://api.spotify.com/v1/artists/3cR4rhS2hBWqI7rJEBacvN",
//             "id": "3cR4rhS2hBWqI7rJEBacvN",
//             "name": "Leslie Odom Jr.",
//             "type": "artist",
//             "uri": "spotify:artist:3cR4rhS2hBWqI7rJEBacvN"
//           },
//           {
//             "external_urls": {
//               "spotify": "https://open.spotify.com/artist/3UUJfRbrA2nTbcg4i0MOwu"
//             },
//             "href": "https://api.spotify.com/v1/artists/3UUJfRbrA2nTbcg4i0MOwu",
//             "id": "3UUJfRbrA2nTbcg4i0MOwu",
//             "name": "Original Broadway Cast of Hamilton",
//             "type": "artist",
//             "uri": "spotify:artist:3UUJfRbrA2nTbcg4i0MOwu"
//           }
//         ],
//         "disc_number": 1,
//         "duration_ms": 333154,
//         "explicit": true,
//         "external_ids": {
//           "isrc": "USAT21502598"
//         },
//         "external_urls": {
//           "spotify": "https://open.spotify.com/track/4cxvludVmQxryrnx1m9FqL"
//         },
//         "href": "https://api.spotify.com/v1/tracks/4cxvludVmQxryrnx1m9FqL",
//         "id": "4cxvludVmQxryrnx1m9FqL",
//         "is_local": false,
//         "is_playable": true,
//         "name": "My Shot",
//         "track_number": 3,
//         "type": "track",
//         "uri": "spotify:track:4cxvludVmQxryrnx1m9FqL"
//       }
//     ]
//   }
// }
