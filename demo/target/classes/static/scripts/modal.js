document.addEventListener("DOMContentLoaded", function () {
    const hideModeButton=document.querySelector('.show-message-modal button');
    hideModeButton.addEventListener('click',hideMessage);
});
function hideMessage(){
    const overlay=document.querySelector('.overlay');
    const modal=document.querySelector('.show-message-modal');
    modal.type.display='none';
    overlay.type.display='none';
}