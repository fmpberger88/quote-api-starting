// DOM-Elemente referenzieren
const fetchAllButton = document.getElementById('fetch-quotes');
const fetchRandomButton = document.getElementById('fetch-random');
const fetchByAuthorButton = document.getElementById('fetch-by-author');
const quoteContainer = document.getElementById('quote-container');
const dropdown = document.getElementById('quoteDropdown');

const resetQuotes = () => {
  quoteContainer.innerHTML = '';
}

const renderError = response => {
  quoteContainer.innerHTML = `<p>Your request returned an error from the server: </p>
<p>Code: ${response.status}</p>
<p>${response.statusText}</p>`;
}

const renderQuotes = (quotes = []) => {
  resetQuotes();
  if (quotes.length > 0) {
    quotes.forEach(quote => {
      const newQuote = document.createElement('div');
      newQuote.className = 'single-quote';
      newQuote.innerHTML = `<div class="quote-text">${quote.quote}</div>
      <div class="attribution">- ${quote.person}</div>`;
      quoteContainer.appendChild(newQuote);
    });
  } else {
    quoteContainer.innerHTML = '<p>Your request returned no quotes.</p>';
  }
}


// Event-Listener für die Schaltflächen
const fetchQuotes = (endpoint) => {
  fetch(endpoint)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          renderError(response);
        }
      })
      .then(response => {
        renderQuotes(response.quotes);
      });
};

fetchAllButton.addEventListener('click', () => fetchQuotes('/api/quotes'));
fetchRandomButton.addEventListener('click', () => fetchQuotes('/api/quotes/random'));
fetchByAuthorButton.addEventListener('click', () => {
  const author = document.getElementById('author').value;
  fetchQuotes(`/api/quotes?person=${author}`);
});
