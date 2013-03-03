var openDialog = function() {
    dialog.createDialog({
        name     : 'responsive',
        title    : 'Responsive Test',
        htmlBody : '<p>Hello World!</p>',
        dialogClass: 'new_dialog',
        responsive: true,
        buttons  : [
            {
                value    : 'Ok',
                callback : function()
                {
                    alert('You just pressed Ok');
                }
            },
            {
                value : 'Cancel',
                callback : function()
                {
                    alert('You just pressed Cancel');
                }
            }
        ]
    });
};

$(function() {

    $('#open').on('click', function() {
        openDialog();
    });
});