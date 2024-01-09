$(document).ready(function() {
    // Display the current day
    $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));

    function createTimeBlocks() {
        const startHour = 9; // Start of business hours (9 AM)
        const endHour = 17;  // End of business hours (5 PM)

        for (let hour = startHour; hour <= endHour; hour++) {
            let timeLabel = hour > 12 ? `${hour - 12}PM` : `${hour}AM`;

            // HTML for the time block row
            let rowHtml = `
                <div class="row time-block" id="hour-${hour}">
                    <div class="col-md-1 hour">${timeLabel}</div>
                    <textarea class="col-md-10 description"></textarea>
                    <button class="col-md-1 saveBtn"><i class="fas fa-save"></i></button>
                </div>`;
            
            $(".container").append(rowHtml);
        }

        // Initial color update
        updateTimeBlockColors();
    }

    // Function to update time block colors
    function updateTimeBlockColors() {
        // Use a fake current hour for testing
        const currentHour = dayjs().hour(); // Comment this out for testing
        // const fakeCurrentHour = 12; // Change this value as needed for testing

        $(".time-block").each(function() {
            let blockHour = parseInt($(this).attr("id").split("-")[1]);

            if (blockHour < currentHour) {
                $(this).find('.description').addClass("past").removeClass("present future");
            } else if (blockHour === currentHour) {
                $(this).find('.description').addClass("present").removeClass("past future");
            } else {
                $(this).find('.description').addClass("future").removeClass("past present");
            }
        });

        // Test code below to check if time block colours change/are functioning correctly if viewing the application outside of business hours, for example 10pm ⬇️⬇️⬇️⬇️⬇️⬇️

        // $(".time-block").each(function() {
        //     let blockHour = parseInt($(this).attr("id").split("-")[1]);
    
        //     if (blockHour < fakeCurrentHour) {
        //         $(this).find('.description').addClass("past").removeClass("present future");
        //     } else if (blockHour === fakeCurrentHour) {
        //         $(this).find('.description').addClass("present").removeClass("past future");
        //     } else {
        //         $(this).find('.description').addClass("future").removeClass("past present");
        //     }
        // });
    }

    // Function to save events to local storage
    function saveEvent(hour, eventText) {
        localStorage.setItem(`event-${hour}`, eventText);
    }

    // Function to load events from local storage
    function loadEvents() {
        for (let hour = 9; hour <= 17; hour++) {
            $(`#hour-${hour} .description`).val(localStorage.getItem(`event-${hour}`));
        }
    }

    // Event listener for save buttons
    $(".container").on("click", ".saveBtn", function() {
        let hour = $(this).parent().attr("id").split("-")[1];
        let eventText = $(this).siblings(".description").val();
        saveEvent(hour, eventText);
    });


    // Initialize the time blocks
    createTimeBlocks();

    // Load saved events
    loadEvents();

    // Update time block colors periodically
    setInterval(updateTimeBlockColors, 1000 * 60); // Update every minute
});