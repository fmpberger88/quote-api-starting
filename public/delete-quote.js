document.addEventListener('DOMContentLoaded', (event) => {
    const deleteQuoteButton = document.getElementById('delete-btn');
    const messageContainer = document.getElementById('message-container');
    if (deleteQuoteButton) {
        deleteQuoteButton.addEventListener('click', async () => {
            const quoteId = document.getElementById('update-quote-id').value;
            try {
                const response = await fetch(`/api/quotes/${quoteId}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Quote deleted:', data);
                    messageContainer.innerHTML = '<span style="color: green;">Quote successfully deleted!</span>';
                } else {
                    console.error('Fehler bei der Anfrage:', response.status, response.statusText);
                    messageContainer.innerHTML = '<span style="color: red;">Error deleting the quote.</span>';
                }
            } catch (error) {
                console.error('Fehler bei der Anfrage:', error.message);
                messageContainer.innerHTML = '<span style="color: red;">An error occurred.</span>';
            }
        });
    }
});
