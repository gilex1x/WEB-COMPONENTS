class productCard extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
  }

  //Añadimos un observador de los atributos
  static get observedAttributes() {
    return ["title", "price", "description"];
  }

  render(){
    let child= this.getTemplate().content.cloneNode(true)//Creamos la copia del template
    this.shadowRoot.appendChild(child);    //lo añadimos al shadow root
  }

  getTemplate() {
    const card = document.createElement("template");

    card.innerHTML = `
    <div>
        <h2>${this.title}</h2>
        <span>${this.price}</span>
        <h2>${this.description}</h2>
    </div>
    `;

    return card;
  }

  setStyles(){
    //Syles here
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

}

customElements.define("product-card", productCard);//creamos el custom element y le pasamos la clase
