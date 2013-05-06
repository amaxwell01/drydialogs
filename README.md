- Author: Andrew Maxwell
- Creation Date: 4/21/12
- Modified: 5/6/13
- Description: This is a fully customizable dialog/modal window which can be modified to your hearts desire

Notes:
- Right now the dialog will open in the exact middle of the viewport
- If people ask for a non-jQuery version then I would be more than happen to look into it

## Requirements
- jQuery


Simple Example:
```javascript
drydialogs.createDialog(
{
    textBody : 'Hello World!'
});
```


General Example:
```javascript
drydialogs.createDialog({
    name: 'HelloWorld',
    dialogClass: '' // Any string that you want
    textTitle: 'Hello World Custom Dialog', // you have to choose either textTitle or htmlTitle, htmlTitle is the final override
    htmlTitle: '<h1>Hello World Custom Dialog</h2>',
    headerClass: 'modal_header',
    textBody: 'Hello World!', // you have to choose either textBody or htmlBody, htmlBody is the final override
    htmlBody: '<p>Hello World!</p>',
    width: '500px',
    height: '300px',
    overlayClose: true, // Boolean,
    responsive: true,
    closeButton: false, // defaults to true,
    closeClass: '' // Any string that you want
    wrapperClass: '' // Any string that you want
    buttons: [
        {
            value: 'Ok',
            callback: function()
            {
                alert('You just pressed Ok');
            }
        },
        {
            value: 'Cancel',
            callback: function()
            {
                alert('You just pressed Cancel');
            }
        }
    ]
});
```
