import Element from "./Element.js"
import * as data from "../data/data.js"

export let fillFooter = () => {
    const footer = document.getElementById("footer");
    data.footerElements.forEach(element => {
        let temp = new Element("p", ["footer-element"]);
        temp.addText(element.text);
        temp.putInto(footer);
    });
}