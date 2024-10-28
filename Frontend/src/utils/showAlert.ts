import Swal from 'sweetalert2';

const showAlert = () => {
    Swal.fire({
      title: '¡Éxito!',
      text: 'Tu acción fue realizada correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      customClass: {
        popup: 'bg-white text-black', // Fondo blanco y texto negro
        title: 'text-red-600', // Título en rojo
        confirmButton: 'bg-red-600 text-white hover:bg-red-700', // Botón de aceptar
      },
      buttonsStyling: false, // Para aplicar los estilos personalizados a los botones
    });
  };
  