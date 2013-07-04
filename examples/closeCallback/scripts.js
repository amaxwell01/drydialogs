var openDialog = function() {
    dry.dialog({
        name: 'closeCallback',
        titleText: 'closeCallack Example',
        bodyHTML : '<p>Hello World!</p>',
        closeCallback: function() {
            alert('closeCallback Works!');
        },
        dialogClass: 'new_dialog',
        responsive: true
    });
};

$(function() {

    $('#open').on('click', function() {
        openDialog();
    });
});