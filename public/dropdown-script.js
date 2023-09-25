const dropdown = document.getElementById('quoteDropdown');

const populateQuotesDropdown = () => {
    fetch('/api/quotes')
        .then(response => response.json())
        .then(data => {
            const quotes = data.quotes;
            if (Array.isArray(quotes)) {
                quotes.forEach(quote => {
                    const option = document.createElement('option');
                    option.value = quote.id;
                    option.textContent = `${quote.quote.substring(0, 20)}... - ${quote.person}`;
                    dropdown.appendChild(option);
                });
            } else {
                console.warn("Received data is not an array of quotes.");
            }
        });
}

// Dropdown Event-Listener
if (dropdown) {
    dropdown.addEventListener('change', (event) => {
        document.getElementById('update-quote-id').value = event.target.value;
    });

    populateQuotesDropdown();
}