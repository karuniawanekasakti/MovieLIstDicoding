import axios from 'axios';
import '../component/cardList.js';

export default class Main {
    constructor() {
        this.API_URL =
      'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d423bcd252d30634ea9dae864385a764&page=';
        this.IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
        this.SEARCH_API =
      'https://api.themoviedb.org/3/search/movie?api_key=d423bcd252d30634ea9dae864385a764&query="';

        this.form = document.getElementById('form');
        this.search = document.getElementById('search');
        this.main = document.getElementById('main');
        this.cardListElement = document.querySelector('card-list');
        this.pagination = document.querySelector('.pagination');
        this.prevButton = document.getElementById('prev');
        this.nextButton = document.getElementById('next');

        this.currentPage = 1;

        this.init();
    }

    async getMovies(url) {
        try {
            const res = await axios.get(url);
            const data = await res.data;
            this.showMovies(data.results);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    showMovies(movies) {
        movies.forEach((movie) => {
            const poster_path = 'https://image.tmdb.org/t/p/w200';
            const voteTag = this.getClassByRate(movie.vote_average);
            const movieItemElement = document.createElement('card-item');
            movieItemElement.movie = movie;
            movieItemElement.setAttribute('poster-url', poster_path);
            movieItemElement.setAttribute('vote-tag', voteTag);
            this.cardListElement.appendChild(movieItemElement);
        });
        

        //     this.main.innerHTML = '';
        //     movies.forEach((movie) => {
        //         const {
        //             title,
        //             poster_path,
        //             vote_average,
        //             overview,
        //             release_date,
        //             popularity,
        //         } = movie;

    //         const movieEl = document.createElement('div');
    //         movieEl.classList.add('movie');
    //         movieEl.innerHTML = `
    //       <img src="${this.IMG_PATH + poster_path}" alt="${title}" />
    //       <div class="movie-info">
    //           <h2>${title}</h2>
    //           <br />
    //           <p>Release Date : ${release_date}</p>
    //           <p>Popularity : ${popularity}</p>
    //           <span class="${this.getClassByRate(
    //     vote_average
    // )}">${vote_average}</span>
    //       </div>
    //       <div class="overview">
    //           <h3>Overview</h3>
    //           ${overview}
    //       </div>
    //   `;
    //         this.main.appendChild(movieEl);
    //     });
    }

    getClassByRate(vote) {
        if (vote >= 8) {
            return 'green';
        } else if (vote >= 5) {
            return 'orange';
        } else {
            return 'red';
        }
    }

    init() {
    // Get initial movies
        this.getMovies(this.API_URL + this.currentPage);

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            const searchTerm = this.search.value;
            if (searchTerm && searchTerm !== '') {
                this.getMovies(this.SEARCH_API + searchTerm);
                this.search.value = '';
            } else {
                window.location.reload();
            }
        });

        this.prevButton.addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.getMovies(this.API_URL + this.currentPage);
                this.updatePagination();
            }
        });

        // Event listener untuk tombol "Next"
        this.nextButton.addEventListener('click', () => {
            this.currentPage++;
            this.getMovies(this.API_URL + this.currentPage);
            this.updatePagination();
        });

        // Event listener untuk nomor halaman
        this.pagination.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                const pageNumber = parseInt(e.target.textContent);
                if (!isNaN(pageNumber) && pageNumber !== this.currentPage) {
                    this.currentPage = pageNumber;
                    this.getMovies(this.API_URL + this.currentPage);
                    this.updatePagination();
                }
                
            }
        });
    }

    // Fungsi untuk memperbarui tampilan pagination
    updatePagination() {
        const pageLinks = document.querySelectorAll('.pagination li');
        pageLinks.forEach((link, index) => {
            if (index === this.currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}
