/*!
 * dry JavaScript Library v2.0
 * http://andrewcmaxwell.com
 *
 * Date: 6/23/2013
 */

(function(window, document, $, undefine) {

    var userSettings, models, dry, dialog;

    dry = window.dry ? window.dry : {};

    // Store all models in the collection
    // Feature for the future!
    models = {};

    dialog = {

        options: {
            appendTo: 'body',
            bodyClass: '',
            bodyHTML: null,
            bodyText: null,
            buttons: [],
            closeButton: true,
            closeCallback: null,
            closeClass: '',
            dataAttributes: '',
            dialogClass: '',
            headerClass: '',
            initialLocation: null,
            left: null,
            name: null,
            overlayClose: true, // should be true
            position: null,
            responsive: false,
            success: null,
            titleHTML: null,
            titleText: null,
            top: null,
            wrapperClass: ''
        },

        _setOptions: function( userOptions ) {
            var self = this, option;

            // Update the options lookup
            for ( option in userOptions ) {

                // Ensure that we are not setting values that are not supported
                if ( typeof( self.options[option] ) !== 'undefined' ) {
                    self.options[ option ] = userOptions[ option ];
                } else {
                    console.log( 'You supplied an option that is not supported: ' + option );
                }
            }

            console.dir( self.options );
        },

        _appendDialog: function( dialog) {
            var dialogLength = $('#' + this.options.name + '_drydialog').length,
                dialogWrapperLength = $('#' + this.options.name + '_drydialogwrapper').length;

            // Only create one modal if one does not exist
            if ( !dialogLength && !dialogWrapperLength ) {
                $( this.options.appendTo ).append( dialog );
            }
        },

        _createBodyContent: function() {
            return this.options.bodyText ? ('<div id="' + this.options.name + 'DialogText">' + this.options.bodyText + '</div>') : this.options.bodyHTML;
        },

        _createButtons: function() {
            var buttonElement = '',
                buttons = '';

            if( this.options.buttons ) {

                for( var i = 0; i < this.options.buttons.length; i++ ) {
                    var disabled = '';
                    var buttonClass = '';
                    if( this.options.buttons[i].disabled ) {
                        disabled = 'disabled="disabled"';
                        buttonClass += 'disabled ';
                    }

                    if( typeof(customDialogButtons) == 'undefined' ) {
                        customDialogButtons = {};
                    }

                    if( this.options.buttons[i].callback ) {
                        delete customDialogButtons[i + name];
                        customDialogButtons[i + name] = this.options.buttons[i].callback;
                    }

                    var buttonFunction;
                    var parameters = this.options.buttons[i].parameters ? this.options.buttons[i].parameters : '';
                    var eventType = this.options.buttons[i].eventType ? this.options.buttons[i].eventType : 'onclick';
                    var buttonID = this.options.buttons[i].id ? 'id="' + this.options.buttons[i].id + '" ' : '';

                    // TODO - If there is no button title, use the button value
                    var buttonTitle = this.options.buttons[i].title ? 'title="' + this.options.buttons[i].title + '" ' : '';
                    buttonClass += this.options.buttons[i].buttonClass ? this.options.buttons[i].buttonClass : 'drydialogbutton';

                    buttons += '<input type="button" ' + disabled + ' name="' + this.options.buttons[i].name + '" class="' + buttonClass + '" ' + buttonID + eventType + '="' + 'customDialogButtons[\'' + i +name + '\'](' + parameters + ')' + '" value="' + this.options.buttons[i].value + '"/>';
                }
            }

            var buttonContainerClass;
            if( typeof(this.options.buttonParameters) == 'undefined' ) {
                this.options.buttonParameters = {};
            }

            if( this.options.buttonParameters.containerClass ) {
                buttonContainerClass = args.buttonParameters.containerClass;
            }

            if( typeof(this.options.buttons) != 'undefined' ) {
                buttonElement = '<div id="' + this.options.name + '_drydialogbuttons" class="drydialogbuttoncontainer ' + buttonContainerClass +'">' + buttons + '</div>';
            }

            return buttonElement;
        },

        _createCloseButton: function() {
            var closeButton = '';

            if ( this.options.closeButton ) {
                closeButton += '<button type="button" id="' + this.options.name + '_drydialogclose" class="' + this.options.closeClass + '">x</button>';
            }

            return closeButton;
        },

        _createDialogBody: function( dataAttributes, titleBody, body, buttons ) {
            var dialogBody = '',
                dialogLength = $('#' + this.options.name + '_drydialog').length,
                dialogWrapperLength = $('#' + this.options.name + '_drydialogwrapper').length;

            // create a empty array and use it as a way to store a long string/variable which contains the custom dialog
            dialogBody += '<div id="' + this.options.name + '_drydialogwrapper" class="' + this.options.wrapperClass + '"></div>';
            dialogBody += '<div id="' + this.options.name + '_drydialog" class="drydialog ' + this.options.dialogClass + '" ' + dataAttributes + ' data-name="' + this.options.name + '">';
            dialogBody += titleBody;
            dialogBody += '<div id="' + this.options.name + '_dryDialogBody" class="drydialogbody ' + this.options.bodyClass + '">' + body + '</div>';
            dialogBody += buttons;
            dialogBody += '</div>';

            // Only create one modal if one does not exist
            if ( !dialogLength && !dialogWrapperLength ) {
                $( this.options.appendTo ).append( dialogBody );
            }

            return dialogBody;
        },

        _createTitlebar: function() {
            var titleBody = '',
                closeButton = '';

            // FIXME: if there is no title, place the close button in the container
            if( this.options.titleText || this.options.titleHTML ) {
                titleBody = '<div id="' + this.options.name + '_drydialogheader" class="' + this.options.headerClass + '">';
                titleBody += this.options.titleText ? ('<h2>' + this.options.titleText + '</h2>') : this.options.titleHTML;
                titleBody += this._createCloseButton();
                titleBody += '</div>';
            } else {
                titleBody += this._createCloseButton();
            }

            return titleBody;
        },

        _setDataAttributes: function() {
            var data = '';

            if( this.options.dataAttributes ) {
                for( var i = 0; i < this.options.dataAttributes.length; i++ )
                {
                    if( this.options.dataAttributes[i] )
                    {
                        data += this.options.dataAttributes[i];
                    }

                    if( i < this.options.dataAttributes.length - 1 )
                    {
                        data += ' ';
                    }
                }
            }

            return data;
        },

        closeDialog : function( name, event ) {
            var target = event && event.target ? event.target : window.event.srcElement;

            if( target.parentElement ) {
                var fileID = $(target).parent().parent().attr('fileid');
            }

            if( !name ) {
                name = '';
            }

            $('#' + this.options.name + '_drydialogwrapper').remove();
            $('#' + this.options.name + '_drydialog').remove();
        },

        init: function( args ) {
            var self = this, name, close, dialogBody,
                dataAttributes, headerClass, bodyClass, buttons;

            this._setOptions( args );
            dataAttributes = this._setDataAttributes();
            titleBody = this._createTitlebar();
            body = this._createBodyContent();
            buttons = this._createButtons();
            dialogBody = this._createDialogBody( dataAttributes, titleBody, body, buttons );
            this._appendDialog( dialogBody );

            if( args.maxHeight ) {
                $('#' + name + '_drydialog').css( 'max-height', args.maxHeight );
            }

            if( this.options.position ) {
                $('#' + this.options.name + '_drydialog').css( 'position', this.options.position );
            }
            else {
                $('#' + this.options.name + '_drydialog').css( 'position', 'absolute' );
            }

            if( args.backgroundColor ) {
                $('#' + this.options.name + '_drydialogwrapper').css('background-color', this.options.backgroundColor );
            }

            if( args.backgroundOpacity ) {
                // place opacity code here
                // needs to be RGBA since opacity will make all children have the opacity and not just the parent
                //$('#' + name + 'DialogWrapper');
            }

            this.position( args );

            if( this.options.initialLocation) {
                // this is where the animation code will go
                // this controls where in the browser window the dialog will open from
                // this can be the center(default) or from the trigger location
                // 'center', // optional, default is center, but it can be 'trigger'
            }

            if( this.options.success ) {
                this.options.success();
            }

            if ( this.options.responsive ) {
                this.responsive();
            }

            $('#' + this.options.name + '_drydialogclose').off('click');
            $('#' + this.options.name + '_drydialogclose').on('click', function(event) {
                self.closeDialog( self.options.name, event );
            });

            $('#' + this.options.name + '_drydialog').off('click');
            $('#' + this.options.name + '_drydialog').on('click', function(event) {
                event.stopPropagation();
            });

            // Close the modal when the wrapper is clicked
            $('#' + this.options.name + '_drydialogwrapper').off('click', function( event ) {
                self.closeDialog( self.options.name, event );
            });

            if ( this.options.overlayClose ) {
                $('#' + this.options.name + '_drydialogwrapper').on('click', function( event ) {
                    self.closeDialog( self.options.name, event );
                });
            }
        },

        position : function( args ) {
            var name = '';
            if( args && this.options.name ) {
                name = this.options.name;
            }

            if( this.options && this.options.top ) {
                customDialogTop = args.top;
            }
            else {
                var windowHeightHalf = $(window).height() / 2;
                var scrollYOffset = window.scrollY ? window.scrollY : window.pageYOffset ? window.pageYOffset : document.body.scrollTop ? document.body.scrollTop : 0;
                var customDialogHeight = $('#' + name + '_drydialog').height();
                var customDialogHeightHalf = customDialogHeight / 2;
                customDialogTop = (windowHeightHalf - customDialogHeightHalf) + scrollYOffset;

                if( customDialogTop < 0 ) {
                    customDialogTop = 50;
                }
            }

            var customDialogLeft;
            if( this.options && this.options.left ) {
                customDialogLeft = this.options.left;
            }
            else {
                var windowWidth = $(document).width();
                var windowWidthHalf = windowWidth / 2;
                var customDialogWidth = $('#' + name + '_drydialog').outerWidth();
                var customDialogWidthHalf = customDialogWidth / 2;

                if ( customDialogWidth >= windowWidth ) {
                    customDialogLeft = 0;
                } else {
                    customDialogLeft = windowWidthHalf - customDialogWidthHalf;
                }
            }

            $('#' + name + '_drydialog').css( 'left', customDialogLeft );
            $('#' + name + '_drydialog').css( 'top', customDialogTop );
        },

        responsive: function() {

            var updatePosition = function() {
                var dialogs = $('.drydialog');
                var name;

                $.each( dialogs, function( key, value ) {
                    name = $(value).attr('data-name');
                    dialog.position({ name: name });
                });
            };

            // Center the dialog when resizing
            $(window).resize( function() {
                if( timer ) {
                    clearTimeout(timer);
                }

                var timer = setTimeout( function() {
                    updatePosition();
                }, 100 );
            });
        }
    };

    dry.dialog = function( options ) {

        // this is the standard dialog that will be used everywhere in the application
        return dialog.init( options );
    };

    window.dry = dry;
})(window, document, jQuery);