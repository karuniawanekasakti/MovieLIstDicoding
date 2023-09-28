import './cardItem.js';

class CardList extends HTMLElement {
    set movies(movies) {
        this._movies = movies;
        this.render();
    }
    render() {
        this.innerHTML = '';
        this._movies.forEach((movie) => {
          
            const movieItemElement = document.createElement('card-item');
            movieItemElement.movie = movie;
            this.appendChild(movieItemElement);
        });
    }
}

customElements.define('card-list', CardList);