const username = 'ftp_connection';
const password = '07ec582c-04a1-415a-87a9-38305f6f1381';
const apiUrl = 'https://api.opsucht.net/';
const headers = new Headers({
  'Authorization': 'Basic ' + btoa(username + ':' + password),
  'User-Agent': 'MyMarketApp/1.0'
});

async function fetchPrices() {
  try {
    const response = await fetch(`${apiUrl}market/prices`, { headers });
    const data = await response.json();
    displayPrices(data);
  } catch (error) {
    console.error('Fehler beim Abrufen der Preise:', error);
  }
}

function displayPrices(prices) {
  const priceList = document.getElementById('price-list');
  priceList.innerHTML = '';

  for (const item in prices) {
    const priceElement = document.createElement('div');
    priceElement.className = 'price-item';
    priceElement.innerHTML = `<strong>${item}</strong>: ${prices[item]}`;
    priceList.appendChild(priceElement);
  }
}

async function fetchItems() {
  try {
    const response = await fetch(`${apiUrl}market/items`, { headers });
    const items = await response.json();
    displayItems(items);
  } catch (error) {
    console.error('Fehler beim Abrufen der Items:', error);
  }
}

function displayItems(items) {
  const itemList = document.getElementById('item-list');
  itemList.innerHTML = '';

  items.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.className = 'item';
    itemElement.innerText = item;
    itemList.appendChild(itemElement);
  });
}

async function fetchCategories() {
  try {
    const response = await fetch(`${apiUrl}market/categories`, { headers });
    const categories = await response.json();
    displayCategories(categories);
  } catch (error) {
    console.error('Fehler beim Abrufen der Kategorien:', error);
  }
}

function displayCategories(categories) {
  const categoryList = document.getElementById('category-list');
  categoryList.innerHTML = '';

  categories.forEach(category => {
    const categoryElement = document.createElement('div');
    categoryElement.className = 'category';
    categoryElement.innerText = category;
    categoryList.appendChild(categoryElement);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetchPrices();
  fetchItems();
  fetchCategories();
});
