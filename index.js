$(document).ready(function() {
    // Display the current day
    $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));

        // Function to create time blocks
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