const fetchButton = document.getElementById('fetch-button');
const stockSymbolInput = document.getElementById('symbol');
const stockSymbolSpan = document.getElementById('stock-symbol');
const stockPriceSpan = document.getElementById('stock-price');
const stockChangeSpan = document.getElementById('stock-change');
const stockInfo = document.querySelector('.stock-info');

fetchButton.addEventListener('click', () => {
    const symbol = stockSymbolInput.value.toUpperCase(); // Convert to uppercase
    const dummyData = generateDummyData(); // Replace with actual data fetching

    stockSymbolSpan.textContent = symbol;
    stockPriceSpan.textContent = `$${dummyData.price.toFixed(2)}`;
    stockChangeSpan.textContent = `${dummyData.change.toFixed(2)}%`;

    stockInfo.style.display = 'block';
});

function generateDummyData() {
    // Generate dummy stock data (replace with actual data)
    const price = Math.random() * 200;
    const change = Math.random() * 10 - 5;

    return {
        price,
        change,
    };
}
