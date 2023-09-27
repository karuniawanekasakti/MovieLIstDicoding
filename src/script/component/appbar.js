class AppBar extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `<form id="form">
    <h1>Movie List</h1>
    <input type="text" id="search" class="search" placeholder="Search" />
  </form>`;
    }
}

customElements.define('app-bar', AppBar);
