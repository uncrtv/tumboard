tumboard: Keyboard shortcuts for Tumblr dashboard
=================================================
Tumblr dashboard already has several shortcuts, namely j and k. Those two alone,
however, are wholly insufficient, so I created this simple extension to add
a heap of convenient keyboard shortcuts for Tumblr.

To install:
-----------
[For Safari][sdl] and [For Chrome][cdl].

[sdl]: https://github.com/downloads/precocity/tumboard/tumboard.safariextz
    "Direct download link for Safari extension"
[cdl]: https://github.com/downloads/precocity/tumboard/tumboard.safariextension.crx
    "Direct download link for Chrome extension"

Download and double-click!

List of keyboard shortcuts:
---------------------------

    * h: Display help box (which lists available keyboard shortcuts).
    * D: Go back to page 1 of dashboard. 
    * j: Scroll down a post.
    * J: Scroll to last post in page.
    * k: Scroll up a post.
    * K: Scroll to first post in a page.
    * i: Scroll to post currently selected.
    * l: "Like"/heart a post.
    * r: Reblog a post.
    * R: Reply to post (if applicable).
    * n: Show post's notes.
    * e: Expand inline images.
    * o: Display permalink (for copying).
    * O: Open permalink in a new window/tab.

In addition, you can prepend j and k with a number to go down/up more than 1
post. (Right now, only positive numbers. __TODO__: Negative numbers?)

__TODO__: How to navigate to a specific page on the dashboard (so that we can
input '5D' to go to page 5)? `http://www.tumblr.com/dashboard/5` does not point
to page 5 relative to the page you're on, but relative to the _newest post_.

__TODO__: `e` currently only expands inline images that aren't external. How to
handle external images? (Send me a pull request if you know!)

List of supported browsers:
---------------------------
 * Safari (tested on 5.1.1 in Lion).
 * Google Chrome (tested on Chrome 15.0.874.106 in Lion).

License
-------
tumboard is released under the BSD license, available [here][li].

[li]: https://raw.github.com/precocity/tumboard/master/LICENSE

Who am I?
---------
My name is Tom, and I'm a fabulous cat. Meow!
Icons for tumboard by [uncreativeboi](http://github.com/uncreativeboi), an
uncreative boy who happens to be rather creative.
