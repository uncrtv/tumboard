/*******************************************************************************
 * tumboard.js
 * tumboard - Keyboard shortcuts for Tumblr dashboard.
 *
 * Tom Cat, 2011.
 ******************************************************************************/

// Global variables
var tb_cPost = 0; // current post
var tb_maxPost = $("ol#posts li[id*=post_]").length - 1; // max no of posts

/*
 * Function: return post DOM object based on index
 * Input   : index
 * Output  : DOM object representing a post
 */
function tb_post(idx)
{
    return $("ol#posts li[id*=post_]").eq(idx);
}

/*
 * Function: select post
 * Input   : index of post (-1 counts from bottom)
 */
function tb_selectPost(idx)
{
    if ((idx !== 0) & (idx !== tb_maxPost))
        tb_post(idx).attr("tb_selected", "true")
                    .css({"-webkit-box-shadow" : "0px 1px 30px #fff",
                          "box-shadow" : "0px 1px 30px #fff"});
    else
        tb_post(idx).attr("tb_selected", "true")
                    .css({"-webkit-box-shadow" : "0px 1px 30px #000",
                          "box-shadow" : "0px 1px 30px #000"});
}

/*
 * Function: deselect post
 * Input   : index of post (-1 counts from bottom)
 */
function tb_deselectPost(idx)
{
    tb_post(idx).attr("tb_selected", "false")
                .css({"-webkit-box-shadow" : "", "box-shadow" : ""});
}

/*
 * Function: keydown event handler
 * Input   : event object
 *
 * Key code table
 * --------------
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
 */
function tb_keyHandler(e)
{
    // Don't mess up text input
    if (document.activeElement.nodeName == 'TEXTAREA' || document.activeElement.nodeName == 'INPUT') return;    

    // Grab the key code
    if (!e) var e = window.event;
    if (e.keyCode) var code = e.keyCode;
    else if (e.which) var code = e.which;

    switch (code)
    {
        case 68:    // d
            if (e.shiftKey) window.location = "http://www.tumblr.com/dashboard";

            e.stopPropagation();
            break;
        
        case 69:    // e
            var image = tb_post(tb_cPost).find("img[class*=inline_image]"); 
            if (image.hasClass("inline_image"))
            {
                image.removeClass("inline_image");
                image.addClass("exp_inline_image");
            }
            else if (image.hasClass("exp_inline_image"))
            {
                image.addClass("inline_image");
                image.removeClass("exp_inline_image");
            }

            tb_post(tb_cPost).find("img.inline_external_image").trigger("click");

            break;

        case 73:    // i
            $("html, body").animate({"scrollTop" : tb_post(tb_cPost).offset().top - 5}, 500); // Scroll
            break;

        case 74:    // j
            $("html, body").stop();

            if (e.shiftKey)
            {
                tb_deselectPost(tb_cPost);
                tb_cPost = tb_maxPost;
                tb_selectPost(tb_cPost);
                $("html, body").animate({"scrollTop" : tb_post(tb_cPost).offset().top - 5}, 500); // scroll
            }
            else
            {
                if (tb_cPost < tb_maxPost)
                {
                    tb_deselectPost(tb_cPost);
                    tb_cPost += 1;
                    tb_selectPost(tb_cPost);
                    $("html, body").animate({"scrollTop" : tb_post(tb_cPost).offset().top - 5}, 0); // Scroll
                }
                else if ($("a#next_page_link").attr("href") !== undefined)
                    window.location = "http://www.tumblr.com" + $("a#next_page_link").attr("href");
            }

            e.stopPropagation();
            break;

        case 75:    // k
            $("html, body").stop();

            if (e.shiftKey)
            {
                tb_deselectPost(tb_cPost);
                tb_cPost = 0;
                tb_selectPost(tb_cPost);
                $("html, body").animate({"scrollTop" : tb_post(tb_cPost).offset().top - 5}, 500); // scroll
            }
            else
            {
                if (tb_cPost > 0)
                {
                    tb_deselectPost(tb_cPost);
                    tb_cPost -= 1;
                    tb_selectPost(tb_cPost);
                    $("html, body").animate({"scrollTop" : tb_post(tb_cPost).offset().top - 5}, 0); // Scroll
                }
                else if ($("a#previous_page_link").attr("href") !== undefined)
                    window.location = "http://www.tumblr.com" + $("a#previous_page_link").attr("href");
            }

            e.stopPropagation();
            break;
        
        case 76:    // l
            tb_post(tb_cPost).find("a[id*=like_button_]").trigger("click");
            break;

        case 78:    // n
            tb_post(tb_cPost).find("a[id*=show_notes_]").trigger("click");
            break;

        case 79:    // o
            url = tb_post(tb_cPost).find("a[id*=permalink]").attr("href");
            if (url !== undefined)
                window.open(url);
            break;

        case 82:    // r
            if (!e.shiftKey)
            {
                url = tb_post(tb_cPost).find("div.post_controls").find("a[href*=reblog]").attr("href"); 
                if (!e.metaKey & url !== undefined)
                {
                    window.open("http://www.tumblr.com" + url);
                    e.preventDefault();
                }
            }
            else
            {
                tb_post(tb_cPost).find("a[id*=post_control_reply_]").trigger("click");
            }
            break;
    }
}


/*
 * Special: Initialization
 */
// Highlight first post
tb_selectPost(tb_cPost);

// Add keydown event handler
document.addEventListener('keydown', tb_keyHandler, true);

// Add click events for post
$("ol#posts li[id*=post_]").click(function() {
    var idx = $("ol#posts li[id*=post_]").index(this);
    tb_deselectPost(tb_cPost);
    tb_cPost = idx;
    tb_selectPost(tb_cPost);
});
