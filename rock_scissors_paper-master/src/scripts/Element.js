export default class Element {

    constructor (tag, classes=undefined, atts=undefined, text=undefined) {
        this.element = document.createElement(tag);
        this.addClass(classes);
        this.addAtts(atts);
        this.addText(text);
    }

    addText = (text) => {
        if (text !== undefined) {
            let textNode = document.createTextNode(text);
            this.element.appendChild(textNode); 
        }  
    }

    putInto = (parent) => {
        parent.appendChild(this.element);
    }

    addAtts = (atts) => {
        if (atts !== undefined) {
            atts.forEach(element => {
                this.addAtt(element.name, element.value);
            });
        }
    }

    addAtt = (name, value) => {
        if (name !== undefined && value !== undefined) {
            this.element.setAttribute(name, value);
        }
    }

    addClass = (classes) => {
        if (classes !== undefined) {
            this.element.classList.add(...classes);
        }
    }

    rmClass = (classes) => {
        if (classes !== undefined) {
            this.element.classList.remove(...classes);
        }
    }
}