define([
    'jquery',
    'drydialogs_new' // Nothing to pass through
], function ($) {

    describe('Creating dry dialogs', function() {

        beforeEach(function() {

        });

        afterEach(function() {
            $('.drydialog, .drydialogwrapper').remove();
        });

        it('Create a simple dialog', function(){
            var visible = true,
                dialogContainer;

            dry.dialog({
                name: 'simple',
                bodyText: 'Hello World!',
                appendTo: '#sandbox'
            });

            dialogContainer = $('#simple_drydialog');

            expect( dialogContainer.is(':visible') ).toEqual( true );
        });
    });
});
