var openDialog = function() {
    dry.dialog({
        name: 'responsive',
        titleText: 'Responsive Test',
        bodyHTML : '<p>Hello World!</p>',
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