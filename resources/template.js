class myElement extends HTMLElement{
    constructor(){
        //Aca definimos lo que va a estar en  nuestro element
        super();
        this.attachShadow({mode: 'open'});//Esto me permite interactuar y ver el contenido del componente
        //Para obtener cualquier elemento dentro del shadow dom usamos shadowroot en lugar del document
    }

    getTemplate(){
        const template = document.createElement('template');
        template.innerHTML = `
            <h2>Soy el titulo de otro template</h2>
            <p>Yo soy el parrafo de otro template</p>
        `;

        return template;
    }

    render(){
        //Agregamos el template al shadow root (sahdow DOM)
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));//creamos una copia del template
    }

    connectedCallback(){
        //Aca renderizamos todo
        this.render();
    }
};

customElements.define('my-element',myElement);