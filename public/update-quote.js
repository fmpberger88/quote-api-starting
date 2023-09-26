const updateQuoteButton = document.getElementById('update-btn');

updateQuoteButton.addEventListener('click', async () =>{
    const updatedQuote = {
        quote: document.getElementById('updated-quote').value,
        person: document.getElementById('updated-person').value
    };
    const quoteId = document.getElementById('update-quote-id').value;
    const messageContainer = document.getElementById('message-container');
    try {
        const response = await  fetch(`/api/quotes/${quoteId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedQuote)
        });

        if (response.ok) {
            const data = response.json();
            messageContainer.innerHTML = '<span style="color: green;">Quote successfully updated!</span>';
        } else {
            console.log(`There was an error: ${response.status}, ${response.statusText}`);
            messageContainer.innerHTML = '<span style="color: #FF5733">Error updating quote</span>'
        }

    } catch (error) {
        console.log(`Error occured ${error}`)
        messageContainer.innerHTML = '<span style="color: #FF5733">Error occured!</span>'
    }
})