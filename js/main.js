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

/*
 *    Only display the options that match the design selected in the "Design" menu
 */
$("#colors-js-puns").hide();
$("#design").on("change", function() {
    var value = $("#design").val();
    switch(value) {
        case "js puns":
            $("#color").val($("#colors-js-puns option:eq(0)").val());
            $("#colors-js-puns option:gt(2)").hide();
            $("#colors-js-puns option:lt(3)").show();
            $("#colors-js-puns").show();
            break;
        case "heart js":
            $("#color").val($("#colors-js-puns option:eq(3)").val());
            $("#colors-js-puns option:lt(3)").hide();
            $("#colors-js-puns option:gt(2)").show();
            $("#colors-js-puns").show();
            break;
        default:
            $("#colors-js-puns").hide();
            break;
    }
});
