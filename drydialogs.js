var drydialogs = {
    closeDialog : function( name, event ) {
        var target = event && event.target ? event.target : window.event.srcElement;

        if( target.parentElement ) {
            var fileID = $(target).parent().parent().attr('fileid');
        }
        
        if( !name ) {
            name = '';
        }
        
        $('#' + name + '_drydialogwrapper').remove();
        $('#' + name + '_drydialog').remove();
    },
    
    // this is the standard dialog that will be used everywhere in the application
    createDialog : function( args ) {
        var name = '';
        var overlayClose = typeof(args.overlayClose) === 'boolean' && args.overlayClose === false ? args.overlayClose : true;
        var dialogClass = 'class="drydialog';
        var wrapperClass = typeof(args.wrapperClass) !== 'undefined' ? args.wrapperClass : '';
        var closeButton = typeof(args.closeButton) === 'boolean' && args.closeButton === false ? args.closeButton : true;
        var closeClass = typeof(args.closeClass) !== 'undefined' ? args.closeClass : '';
        var close;
        var dataAttributes = '';
        var headerClass = '';

        if( args.name ) {
            name = args.name;
        }
        
        // if there is no name and no class set, assign the default class 'dialog', 'dialogHeader'
        // FIXME: update the close function to be global and use whatever function the user provides
        close = args.close ? args.close : drydialogs.closeDialog;
        
        if( args.dialogClass )
        {
            dialogClass += ' ' + args.dialogClass + '"';
        } else {
            dialogClass += '"';
        }
        
        if( args.dataAttributes ) {
            for( var i = 0; i < args.dataAttributes.length; i++ )
            {
                if( args.dataAttributes[i] )
                {
                    dataAttributes += args.dataAttributes[i];
                }
                
                if( i < args.dataAttributes.length - 1 )
                {
                    dataAttributes += ' ';
                }
            }
        }
        
        if( args.headerClass ) {
            headerClass = 'class="' + args.headerClass + '"';
        }
        
        // FIXME: if there is no title, place the close button in the container
        var titleBody = '';
        if( args.textTitle || args.htmlTitle ) {
            titleBody = '<div id="' + name + '_drydialogheader"' + headerClass + '>';

            if ( args.textTitle ) {
                titleBody += '<h2>' + args.textTitle + '</h2>';
            }

            if ( args.htmlTitle ) {
                titleBody += args.htmlTitle;
            }

            if ( closeButton ) {
                titleBody += '<button type="button" id="customDialogClose" class="' + closeClass + '" onclick="drydialogs.closeDialog(\'' +name + '\', event);">x</button>';
            }

            titleBody += '</div>';
        } else {
            if ( closeButton ) {
                titleBody = '<button type="button" id="drydialogclose" class="' + closeClass + '" onclick="drydialogs.closeDialog(\'' +name + '\', event);">x</button>';                
            } else {
                titleBody = '';
            }
        }
        
        if( args.textBody ) {
            body = '<div id="' + name + 'DialogText">' + args.textBody + '</div>';
        }
        
        if( args.htmlBody ) {
            body = args.htmlBody;
        }
        
        var bodyClass;
        if( args.bodyClass ) {
            bodyClass = args.bodyClass;
        }
        else {
            bodyClass = 'drydialogbody';
        }
        
        if( args.buttons ) {
            var buttons = '';

            for( var i = 0; i < args.buttons.length; i++ ) {
                var disabled = '';
                var buttonClass = '';
                if( args.buttons[i].disabled ) {
                    disabled = 'disabled="disabled"';
                    buttonClass += 'disabled ';
                }
                
                if( typeof(customDialogButtons) == 'undefined' ) {
                    customDialogButtons = {};
                }
                
                if( args.buttons[i].callback ) {
                    delete customDialogButtons[i + name];
                    customDialogButtons[i + name] = args.buttons[i].callback;
                }
            
                var buttonFunction;
                var parameters = args.buttons[i].parameters ? args.buttons[i].parameters : '';
                var eventType = args.buttons[i].eventType ? args.buttons[i].eventType : 'onclick';
                var buttonID = args.buttons[i].id ? 'id="' + args.buttons[i].id + '" ' : '';
                
                // TODO - If there is no button title, use the button value
                var buttonTitle = args.buttons[i].title ? 'title="' + args.buttons[i].title + '" ' : '';
                buttonClass += args.buttons[i].buttonClass ? args.buttons[i].buttonClass : 'drydialogbutton';
                
                
                
                buttons += '<input type="button" ' + disabled + ' name="' + args.buttons[i].name + '" class="' + buttonClass + '" ' + buttonID + eventType + '="' + 'customDialogButtons[\'' + i +name + '\'](' + parameters + ')' + '" value="' + args.buttons[i].value + '"/>';
            }
        }
        
        var buttonContainerClass;
        if( typeof(args.buttonParameters) == 'undefined' ) {
            args.buttonParameters = {};
        }
        
        if( args.buttonParameters.containerClass ) {
            buttonContainerClass = args.buttonParameters.containerClass;
        }
        else {
            buttonContainerClass = 'drydialogbuttoncontainer';
        }
        
        var buttonElement = '';
        if( typeof(args.buttons) != 'undefined' ) {
            buttonElement = '<div id="' + name + '_drydialogbuttons" class="' + buttonContainerClass +'">' + buttons + '</div>';
        }
        
        // create a empty array and use it as a way to store a long string/variable which contains the custom dialog
        var dialogBody = '';
        dialogBody += '<div id="' + name + '_drydialogwrapper" class="' + wrapperClass + '"></div>';
        dialogBody += '<div id="' + name + '_drydialog" ' + dialogClass + ' ' + dataAttributes + ' data-name="' + name + '">';
        dialogBody += titleBody;
        dialogBody += '<div id="' + name + '_dryDialogBody" class="' + bodyClass + '">' + body + '</div>';
        dialogBody += buttonElement;
        dialogBody += '</div>';

        // Only create one modal if one does not exist
        var dialog = $('#' + name + '_drydialog').length;
        var dialogWrapper = $('#' + name + '_drydialogwrapper').length;

        if ( !dialog && !dialogWrapper ) {
            $('body').append( dialogBody );
        }
        
        // SET THE STYLING FOR THE CUSTOM DIALOG
        if( args.bodyClass ) {
            $('#' + name + '_drydialogbody').addClass( args.customDialogBodyClass );
        }
        else {
            $('#' + name + '_drydialogbody').addClass( 'drydialogbody' );
        }
                
        if( args.maxHeight ) {
            $('#' + name + '_drydialog').css( 'max-height', args.maxHeight );
        }
        
        if( args.position ) {
            $('#' + name + '_drydialog').css( 'position', args.position );
        }
        else {
            $('#' + name + '_drydialog').css( 'position', 'absolute' );
        }
        
        if( args.backgroundColor ) {
            $('#' + name + '_drydialogwrapper').css('background-color', args.backgroundColor );
        }
        
        if( args.backgroundOpacity ) {
            // place opacity code here
            // needs to be RGBA since opacity will make all children have the opacity and not just the parent
            //$('#' + name + 'DialogWrapper');
        }
        
        drydialogs.position( args );
        
        
        if( args.initialLocation) {
            // this is where the animation code will go
            // this controls where in the browser window the dialog will open from
            // this can be the center(default) or from the trigger location
            // 'center', // optional, default is center, but it can be 'trigger'
        }
        
        if( args.success ) {
            args.success();
        }

        if ( args.responsive ) {
            drydialogs.responsive();
        }

        $('#' + name + '_drydialog').off('click');
        $('#' + name + '_drydialog').on('click', function(event) {
            event.stopPropagation();
        });

        // Close the modal when the wrapper is clicked
        $('#' + name + '_drydialogwrapper').off('click');

        if ( overlayClose ) {
            $('#' + name + '_drydialogwrapper').on('click', function(event) {
                drydialogs.closeDialog( name, event );
            });
        }
    },
    
    position : function( args ) {
        var name = '';
        if( args && args.name ) {
            name = args.name;
        }
    
        if( args && args.top ) {
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
        if( args && args.left ) {
            customDialogLeft = args.left;
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
                drydialogs.position({ name: name });
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
