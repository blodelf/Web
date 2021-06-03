window.onload=function(){
  try{
    if(document.querySelector('.change_color')){
      document.querySelector('.change_color').addEventListener('click', (event) => {
      event.preventDefault();
      if (localStorage.getItem("theme") === "special"){
        localStorage.setItem("theme", "light");
      }
      else if((localStorage.getItem("theme") != "special")&&(localStorage.getItem("theme") != "dark")){
        localStorage.setItem("theme", "dark");
      }
      else{
        localStorage.setItem("theme", "special");
      }
      addClassToHTML()
      });
      }
      else{
        var style = localStorage.getItem("theme");
        console.log(style);
        switch(style)
          {
            case "special":
            {
              localStorage.setItem("theme", "special");
              break;
            }
            case "dark":
            {
              localStorage.setItem("theme", "dark");
              break;
            }
            case "light":
            {
              localStorage.setItem("theme", "light");
              break;
            }
          }
          addClassToHTML()
      }
    }

catch{}


addClassToHTML()



    function addClassToHTML() {
  try {
    var style = localStorage.getItem("theme");
    switch(style)
      {
        case "special":
        {
          delClassByName(".rooms div","dark_rooms_div");
          addClassByName(".rooms div","special_rooms_div");
          document.querySelector("body").classList.remove("dark_theme_main");
          document.querySelector(".best_players").classList.remove("dark_theme_best");
          document.querySelector(".game_wrapper").classList.remove("dark_theme_game");
          document.querySelector("body").classList.add("special_theme_main");
          document.querySelector(".best_players").classList.add("special_theme_best");
          document.querySelector(".game_wrapper").classList.add("special_theme_game");
          break;
        }
        case "dark":
        {
          addClassByName(".rooms div","dark_rooms_div");
          document.querySelector("body").classList.add("dark_theme_main");
          document.querySelector(".best_players").classList.add("dark_theme_best");
          document.querySelector(".game_wrapper").classList.add("dark_theme_game");
          break;
        }
        case "light":
        {
          delClassByName(".rooms div","special_rooms_div");
          document.querySelector("body").classList.remove("special_theme_main");
          document.querySelector(".best_players").classList.remove("special_theme_best");
          document.querySelector(".game_wrapper").classList.remove("special_theme_game");
          break;
        }
      }
    function delClassByName(x, cls) {
    elements = document.querySelectorAll(x);
    console.log(elements);
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.remove(cls);
    }
  }
    function addClassByName(x, cls) {
    elements = document.querySelectorAll(x);
    console.log(elements);
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.add(cls);
    }
  }
}catch (err) {}
}
}
