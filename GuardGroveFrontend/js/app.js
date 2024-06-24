document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:5000/api/values")
        .then(response => response.json())
        .then(data => {
            const content = document.getElementById("content");
            const list = document.createElement("ul");
            data.forEach(item => {
                const listItem = document.createElement("li");
                listItem.textContent = item.name;
                list.appendChild(listItem);
            });
            content.appendChild(list);
        })
        .catch(error => {
            console.error("There was an error fetching the data!", error);
        });
});
