import Swal from "sweetalert2";

/* SUCCESS ALERT */
export const successAlert = (title, text) => {
  return Swal.fire({
    icon: "success",
    title,
    text,
    confirmButtonColor: "#16a34a",
  });
};

/* ERROR ALERT */
export const errorAlert = (title, text) => {
  return Swal.fire({
    icon: "error",
    title,
    text,
    confirmButtonColor: "#dc2626",
  });
};

/* CONFIRM ALERT */
export const confirmAlert = (title, text) => {
  return Swal.fire({
    icon: "warning",
    title,
    text,
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#6b7280",
  });
};
