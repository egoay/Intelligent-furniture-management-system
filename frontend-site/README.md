# Intelligent-furniture-management-system
#这是数据库作业的git仓库
  function showMessage(message) {
    const modal = document.querySelector('.show-message-modal');
    const overlay = document.querySelector('.overlay');
    const pElement = document.querySelector('.show-message-modal p');
    pElement.textContent = message;
    overlay.style.display = 'block';
    modal.style.display = 'block';
    const hideModeButton = document.getElementById('showMessageModeConfirmButton');
    hideModeButton.removeEventListener('click', hideMessage);
    hideModeButton.addEventListener('click', hideMessage);
  }
  function hideMessage() {
    const overlay = document.querySelector('.overlay');
    const modal = document.querySelector('.show-message-modal');
    modal.style.display = 'none';
    overlay.style.display = 'none';
  }
  
