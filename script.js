const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d423bcd252d30634ea9dae864385a764&page=";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=d423bcd252d30634ea9dae864385a764&query="';

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");
const pagination = document.querySelector(".pagination");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

let currentPage = 1;

// Get initial movies
getMovies(API_URL + currentPage);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const {
      title,
      poster_path,
      vote_average,
      overview,
      release_date,
      popularity,
    } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="${title}" />
        <div class="movie-info">
            <h2>${title}</h2>
            </br>
            <p>Release Date : ${release_date}</p>
            <p>Popularity : ${popularity}</p>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>
    `;
    main.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);
    search.value = "";
  } else {
    window.location.reload();
  }
});

prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    getMovies(API_URL + currentPage);
    updatePagination();
  }
});

// Event listener untuk tombol "Next"
nextButton.addEventListener("click", () => {
  currentPage++;
  getMovies(API_URL + currentPage);
  updatePagination();
});

// Event listener untuk nomor halaman
pagination.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    const pageNumber = parseInt(e.target.textContent);
    if (!isNaN(pageNumber) && pageNumber !== currentPage) {
      currentPage = pageNumber;
      getMovies(API_URL + currentPage);
      updatePagination();
    }
  }
});

// Fungsi untuk memperbarui tampilan pagination
function updatePagination() {
  const pageLinks = document.querySelectorAll(".pagination li");
  pageLinks.forEach((link, index) => {
    if (index === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}
