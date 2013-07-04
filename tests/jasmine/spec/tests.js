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

        it('Close a simple dialog', function(){
            var visible = true,
                dialogContainer;

            dry.dialog({
                name: 'simple',
                bodyText: 'Hello World!',
                appendTo: '#sandbox'
            });

            dry.dialog.close( 'simple' );

            dialogContainer = $('#simple_drydialog');

            expect( dialogContainer.is(':visible') ).toEqual( false );
        });

        it('Does closeCallback work?', function(){
            var self = this,
                visible = true,
                dialogContainer;

            window.closeCallbackTest = false;
            window.changeCloseCallbackValue = function() {
                closeCallbackTest = true;
            };

            dry.dialog({
                name: 'closeCallback',
                bodyText: 'Hello World!',
                appendTo: '#sandbox',
                closeCallback: function() {
                    window.changeCloseCallbackValue();
                }
            });

            dry.dialog.close('closeCallback');
            expect( window.closeCallbackTest ).toEqual( true );
        });
    });
});
