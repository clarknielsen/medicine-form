function getDate() {
  var d = new Date();

  // calculate future date based on user selection
  d.setDate(d.getDate() + parseInt(document.getElementById("days").value
) - 5);

  // format and plug into html
  var format = `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`;
  document.getElementById("date").textContent = format;
}

// display initial date on page load
getDate();

// change date display any time drop-down changes
document.getElementById("days").onchange = getDate;

document.getElementById("name").onblur = function() {
  // display name after input has changed
  document.getElementById("name_display").textContent = this.value;
};

document.getElementById("email").onblur = function() {
  // display email after input has changed
  document.getElementById("email_display").textContent = this.value;
};

document.getElementById("medicine").onblur = function() {
  // display medicine after input has changed
  document.getElementById("medicine_display").textContent = this.value;

  // call api
  fetch(`https://api.fda.gov/drug/event.json?search=${this.value}&count=patient.reaction.reactionmeddrapt.exact`).then(function(response) {
    // verify if api call worked
    if (response.status !== 200) {
      document.getElementById("reactions").innerHTML = "";
      return;
    }
  
    response.json().then(function(data) {
      // start list
      var content = "<ul>";

      for (let i = 0; i < 5; i++) {
        // convert entire term to lowercase, then uppercase only first letters
        let word = data.results[i].term.toLowerCase().replace(/\b[^ ]/g, (x) => x.toUpperCase());

        content += `<li>${word}</li>`;
      }

      // end list
      content += "</ul>";

      // display on page
      document.getElementById("reactions").innerHTML = content;
    });
  });
};

document.getElementById("formy").onsubmit = function(event) {
  // stop page from reloading
  event.preventDefault();
};