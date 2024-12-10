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
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, child, get, set, update, onValue } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyCepN1r_bYYwR-s0jdv2A4gH5hJbWojTes",
    authDomain: "hci-final-e2c95.firebaseapp.com",
    projectId: "hci-final-e2c95",
    storageBucket: "hci-final-e2c95.firebasestorage.app",
    messagingSenderId: "260974227471",
    appId: "1:260974227471:web:f07db35c7e81234455b37a",
    measurementId: "G-SQY9PH3PWZ",
  // The value of `databaseURL` depends on the location of the database
  databaseURL: "https://hci-final-e2c95-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let userid;
onAuthStateChanged(auth, (user) => {
    userid = user.uid;
  });
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);
const dbRef = ref(getDatabase());
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

            let myChart = new Chart("myChart", {
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
    let startOfWeek = getStartOfWeek(selectedDate); // Determine the start of the week (Sunday)
    const healthMetrics = ["bloodPressure", "heartRate", "glucoseLevel", "oxygenLevel", "respiratoryRate"];
    
    const listeners = []; // Keep track of listeners for cleanup later if needed

    // Loop through each health metric
    for (let j = 0; j < healthMetrics.length; j++) {
        let yValues = Array(7).fill(null); // Start with empty values for each day of the week
        const healthMetricRef = ref(database, `health-data/${userid}/`);

        // Set up real-time listener for each day's data
        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            const dayString = getCurrentDateString(date);

            const refPath = `${healthMetrics[j]}/${dayString}`;
            const dataRef = ref(database, `health-data/${userid}/${dayString}/${healthMetrics[j]}`);

            const unsubscribe = onValue(dataRef, (snapshot) => {
                const value = snapshot.exists() ? snapshot.val() : null;
                yValues[i] = value !== "-" ? value : null; // Handle missing or invalid values
                myChart.data.datasets[j].data = yValues; // Update the chart with new values
                myChart.update();
            });

            listeners.push(unsubscribe);
        }
    }

    document.getElementById("week").innerText = 
        getCurrentDateString(startOfWeek).split("-").join("/") + " - " +
        getCurrentDateString(new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + 6)).split("-").join("/");

    // Cleanup listeners if they exist (Optional: only needed if you dynamically unsubscribe from listeners)
    window.cleanupListeners = function() {
        listeners.forEach(unsub => unsub());
    };
}
  document.getElementById("calendar").addEventListener("click", function () {
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
    set(ref(database, `health-data/${userid}/${dateString}`), {
        bloodPressure: "-",
        heartRate: "-",
        oxygenLevel: "-",
        glucoseLevel: "-",
        respiratoryRate: "-"
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
            get(ref(database, `health-data/${userid}/${dateString}/${dataid}`)).then((snapshot) => {
                editableElement.innerText = snapshot.val();
            });
        });
    });
    updateGraphForWeek(getCookie('selected_day'));
};
// Function to handle the content editing
function editSlideContent(dataid, newText, dateString){
    get(ref(database, `health-data/${userid}/${dateString}`)).then((snapshot) => {
        if (snapshot.exists()) {
            if (dataid != "-1") {
            if (newText.trim() != "") {
                update(ref(database, `health-data/${userid}/${dateString}`), {
                    [dataid]: newText,
                  });
            } else {
                update(ref(database, `health-data/${userid}/${dateString}`), {
                    [dataid]: "-",
                  });
            }
        }
        } else {
            set(ref(database, `health-data/${userid}/${dateString}`), {
                bloodPressure: "-",
                heartRate: "-",
                oxygenLevel: "-",
                glucoseLevel: "-",
                respiratoryRate: "-"
              });
            }
        if (dataid != "-1") {
            editSlideContent(dataid, newText, dateString);
        } else {
            updateSlideContent(dateString);
        }
    });
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
        const addReminderButton = document.getElementById('add-reminder');
        const remindersList = document.getElementById('reminders-list');

       // Event listener to add a new reminder
       addReminderButton.addEventListener('click', function() {
        const reminder = document.createElement('div');
        reminder.classList.add('reminder');

        // Checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        // Reminder text
        const reminderText = document.createElement('span');
        reminderText.textContent = `Reminder ${remindersList.children.length + 1}`;
        reminderText.setAttribute('contenteditable', 'true');

        reminder.addEventListener('click', function (event) {
            // Allow checkbox default behavior
            if (event.target.type === 'checkbox') {
                return; // Exit the function, allowing checkbox interaction
            }
        
            // Prevent clicks on non-editable elements from stealing focus
            if (!event.target.isContentEditable) {
                event.preventDefault();
            }
        });
        // Delete button (trashcan icon)
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.innerHTML = '&#128465;'; // Trashcan emoji

        // Add event listener to delete button
        deleteButton.addEventListener('click', function() {
            remindersList.removeChild(reminder);
        });

        // Append elements to the reminder div
        reminder.appendChild(checkbox);
        reminder.appendChild(reminderText);
        reminder.appendChild(deleteButton);

        // Append reminder to the list
        remindersList.appendChild(reminder);
    });


        });

    