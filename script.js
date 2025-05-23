// ==UserScript==
// @name     Gmail to Proton Mail
// @version  1.0
// @grant    none
// @author   swyrin
// @match    https://mail.google.com/*
// @run-at   document-start
// ==/UserScript==

function replaceLocation()
{
    if (window.location.toString().includes('mail.google.com'))
    {
        window.location.replace(window.location.toString().replace('mail.google.com','mail.proton.me'))
    }
}

// In case we opened a new page
replaceLocation();

// See https://stackoverflow.com/questions/3522090/event-when-window-location-href-changes
var oldHref = document.location.href;

window.onload = function()
{
    var bodyList = document.querySelector("body")

    var observer = new MutationObserver(function(mutations)
    {
        mutations.forEach(function(mutation)
        {
            if (oldHref != window.location.toString())
            {
                oldHref = window.location.toString();

                // In case we just changed an URL of existing page
                replaceLocation();
            }
        });
    });

    var config =
    {
        childList: true,
        subtree: true
    };

    observer.observe(bodyList, config);
};
