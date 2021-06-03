import Element from "./Element.js"
import * as data from "../data/data.js"
import MainSite from "./main.js"
import AddProduct from "./addProduct.js"

export default class Nav {
    constructor() {
        this.main = document.getElementById("main");
        let nav = document.getElementById("nav");
        let ul = new Element("ul", ["list", "flex-container", "noselect"]);
        ul.putInto(nav);
        data.navElements.forEach(element => {
            let temp = new Element("li", ["list-element"], [{name: "id", value: element.id}], element.text);
            temp.addClass(element.classes);
            if (element.id == "menu") {
                for (let i = 0; i < 3; i++) {
                    let item = new Element("div");
                    item.putInto(temp.element);
                }
            }
            temp.putInto(ul.element);
        });
        this.setListeners();
        this.main_site = new MainSite();
        this.add = new AddProduct();
        this.setCurrent("main_site");
        
        this.was_set = false;
        let width = document.getElementsByTagName("body")[0].clientWidth;
        if (width <= 800) {
            this.setMenu();
        }
    }

    setCurrent = (name) => {
        const poss = document.getElementById(name);
        if (this.current !== undefined && this.current !== poss) {
            this.current.classList.remove("nav_element_selected");
            this.main.innerHTML = "";
        }
            this.current = poss
            this.current.classList.add("nav_element_selected");
    }
    
    setListeners = () => {
        data.navElements.forEach(elem => {
            let temp = document.getElementById(elem.id);
            if (temp.id == "menu") {
                temp.addEventListener("click", this.toggleMenu);
            } else {
                temp.addEventListener("click", this.selectNav);
            }
        });

        let x = window.matchMedia("(max-width: 800px)");
        x.addListener(this.setMenu);
    }

    selectNav = (event) => {
        this.select(event.target);
    }

    select = (target) => {
        if (this.checkCurrent(target)) {
            let id = target.getAttribute("id")
            this.setCurrent(id);
            switch (id) {
                case "add":
                    this.add.assemble();
                    break;
                case "main_site":
                    this.main_site.assemble();
                    break;
                
            }
        }
    }

    checkCurrent = (element) => {
        return element !== this.current;
    }

    setMenu = () => {
        let menu = document.getElementById("menu");
        if (!this.was_set) {
            this.closeMenu();
            menu.classList.remove("hidden");
        } else {
            this.openMenu();
            menu.classList.add("hidden");
        }
        this.was_set = !this.was_set;
        this.menu_toggled = false;
    }

    toggleMenu = () => {
        if (this.menu_toggled) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
        this.menu_toggled = !this.menu_toggled;
    }

    openMenu = () => {
        ["add", "main_site"].forEach(id => {
            let temp = document.getElementById(id);
            if (temp !== null) {
                temp.classList.remove("hidden");
            }
        });
    }

    closeMenu = () => {
        ["add", "main_site"].forEach(id => {
            let temp = document.getElementById(id);
            if (temp !== null) {
                temp.classList.add("hidden");
            }
        });
    }
}