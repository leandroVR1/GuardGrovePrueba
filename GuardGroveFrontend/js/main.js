document.addEventListener("DOMContentLoaded", function () {
  const mainComponent = document.getElementById('main-component');
  const folderTemplate = document.getElementById('folder-template').content;
  const fileTemplate = document.getElementById('file-template').content;

  // Fetch folders and files from the backend
  fetch('http://localhost:5133/api/folders')
    .then(response => response.json())
    .then(data => {
      // Clear existing content
      mainComponent.innerHTML = '';

      // Ensure data.data is the correct array of folders
      if (data.data && Array.isArray(data.data)) {
        data.data.forEach(folder => {
          const folderElement = folderTemplate.cloneNode(true);
          folderElement.querySelector('.NombreCarpeta').textContent = folder.name;
          mainComponent.appendChild(folderElement);

          // Add click event listener to the folder
          const folderAnchor = folderElement.querySelector('.Folder');
          if (folderAnchor) {
            folderAnchor.addEventListener('click', (event) => {
              event.preventDefault();
              // Logic to fetch and display the content of the clicked folder
              getFolderContent(folder.id);
            });
          }
        });
      }
    })
    .catch(error => {
      console.error('Error fetching folders:', error);
    });

  // Function to fetch and display the content of a specific folder
  function getFolderContent(folderId) {
    fetch(`http://localhost:5133/api/folders/${folderId}/content`)
      .then(response => response.json())
      .then(folderContent => {
        // Clear existing content
        mainComponent.innerHTML = '';

        // Display subfolders
        folderContent.folders.forEach(folder => {
          const folderElement = folderTemplate.cloneNode(true);
          folderElement.querySelector('.NombreCarpeta').textContent = folder.name;
          mainComponent.appendChild(folderElement);

          // Add click event listener to the subfolder
          const folderAnchor = folderElement.querySelector('.Folder');
          if (folderAnchor) {
            folderAnchor.addEventListener('click', (event) => {
              event.preventDefault();
              getFolderContent(folder.id);
            });
          }
        });

        // Display files
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
});