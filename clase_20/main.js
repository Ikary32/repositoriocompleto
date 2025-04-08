const baseUrl = 'http://127.0.0.1:3000/api/v1/';

async function getMovies(){
    try {
        const movies = await fetch(`${baseUrl}movies`);
        const result = await movies.json();
        console.log(result.data);
        await showMovies(result.data);
    } catch (error) {
        console.error("Error al obtener las peliculas"), error.message;
    }
}

getMovies();

function showMovies(movies){
    const container = document.getElementById("movies");
    container.innerHTML= "";
    movies.forEach(movie => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");
        movieElement.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
        <h3>${movie.title}</>
        <p> fecha: ${movie.release_date}</p>
        `;
        movieElement.addEventListener("click", () =>{
            window.location.href = `detail.html?movieId=${movie.id}`;
        });
    
        container.appendChild(movieElement);
    });
}