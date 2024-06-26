document.addEventListener("DOMContentLoaded", function () {
  const mainComponent = document.getElementById('main-component');
  const folderTemplate = document.getElementById('folder-template').content;
  const fileTemplate = document.getElementById('file-template').content;

  // Función para obtener y mostrar el contenido de una carpeta específica
  function getFolderContent(folderId) {
    fetch(`http://localhost:5293/api/folders/${folderId}/content`)
      .then(response => response.json())
      .then(folderContent => {
        // Limpiar contenido existente
        mainComponent.innerHTML = '';

        // Mostrar subcarpetas
        folderContent.folders.forEach(folder => {
          const folderElement = folderTemplate.cloneNode(true);
          folderElement.querySelector('.NombreCarpeta').textContent = folder.name;
          mainComponent.appendChild(folderElement);

          // Asignar evento click para obtener contenido de la subcarpeta al hacer clic
          folderElement.querySelector('.Folder').addEventListener('click', () => {
            getFolderContent(folder.id);
          });
        });

        // Mostrar archivos
        folderContent.files.forEach(file => {
          const fileElement = fileTemplate.cloneNode(true);
          fileElement.querySelector('.NombreArchivo').textContent = file.name;
          mainComponent.appendChild(fileElement);
        });
      })
      .catch(error => {
        console.error('Error fetching folder content:', error);
      });
  }

  // Fetch inicial para obtener lista de carpetas y archivos
  fetch('http://localhost:5293/api/folders')
    .then(response => response.json())
    .then(data => {
      // Limpiar contenido existente
      mainComponent.innerHTML = '';

      // Mostrar carpetas
      data.forEach(folder => {
        const folderElement = folderTemplate.cloneNode(true);
        folderElement.querySelector('.NombreCarpeta').textContent = folder.name;
        mainComponent.appendChild(folderElement);

        // Asignar evento click para obtener contenido de la carpeta al hacer clic
        folderElement.querySelector('.Folder').addEventListener('click', (event) => {
          event.preventDefault(); // Evitar comportamiento por defecto del enlace
          getFolderContent(folder.id);
        });
      });

      // Mostrar archivos directamente en la vista principal si es necesario
      data.forEach(folder => {
        folder.files.forEach(file => {
          const fileElement = fileTemplate.cloneNode(true);
          fileElement.querySelector('.NombreArchivo').textContent = file.name;
          mainComponent.appendChild(fileElement);
        });
      });
    })
    .catch(error => {
      console.error('Error fetching folders and files:', error);
    });
});
