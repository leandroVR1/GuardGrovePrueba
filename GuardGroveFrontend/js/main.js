document.addEventListener("DOMContentLoaded", function () {
    const mainComponent = document.getElementById('main-component');
    const folderTemplate = document.getElementById('folder-template').content;
    const fileTemplate = document.getElementById('file-template').content;
  
    // Fetch folders and files from the backend
    fetch('http://localhost:5293/api/folders')
      .then(response => response.json())
      .then(data => {
        // Clear existing content
        mainComponent.innerHTML = '';
  
        data.folders.forEach(folder => {
          const folderElement = folderTemplate.cloneNode(true);
          folderElement.querySelector('.NombreCarpeta').textContent = folder.name;
          mainComponent.appendChild(folderElement);
        });
  
        data.files.forEach(file => {
          const fileElement = fileTemplate.cloneNode(true);
          fileElement.querySelector('.NombreArchivo').textContent = file.name;
          mainComponent.appendChild(fileElement);
        });
      })
      .catch(error => {
        console.error('Error fetching folders and files:', error);
      });
  });
  