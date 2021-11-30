const express = require('express');

// Requerimos el archivo de configuración de nuestra DB
require('./utils/db');



const PORT = 3000;
const server = express();

const Movie = require('./models/Movie');

const router = express.Router();

//Endpoint que devuelve todas las peliculas http://localhost:3000/movies
router.get('/movies', (req, res) => {
    return Movie.find()
    .then(movies => {
        // Si encontramos los personajes, los devolveremos al usuario
        return res.status(200).json(movies);
    })
    .catch(err => {
        // Si hay un error, enviaremos por ahora una respuesta de error.
        return res.status(500).json(err);
    });
});

//Endpoint que devuelve una pelicula por su id, Ejemplo: http://localhost:3000/movies/61a6695558c167de9349c328
router.get('/movies/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const movie = await Movie.findById(id);
		if (movie) {
			return res.status(200).json(movie);
		} else {
			return res.status(404).json('No movie found by this id');
		}
	} catch (err) {
		return res.status(500).json(err);
	}
});


//Endpoint que devuelve una pelicula por su titulo, Ejemplo: http://localhost:3000/movies/title/The%20Matrix
router.get('/movies/title/:title', async (req, res) => {
	const {title} = req.params;

	try {
		const movieByTitle = await Movie.find({ title: title });
		return res.status(200).json(movieByTitle);
	} catch (err) {
		return res.status(500).json(err);
	}
});


//Endpoint que devuelve las películas por su genero, Ejemplo: http://localhost:3000/movies/genre/Acci%C3%B3n
router.get('/movies/genre/:genre', async (req, res) => {
	const {genre} = req.params;

	try {
		const movieByGenre = await Movie.find({ genre: genre });
		return res.status(200).json(movieByGenre);
	} catch (err) {
		return res.status(500).json(err);
	}
});

//Endpoint que devuelve las peliculas estrenadas a partir de 2010, Ejemplo: http://localhost:3000/movies/year/2010
router.get('/movies/year/:year', async (req, res) => {
	const {year} = req.params;

	try {
		const movieByYear = await Movie.find({ year: {$gt:year} });
		return res.status(200).json(movieByYear);
	} catch (err) {
		return res.status(500).json(err);
	}
});


server.use('/', router);

server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});