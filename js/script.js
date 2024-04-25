const actions = {};

actions.findPath = async () => {

}


document.body.addEventListener("click", (e) => {
    let action = e.target.dataset.action;

    if (actions[action]) {
        actions[action]();
    }

});

function darkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
  }