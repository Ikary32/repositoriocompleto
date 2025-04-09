const API_KEY = "1bd30876d2f827b0c4a0787bb7bca3b3"; 
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const YOUTUBE_URL = "https://www.youtube.com/embed/";

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("movieId");


(async function () {
    if (movieId) {
        await getMovieDetails(movieId);
        await getMovieCredits(movieId);
        await getMovieTrailer(movieId);
    }
})();

async function getMovieDetails(movieId) {
    try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=es-ES`);
        const data = await response.json();
        console.log(data);
        if (!data || data.success === false) {
            console.error("Error en la respuesta de la API:", data.status_message);
            return;
        }

        const titleElement = document.getElementById("movie-title");
        titleElement.innerHTML = "";
        titleElement.textContent = data.title;
        // Mostrar la descripción
        const overviewElement = document.getElementById("movie-overview");
        overviewElement.innerHTML = "";
        overviewElement.textContent = data.overview;
        // Mostrar la fecha de lanzamiento
        const releaseElement = document.getElementById("movie-release-date");
        releaseElement.innerHTML = "";
        releaseElement.textContent = data.release_date;
        // Mostrar los generos
        // Mostrar el porter imagen de la pelicula

    } catch (error) {
        console.error("Error al obtener los detalles:", error);
    }
}

async function getMovieCredits(movieId) {
    try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=es-ES`);
        const data = await response.json();

        const actorsContainer = document.getElementById("actors");
        actorsContainer.innerHTML = ""; // Limpiar antes de agregar

        if (!data.cast || data.cast.length === 0) {
            actorsContainer.innerHTML = "<p>No hay información del reparto.</p>";
            return;
        }

        data.cast.slice(0, 10).forEach(actor => { // Mostrar solo los primeros 10 actores
            const actorElement = document.createElement("div");
            actorElement.classList.add("actor");

            actorElement.innerHTML = `
                <img src="${actor.profile_path ? IMAGE_URL + actor.profile_path : 'https://via.placeholder.com/150'}" alt="${actor.name}">
                <p>${actor.name}</p>
            `;
            actorsContainer.appendChild(actorElement);
        });
    } catch (error) {
        console.error("Error al obtener los actores:", error);
    }
}


async function getMovieTrailer(movieId) {
    try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=es-ES`);
        const data = await response.json();

        const trailerContainer = document.getElementById("trailer-container");
        trailerContainer.innerHTML = ""; // Limpiar antes de agregar

        if (!data.results || data.results.length === 0) {
            trailerContainer.innerHTML = "<p>No hay tráiler disponible.</p>";
            return;
        }

        const trailer = data.results.find(video => video.type === "Trailer" && video.site === "YouTube");
        if (trailer) {
            trailerContainer.innerHTML = `<iframe width="560" height="315" src="${YOUTUBE_URL + trailer.key}" frameborder="0" allowfullscreen></iframe>`;
        } else {
            trailerContainer.innerHTML = "<p>No hay tráiler disponible.</p>";
        }
    } catch (error) {
        console.error("Error al obtener el tráiler:", error);
    }
}