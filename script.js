document.addEventListener("DOMContentLoaded", () => {
    const username = "ftp_connection";
    const password = "07ec582c-04a1-415a-87a9-38305f6f1381";
    const baseUrl = "https://api.opsucht.net/market";

    async function fetchApi(endpoint) {
        const response = await fetch(`${baseUrl}${endpoint}`, {
            headers: {
                "Authorization": "Basic " + btoa(`${username}:${password}`),
                "User-Agent": "YourAppName/1.0"
            }
        });
        return response.json();
    }

    async function loadItems() {
        const items = await fetchApi("/items");
        const itemsList = document.getElementById("items-list");
        itemsList.innerHTML = "";
        items.forEach(item => {
            const listItem = document.createElement("li");
            listItem.textContent = item;
            listItem.addEventListener("click", () => loadItemDetails(item));
            itemsList.appendChild(listItem);
        });
    }

    async function loadItemDetails(item) {
        const itemDetails = await fetchApi(`/price/${item}`);
        document.getElementById("item-name").textContent = `Name: ${item}`;
        document.getElementById("item-price").textContent = `Preis: ${itemDetails.price}`;
    }

    document.getElementById("search-button").addEventListener("click", async () => {
        const query = document.getElementById("search-input").value.toLowerCase();
        const items = await fetchApi("/items");
        const filteredItems = items.filter(item => item.toLowerCase().includes(query));
        const itemsList = document.getElementById("items-list");
        itemsList.innerHTML = "";
        filteredItems.forEach(item => {
            const listItem = document.createElement("li");
            listItem.textContent = item;
            listItem.addEventListener("click", () => loadItemDetails(item));
            itemsList.appendChild(listItem);
        });
    });

    loadItems();
});
