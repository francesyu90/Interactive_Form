/*
 *   Set focus on the first text field
 */
$("#name").focus();

/*
 *   Reveal a text field when the "Other" option is selected from the "Job Role" drop down menu
 */
$("#other-title").hide();
$("#title").on("change", function() {
    var value = $("#title").val();
    if(value === "other") {
        $("#other-title").show();
    } else {
        $("#other-title").hide();
    }
});