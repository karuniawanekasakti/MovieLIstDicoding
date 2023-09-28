class cardItem extends HTMLElement {
    constructor() {
        super ();

        this.attachShadow({mode : 'open'});

        this.cardContainer = document.createElement('div');
        this.cardContainer.classList.add('movie');

        this.shadowRoot.appendChild(this.cardContainer);
    }

    connectedCallback() {
        const {title, poster_path, vote_average, overview, release_date, popularity} = this.movie;
        const posterURL = this.getAttribute('poster-url');
        const voteTag = this.getAttribute('vote-tag');

        this.cardContainer.innerHTML = `
      <style>
      .movie img {
        width: 100%;
      }
      
      .movie {
        width: 300px;
        margin: 1rem;
        background-color: var(--secondary-color);
        box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
        position: relative;
        overflow: hidden;
        border-radius: 3px;
      }
      
      .movie-info {
        color: #eee;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        /* padding-bottom: 2rem; */
        padding: 0.5rem 1rem 1rem;
        letter-spacing: 0.5px;
      }
      
      .movie-info h2 {
        margin-top: 0;
      }
      
      .movie-info span {
        background-color: var(--primary-color);
        padding: 0.25rem 0.5rem;
        border-radius: 3px;
        font-weight: bold;
      }
      
      .movie-info span.green {
        color: lightgreen;
      }
      
      .movie-info span.orange {
        color: orange;
      }
      
      .movie-info span.red {
        color: red;
      }
      
      .overview {
        background-color: #fff;
        padding: 2rem;
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        max-height: 100%;
        /* transform: translateY(101%); */
        opacity: 0; /* Set opacity awal ke 0 */
        /* transition: transform 0.3s ease-in-out; */
        transition: opacity 0.3s ease-in-out;
      }
      
      .movie:hover .overview {
        opacity: 1;
        /* transform: translateY(0); */
      }

      </style>
      
      <img src = '${posterURL+poster_path}' alt = '${title}'/>
      <div class = 'movie-info'>
        <h2>${title}</h2>
        <br/>
        <p>Release Date : ${release_date}</p>
        <p>Popularity : ${popularity}</p>
        <span class = '${voteTag}'>${vote_average}</span>
      </div>
      <div class = 'overview'>
        <h3>Overview</h3>
        ${overview}
      </div>
    `;
    }
}

customElements.define('card-item', cardItem);