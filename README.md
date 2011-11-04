tumboard: Keyboard shortcuts for Tumblr dashboard
=================================================
Created this because I find Tumblr's j and k wholly insufficient. And because I
'like' a lot of posts, and can't be bothered to reach my mouse.

List of supported browsers:
---------------------------
 * Safari (tested on 5.1.1 in Lion). I can't test on older versions of Safari
because I don't have a spare Mac (or PC for that matter).
 * Partial support for Chrome: _Some shortcuts aren't working_. Read below for
details.

List of keyboard shortcuts:
---------------------------

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
    * o: Open post's permalink in new window/tab.

In addition, you can prepend j and k with a number to go down/up more than 1
post. (Right now, only positive numbers. __TODO__: Negative numbers?)

__TODO__: How to navigate to a specific page on the dashboard (so that we can
input '5D' to go to page 5)? `http://www.tumblr.com/dashboard/5` does not point
to page 5 relative to the page you're on, but relative to the _newest post_.

__TODO__: `e` currently only expands inline images that aren't external. How to
handle external images? (Send me a pull request if you know!)

__TODO__: On Chrome, several keyboard shortcuts are broken, such as `l` and `R`.
Basically, everything involving `$.trigger("click")` (a jQuery function) is not
working at all. The code works fine on Safari though, so I think it's either
Chrome or jQuery's problem.

To install:
-----------
You can go to the __Download__ tab, where there's a packaged v0.2.
Download a copy and double click to install. Auto-updating is currently
__not__ available as I don't have a server to host the manifest
(or even the extension itself) ;~;

Maybe I'll use GitHub Pages.

Who am I?
---------
My name is Tom, and I'm a fabulous cat. Meow!
