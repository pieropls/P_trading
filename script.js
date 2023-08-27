const apiKey = '7SDVDZJS6TAM46GU'; // Alpha Vantage API key
const stockSymbol = 'AAPL'; // Example stock symbol (Apple Inc.)

// Fetch live stock data from Alpha Vantage API
axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockSymbol}&interval=5min&apikey=${apiKey}`)
    .then(response => {
        const stockData = response.data['Time Series (5min)'];

        // Extract date and closing price for Chart.js
        const dates = Object.keys(stockData).reverse();
        const closingPrices = dates.map(date => parseFloat(stockData[date]['4. close']));

        // Display current price in the ticker
        const latestDate = dates[0];
        const currentPrice = closingPrices[0];
        const stockTicker = document.getElementById('stock-ticker');
        stockTicker.innerHTML = `Current Price of ${stockSymbol}: $${currentPrice.toFixed(2)}`;

        // Create a line chart using Chart.js
        const stockChart = document.getElementById('stock-chart').getContext('2d');
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
    })
    .catch(error => console.error('Error fetching stock data:', error));