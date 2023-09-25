const updateQuoteButton = document.getElementById('update-btn');

updateQuoteButton.addEventListener('click', () => {
    const updatedQuote = {
        quote: document.getElementById('updated-quote').value,
        person: document.getElementById('updated-person').value
    };
    const quoteId = document.getElementById('update-quote-id').value;
    fetch(`/api/quotes/${quoteId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedQuote)
    })
        .then(response => response.json())
        .then(data => {
            // Handle success
        });
});
