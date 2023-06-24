const getCity = (id, callback) => {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == xhr.DONE) {
            callback(JSON.parse(xhr.response));
        }
    };
    xhr.open("GET", `http://localhost:8000/server/city.php?id=${id}`);
    xhr.send();
}

const populateComponents = () => {
    var route = document.querySelector("#route");

    var index = parseInt(localStorage.getItem("index"));
    for (var i = 0; i <= index; ++i) {
        var key = `city${i}`;
        var item = parseInt(localStorage.getItem(key));
        getCity(item, (city) => {
            var p = document.createElement("p");
            console.log(city["name"]);
            p.innerText = city["name"];
            route.appendChild(p);
        });

    }
}

document.addEventListener("DOMContentLoaded", populateComponents);