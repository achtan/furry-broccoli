import Swal from 'sweetalert2'

export const confirmAction = ({
  onConfirm,
  title,
  text,
  icon = 'info',
  confirmButtonText = 'Ano',
  cancelButtonText = 'Nie',
  showCancelButton = true,
}) => {
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonText,
    cancelButtonText,
    showCancelButton,
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm?.()
    }
  })
}
