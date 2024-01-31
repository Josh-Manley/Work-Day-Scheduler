// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

  $(function () {
    // Display Current Day
    let currentDay = document.getElementById("currentDay");
    currentDay.innerHTML = dayjs().format('dddd MMM YYYY h:mA');
  
    // Create Time Blocks
    const businessHours = 9; // Start of business hours
    const endBusinessHours = 17; // End of business hours
    const container = $(".container-fluid");

    for (let hour = businessHours; hour <= endBusinessHours; hour++) {
      // Create time block elements
      const timeBlock = $("<div>").addClass("row time-block");
      const hourDiv = $("<div>")
      .addClass("col-2 col-md-1 hour text-center py-3")
      .text(hour > 12 ? hour - 12 + "PM" : hour + "AM");
      
      const textarea = $("<textarea>").addClass("col-8 col-md-10 description").attr("id", "hour-" + hour);

      const saveBtn = $("<button>")
        .addClass("btn saveBtn col-2 col-md-1")
        .attr("aria-label", "save")
        .html('<i class="fas fa-save" aria-hidden="true"></i>');
  
      // Append elements to time block
      timeBlock.append(hourDiv, textarea, saveBtn);
  
      // Append time block to container
      container.append(timeBlock);
    }

     // Color Code Time Blocks
     function updateColorCode() {
      const currentHour = dayjs().hour();

      $(".time-block").each(function () {
        const blockHour = parseInt($(this).find(".hour").text().replace(/[^\d]/g, ""));
  
        if (blockHour < currentHour) {
          $(this).removeClass("present future").addClass("past");
        } else if (blockHour === currentHour) {
          $(this).removeClass("past future").addClass("present");
        } else {
          $(this).removeClass("past present").addClass("future");
        }
      });
    }

     // Enter Event
     $(".description").on("click", function () {
      // You can add specific behavior when a time block is clicked if needed
    });

    // Save Event
     $(".saveBtn").on("click", function () {
    const blockId = $(this).closest(".time-block").attr("id");
    const eventText = $(this).siblings(".description").val();

    localStorage.setItem(blockId, eventText);
    });

 
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
})