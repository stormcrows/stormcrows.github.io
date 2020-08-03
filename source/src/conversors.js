//0. Artists - in array: ['name', ...]
//1. Name - string
//2. Year - int
//3. Acousticness: 0..1
//4: Danceability: 0..1
//5: Duration Ms: min..max
//6. Energy: 0..1,
//7: Explicit: 0 or 1
//8: Instrumentalness: 0..1
//9: Liveness: 0..1
//10: Loudness: -min, +max
//11: Mode: 1 (Major), 0 (Minor)
//12: Popularity: 0..100
//13: Speechiness: 0..1
//14: Tempo: min, max
//15: Valence: 0..1
//16: Key: 0..12

export const dataByGenres = row => row.genres

export const dataBySong = row => ({
  artists: row.Artists,
  key: +row.Key,
  name: row.Name,
  year: +row.Year,
  acousticness: +row.Acousticness,
  danceability: +row.Danceability,
  duration: +row.Duration,
  energy: +row.Energy,
  explicit: +row.Explicit,
  instrumentalness: +row.Instrumentalness,
  liveness: +row.Liveness,
  loudness: +row.Loudness,
  mode: +row.Mode,
  popularity: +row.Popularity / 100.0,
  speechiness: +row.Speechiness,
  tempo: +row.Tempo,
  valence: +row.Valence
})

export const dataByYear = row => ({
  year: +row.year,
  acousticness: +row.acousticness,
  danceability: +row.danceability,
  energy: +row.energy,
  instrumentalness: +row.instrumentalness,
  liveness: +row.liveness,
  loudness: +row.loudness,
  speechiness: +row.speechiness,
  popularity: +row.popularity / 100.0,
})

export const dataWithGenres = row => ({
  artists: row.artists,
  popularity: +row.popularity,
  genres: row.genres
})
