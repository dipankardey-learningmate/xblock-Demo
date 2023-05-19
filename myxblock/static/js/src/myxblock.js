/* Javascript for MyXBlock. */
function MyXBlock(runtime, element) {

    function updateCount(result) {
        $('.count', element).text(result.count);
    }
    function updateText(result) {
        $('.answer-selected', element).text(result.selected);
    }
    function buttonDisable(elem,value) {
        $(elem).prop("disabled", value)
    }

    var handlerUrl = runtime.handlerUrl(element, 'increment_count');
    var handlerUrl2 = runtime.handlerUrl(element, 'show_selected');

    $('p', element).click(function(eventObject) {
        $.ajax({
            type: "POST",
            url: handlerUrl,
            data: JSON.stringify({"hello": "world"}),
            success: updateCount
        });
    });

    // Enbale/Disable button
    buttonDisable('.check-button', true)
    $('.option-yes').click(function(){
        buttonDisable('.check-button', false)
    })
    $('.option-no').click(function(){
        buttonDisable('.check-button', false)
    })

    // Submit selection
    $('.check-button', element).click(function(eventObject) {
        var selected = ""
        if ($('input:checked').is('.option-yes'))
            selected = "Yes"
        else if ($('input:checked').is('.option-no'))
            selected = "No"
        else
            selected = ""
        $.ajax({
            type: "POST",
            url: handlerUrl2,
            data: JSON.stringify({"selected": selected}),
            success: updateText
        });
        buttonDisable('.check-button', true)
    });

    $(function (textSelected) {
        /* Here's where you'd do things on page load. */

    });
}
