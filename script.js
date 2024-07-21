document.getElementById('goldForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const karat = document.getElementById('karat').value;
    const makingCharge = parseFloat(document.getElementById('makingCharge').value);
    const weight = parseFloat(document.getElementById('weight').value);

    fetch('https://metals-api.com/api/latest?access_key=69wh9p4j735ievbuqoyz0do500nr8q7sx750pdng38yjaw8rfox899hx4r52&base=USD&symbols=XAU')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const goldPricePerOunce = data.rates.USDXAU;
                const goldPricePerGram = goldPricePerOunce / 31.1035;
                const goldPricePerGramKarat = goldPricePerGram * (karat / 24);

                const totalPrice = (goldPricePerGramKarat + makingCharge) * weight;
                document.getElementById('result').innerText = `Total Price: $${totalPrice.toFixed(2)}`;
            } else {
                document.getElementById('result').innerText = 'Error fetching gold price. Please try again later.';
            }
        })
        .catch(error => {
            console.error('Error fetching gold price:', error);
            document.getElementById('result').innerText = 'Error fetching gold price. Please try again later.';
        });
});
