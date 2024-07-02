document.addEventListener("DOMContentLoaded", function () {
  const mainComponent = document.getElementById('main-component');
  const folderTemplate = document.getElementById('folder-template').content;
  const fileTemplate = document.getElementById('file-template').content;
  const backButton = document.getElementById('back-button');
  const folderStack = []; // Stack to keep track of folder navigation
  const createFolderForm = document.getElementById('createFolderForm');
  const folderNameInput = document.getElementById('folderName');
  const currentUserId = localStorage.getItem('userId'); // Obtener el userId del usuario actual

  // Function to render folders and files based on data
  function renderFoldersAndFiles(data) {
    // Clear existing content
    mainComponent.innerHTML = '';

    // Render folders
    data.folders.forEach(folder => {
      if (folder.userId == currentUserId) { // Filtrar carpetas por userId
        const folderElement = folderTemplate.cloneNode(true);
        folderElement.querySelector('.NombreCarpeta').textContent = folder.name;
        folderElement.querySelector('.Folder').setAttribute('data-folder-id', folder.id); // Set folder id as a data attribute

        // Add double click event listener to the folder
        const folderAnchor = folderElement.querySelector('.Folder');
        if (folderAnchor) {
          folderAnchor.addEventListener('dblclick', (event) => {
            event.preventDefault();
            const folderId = folderAnchor.getAttribute('data-folder-id'); // Retrieve folder id from data attribute
            console.log('Doble clic en la carpeta con ID:', folderId);
            folderStack.push(data.currentFolder); // Add current folder to stack
            getFolderContent(folderId);
          });
        } else {
          console.error('No se encontró el elemento .Folder dentro de folderElement:', folderElement);
        }

        mainComponent.appendChild(folderElement);
      }
    });

    // Render files
    data.files.forEach(file => {
      if (file.userId == currentUserId) { // Filtrar archivos por userId
        const fileElement = fileTemplate.cloneNode(true);
        fileElement.querySelector('.NombreArchivo').textContent = file.name;
        fileElement.querySelector('.DownloadButton').setAttribute('data-file-id', file.id); // Set file id as a data attribute

        // Add click event listener to the download button
        const downloadButton = fileElement.querySelector('.DownloadButton');
        if (downloadButton) {
          downloadButton.addEventListener('click', (event) => {
            event.preventDefault();
            const fileId = downloadButton.getAttribute('data-file-id'); // Retrieve file id from data attribute
            console.log('Descargar archivo con ID:', fileId);
            downloadFile(fileId);
          });
        } else {
          console.error('No se encontró el botón de descarga dentro de fileElement:', fileElement);
        }

        mainComponent.appendChild(fileElement);
      }
    });

    // Show or hide the back button
    backButton.style.display = folderStack.length > 0 ? 'block' : 'none';
  }

  // Fetch initial folders and files from the backend
  fetch('http://localhost:5133/api/folders/dashboard')
    .then(response => response.json())
    .then(data => {
      console.log('Datos obtenidos del dashboard:', data);
      renderFoldersAndFiles(data.data);
    })
    .catch(error => {
      console.error('Error fetching folders:', error);
    });

  // Function to fetch and display the content of a specific folder
  function getFolderContent(folderId) {
    fetch(`http://localhost:5133/api/folders/${folderId}`)
      .then(response => response.json())
      .then(folderContent => {
        console.log('Contenido de la carpeta:', folderContent);
        renderFoldersAndFiles(folderContent.data);
        // Update the URL to reflect the current folder
        window.history.pushState({ folderId: folderId }, '', `?folderId=${folderId}`);
        // Store the current folder id in localStorage
        localStorage.setItem('currentFolderId', folderId);
      })
      .catch(error => {
        console.error('Error fetching folder content:', error);
      });
  }

  // Function to download a file
  function downloadFile(fileId) {
    fetch(`http://localhost:5133/api/files/Download?id=${fileId}`)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Archivo_${fileId}`); // Set the file name
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch(error => {
        console.error('Error downloading file:', error);
      });
  }

  // Handle the back button click
  backButton.addEventListener('click', () => {
    const previousFolder = folderStack.pop();
    if (previousFolder) {
      getFolderContent(previousFolder.id);
    }
  });

  // Check the URL for a folderId parameter on page load
  const urlParams = new URLSearchParams(window.location.search);
  const initialFolderId = urlParams.get('folderId');
  if (initialFolderId) {
    getFolderContent(initialFolderId);
  } else {
    fetchInitialData();
  }

  // Handle popstate event to support back/forward navigation
  window.addEventListener('popstate', (event) => {
    if (event.state && event.state.folderId) {
      getFolderContent(event.state.folderId);
    }
  });

  // Fetch initial folders and files from the backend
  function fetchInitialData() {
    const initialFolderId = localStorage.getItem('currentFolderId');
    if (initialFolderId) {
      getFolderContent(initialFolderId);
    } else {
      // Set initial currentFolderId to root (1) if not set
      localStorage.setItem('currentFolderId', 1);
      getFolderContent(1);
    }
  }

  // Handle form submission for creating a new folder
  createFolderForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const folderName = folderNameInput.value;
    const currentFolderId = localStorage.getItem('currentFolderId') || null; // Get currentFolderId from localStorage

    fetch('http://localhost:5133/api/folders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: folderName,
        createdAt: new Date().toISOString(),
        status: 'Active',
        ParentFolderId: currentFolderId,
        userId: currentUserId // Usar el userId del usuario actual
      }),
    })
      .then(response => {
        console.log('Response status:', response.status);
        return response.json(); // Parse response as JSON
      })
      .then(data => {
        console.log('Response data:', data);
        if (data.succeded) {
          console.log('Carpeta creada:', data.data);
          folderNameInput.value = ''; // Clear the input
          $('#createFolderModal').modal('hide'); // Hide the modal
          getFolderContent(currentFolderId); // Update the content of the current folder
        } else {
          console.error('Error creating folder:', data.errors);
        }
      })
      .catch(error => {
        console.error('Error creating folder:', error.message);
        console.log('Error details:', error);
      });
  });

  // Handle logout button click
  const logoutButton = document.getElementById('logout-button');
  logoutButton.addEventListener('click', () => {
    localStorage.removeItem('currentFolderId'); // Clear the current folder ID from localStorage
    // Clear token from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId')
    // Redirect to login page
    window.location.href = '/GuardGroveFrontend/Login.html';
  });
});
