// script.js
document.addEventListener('DOMContentLoaded', () => {
    const itemsList = document.getElementById('items-list');
    const getPriceBtn = document.getElementById('get-price-btn');
    const itemInput = document.getElementById('item-input');
    const itemPrice = document.getElementById('item-price');

    const username = 'ftp_connection';
    const password = '07ec582c-04a1-415a-87a9-38305f6f1381';
    const auth = 'Basic ' + btoa(`${username}:${password}`);
    const userAgent = 'APITEST/1.0';

    // API: Liste der Items abrufen
    fetch('https://api.opsucht.net/market/items', {
        headers: {
            'Authorization': auth,
            'User-Agent': userAgent
        }
    })
    .then(response => response.json())
    .then(data => {
        data.items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            itemsList.appendChild(li);
        });
    })
    .catch(error => console.error('Fehler beim Abrufen der Items:', error));

    // API: Preis eines Items abrufen
    getPriceBtn.addEventListener('click', () => {
        const itemName = itemInput.value.trim().toLowerCase();
        if (itemName) {
            fetch(`https://api.opsucht.netmarket/price/{item}market/price/{item}${itemName}`, {
                headers: {
                    'Authorization': auth,
                    'User-Agent': userAgent
                }
            })
            .then(response => response.json())
            .then(data => {
                itemPrice.textContent = `Preis für ${itemName}: ${data.price} Coins`;
            })
            .catch(error => console.error('Fehler beim Abrufen des Preises:', error));
        } else {
            itemPrice.textContent = 'Bitte gib einen gültigen Itemnamen ein.';
        }
    });
});
