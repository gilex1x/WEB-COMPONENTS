class productCard extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
  }

  //Añadimos un observador de los atributos
  static get observedAttributes() {
    return ["title", "price", "description","maincolor","fsize","fprimarycolor","datawidth","dataheight"];
  }

  render(){
    let child= this.getTemplate().content.cloneNode(true)//Creamos la copia del template
    this.shadowRoot.appendChild(child);    //lo añadimos al shadow root
  }

  getTemplate() {
    const card = document.createElement("template");

    card.innerHTML = `
    <div class="card-main-container">
        <h2 class="card-main-title">${this.title || "Jhon Doe"}</h2>
        <span>${this.price || "$0.00"}</span>
        <div class="card-content-container">
        <p>${this.description || "lorem ipsum in dolorem "}</p>
        </di>
    </div>
    ${this.setStyles()}
    `;

    return card;
  }

  setStyles(){
    //Syles here
    return `
      <style>
        :host{
          --primary-color: ${this.maincolor || "#fff"};
          width: ${this.datawidth || "300px"};
          height: ${this.dataheight || "300px"};
        }
        .card-main-container{
          background: var(--primary-color)
        }
        h2{
          font-size: ${this.fsize || "1rem"};
          color: ${this.fprimarycolor || "#fff"}
        }
      </style>
    `
  }

  
  attributeChangedCallback(current, oldValue, newValue) {
    //Escuchamos si los atributos cambian
    if(oldValue !== newValue){
        this[current] = newValue;
    }
  }

  connectedCallback(){
    //Aca llamamos al render
    this.render();
  }

  disconnectedCallback(){
    console.log('El elemento ha sido removido con exito!');
    //Aca removemos las referencias y eventos para liberar memoria 
  }

}

customElements.define("product-card", productCard);//creamos el custom element y le pasamos la clase
