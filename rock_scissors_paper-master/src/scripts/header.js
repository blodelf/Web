import Element from "./Element.js"
import * as data from "../data/data.js"

export let fillHeader = () => {
    let header = document.getElementById("header");
    data.headerElements.forEach(element => {
        let temp = new Element(element.tag, ["header-content"]);
        switch (element.tag) {
            case "img":
                temp.addAtt("src", element.src);
                temp.addClass(["header-icon"]);
                break;
            case "p":
                temp.addText(element.text);
                temp.addClass(["header-text", "noselect"])
                break;
          
        }
        temp.putInto(header);
    });
}