function tumboard_keyHandler(e)
{
    e.preventDefault();
    e.stopPropagation();
}

document.addEventListener('keydown', tumboard_keyHandler, true);
