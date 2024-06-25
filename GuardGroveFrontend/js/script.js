// js/app.js

// Obtener todas las carpetas
const folders = document.querySelectorAll('.Folder');

// Asignar evento de clic a cada carpeta
folders.forEach(folder => {
  folder.addEventListener('click', () => {
    // Limpiar el contenido de MainComponent
    document.querySelector('.MainComponent').innerHTML = '';

    // Simular contenido dinámico (puedes cargar datos reales desde una API aquí)
    const content = [
      { type: 'file', name: 'Song1.mp3', icon: '/GuardGroveFrontend/img/music-icon.png' },
      { type: 'file', name: 'Photo1.jpg', icon: '/GuardGroveFrontend/img/photo-icon.png' },
      { type: 'folder', name: 'Subfolder', icon: '/GuardGroveFrontend/img/folder-icon.png' }
      // Añade más elementos según sea necesario
    ];

    // Mostrar contenido en la vista de contenido
    const mainComponent = document.querySelector('.MainComponent');
    const contentView = document.createElement('div');
    contentView.classList.add('ContentView');

    content.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.classList.add('ContentItem');
      itemElement.innerHTML = `
        <img src="${item.icon}" alt="${item.type === 'file' ? 'File Icon' : 'Folder Icon'}" />
        <div class="ItemName">${item.name}</div>
      `;
      contentView.appendChild(itemElement);
    });

    mainComponent.appendChild(contentView);
  });
});
