class PaginationComponent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `<div class="container">
    <ul class="pagination">
      <li class="">
        <a href="#" id="prev">Prev</a>
      </li>
      <li class="">
        <a href="#">1</a>
      </li>
      <li class="">
        <a href="#">2</a>
      </li>
      <li class="">
        <a href="#">3</a>
      </li>
      <li class="">
        <a href="#">4</a>
      </li>
      <li class="">
        <a href="#">5</a>
      </li>
      <li class="">
        <a href="#" id="next">Next</a>
      </li>
    </ul>
  </div>`;
  }
}

customElements.define("pagination-component", PaginationComponent);
