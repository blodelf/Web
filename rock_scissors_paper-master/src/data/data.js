export const headerElements = [
    {tag: "img", src: "https://png.pngtree.com/png-clipart/20190516/original/pngtree-tune-up-auto-car-logo-design-png-image_4258928.jpg"},
    {tag: "p", text: "Speed Shop"},
 
]

export const navElements = [
    {text: "Home", id: "main_site"},
    {text: "Add a car", id: "add"},
    {id: "menu", classes: ["menu", "hidden"]}
]


export const footerElements = [
    {text: "Made by Vladyslav Holubtsov"
}
]

export const addMessage = "If you want to post your advertisement, fill out the form below.( 1 click on submit=1 publication )"

export const addElements = [
    {type: "text", label: "Сar Name", id: "name", text: "Enter a car name", message: "Car Name has to be at least 1 character long and not contain any special characters or numbers.(example: BMW or LADA)"},
    {type: "text", label: "Image URL", id: "url", text: "Enter a Image Url ", message: "Input proper url.(example: https://cdn.riastatic.com/photosnewr/auto/new_auto_storage/bmw_5-series__722455-1920x1080x90.webp)"},
    {type: "text", label: "Price", id: "price", text: "Enter the cost of your car", message: "Price has to be at least 1 number long and not contain special characters and space(es).(example: 100000)"}
]
