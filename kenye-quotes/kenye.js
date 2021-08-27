
const loadQuote = () => {
    fetch('https://api.kanye.rest/')
        .then(Response => Response.json())
        .then(data => displayQuote(data))
}

const displayQuote = data => {
    document.getElementById('quoteContainer').innerText = data.quote;
}

loadQuote();