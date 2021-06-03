import Element from "./Element.js"
import * as data from "../data/data.js"
import * as verify from "./verification.js"
import * as api from "../API/services.js"

export default class AddProduct {
    constructor(nav) {
        this.navbar = nav;
    }

    assemble = () => {
        let main = document.getElementById("main");
        let form = new Element("form", ["input-form"]);
        let text = new Element("p", ["form-message"]);
        text.addText(data.addMessage);
        text.putInto(form.element);

        data.addElements.forEach(element => {
            let container = new Element("div", ["input-container"]);
            let label = new Element("label", ["input-label"]);
            label.addText(element.label);

            let input = {};
            if (element.type == "text") {
                input = new Element("input", ["input"]);
                input.addAtt("type", "text");

            } else {
                input = new Element("textarea", ["input","input-area"]);
            }

            input.addAtt("placeholder", element.text);
            input.addAtt("id", element.id);

            let message = new Element("p", ["input-message", "hidden"]);
            message.addAtt("id", element.id + "_message");
            message.addText(element.message);

            [label, input, message].forEach(elem => {
                elem.putInto(container.element);
            });
            container.putInto(form.element);
        });

        let prop_text = new Element("p");
        prop_text.addText("Description");
        this.props = new Element("div", ["add-properties"]);
        this.counter = 0;
        this.addPropPair();

        this.addPropButton = new Element("button", ["add-prop-button"])
        this.addPropButton.addText("Add property");

        this.error = new Element("p", ["error", "hidden"]);
        this.error.addText("Fill out all the fields");
	
        this.button = new Element("button", ["submit", "submit-prod"]);
        this.button.addText("Submit");

        [prop_text, this.props, this.addPropButton, this.button, this.error].forEach(element => {
            element.putInto(form.element);
        });

        form.putInto(main);
        this.setListeners();
    }

    addPropPair = () => {
        let key = new Element("input", ["input"]);
        key.addAtt("id", "key" + this.counter);
        key.addAtt("placeholder", "key");
        let value = new Element("input", ["input"]);
        value.addAtt("id", "value" + this.counter);
        value.addAtt("placeholder", "value");

        [key, value].forEach(element => {
            element.putInto(this.props.element);
            element.element.addEventListener("blur", this.validateProps);
        });

        this.counter++;
    }

    setListeners = () => {
        let temp = document.getElementById("name");
        temp.addEventListener("blur", this.onNameVerification);

        temp = document.getElementById("price");
        temp.addEventListener("blur", this.onPriceVerification);

        temp = document.getElementById("url");
        temp.addEventListener("blur", this.onURLVerification);

        this.addPropButton.element.addEventListener("click", this.addProp);

        this.button.element.addEventListener("click", this.submit);
    }

    onNameVerification = (event) => {
        let target = event.target;
        this.setResult(target, verify.text(target));
    }

    onPriceVerification = (event) => {
        let target = event.target;
        this.setResult(target, verify.num(target));
    }

    onURLVerification = (event) => {
        let target = event.target;
        this.setResult(target, verify.URL(target));
    }

    addProp = (event) => {
        event.preventDefault();
        this.addPropPair();
    }

    setResult = (target, flag) => {
        let message = document.getElementById(target.getAttribute("id") + "_message");
        if (flag) {
            target.classList.remove("input-error");
            target.classList.add("input-correct");
            message.classList.add("hidden");
        }
        else {
            target.classList.remove("input-correct");
            target.classList.add("input-error");
            message.classList.remove("hidden");
        }
    }

    validateProps = (event) => {
        let target = event.target;
        this.checkValues(target);
    }

    checkValues = (target) => {
        if (verify.req(target)) {
            target.classList.remove("input-error");
            target.classList.add("input-correct");
        } else {
            target.classList.remove("input-correct");
            target.classList.add("input-error");
        }
    }

    submit = (event) => {
        event.preventDefault();

        let name = document.getElementById("name");
        let price = document.getElementById("price");
        let img = document.getElementById("url");

        let elems = [name, price, img];

        let elems_prop = []

        for (let i = 0; i < this.counter; i++) {
            elems_prop.push(document.getElementById("key" + i));
            elems_prop.push(document.getElementById("value" + i));
        }

        let flags = [];
        let flags_prop = [];

        flags.push(verify.req(name));
        flags.push(verify.num(price));
        flags.push(verify.URL(img));

        elems_prop.forEach(element => {
            flags_prop.push(verify.req(element))
        });

        if (flags.every(element => {return element}) && flags_prop.every(element => {return element})) {
            this.addToData();
            this.main();
        }
        else {
            this.error.element.classList.remove("hidden");
            let counter = 0;
            elems.forEach(element => {
                this.setResult(element, flags[counter++]);
            });
            counter = 0;
            elems_prop.forEach(element => {
                this.checkValues(element);
            });
        }
    }

    main = () => {
        this.navbar.select(document.getElementById("main_site"));
    }

    addToData = () => {
        let product = {
            name: document.getElementById("name").value,
            price: document.getElementById("price").value,
            src: document.getElementById("url").value
        };

        let desc = [];

        for (let i = 0; i < this.counter; i++) {
            let temp = [];
            temp.push(document.getElementById("key" + i).value);
            temp.push(document.getElementById("value" + i).value);
            desc.push(temp);
        }

        product.description = desc;

        api.post(product, "mainElements");
    }
}