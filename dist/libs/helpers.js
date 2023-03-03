function sweetAlert(title) {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: title,
    showConfirmButton: false,
    timer: 2500,
    backdrop: false,
    // width: 300,
    customClass: "swal",
  });
}
