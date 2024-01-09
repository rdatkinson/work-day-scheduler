$(document).ready(function() {
    // Display the current day
    $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));

    // Function to create time blocks
    function createTimeBlocks() {
        const startHour = 9; // Start of business hours (9 AM)
        const endHour = 17;  // End of business hours (5 PM)