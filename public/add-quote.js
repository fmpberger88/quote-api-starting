document.getElementById("quoteForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Verhindert den Standardformularversand

    const quote = document.getElementById('quote').value;
    const person = document.getElementById('person').value;

    // Prüfung, ob Quote und Person nicht leer sind
    if (!quote.trim() || !person.trim()) {
        alert("Both quote and person fields should be filled out!");
        return;
    }

    fetch('/api/quotes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            quote: quote,
            person: person
        })
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Failed to add quote");
            }
        })
        .then(({quote}) => {
            const newQuote = document.createElement('div');
            newQuote.innerHTML = `
        <h3>Congrats, your quote was added!</h3>
        <div class="quote-text">${quote.quote}</div>
        <div class="attribution">- ${quote.person}</div>
        <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
        `;
            document.getElementById('new-quote').appendChild(newQuote);
        })
        .catch(error => {
            console.error("Error adding quote:", error);
            alert("There was an error adding your quote. Please try again.");
        });
});
