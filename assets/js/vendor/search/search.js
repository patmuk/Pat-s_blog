var searchBox = document.getElementById('search-box');
var idx = lunr(function () {
  this.field('id');
  this.field('title', { boost: 10 });
  this.field('author');
  this.field('category');
  this.field('content');
});

function initalize() {
  // Initalize lunr with the fields it will be searching on. I've given title
  // a boost of 10 to indicate matches on this field are more important.

  for (var key in window.store) { // Add the data to lunr
    idx.add({
      'id': key,
      'title': window.store[key].title,
      'author': window.store[key].author,
      'category': window.store[key].category,
      'content': window.store[key].content
    });
  }

  searchBox.addEventListener('keyup',function(){performSearch()});
}

function displaySearchResults(results, store) {
  var searchResults = document.getElementById('search-results');

  if (results.length) { // Are there any results?
    var appendString = '';

    for (var i = 0; i < results.length; i++) {  // Iterate over the results
      var item = store[results[i].ref];
      appendString += '<li><a href="' + item.url + '"><h3>' + item.title + '</h3></a>';
      appendString += '<p>' + item.content.substring(0, 150) + '...</p></li>';
    }

    searchResults.innerHTML = appendString;
  } else {
    searchResults.innerHTML = '<li>No results found</li>';
  }
}

function performSearch(){
  var searchTerm = searchBox.value;//formatQuery(searchBox.value);
  var results = idx.search(searchTerm); // Get lunr to perform a search
  displaySearchResults(results, window.store); // We'll write this in the next section
}
