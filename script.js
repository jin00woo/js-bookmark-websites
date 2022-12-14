document.getElementById("myForm").addEventListener("submit", saveBookmark);

function saveBookmark(e){
  e.preventDefault();
  const siteName = document.getElementById("siteName").value;
  const siteUrl = document.getElementById("siteUrl").value;

  if(!siteName || !siteUrl){
    alert("Please fill in the form");
    return false;
  }

  const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  const regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    alert("Please use a valid URL");
    return false;
  }

  const bookmark = {
    name: siteName,
    url: siteUrl
  };

  if(localStorage.getItem("bookmarks") === null){
    const bookmarks = [];
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  else{
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }

  document.getElementById("myForm").reset();

  fetchBookmarks();
}

function deleteBookmark(url){
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  for(let i = 0; i < bookmarks.length; i++){
    if(bookmarks[i].url === url){
      bookmarks.splice(i, 1);
    }
  }
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  fetchBookmarks();
}

function fetchBookmarks(){
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  const bookmarksResults = document.getElementById("bookmarksResults");
  bookmarksResults.innerHTML = "";
  
  for(let i = 0; i < bookmarks.length; i++){
    const name = bookmarks[i].name;
    const url = bookmarks[i].url;

    bookmarksResults.innerHTML += `
    <div class="well">
      <h3>${name}</h3>
      <a class="btn btn-info" target="_blank" href='${url}'>Visit</a>
      <a onclick=deleteBookmark('${url}') class="btn btn-danger" href='#'>Delete</a>
    </div>
    `;
  }
}