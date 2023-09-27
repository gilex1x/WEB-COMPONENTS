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
    if (oldValue !== newValue) {
      this[current] = newValue;
    }
  }

  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
        <section>
            <h1>
              <slot name="title"></slot>
            </h1>
            <p>
              <slot name="paragraph"></slot>
            </p>
        </section>
        ${this.setSyles()}`;

    return template;
  }

  render() {
    //Agregamos el template al shadow root (sahdow DOM)
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true)); //creamos una copia del template
  }

  setSyles() {
    /* El host viene siendo el root del shadow dom de nuestro web component */
    let styles = `
        <style>
        :host{
          --primary-color: tomato;
          --secondary-color:salmon;
          --heading-primary: 32px;
          --heading-secondary: 28px;
        }
        section{
          background-color: var(--primary-color);
        }
        section h1 {
          font-size: var(--heading-primary);
        }
        </style>
        `;
    return styles;
  }

  connectedCallback() {
    //Aca renderizamos todo
    console.log("Hoola desdé el DOM, el elemento se ha añadido con exito");
    this.render();
  }

  disconnectedCallback() {
    console.log("El elemento ha sido removido con exito!");
    //Aca removemos las referencias y eventos para liberar memoria
  }
}

customElements.define("my-element", myElement);

function removeElement() {
  let element = document.querySelector("my-element");
  element.remove();
}
let button = document.querySelector("button");

button.addEventListener("click", removeElement);
