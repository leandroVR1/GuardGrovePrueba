

$(document).ready(function() {
    // Función para obtener y mostrar carpetas y archivos
    function mostrarCarpetasYArchivos() {
      $.ajax({
        url: 'https://tu-backend.com/api/carpetas', // Endpoint para obtener carpetas
        method: 'GET',
        dataType: 'json',
        success: function(data) {
          // Limpiar el contenedor antes de agregar nuevas carpetas y archivos
          $('#foldersAndFiles').empty();
  
          // Recorrer cada carpeta y agregarla al contenedor
          data.carpetas.forEach(function(car) {
            var folderHTML = `
              <a class="Folder" href="/carpeta/${car.id}">
                <img src="/GuardGroveFrontend/img/FolderImg.png" class="image" />
                <div class="PieDeCarpeta">
                  <div class="NombreCarpeta">${car.nombre}</div>
                </div>
              </a>
            `;
            $('#foldersAndFiles').append(folderHTML);
          });
  
          // Recorrer cada archivo y agregarlo al contenedor
          data.archivos.forEach(function(arch) {
            var fileHTML = `
              <a class="File" href="/archivo/${arch.id}">
                <img src="/GuardGroveFrontend/img/FileImg.png" class="image" />
                <div class="PieDeArchivo">
                  <div class="NombreArchivo">${arch.nombre}</div>
                </div>
              </a>
            `;
            $('#foldersAndFiles').append(fileHTML);
          });
        },
        error: function(error) {
          console.error('Error al obtener datos:', error);
        }
      });
    }
  
    // Llamar a la función para mostrar carpetas y archivos al cargar la página
    mostrarCarpetasYArchivos();
  });
  

