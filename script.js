document.addEventListener('DOMContentLoaded', function() {
    fetch('https://metals-api.com/api/latest?access_key=69wh9p4j735ievbuqoyz0do500nr8q7sx750pdng38yjaw8rfox899hx4r52&base=USD&symbols=XAU')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const goldPricePerOunce = data.rates.USDXAU;
                const goldPricePerGram = goldPricePerOunce / 31.1035;
                document.getElementById('livePrice').innerText = `Live Gold Price: $${goldPricePerGram.toFixed(2)} per gram`;
                localStorage.setItem('goldPricePerGram', goldPricePerGram);
            } else {
                document.getElementById('livePrice').innerText = 'Error fetching gold price. Please try again later.';
            }
        })
        .catch(error => {
            console.error('Error fetching gold price:', error);
            document.getElementById('livePrice').innerText = 'Error fetching gold price. Please try again later.';
        });
});

document.getElementById('goldForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const karat = document.getElementById('karat').value;
    let makingCharge = parseFloat(document.getElementById('makingCharge').value);
    const weight = parseFloat(document.getElementById('weight').value);

    if (isNaN(makingCharge)) {
        makingCharge = 0;
    }

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
