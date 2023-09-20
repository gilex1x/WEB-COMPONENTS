class myElement extends HTMLElement{
    constructor(){
        //Aca definimos lo que va a estar en  nuestro element
        super();
        this.attachShadow({mode: 'open'});//Esto me permite interactuar y ver el contenido del componente
        //Para obtener cualquier elemento dentro del shadow dom usamos shadowroot en lugar del document

        // vamos a optener los atributos 
        this.title = this.getAttribute('title');
        this.paragraph = this.getAttribute('paragraph');
        this.image = this.getAttribute('image');
    }

    getTemplate(){
        const template = document.createElement('template');
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

    render(){
        //Agregamos el template al shadow root (sahdow DOM)
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));//creamos una copia del template
    }

    setSyles(){
        let styles= `
        <style>
            h2{ font-weight: bold}
            p{ color: red}
        </style>
        `;
        return styles;
    }

    connectedCallback(){
        //Aca renderizamos todo
        this.render();
    }
};

customElements.define('my-element',myElement);