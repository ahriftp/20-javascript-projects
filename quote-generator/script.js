const quotesApi = "https://type.fit/api/quotes";
const twitterApi = "https://twitter.com/intent/tweet";
var gQuotes;

// HTML DOM
const quoteContainer = document.getElementById("quote-container");
const textQuote = document.getElementById("quote");
const textAuthor = document.getElementById("author");
const loader = document.getElementById("loader");
// Buttonss
const btnTwitter = document.getElementById("twitter");
const btnNewQuote = document.getElementById("new-quote");

// Fetch quotes
// Return object {quotes/err}
const getQuotes = async () => {
  try {
    const res = await fetch(quotesApi);
    return { quotes: await res.json() };
  } catch (err) {
    return { err };
  }
};

// Get a random quote from array
// Params:
// quotes: array
const getRandomQuote = (quotes) =>
  quotes[Math.floor(Math.random() * quotes.length)];

// Set quote
// Params:
// quote: object
const setQuote = (quote) => {
  textQuote.textContent = quote.text;
  textAuthor.textContent = quote.author ? quote.author : "Unknown";

  // If quote length is long, apply class
  quote.text.length > 100
    ? textQuote.classList.add("long-quote")
    : textQuote.classList.remove("long-quote");
};

// Refreshes and sets the new quote
const refreshQuote = () => {
  showLoading();
  setQuote(getRandomQuote(gQuotes));
  hideLoading();
};

// Loads a twitter API to tweet
const tweetQuote = () => {
  const twitterUrl = `${twitterApi}?text=${textQuote.textContent} - ${textAuthor.textContent}`;
  window.open(twitterUrl, "_blank");
};

// Loader functions
const showLoading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};
const hideLoading = () => {
  loader.hidden = true;
  quoteContainer.hidden = false;
};

// Main (Run once when page loads)
(async () => {
  showLoading();
  const { quotes, err } = await getQuotes();
  hideLoading();
  if (err) {
    // Handle error
  }
  gQuotes = quotes;
  refreshQuote();
})();

// Event listeners
btnNewQuote.addEventListener("click", refreshQuote);
btnTwitter.addEventListener("click", tweetQuote);
