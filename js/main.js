// ===================================
// Inicialización del Documento
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ ENS Reunión 05 - Equipo 21 cargado correctamente');

  initAnimations();
  initEditableFields();
  loadSavedData();
});

// ===================================
// Animaciones de Entrada
// ===================================
function initAnimations() {
  const sections = document.querySelectorAll('.section-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
}

// ===================================
// Campos Editables
// ===================================
function initEditableFields() {
  const editableFields = document.querySelectorAll('[contenteditable="true"]');

  editableFields.forEach(field => {
    field.addEventListener('blur', saveData);
    field.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        field.blur();
      }
    });

    // Efecto visual al enfocar
    field.addEventListener('focus', () => {
      field.style.boxShadow = '0 0 0 3px rgba(34, 211, 238, 0.3)';
    });
    field.addEventListener('blur', () => {
      field.style.boxShadow = '';
    });
  });
}

// ===================================
// Guardar y Cargar Datos
// ===================================
function saveData() {
  const data = {};
  const editableFields = document.querySelectorAll('[contenteditable="true"]');

  editableFields.forEach((field, index) => {
    data[`field_${index}`] = field.textContent.trim();
  });

  try {
    localStorage.setItem('ens_reunion_05_data', JSON.stringify(data));
    showNotification('Datos guardados correctamente ✅', 'success');
  } catch (e) {
    console.error('Error al guardar datos:', e);
    showNotification('Error al guardar datos ❌', 'error');
  }
}

function loadSavedData() {
  try {
    const savedData = localStorage.getItem('ens_reunion_05_data');
    if (!savedData) return;

    const data = JSON.parse(savedData);
    const editableFields = document.querySelectorAll('[contenteditable="true"]');

    editableFields.forEach((field, index) => {
      const key = `field_${index}`;
      if (data[key] && data[key] !== '—') {
        field.textContent = data[key];
      }
    });

    console.log('✅ Datos cargados desde localStorage');
  } catch (e) {
    console.error('Error al cargar datos:', e);
  }
}

// ===================================
// Notificaciones
// ===================================
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    background: ${type === 'success' ? '#10b981' : '#ef4444'};
    color: white;
    border-radius: 0.75rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    animation: slideInRight 0.3s ease;
    font-weight: 600;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}
