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
 */
function tb_keyHandler(e)
{
    // Grab the key code
    if (!e) var e = window.event;
    if (e.keyCode) var code = e.keyCode;
    else if (e.which) var code = e.which;

    switch (code)
    {
        case 74:    // j
            $("html, body").stop();

            tb_deselectPost(tb_cPost);
            
            (tb_cPost < tb_maxPost) ? tb_cPost += 1 : tb_cPost = 0;
            tb_selectPost(tb_cPost);
            $("html, body").animate({"scrollTop" : tb_post(tb_cPost).offset().top - 10}, 0); // Scroll

            e.stopPropagation();
            break;

        case 75:    // k
            $("html, body").stop();

            tb_deselectPost(tb_cPost);
            
            (tb_cPost >= 0) ? tb_cPost -= 1 : tb_cPost = tb_maxPost;
            tb_selectPost(tb_cPost);
            $("html, body").animate({"scrollTop" : tb_post(tb_cPost).offset().top - 10}, 0); // Scroll

            e.stopPropagation();
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
