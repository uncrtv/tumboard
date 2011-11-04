/*******************************************************************************
 * tumboard-preflight.js
 * tumboard - Keyboard shortcuts for Tumblr dashboard.
 *
 * This script runs before Tumblr dashboard is loaded.
 * Prototypes class `tumboard' to be initialized later. This class handles
 * all keyboard shortcuts.
 *
 * Tom Cat, 2011.
 ******************************************************************************/

function tumboard()
{    
    /*
     * Function: return post DOM object based on index
     * Input   : index
     * Output  : DOM object representing a post
     */
    this.post = function(idx)
    {
        return $("ol#posts li[id*=post_]").eq(idx);
    };

    /*
     * Function: return current post DOM object
     * Output  : DOM object for current post
     */
    this.currentPost = function()
    {
        return this.post(this.cPostIndex);
    };

    /*
     * Function: select post
     * Input   : index of post (-1 counts from bottom)
     */
    this.selectPost = function(idx)
    {
        if ((idx !== 0) & (idx !== this.maxPost))
            this.post(idx).attr("tb_selected", "true")
                          .css({"-webkit-box-shadow" : "0px 1px 20px #fff",
                                "box-shadow" : "0px 1px 20px #fff"});
        else
            this.post(idx).attr("tb_selected", "true")
                          .css({"-webkit-box-shadow" : "0px 1px 20px #000",
                                "box-shadow" : "0px 1px 20px #000"});
        
        if ($("#tb_urlbox").length === 1)
        {
            url = this.currentPost().find("a[id*=permalink]").attr("href");
            $("#tb_urlbox").find("input").attr({"value" : url});
        }
    };

    /*
     * Function: deselect post
     * Input   : index of post (-1 counts from bottom)
     */
    this.deselectPost = function(idx)
    {
        this.post(idx).attr("tb_selected", "false")
                      .css({"-webkit-box-shadow" : "", "box-shadow" : ""});
    };

    /*
     * Function: process buffer
     *
     * Key code table
     * --------------
     * h: Display help box (which lists these keyboard shortcuts).
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
     */
    this.processBuffer = function(e)
    {
        var buffer = this.buffer;

        // Check of there is a number prefixing the keycode
        var numString = "";
        var numRegEx = /^\d/;
        while (buffer.search(numRegEx) !== -1)
        {
            i = buffer.search(numRegEx);
            numString += buffer[i]; 
            buffer = buffer.substring(i+1, buffer.length);
        }

        // Process key command
        switch (buffer)
        {
            case "h":
                if ($("#tb_help").length === 1)
                {
                    $("#tb_help").stop();

                    if ($("#tb_help").hasClass("hidden"))
                    {
                        $("#tb_help").css({"pointer-events" : "", "opacity" : 1});
                        $("#tb_help").toggleClass("hidden");
                    }
                    else
                    {
                        $("#tb_help").find("input").blur();
                        $("#tb_help").css({"pointer-events" : "none", "opacity" : 0});
                        $("#tb_help").toggleClass("hidden");
                    }
                }

                this.buffer = "";
                break;

            case "D":
                window.location = "http://www.tumblr.com/dashboard";
                e.stopPropagation();
                this.buffer = "";
                break;

            case "j":
                $("html, body").stop();

                if (this.cPostIndex < this.maxPost)
                {
                    this.deselectPost(this.cPostIndex);
                    if (numString !== "")
                    {
                        this.cPostIndex += parseInt(numString);
                        if (this.cPostIndex > this.maxPost) this.cPostIndex = this.maxPost;
                        this.selectPost(this.cPostIndex);
                        $("html, body").animate({"scrollTop" : this.currentPost().offset().top - 5}, 500); // Scroll
                    }
                    else
                    {
                        this.cPostIndex += 1;
                        this.selectPost(this.cPostIndex);
                        $("html, body").animate({"scrollTop" : this.currentPost().offset().top - 5}, 0); // Scroll
                    }
                }
                else if ($("a#next_page_link").attr("href") !== undefined)
                    window.location = "http://www.tumblr.com" + $("a#next_page_link").attr("href");

                this.buffer = "";
                e.stopPropagation();
                break;

            case "J":
                this.deselectPost(this.cPostIndex);
                this.cPostIndex = this.maxPost;
                this.selectPost(this.cPostIndex);
                $("html, body").animate({"scrollTop" : this.currentPost().offset().top - 5}, 500); // scroll

                this.buffer = "";
                e.stopPropagation();
                break;
            
            case "k":
                if (this.cPostIndex > 0)
                {
                    this.deselectPost(this.cPostIndex);
                    if (numString !== "")
                    {
                        this.cPostIndex -= parseInt(numString);
                        if (this.cPostIndex < 0) this.cPostIndex = 0;
                        this.selectPost(this.cPostIndex);
                        $("html, body").animate({"scrollTop" : this.currentPost().offset().top - 5}, 500); // Scroll
                    }
                    else
                    {
                        this.cPostIndex -= 1;
                        this.selectPost(this.cPostIndex);
                        $("html, body").animate({"scrollTop" : this.currentPost().offset().top - 5}, 0); // Scroll
                    }
                }
                else if ($("a#previous_page_link").attr("href") !== undefined)
                    window.location = "http://www.tumblr.com" + $("a#previous_page_link").attr("href");

                this.buffer = "";
                e.stopPropagation();
                break;

            case "K":
                this.deselectPost(this.cPostIndex);
                this.cPostIndex = 0;
                this.selectPost(this.cPostIndex);
                $("html, body").animate({"scrollTop" : this.currentPost().offset().top - 5}, 500); // scroll

                this.buffer = "";
                e.stopPropagation();
                break;
                
            case "i":
                $("html, body").animate({"scrollTop" : this.currentPost().offset().top - 5}, 500); // Scroll
                this.buffer = "";
                break;

            case "l":
                //this.currentPost().find("a[id*=like_button_]").trigger("click");
                var ev;
                if (document.createEvent)
                {
                    ev = document.createEvent("HTMLEvents");
                    ev.initEvent("click", true, true);
                    this.currentPost().find("a[id*=like_button_]")[0].dispatchEvent(ev);
                }
                else
                {
                    ev = document.createEventObject();
                    ev.eventType = "onclick";
                    this.currentPost().find("a[id*=like_button_]")[0].fireEvent(ev.eventType, ev);
                }

                this.buffer = "";
                break;

            case "r":
                url = this.currentPost().find("div.post_controls").find("a[href*=reblog]").attr("href"); 
                if (!e.metaKey & url !== undefined)
                {
                    window.open("http://www.tumblr.com" + url);
                    e.preventDefault();
                }

                this.buffer = "";
                break;

            case "R":
                //this.currentPost().find("a[id*=post_control_reply_]").trigger("click");
                var ev;
                if (document.createEvent)
                {
                    ev = document.createEvent("HTMLEvents");
                    ev.initEvent("click", true, true);
                    this.currentPost().find("a[id*=post_control_reply_]")[0].dispatchEvent(ev);
                }
                else
                {
                    ev = document.createEventObject();
                    ev.eventType = "onclick";
                    this.currentPost().find("a[id*=post_control_reply_]")[0].fireEvent(ev.eventType, ev);
                }

                this.buffer = "";
                break;

            case "n":
                //this.currentPost().find("a[id*=show_notes_]").trigger("click");
                var ev;
                if (document.createEvent)
                {
                    ev = document.createEvent("HTMLEvents");
                    ev.initEvent("click", true, true);
                    this.currentPost().find("a[id*=show_notes_]")[0].dispatchEvent(ev);
                }
                else
                {
                    ev = document.createEventObject();
                    ev.eventType = "onclick";
                    this.currentPost().find("a[id*=show_notes_]")[0].fireEvent(ev.eventType, ev);
                }

                this.buffer = "";
                break;

            case "e":
                var image = this.currentPost().find("img[class*=inline_image]"); 
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

                this.buffer = "";
                break;

            case "o":
                if ($("#tb_urlbox").length === 1)
                {
                    $("#tb_urlbox").stop();

                    if ($("#tb_urlbox").hasClass("hidden"))
                    {
                        $("#tb_urlbox").css({"pointer-events" : "", "opacity" : 1});
                        $("#tb_urlbox").toggleClass("hidden");
                        
                        $("#tb_veil").css({"pointer-events" : "", "opacity" : 1});
                        $("#tb_veil").toggleClass("hidden");

                        $("#tb_urlbox").find("input").focus().select();
                    }
                    else
                    {
                        $("#tb_urlbox").find("input").blur();

                        $("#tb_urlbox").css({"pointer-events" : "none", "opacity" : 0});
                        $("#tb_urlbox").toggleClass("hidden");

                        $("#tb_veil").css({"pointer-events" : "none", "opacity" : 0});
                        $("#tb_veil").toggleClass("hidden");
                    }
                }

                this.buffer = "";
                break;

            case "O":
                url = this.currentPost().find("a[id*=permalink]").attr("href");
                if (url !== undefined)
                {
                    window.open(url);
                    e.preventDefault();
                }

                this.buffer = "";
                break;

            default:
                if (numString === "") this.buffer = "";
                break;
        }
    }

    /*
     * Function: keydown event handler
     * Input   : event object
     */
    this.keyHandler = function(e)
    {
        // Don't mess up text input
        if (document.activeElement.nodeName == 'TEXTAREA' || document.activeElement.nodeName == 'INPUT')
            return; 

        // Grab the key code
        if (!e) var e = window.event;
        if (e.keyCode) var code = e.keyCode;
        else if (e.which) var code = e.which;

        // If code = 27 ie. <ESC> then clear buffer
        // then immediately return
        if (code == 27)
        {
            this.buffer = "";
            return;
        }

        // If code = 16, 17, 18, 91 or 93 (modifier keys)
        // then return
        if ((code == 16) || (code == 17) || (code == 18) || (code == 91) || (code == 93))
            return;
        
        // Update the buffer, then process it
        if (e.shiftKey)
            var c = String.fromCharCode(code).toUpperCase();
        else
            var c = String.fromCharCode(code).toLowerCase();

        this.buffer += c;
        this.processBuffer(e);
    };

    /*
     * Function: Initialization
     */
    this.setup = function()
    {
        // Initialize global variables
        this.cPostIndex = 0; // current post no
        this.maxPost = $("ol#posts li[id*=post_]").length - 1; // max no of posts
        this.buffer = ""; // command buffer 

        // Add semi-transparent black background
        var veil = document.createElement("div");
        veil.setAttribute("id", "tb_veil");
        veil.setAttribute("class", "hidden");
        veil.setAttribute("style", "opacity: 0; pointer-events: none;");
        document.getElementsByTagName("body")[0].appendChild(veil);

        // Add hidden URL box
        var urlbox = document.createElement("div");
        urlbox.setAttribute("id", "tb_urlbox");
        urlbox.setAttribute("class", "hidden");
        urlbox.setAttribute("style", "opacity: 0; pointer-events: none;");

        var urlbox_text = document.createElement("p");
        urlbox_text.setAttribute("style", "margin: 10px 20px;");
        urlbox_text.appendChild(document.createTextNode("Permalink for selected post"));
        urlbox.appendChild(urlbox_text);

        var urlbox_input = document.createElement("input");
        urlbox_input.setAttribute("type", "text");
        urlbox_input.setAttribute("disabled", "disabled");
        urlbox_input.setAttribute("style", "width: 560px; margin: 0 20px 10px 20px; font-family: 'Georgia', 'Times New Roman', serif; font-size: 1.5em; font-style: italic;");
        urlbox.appendChild(urlbox_input);

        document.getElementsByTagName("body")[0].appendChild(urlbox);

        // Add help box
        var helpbox = document.createElement("div");
        helpbox.setAttribute("id", "tb_help");
        helpbox.setAttribute("class", "hidden");
        helpbox.setAttribute("style", "opacity: 0; pointer-events: none;");

        // Help text
        helpbox.appendChild($("<p style='text-align: center; font-weight: bold;'>tumboard shortcuts</p>")[0]);
        helpbox.appendChild($("<p style='margin: 0 20px'><span style='color: #32B44B'>h</span>: Display this help box.</p>")[0]);
        helpbox.appendChild($("<p style='margin: 0 20px'><span style='color: #32B44B'>D</span>: Go back to page 1 of dashboard.</p>")[0]);
        helpbox.appendChild($("<p style='margin: 0 20px'><span style='color: #32B44B'>j</span>: Scroll down a post.</p>")[0]);
        helpbox.appendChild($("<p style='margin: 0 20px'><span style='color: #32B44B'>J</span>: Scroll to last post in page.</p>")[0]);
        helpbox.appendChild($("<p style='margin: 0 20px'><span style='color: #32B44B'>k</span>: Scroll up a post.</p>")[0]);
        helpbox.appendChild($("<p style='margin: 0 20px'><span style='color: #32B44B'>K</span>: Scroll to first post in a page.</p>")[0]);
        helpbox.appendChild($("<p style='margin: 0 20px'><span style='color: #32B44B'>i</span>: Scroll to post currently selected.</p>")[0]);
        helpbox.appendChild($("<p style='margin: 0 20px'><span style='color: #32B44B'>l</span>: Like/heart a post.</p>")[0]);
        helpbox.appendChild($("<p style='margin: 0 20px'><span style='color: #32B44B'>r</span>: Reblog a post.</p>")[0]);
        helpbox.appendChild($("<p style='margin: 0 20px'><span style='color: #32B44B'>R</span>: Reply to post (if applicable).</p>")[0]);
        helpbox.appendChild($("<p style='margin: 0 20px'><span style='color: #32B44B'>n</span>: Show post's notes.</p>")[0]);
        helpbox.appendChild($("<p style='margin: 0 20px'><span style='color: #32B44B'>e</span>: Expand inline images.</p>")[0]);
        helpbox.appendChild($("<p style='margin: 0 20px'><span style='color: #32B44B'>o</span>: Display permalink (for copying).</p>")[0]);
        helpbox.appendChild($("<p style='margin: 0 20px'><span style='color: #32B44B'>O</span>: Open permalink in a new window/tab.</p>")[0]);
        helpbox.appendChild($("<p style='margin: 10px 20px'>In addition, you can prepend a number to j and k to scroll down/up more than 1 post.</p>")[0]);

        document.getElementsByTagName("body")[0].appendChild(helpbox);

        // Highlight first post
        this.selectPost(this.cPostIndex);
    };
}
