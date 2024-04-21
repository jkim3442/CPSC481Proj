const actions = {};

actions.alabama = async () => {

}


document.body.addEventListener("click", (e) => {
    let action = e.target.dataset.action;

    if (actions[action]) {
        actions[action]();
    }

});