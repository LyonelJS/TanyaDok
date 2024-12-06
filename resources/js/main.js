(function($) {

	"use strict";

	document.addEventListener('DOMContentLoaded', function(){

        // Set the cookie to today's date
        
        
    var today = new Date(),
        year = today.getFullYear(),
        month = today.getMonth(),
        monthTag =["January","February","March","April","May","June","July","August","September","October","November","December"],
        day = today.getDate(),
        days = document.getElementsByTagName('td'),
        selectedDay,
        setDate,
        daysLen = days.length;
// options should like '2014-01-01'
    function Calendar(selector, options) {
        this.options = options;
        this.draw();
    }
    
    Calendar.prototype.draw  = function() {
        this.getCookie('selected_day');
        this.getOptions();
        this.drawDays();
        var that = this,
            reset = document.getElementById('reset'),
            pre = document.getElementsByClassName('pre-button'),
            next = document.getElementsByClassName('next-button');
            
            pre[0].addEventListener('click', function(){that.preMonth(); });
            next[0].addEventListener('click', function(){that.nextMonth(); });
            reset.addEventListener('click', function(){that.reset(); });
        while(daysLen--) {
            days[daysLen].addEventListener('click', function(){that.clickDay(this); });
        }
    };
    
    Calendar.prototype.drawHeader = function(e) {
        var headDay = document.getElementsByClassName('head-day'),
            headMonth = document.getElementsByClassName('head-month');

            headMonth[0].innerHTML = monthTag[month] + "  " + year;     
            $("#date").text(monthTag[month] + " " + (e ? e : headDay[0].innerHTML = day) + ", " + year);
     };
    
    Calendar.prototype.drawDays = function() {
        var startDay = new Date(year, month, 1).getDay(),
//      下面表示这个月总共有几天
            nDays = new Date(year, month + 1, 0).getDate(),
    
            n = startDay;
//      清除原来的样式和日期
        for(var k = 0; k <42; k++) {
            days[k].innerHTML = '';
            days[k].id = '';
            days[k].className = '';
        }

        for(var i  = 1; i <= nDays ; i++) {
            days[n].innerHTML = i; 
            n++;
        }
        
        for(var j = 0; j < 42; j++) {
            if(days[j].innerHTML === ""){
                
                days[j].id = "disabled";
                
            }else if(j === day + startDay - 1){
                if((this.options && (month === setDate.getMonth()) && (year === setDate.getFullYear())) || (!this.options && (month === today.getMonth())&&(year===today.getFullYear()))){
                    this.drawHeader(day);
                    days[j].id = "today";
                }
            }
            if(selectedDay){
                if((j === selectedDay.getDate() + startDay - 1)&&(month === selectedDay.getMonth())&&(year === selectedDay.getFullYear())){
                days[j].className = "selected";
                this.drawHeader(selectedDay.getDate());
                }
            }
        }
    };
    
    Calendar.prototype.clickDay = function(o) {
        var selected = document.getElementsByClassName("selected"),
            len = selected.length;
        if(len !== 0){
            selected[0].className = "";
        }
        o.className = "selected";
        selectedDay = new Date(year, month, o.innerHTML);
        this.drawHeader(o.innerHTML);
        this.setCookie('selected_day', 1);
        
    };
    
    Calendar.prototype.preMonth = function() {
        if(month < 1){ 
            month = 11;
            year = year - 1; 
        }else{
            month = month - 1;
        }
        this.drawHeader(1);
        this.drawDays();
    };
    
    Calendar.prototype.nextMonth = function() {
        if(month >= 11){
            month = 0;
            year =  year + 1; 
        }else{
            month = month + 1;
        }
        this.drawHeader(1);
        this.drawDays();
    };
    
    Calendar.prototype.getOptions = function() {
        if(this.options){
            var sets = this.options.split('-');
                setDate = new Date(sets[0], sets[1]-1, sets[2]);
                day = setDate.getDate();
                year = setDate.getFullYear();
                month = setDate.getMonth();
        }
    };
    
     Calendar.prototype.reset = function() {
         month = today.getMonth();
         year = today.getFullYear();
         day = today.getDate();
         this.options = undefined;
         this.drawDays();
     };
    
    Calendar.prototype.setCookie = function(name, expiredays){
        if(expiredays) {
            var date = new Date();
            date.setTime(date.getTime() + (expiredays*24*60*60*1000));
            var expires = "; expires=" +date.toGMTString();
        }else{
            var expires = "";
        }
        document.cookie = name + "=" + selectedDay + expires + "; path=/";
    };
    document.cookie = "selected_day=" + new Date() + "; path=/";
    Calendar.prototype.getCookie = function(name) {
        if(document.cookie.length){
            var arrCookie  = document.cookie.split(';'),
                nameEQ = name + "=";
            for(var i = 0, cLen = arrCookie.length; i < cLen; i++) {
                var c = arrCookie[i];
                while (c.charAt(0)==' ') {
                    c = c.substring(1,c.length);
                    
                }
                if (c.indexOf(nameEQ) === 0) {
                    selectedDay =  new Date(c.substring(nameEQ.length, c.length));
                }
            }
        }
    };
    var calendar = new Calendar();
    
        
}, false);

})(jQuery);

        document.addEventListener("DOMContentLoaded", function () {
            // Function to get a cookie by its name
function getCookie(name) {
    if (document.cookie.length) {
        var arrCookie = document.cookie.split(';'),
            nameEQ = name + "=";
        for (var i = 0, cLen = arrCookie.length; i < cLen; i++) {
            var c = arrCookie[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1, c.length);  // Trim whitespace
            }
            if (c.indexOf(nameEQ) === 0) {
                return new Date(c.substring(nameEQ.length, c.length)); // Return the selected date
            }
        }
    }
    return null; // Return null if the cookie is not found
}
function getCurrentDateString(selectedDate) {
    const date = selectedDate || new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are 0-indexed
    const day = date.getDate();
    return `${day}-${month}-${year}`;
}
// Retrieve the selected date from the cookie
let dateString = getCurrentDateString(getCookie('selected_day'));




            const xValues = [ "sun", "mon", "tues", "wed", "thurs", "fri", "sat"];
            let healthvalues0 = [];
            let healthvalues1 = [];
            let healthvalues2 = [];
            let healthvalues3 = [];
            let healthvalues4 = [];

            myChart = new Chart("myChart", {
                type: "line",
                data: {
                    labels: xValues,
                    datasets: [
                        {
                            label: "blood pressure",
                            backgroundColor: "#648FFF",
                            borderColor: "#648FFF",
                            data: healthvalues0
                        },
                        {
                            label: "heart rate",
                            backgroundColor: "#785EF0",
                            borderColor: "#785EF0",
                            data: healthvalues1
                        },
                        {
                            label: "oxygen levels",
                            backgroundColor: "#DC267F",
                            borderColor: "#DC267F",
                            data: healthvalues2
                        },
                        {
                            label: "glucose levels",
                            backgroundColor: "#FE6100",
                            borderColor: "#FE6100",
                            data: healthvalues3
                        },
                        {
                            label: "respiratory rate",
                            backgroundColor: "#FFB000",
                            borderColor: "#FFB000",
                            data: healthvalues4
                        },
                    ]
                },
                options: {}
            });

// Function to get the start of the week (Sunday) for the selected date
function getStartOfWeek(date) {
    const dayOfWeek = date.getDay(); // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const diff = date.getDate() - dayOfWeek; // Calculate the difference between the selected date and the previous Sunday
    const startOfWeek = new Date(date.setDate(diff)); // Set the date to the previous Sunday
    return startOfWeek;
}
function updateGraphForWeek(selectedDate) {
    let startOfWeek = getStartOfWeek(selectedDate); // Get the start of the week (Sunday)
    
    // Loop through each health metric (blood pressure, heart rate, etc.)
    for (let j = 0; j < 5; j++) { // 5 health metrics
        let yValues = []; // Start with an empty array for each dataset
        let dayString;
        // Loop through each day of the week, starting from the calculated Sunday
        for (let i = 0; i < 7; i++) {
            const day = new Date(startOfWeek);
            day.setDate(startOfWeek.getDate() + i); // Set the date for each day of the week
            dayString = getCurrentDateString(day);
            // Fetch the data for this day (assuming healthData contains this)
            if (healthData[dayString] && healthData[dayString][j] != "-") {
                // Assuming healthData stores values for each day
                yValues.push(parseInt(healthData[dayString][j])); // Push health metric value for the day
            } else {
                yValues.push(null); // No data available for that day
            }
        }

        // Update the chart dataset for this metric
        myChart.data.datasets[j].data = yValues;
    }

    // Re-render the chart with updated data
    myChart.update(); 
}


let healthData = {
    "1-12-2024": {
        "0": "91",
        "1": "73",
        "2": "4500",
        "3": "110",
        "4": "8"
    },
    "2-12-2024": {
        "0": "93",
        "1": "75",
        "2": "6000",
        "3": "130",
        "4": "7"
    },
    "3-12-2024": {
        "0": "94",
        "1": "76",
        "2": "3500",
        "3": "1050",
        "4": "9"
    },
    "4-12-2024": {
        "0": "95",
        "1": "77",
        "2": "4700",
        "3": "125",
        "4": "6"
    },
    "5-12-2024": {
      "0": "90",
      "1": "72",
      "2": "5000",
      "3": "100",
      "4": "10"
    },
    "6-12-2024": {
      "0": "92",
      "1": "74",
      "2": "3000",
      "3": "1200",
      "4": "9"
    },
    "7-12-2024": {
        "0": "96",
        "1": "78",
        "2": "5200",
        "3": "1100",
        "4": "8"
    },
    "8-12-2024": {
        "0": "12",
        "1": "13",
        "2": "14",
        "3": "13",
        "4": "12"
    }
  };
  document.addEventListener("click", function () {
    dateString = getCurrentDateString(getCookie('selected_day'))
    
    editSlideContent("-1", "none", dateString);
});
  getCurrentDateString(new Date());
// Function to enhance carousel by cloning slides
const enhanceCloningLogic = () => {
    const items = document.querySelectorAll('#recipeCarousel .carousel-item');

    items.forEach((el) => {
        const minPerSlide = 4;
        let next = el.nextElementSibling;
        
        // Loop to create additional clones
        for (let i = 1; i < minPerSlide; i++) {
            if (!next) {
                // Wrap carousel by using the first child (creating a loop)
                next = items[0];
            }

            // Clone the next sibling
            let cloneChild = next.cloneNode(true); // Clone the next sibling slide
            cloneChild.classList.remove('active'); // Remove the active class from the cloned slide

            // Insert the cloned slide correctly by appending its child
            el.appendChild(cloneChild.children[0]); // Append only the child content
            
            next = next.nextElementSibling; // Move to the next sibling
        }
    });

    // After cloning, sync the text content from the data structure to the slides
    updateSlideContent(dateString); // Ensure initial content is set for all slides, including inactive ones
};
let isEditing = false; // Track editing state

// Set the editing state on focus
document.addEventListener("focusin", function (event) {
    if (event.target.classList.contains("editable")) {
        isEditing = true; // Editing has started
    }
});

// Reset the editing state on focus out
document.addEventListener("focusout", function (event) {
    if (event.target.classList.contains("editable")) {
        isEditing = false; // Editing has stopped
    }
editSlideContent(event.target.getAttribute('data-id'), event.target.innerText, dateString); // Update the slide content
});
// Function to update the content on all slides (including inactive ones)
function updateSlideContent(dateString){
    if (isEditing) return; // Skip updates while editing
    document.querySelectorAll('.carousel-item').forEach((slide) => {
        const editableElements = slide.querySelectorAll('.editable'); // Find all editable elements within the slide
        editableElements.forEach((editableElement) => {
            const dataid = editableElement.getAttribute('data-id'); // Get the data-id attribute
            if (healthData[dateString]) {
                editableElement.innerText = healthData[dateString][dataid]; // Update the text from the dictionary
            }
        });
    });
    updateGraphForWeek(getCookie('selected_day'));
};
// Function to handle the content editing
function editSlideContent(dataid, newText, dateString){
    if (healthData[dateString]) {
        if (newText.trim() != "") {
            healthData[dateString][dataid] = newText; // Update the text in the dictionary
        } else {
            healthData[dateString][dataid] = "-";
        }
        updateSlideContent(dateString); // Apply the update to the slides (including inactive)
    } else {
        healthData[dateString] = {
            "0": "-",
            "1": "-",
            "2": "-",
            "3": "-",
            "4": "-" 
        };
        if (dataid != "-1") {
            editSlideContent(dataid, newText, dateString);
        } else {
            updateSlideContent(dateString)
        }
    }
};


// Initialize the carousel by cloning and syncing content
enhanceCloningLogic();


// Carousel controls (optional, based on your need)
document.querySelector('.carousel-control-next').addEventListener('click', function () {
    updateSlideContent(dateString); // Re-sync all slides after moving next
    $('#recipeCarousel').carousel('next');
    updateSlideContent(dateString); // Re-sync after moving next
});

document.querySelector('.carousel-control-prev').addEventListener('click', function () {
    updateSlideContent(dateString); // Re-sync all slides after moving previous
    $('#recipeCarousel').carousel('prev');
    updateSlideContent(dateString); // Re-sync after moving previous
});


        });

    