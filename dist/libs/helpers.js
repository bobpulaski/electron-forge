function sweetAlert({title, icon}) {
  Swal.fire({
    position: "top-end",
    icon: icon,
    title: title,
    showConfirmButton: false,
    timer: 2500,
    backdrop: false,
    // width: 300,
    customClass: "swal",
  });
}
