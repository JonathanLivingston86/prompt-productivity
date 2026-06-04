document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const promptCards = document.querySelectorAll('.prompt-card');
  const emptyState = document.getElementById('empty-state');
  const copyButtons = document.querySelectorAll('.btn-copy');
  const toast = document.getElementById('toast');
  let toastTimeout;

  // Real-time Search Filter
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    let visibleCardsCount = 0;

    promptCards.forEach(card => {
      const keywords = card.getAttribute('data-keywords') || '';
      const title = card.querySelector('.card-title').textContent.toLowerCase();
      const description = card.querySelector('.card-description').textContent.toLowerCase();
      
      const isMatch = keywords.includes(searchTerm) || 
                      title.includes(searchTerm) || 
                      description.includes(searchTerm);

      if (isMatch) {
        card.classList.remove('hidden');
        visibleCardsCount++;
      } else {
        card.classList.add('hidden');
      }
    });

    if (visibleCardsCount === 0) {
      emptyState.classList.remove('hidden');
    } else {
      emptyState.classList.add('hidden');
    }
  });

  // Copy to Clipboard Functionality
  copyButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const targetId = button.getAttribute('data-target');
      const targetElement = document.getElementById(targetId);
      if (!targetElement) return;

      const textToCopy = targetElement.textContent;

      try {
        await copyToClipboard(textToCopy);
        handleCopySuccess(button);
      } catch (err) {
        console.error('Errore durante la copia del testo: ', err);
      }
    });
  });

  // Clipboard helper
  async function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    } else {
      // Fallback for older browsers / non-HTTPS
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-999999px';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      return new Promise((res, rej) => {
        if (document.execCommand('copy')) {
          res();
        } else {
          rej(new Error('execCommand copy fallito'));
        }
        document.body.removeChild(textarea);
      });
    }
  }

  // Handle successful copying in UI
  function handleCopySuccess(button) {
    const copyIcon = button.querySelector('.icon-copy');
    const checkIcon = button.querySelector('.icon-check');
    const btnText = button.querySelector('.btn-text');

    // Update button states
    button.classList.add('copied');
    copyIcon.classList.add('hidden');
    checkIcon.classList.remove('hidden');
    btnText.textContent = 'Copiato!';

    // Reset button after 2 seconds
    setTimeout(() => {
      button.classList.remove('copied');
      copyIcon.classList.remove('hidden');
      checkIcon.classList.add('hidden');
      btnText.textContent = 'Copia';
    }, 2000);

    // Show Toast Notification
    showToast();
  }

  // Trigger Toast Notification
  function showToast() {
    clearTimeout(toastTimeout);
    toast.classList.add('show');

    // Auto-hide toast after 3 seconds
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // Modal Handling
  const qrBtn = document.getElementById('qr-btn');
  const qrModal = document.getElementById('qr-modal');
  const modalClose = document.getElementById('modal-close');

  if (qrBtn && qrModal && modalClose) {
    qrBtn.addEventListener('click', () => {
      qrModal.classList.remove('hidden');
    });

    modalClose.addEventListener('click', () => {
      qrModal.classList.add('hidden');
    });

    // Close on clicking outside the modal content
    qrModal.addEventListener('click', (e) => {
      if (e.target === qrModal) {
        qrModal.classList.add('hidden');
      }
    });
  }

  // ==========================================
  // TABS & AGENT WORKSPACE IMPLEMENTATION
  // ==========================================

  // Tab switching (Prompts vs Agents)
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPrompts = document.getElementById('tab-content-prompts');
  const tabAgents = document.getElementById('tab-content-agents');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all btns
      tabBtns.forEach(b => b.classList.remove('active'));
      // Add active to clicked
      btn.classList.add('active');

      const targetTab = btn.getAttribute('data-tab');
      if (targetTab === 'prompts') {
        tabPrompts.classList.remove('hidden');
        tabAgents.classList.add('hidden');
      } else {
        tabPrompts.classList.add('hidden');
        tabAgents.classList.remove('hidden');
      }
    });
  });

  // File switching in Agent Workspace
  const fileBtns = document.querySelectorAll('.file-tab-btn');
  const fileTitle = document.getElementById('current-file-title');
  const previewBlocks = {
    skill: document.getElementById('code-preview-skill'),
    scraper: document.getElementById('code-preview-scraper'),
    guide: document.getElementById('code-preview-guide')
  };

  let currentFileKey = 'skill';
  const fileNames = {
    skill: 'SKILL.md',
    scraper: 'seeker_scraper.py',
    guide: 'GUIDA_STUDENTI.md'
  };

  fileBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class
      fileBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const fileKey = btn.getAttribute('data-file');
      currentFileKey = fileKey;
      fileTitle.textContent = fileNames[fileKey];

      // Hide all preview blocks and show target
      Object.keys(previewBlocks).forEach(key => {
        if (key === fileKey) {
          previewBlocks[key].classList.remove('hidden');
        } else {
          previewBlocks[key].classList.add('hidden');
        }
      });
    });
  });

  // Copy Agent Code
  const btnCopyAgent = document.getElementById('btn-copy-agent');
  if (btnCopyAgent) {
    btnCopyAgent.addEventListener('click', async () => {
      const activeBlock = previewBlocks[currentFileKey];
      if (!activeBlock) return;

      const textToCopy = activeBlock.textContent;

      try {
        await copyToClipboard(textToCopy);
        
        btnCopyAgent.classList.add('copied');
        const textSpan = btnCopyAgent.querySelector('span');
        const originalText = textSpan.textContent;
        textSpan.textContent = 'Copiato!';
        showToast();

        setTimeout(() => {
          btnCopyAgent.classList.remove('copied');
          textSpan.textContent = originalText;
        }, 2000);
      } catch (err) {
        console.error('Copia fallita: ', err);
      }
    });
  }

  // Download Agent File
  const btnDownloadAgent = document.getElementById('btn-download-agent');
  if (btnDownloadAgent) {
    btnDownloadAgent.addEventListener('click', () => {
      const activeBlock = previewBlocks[currentFileKey];
      if (!activeBlock) return;

      const content = activeBlock.textContent;
      const fileName = fileNames[currentFileKey];

      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  }
});

