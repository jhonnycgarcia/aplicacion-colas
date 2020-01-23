/** ============================================
 *                  SOCKET IO
 ============================================ */

var socket = io();

socket.on('connect', function() { // Establecer conexion con el servidor
    // console.log('Conectado con el servidor');
});

socket.on('disconnect', function() { // Desconexion del servidor
    // console.log('Desconectado del servidor');
});

/** ============================================
 *                  JQUERY
 ============================================ */

var searchParams = new URLSearchParams(window.location.search); // Capturar parametros de la URL
if (!searchParams.has('escritorio')) { // No existe el escritorio
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio'); // capturar el valor de escritorio
var labelTicket = $("#nroTicket");

$("#nroEscritorio").text('Escritorio ' + escritorio); // Actualizar escritorio

$("#atender").on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        if (resp.err) {
            labelTicket.text('...');
            alert(resp.message);
        }
        labelTicket.text(resp.numero);
    });
});