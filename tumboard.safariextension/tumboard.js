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
    tb_post(idx).attr("tb_selected", "true")
                .css({"-webkit-box-shadow" : "0px 1px 20px #fff",
                      "box-shadow" : "0px 1px 20px #fff"});
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
 * D: Go to page 1 of dashboard. 
 * j: Scroll down a post.
 * J: Scroll to last post in page.
 * k: Scroll up a post.
 * K: Scroll to first post in a page.
 * l: "Like"/heart a post.
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

        case 74:    // j
            $("html, body").stop();

            if (e.shiftKey)
            {
                tb_deselectPost(tb_cPost);
                tb_cPost = tb_maxPost;
                tb_selectPost(tb_cPost);
                $("html, body").animate({"scrollTop" : tb_post(tb_cPost).offset().top - 10}, 0); // scroll
            }
            else
            {
                if (tb_cPost < tb_maxPost)
                {
                    tb_deselectPost(tb_cPost);
                    tb_cPost += 1;
                    tb_selectPost(tb_cPost);
                    $("html, body").animate({"scrollTop" : tb_post(tb_cPost).offset().top - 10}, 0); // Scroll
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
                $("html, body").animate({"scrollTop" : tb_post(tb_cPost).offset().top - 10}, 0); // scroll
            }
            else
            {
                if (tb_cPost > 0)
                {
                    tb_deselectPost(tb_cPost);
                    tb_cPost -= 1;
                    tb_selectPost(tb_cPost);
                    $("html, body").animate({"scrollTop" : tb_post(tb_cPost).offset().top - 10}, 0); // Scroll
                }
                else if ($("a#previous_page_link").attr("href") !== undefined)
                    window.location = "http://www.tumblr.com" + $("a#previous_page_link").attr("href");
            }

            e.stopPropagation();
            break;
        
        case 76:    // l
            tb_post(tb_cPost).find("a[id*=like_button_]").trigger("click");
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
