/*******************************************************************************
 * tumboard-postflight.js
 * tumboard - Keyboard shortcuts for Tumblr dashboard.
 *
 * This script runs after Tumblr dahsboard is loaded.
 * Initializes an instance of class `tumboard' and hooks up javascript events.
 *
 * Tom Cat, 2011.
 *******************************************************************************
 */

// Initialize new global instance of `tumboard'
var tb = new tumboard();
tb.setup();

// Hooks up key event
document.addEventListener('keydown', function(e) {
    // We have to use an anonymous function as the handler
    // instead of tb.keyHandler itself, because using
    // tb.keyHandler directly results in the `this' keyword
    // in tb.keyHandler being treated as the document object,
    // which messes up everything.
    tb.keyHandler(e);
}, true);

// Add click events for each post
$("ol#posts li[id*=post_]").click(function() {
    var idx = $("ol#posts li[id*=post_]").index(this);
    tb.deselectPost(tb.cPostIndex);
    tb.cPostIndex = idx;
    tb.selectPost(tb.cPostIndex);
});
