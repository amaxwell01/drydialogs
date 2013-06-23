- Author: Andrew Maxwell
- Creation Date: 4/21/12
- Modified: 5/6/13
- Description: This is a fully customizable dialog/modal window which can be modified to your hearts desire

Notes:
- Right now the dialog will open in the exact middle of the viewport
- If people ask for a non-jQuery version then I would be more than happen to look into it

## Requirements:
- jQuery

## Ignore these files / folders:
- text.js (used for testing, but needs to be in the root folder for ease of use)
- /assets* (ignore this folder as it is only used for tests shared code for examples)
- /tests* (This includes all of the code for our tests, which helps ensure that we have a stable project)

## Examples:
- I've included a few examples on how to use dry dialogs, which have also been used for scoping out a new feature

Simple Example:
```javascript
dry.dialog(
{
    textBody : 'Hello World!'
});
```


General Example:
```javascript
dry.dialogs({
    name: 'HelloWorld',
    bodyClass: '' // Any string that you want
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
