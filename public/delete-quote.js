const deleteQuoteButton = document.getElementById('delete-btn');

deleteQuoteButton.addEventListener('click', () => {
    const quoteId = document.getElementById('update-quote-id').value;
    fetch(`/api/quotes/${quoteId}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            // Handle success
        });
});
