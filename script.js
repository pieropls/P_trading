const apiKey = '7SDVDZJS6TAM46GU'; // Alpha Vantage API key

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const stockTicker = document.getElementById('stock-ticker');
    const stockChart = document.getElementById('stock-chart').getContext('2d');

    searchButton.addEventListener('click', () => {
        const companyName = searchInput.value;
        if (companyName) {
            fetchStockData(companyName);
        }
    });

    function fetchStockData(companyName) {
        axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${companyName}&interval=5min&apikey=${apiKey}`)
            .then(response => {
                const stockData = response.data['Time Series (5min)'];
                const dates = Object.keys(stockData).reverse();
                const closingPrices = dates.map(date => parseFloat(stockData[date]['4. close']));

                const latestDate = dates[0];
                const currentPrice = closingPrices[0];
                stockTicker.innerHTML = `Current Price of ${companyName}: $${currentPrice.toFixed(2)}`;

                renderStockChart(dates, closingPrices);
            })
            .catch(error => console.error('Error fetching stock data:', error));
    }

    function renderStockChart(dates, closingPrices) {
        new Chart(stockChart, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Closing Price',
                    data: closingPrices,
                    borderColor: 'blue',
                    backgroundColor: 'rgba(0, 0, 255, 0.2)',
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day'
                        }
                    },
                    y: {
                        beginAtZero: false,
                    }
                }
            }
        });
    }
});
