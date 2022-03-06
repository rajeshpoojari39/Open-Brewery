// If search box cleared after search, to clear search results as well
const checkForEmpty = () => {
  event.preventDefault();
  let keyword = document.getElementById("search-brewery").value;
  let brewerySearchResults = document.getElementById("brewery-search-results");
  if (keyword.length === 0) {
    brewerySearchResults.innerHTML = "";
  }
};

//Function to search brewery
const searchKeyword = async () => {
  event.preventDefault();
  let keyword = document.getElementById("search-brewery").value;
  let brewerySearchResults = document.getElementById("brewery-search-results");
  brewerySearchResults.innerHTML = "";

  let response = await fetch(
    `https://api.openbrewerydb.org/breweries/search?query=${keyword}`
  );

  let data = await response.json();

  // If Api response has data to create Cards from the data and render in brewerySearchResults

  if (data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      // Card HTML creation
      let breweryCard = document.createElement("div");
      breweryCard.setAttribute("class", "brewery-card");
      let ulList = document.createElement("ul");
      let breweryName = document.createElement("li");
      let breweryType = document.createElement("li");
      let breweryAddress = document.createElement("li");
      let breweryWebsite = document.createElement("li");
      let breweryPhone = document.createElement("li");
      /*
        For address combining street, address2, address2, city, state, country 
        and also checking if they are null or not and then adding it in address variable 
      */
      let address = "";
      data[i].street ? (address += data[i].street) + "," + " " : "";
      data[i].address_2 ? (address += data[i].address_2) + "," + " " : "";
      data[i].ddress_3 ? (address += data[i].ddress_3) + "," + " " : "";
      data[i].city ? (address += data[i].city + "," + " ") : "";
      data[i].state ? (address += data[i].state + "," + " ") : "";
      data[i].country ? (address += data[i].country + ".") : "";
      // For website checking if they are null or not and then adding it in website variable
      let website = "";
      data[i].website_url
        ? (website += data[i].website_url)
        : (website += "Unavailable");
      // For phone checking if they are null or not and then adding it in phone variable
      let phone = "";
      data[i].phone ? (phone += data[i].phone) : (phone += "Unavailable");
      // Adding the values to the specific element
      breweryName.innerText = `Name - ${data[i].name}`;
      breweryType.innerText = `Type - ${data[i].brewery_type}`;
      breweryAddress.innerText = `Address - ${address}`;
      breweryWebsite.innerText = `Website - ${website}`;
      breweryPhone.innerText = `Phone - ${phone}`;
      ulList.appendChild(breweryName);
      ulList.appendChild(breweryType);
      ulList.appendChild(breweryAddress);
      ulList.appendChild(breweryWebsite);
      ulList.appendChild(breweryPhone);
      breweryCard.appendChild(ulList);
      // Appending the card to brewerySearchResults
      brewerySearchResults.appendChild(breweryCard);
    }
  } else {
    // If Api response has no data.
    let noResultsFound = document.createElement("h1");
    noResultsFound.setAttribute("class", "no-result-found");
    noResultsFound.innerText = `Sorry, couldn't found any matches for "${keyword}"`;
    brewerySearchResults.appendChild(noResultsFound);
  }
};
