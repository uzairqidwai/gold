document.addEventListener('DOMContentLoaded', function() {
    function fetchGoldPrice() {
        fetch('https://metals-api.com/api/latest?access_key=69wh9p4j735ievbuqoyz0do500nr8q7sx750pdng38yjaw8rfox899hx4r52&base=USD&symbols=XAU')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const goldPricePerOunce = data.rates.USDXAU;
                    const goldPricePerGram = goldPricePerOunce / 31.1035;
                    localStorage.setItem('goldPricePerGram', goldPricePerGram);
                    updateLivePrice();
                } else {
                    document.getElementById('livePrice').innerText = 'Error fetching gold price. Please try again later.';
                }
            })
            .catch(error => {
                console.error('Error fetching gold price:', error);
                document.getElementById('livePrice').innerText = 'Error fetching gold price. Please try again later.';
            });
    }

    function updateLivePrice() {
        const karat = document.getElementById('karat').value;
        const goldPricePerGram = parseFloat(localStorage.getItem('goldPricePerGram'));
        const goldPricePerGramKarat = goldPricePerGram * (karat / 24);
        document.getElementById('livePrice').innerText = `Live Gold Price: $${goldPricePerGramKarat.toFixed(2)} per gram (${karat}K)`;
    }

    fetchGoldPrice();
    setInterval(fetchGoldPrice, 60000); // Refresh every 1 minute

    document.getElementById('karat').addEventListener('change', updateLivePrice);

    document.getElementById('goldForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const karat = document.getElementById('karat').value;
        const makingChargeInput = document.getElementById('makingCharge').value;
        const makingCharge = makingChargeInput ? parseFloat(makingChargeInput) : 0;
        const weight = parseFloat(document.getElementById('weight').value);

        const goldPricePerGram = parseFloat(localStorage.getItem('goldPricePerGram'));
        const goldPricePerGramKarat = goldPricePerGram * (karat / 24);

        const totalPrice = (goldPricePerGramKarat + makingCharge) * weight;
        document.getElementById('result').innerText = `Total Price: $${totalPrice.toFixed(2)}`;
    });

    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('focus', function() {
            this.value = '';
        });
    });
});
