document.addEventListener('DOMContentLoaded', function() {
    let goldPricePerGram;
    let goldPricePerGram24K;
    let goldPricePerGram22K;
    let goldPricePerGram18K;
    let goldPricePerGram14K;

    function fetchGoldPrice() {
        fetch('https://metals-api.com/api/latest?access_key=69wh9p4j735ievbuqoyz0do500nr8q7sx750pdng38yjaw8rfox899hx4r52&base=USD&symbols=XAU')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const goldPricePerOunce = data.rates.USDXAU;
                    goldPricePerGram = goldPricePerOunce / 31.1035;
                    goldPricePerGram24K = goldPricePerGram;
                    goldPricePerGram22K = goldPricePerGram * (22 / 24);
                    goldPricePerGram18K = goldPricePerGram * (18 / 24);
                    goldPricePerGram14K = goldPricePerGram * (14 / 24);
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
        let goldPricePerGramKarat;
        switch (karat) {
            case '24':
                goldPricePerGramKarat = goldPricePerGram24K;
                break;
            case '22':
                goldPricePerGramKarat = goldPricePerGram22K;
                break;
            case '18':
                goldPricePerGramKarat = goldPricePerGram18K;
                break;
            case '14':
                goldPricePerGramKarat = goldPricePerGram14K;
                break;
        }
        document.getElementById('livePrice').innerText = ` $${goldPricePerGramKarat.toFixed(2)} per gram`;
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

        let goldPricePerGramKarat;
        switch (karat) {
            case '24':
                goldPricePerGramKarat = goldPricePerGram24K;
                break;
            case '22':
                goldPricePerGramKarat = goldPricePerGram22K;
                break;
            case '18':
                goldPricePerGramKarat = goldPricePerGram18K;
                break;
            case '14':
                goldPricePerGramKarat = goldPricePerGram14K;
                break;
        }

        const totalPrice = (goldPricePerGramKarat + makingCharge) * weight;
        document.getElementById('result').innerText = `Total Price: $${totalPrice.toFixed(2)}`;
    });

    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('focus', function() {
            this.value = '';
        });
    });
});
