// evento que se genera ni bien el HTML se encuentre cargado
document.addEventListener('DOMContentLoaded', function() {
    // Objeto para verificar las validaciones
    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    console.log(email);

    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje'); 
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);

    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', e => {
        e.preventDefault();
        // Reseteando el formulario
        resetearFormulario();

    });

    function enviarEmail(e) {
        e.preventDefault();
        
        // Mostrar el spinner
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');
        // Ocultar el spinner
        setTimeout(()=>{
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');
        }, 3000);
        
        // Reseteando el formulario
        resetearFormulario();
        
        // Mostrar el mensaje de enviado
        const alertaExito = document.createElement('P');
        alertaExito.classList.add('bg-green-500', 'rounded-lg', 'text-sm', 'text-white', 'text-center', 'font-bold', 'uppercase', 'p-3', 'mt-5');
        alertaExito.textContent = 'Mensaje enviado correctamente';

        formulario.appendChild(alertaExito);

        setTimeout(()=>{
            alertaExito.remove();
        }, 3000);
    }

    // Función para validar el formulario
    function validar(e) {
        // traversing de DOM
        // console.log(e.target.parentElement);
        // console.log(e.target.id);
        if(e.target.value.trim() === ''){
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return; // corta la ejecución del código y lo siguiente no se ejecuta
        } 
        // Validando el email
        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta('El email no es válido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        // Esta línea se ejecuta cuandon no se cumple el if, es decir, cuando pasa la validación
        // Si el campo está completo, se elimina la alerta
        limpiarAlerta(e.target.parentElement);

        // Almacenando los datos en el objeto
        email[e.target.name] = e.target.value.trim().toLowerCase();
        console.log(email);
        // Comprobando el objeto de email
        comprobarEmail();


    }

    // Función para mostrar la alerta
    function mostrarAlerta(mensaje, referencia) {
        // Comprueba si existe la alerta y la elimina en tal caso
        limpiarAlerta(referencia);

        // Genera la alerta
        const error = document.createElement('P'); //se recomienda usar mayúsculas para los elementos creados
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'mt-5', 'text-center');

        // Inserta la alerta en el HTML
        // formulario.appendChild(error);
        referencia.appendChild(error); // la referencia es el elemento padre e.target.parentElement
    }

    // Función para limpiar la alerta
    function limpiarAlerta(referencia) {
        // Si el elemento padre tiene una alerta, la elimina
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email){
        // expresión regular para validar el email
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        const resultado = regex.test(email);
        // console.log(resultado);
        return resultado;
    }

    function comprobarEmail(){
        console.log(email);
        // Creando un nuevo arreglo con los valores del objeto email
        // console.log(Object.values(email));
        if(Object.values(email).includes('')){
            // true si al menos un valor del objeto es vacío
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        }
        
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
        
    }

    function resetearFormulario(){
        // Reiniciar el objeto
        email.email = '';
        email.asunto = '';
        email.mensaje = '';
        // Reiniciar el formulario
        formulario.reset();
        // Deshabilita el botón con la función
        comprobarEmail();
    }

});

