(function($) {

	"use strict";

	document.addEventListener('DOMContentLoaded', function(){
        
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
            const xValues = ["mon", "tues", "wed", "thurs", "fri", "sat", "sun"];
            const yValues = [89, 85, 91, 95, 95, 94, 84, 89, 88, 90, 90];

            new Chart("myChart", {
                type: "line",
                data: {
                    labels: xValues,
                    datasets: [{
                        label: "glucose level",
                        backgroundColor: "rgba(0,0,255,1.0)",
                        borderColor: "rgba(0,0,255,0.1)",
                        data: yValues
                    }]
                },
                options: {}
            });

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
// Retrieve the selected date from the cookie
let dateString = getCurrentDateString();
function getCurrentDateString(selectedDate) {
    const date = selectedDate || new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are 0-indexed
    const day = date.getDate();
    return `${day}-${month}-${year}`;
}

document.addEventListener("click", function () {
    dateString = getCurrentDateString(getCookie('selected_day'))
    
    editSlideContent("-1", "none", dateString);
});

let healthData = {
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
    }
  };

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

// Function to update the content on all slides (including inactive ones)
function updateSlideContent(dateString){
    document.querySelectorAll('.carousel-item').forEach((slide) => {
        const editableElements = slide.querySelectorAll('.editable'); // Find all editable elements within the slide
        editableElements.forEach((editableElement) => {
            const dataid = editableElement.getAttribute('data-id'); // Get the data-id attribute
            if (healthData[dateString]) {
                editableElement.innerText = healthData[dateString][dataid]; // Update the text from the dictionary
            }
        });
    });
};
// Function to handle the content editing
function editSlideContent(dataid, newText, dateString){
    if (healthData[dateString]) {
        healthData[dateString][dataid] = newText; // Update the text in the dictionary
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

// Function to handle input without resetting the cursor
const handleInput = (event) => {
    const editableElement = event.target;
    const dataid = editableElement.getAttribute('data-id'); // Get the data-id of the edited element

    // Store the current selection or cursor position
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const cursorPosition = range.startOffset;

    const newText = editableElement.innerText; // Get the new text from the editable element
    editSlideContent(dataid, newText, dateString); // Update the dictionary

    // Restore the cursor position after the content is updated
    setTimeout(() => {
        const element = document.querySelector(`[data-id="${dataid}"]`);
        if (element) {
            const selection = window.getSelection();
            const range = document.createRange();
            range.setStart(element.childNodes[0], cursorPosition);
            range.setEnd(element.childNodes[0], cursorPosition);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }, 0);
};

// Initialize the carousel by cloning and syncing content
enhanceCloningLogic();

// Event listener for editing content with cursor position preservation
document.querySelectorAll('.editable').forEach((editableElement) => {
    editableElement.addEventListener('input', handleInput);
});

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

    