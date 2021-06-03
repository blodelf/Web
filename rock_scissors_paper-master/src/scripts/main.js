import Element from "./Element.js"
import * as data from "../data/data.js"

export default class MainSite {

    constructor() {
        this.assemble();
    }

    assemble = () => {
        this.fillMain();

        let counter = 0;
        fetch(process.env.API_URL + "mainElements.json")
            .then(response => response.json())
            .then(data => {
                Object.keys(data).forEach(key => {
                    let element = data[key];
                    let card = new Element("article", ["card"], [{name: "id", value: key}]);
                    card.element.addEventListener("click", this.onCardClicked);
                    let name = new Element("p", ["card-name"]);
                    name.addText(element.name);
                    let image = new Element("img", ["card-img"]);
                    image.addAtt("src", element.src);
                    let price = new Element("p", ["card-price"]);
                    price.addText("$" + element.price);
                    [name, image, price].forEach(part => {part.putInto(card.element);});
                    card.putInto(this.content.element);
                });
            })
    }

    fillMain = (main) => {
        this.main = document.getElementById("main");
        this.modal = new Element("section", ["modal", "hidden"]);
        this.content = new Element("section", ["main-content"]);
        [this.modal, this.content].forEach(elem => {elem.putInto(this.main);});

        this.modal_content = new Element("div", ["modal-content"]);
        this.modal_name = new Element("p", ["modal-name"]);
        let temp = new Element("div", ["modal-container"]);
        this.modal_img = new Element("img", ["modal-img"]);
        this.modal_desc = new Element("p", ["modal-desc"]);
        this.modal_desc.addText("Description");
        this.modal_price = new Element("p", ["modal-price"]);
        this.modal_specs = new Element("table", ["modal-specs"]);

        [this.modal_img, this.modal_price, this.modal_desc, this.modal_specs].forEach(elem => {
            elem.putInto(temp.element);
        });

        this.modal_close = new Element("span", ["modal-close", "noselect"]);
        this.modal_close.addText("×");

        this.modal_close.element.addEventListener("click", this.closeModal);
        this.modal.element.addEventListener("click", this.closeModal);

        [this.modal_close, this.modal_name, temp].forEach(elem => {
            elem.putInto(this.modal_content.element);
        });
        this.modal_content.putInto(this.modal.element);
    }

    closeModal = (event) => {
        if (event.target == this.modal.element || event.target == this.modal_close.element){
            this.modal.addClass(["hidden"]);
            this.modal_img.addAtt("src", "");
            this.modal_name.element.textContent = "";
            this.modal_price.element.textContent = "";
            this.modal_specs.element.textContent = "";
        }
    }

    onCardClicked = (event) => {
        const id = event.currentTarget.getAttribute("id");

        fetch(process.env.API_URL + "mainElements.json")
            .then(response => response.json())
            .then(data => {
                let info = data[id]
                this.modal_name.addText(info.name);
                this.modal_img.addAtt("src", info.src);
                this.modal_price.addText("$" + info.price);

                info.description.forEach(element => {
                    let container = new Element("tr");
                    let name = new Element("td");
                    let value = new Element("td");
                    name.addText(element[0]);
                    value.addText(element[1]);
                    [name, value].forEach(elem => {
                        elem.putInto(container.element);
                    });
                    container.putInto(this.modal_specs.element);
                    this.modal.rmClass(["hidden"]);
                });
            })
    }
}