class myElement extends HTMLElement {
  constructor() {
    //Aca definimos lo que va a estar en  nuestro element
    super();
    this.attachShadow({ mode: "open" }); //Esto me permite interactuar y ver el contenido del componente
    //Para obtener cualquier elemento dentro del shadow dom usamos shadowroot en lugar del document
  }

  //Añadimos un observador de los atributos
  static get observedAttributes() {
    return ["title", "paragraph", "image"];
  }

  attributeChangedCallback(current, oldValue, newValue) {
    if(oldValue !== newValue){
        this[current] = newValue;
    }
  }

  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
        <section>
            <h2>${this.title}</h2>
            <section>
                <p>${this.paragraph}</p>
            </section>
            <img src=${this.image} />
        </section>
        ${this.setSyles()}`;

    return template;
  }

  render() {
    //Agregamos el template al shadow root (sahdow DOM)
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true)); //creamos una copia del template
  }

  setSyles() {
    let styles = `
        <style>
            :host{
              display: inline-block;
              width: 100%;
              min-width: 300px;
              max-width: 500px;
            }
            :host(.blue){
              background:blue;
            }
        </style>
        `;
    return styles;
  }

  connectedCallback() {
    //Aca renderizamos todo
    console.log('Hoola desdé el DOM, el elemento se ha añadido con exito')
    this.render();
  }

  disconnectedCallback(){
    console.log('El elemento ha sido removido con exito!');
    //Aca removemos las referencias y eventos para liberar memoria 
  }
}

customElements.define("my-element", myElement);

function removeElement(){
  let element = document.querySelector('my-element');
  element.remove();
}
let button = document.querySelector('button');

button.addEventListener('click',removeElement);