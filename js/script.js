const findPath = async () => {
    let startData = document.getElementById('startState').value;
    let endData = document.getElementById('endState').value;

    let inputData = {start: startData, end: endData}

    fetch('http://localhost:5000/calculate_shortest_path', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Shortest path:', data);
        document.getElementById("statusResult").innerHTML = JSON.stringify(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("findPathBtn").addEventListener("click", findPath);
});

function darkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
  }