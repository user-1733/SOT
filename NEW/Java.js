const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    performSearch(this.value); // 'this.value' gets the current input
  }
});

function performSearch(query) {
  // Replace this with your actual search logic
  console.log('Searching for:', query);
  // You would typically:
  // 1. Construct a search URL
  // 2. Redirect the user to the search results page
  // 3. Or, fetch search results using AJAX and display them on the current page
}