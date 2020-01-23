/** ============================================
 *                  SOCKET IO
 ============================================ */

var socket = io();

socket.on('connect', function() { // Establecer conexion con el servidor
    console.log('Conectado con el servidor');
});

socket.on('disconnect', function() { // Desconexion del servidor
    console.log('Desconectado del servidor');
});

socket.on('estadoActual', function(data) {
    labelTicket.text(data.actual);
});

/** ============================================
 *                  JQUERY
 ============================================ */
var labelTicket = $("#lblNuevoTicket");

$("#newTicket").on("click", function() { // Generar nuevo ticket
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        labelTicket.text(siguienteTicket);
    });
});