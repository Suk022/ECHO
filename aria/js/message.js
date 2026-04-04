const messageButton = document.getElementById('message-btn');
const messageModal = document.getElementById('message-modal');
const messageModalClose = document.getElementById('message-modal-close');

if (messageButton && messageModal && messageModalClose) {
  messageButton.addEventListener('click', openMessageModal);
  messageModalClose.addEventListener('click', closeMessageModal);

  messageModal.addEventListener('click', (event) => {
    if (event.target === messageModal) {
      closeMessageModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMessageModal();
    }
  });
}

function openMessageModal() {
  if (!messageModal) return;
  messageModal.classList.add('open');
  messageModal.scrollTop = 0;
  document.body.style.overflow = 'hidden';
}

function closeMessageModal() {
  if (!messageModal) return;
  messageModal.classList.remove('open');
  document.body.style.overflow = '';
}

window.setMessageButtonVisible = function setMessageButtonVisible(visible) {
  if (!messageButton) return;
  messageButton.style.display = visible ? 'flex' : 'none';
  if (!visible) {
    closeMessageModal();
  }
};
