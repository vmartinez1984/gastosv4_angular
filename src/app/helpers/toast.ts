import Swal from "sweetalert2";

export function ok() {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Datos registrados",
        showConfirmButton: false,
        toast: true,
        timer: 1500
    });
}

/**
 * Error generico de sweet alert 2
 */
export function error() {
    Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Valio pepino",
        showConfirmButton: false,
        toast: true,
        timer: 1500
    });
}

export function unMomento() {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Un momento...",
        showConfirmButton: false,
        toast: true,
        timer: 1500
    });
}