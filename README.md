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
    title: 'Hello World Custom Dialog',
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
