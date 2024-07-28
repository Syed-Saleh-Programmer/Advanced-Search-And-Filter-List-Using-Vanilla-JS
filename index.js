// Dom elements
let votersListEl = document.querySelector("div#voters-list");
let searchEl = document.querySelector("input.search");
let filterVotedInput = document.querySelector("input.filter-voted");
let filterAcceptedInput = document.querySelector("input.filter-accepted");
let voteCountEl = document.querySelector("span.vote-count-value");



let dbVoterData = [];
let searchFilteredVoterList = [];
let votedFilteredList = [];
let acceptedFilteredList = [];
let isFilterVotedChecked = false;
let isFilterAcceptedChecked = false;
let voteCount = 0;



// render particular filtered list of voters

function renderVoterList(voterList, searchValue = "") {
    votersListEl.innerHTML = "";

    // change search indicators text everytime when search input changes
    let searchIndicatorEl = searchValue ? `<p class="search-indicator">Search Results For <span class="search-value-el">${searchValue}</span>.</p>` : "";

    votersListEl.innerHTML += searchIndicatorEl;

    voterList.map((voter) => {
        votersListEl.innerHTML += `<div class="voter voter-${voter.id}"><img src="${voter.img}" class="avatar"><p><span class="label">Name:</span> ${voter.name}</p><p><span class="label">CNIC:</span> ${voter.cnic}</p><div class="filter-checkbox vote-casted-check">Casted: <input type="checkbox" ${(voter.voteCasted) ? "checked" : ""} disabled></div><div class="filter-checkbox vote-accepted-check">Accepted: <input type="checkbox" ${(voter.voteAccepted) ? "checked" : ""} disabled></div><div class="filter-checkbox vote-denied-check">Denied: <input type="checkbox" ${(voter.voteAccepted === false) ? "checked" : ""} disabled></div></div>`
    })
    voteCount = voterList.length;
    voteCountEl.textContent = voteCount >= 10 ? voteCount : `0${voteCount}`;
    // console.log(voteCount);
}

function getFilteredList(actualList, searchVal, voteCastedCheck, voteAcceptedCheck, voteDeniedCheck) {
    let filteredList = actualList.filter((voter) => {
        return (
            (
                searchVal === "" ||
                voter.name.toLowerCase().includes(searchVal.toLowerCase()) ||
                voter.cnic.includes(searchVal)
            ) &&
            (voteCastedCheck === true ? voter.voteCasted : true) &&
            (voteAcceptedCheck === true ? voter.voteAccepted : true) &&
            (voteDeniedCheck === true ? (!voter.voteAccepted) : true)
        );
    });

    return filteredList;
}


// Uodate UI based on the search and filter inputs

function updateUI() {
    // update vote count
    voteCountEl.textContent = voteCount;

    // update voter list based on search and filter inputs
    let filteredList = getFilteredList(dbVoterData, searchEl.value, isFilterVotedChecked, isFilterAcceptedChecked);

    renderVoterList(filteredList, searchEl.value);

}



window.onload = async function () {
    await fetch(`votersDB.json`).then(res => res.json()).then(res => {
        dbVoterData = res;
    });
    
    
    
    // add voters to the voter list
    renderVoterList(dbVoterData);

    searchEl.addEventListener('input', (e) => {
        updateUI();
    })
    




    // event listner for filter by vote casted checkbox
    filterVotedInput.addEventListener('change', (e) => {
        if (filterVotedInput.checked === true) {
            isFilterVotedChecked = true
            updateUI()
        } else {
            isFilterVotedChecked = false
            updateUI()
        }
    })
    // event listner for filter by vote accepetd checkbox
    filterAcceptedInput.addEventListener('change', (e) => {
        if (filterAcceptedInput.checked === true) {
            isFilterAcceptedChecked = true
            updateUI()
        } else {
            isFilterAcceptedChecked = false
            updateUI()
        }
    })




}








