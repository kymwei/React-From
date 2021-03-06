require('babel-register')();

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var exposedProperties = ['window', 'navigator', 'document'];

const { window } = new JSDOM(`...`);
// or even
const { document } = (new JSDOM(`...`)).window;

Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
        exposedProperties.push(property);
        global[property] = document.defaultView[property];
    }
});

global.navigator = {
    userAgent: 'node.js'
};

documentRef = document;