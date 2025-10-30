chrome.contextMenus.create({
  id: "searchParty",
  title: "Otsi '%s' erakondliku kuuluvust",
  contexts: ["selection"]
});

chrome.contextMenus.create({
  id: "searchFacebook",
  title: "Otsi '%s' Facebookist",
  contexts: ["selection"]
});

chrome.contextMenus.create({
  id: "searchInforegister",
  title: "Otsi '%s' Inforegistrist",
  contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.selectionText) {
    let searchQuery = encodeURIComponent(info.selectionText);
    let searchUrl = "";
    switch(info.menuItemId) {
      case "searchParty":
        searchQuery = searchQuery.replace(new RegExp("%20", 'g'), "%2B");
        searchUrl = `https://ariregister.rik.ee/est/political_party/members_search?person_name="${searchQuery}"`;
        break;
      case "searchParty":
        searchUrl = `https://www.facebook.com/search/top/?q=${searchQuery}`;
        break;
      case "searchInforegister":
        searchUrl = `https://www.inforegister.ee/otsing/%22${searchQuery}%22/`;
        break;
    }
    if (searchUrl != "") {
      chrome.tabs.create({ url: searchUrl });
    }
  }
});
