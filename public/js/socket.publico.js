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

socket.on('estadoActual', function(data) { // Estado actual
    actualizarHTML(data.ultimosCuatro);
    // console.log('estadoActual : ', data);
});

socket.on('ultimos4', function(data) { // Estado actual de los ultimos4
    // console.log('ultimos4 : ', data.ultimos4);
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizarHTML(data.ultimos4);
});

/** ============================================
 *                  JQUERY
 ============================================ */

var lblTicket1 = $("#lblTicket1");
var lblTicket2 = $("#lblTicket2");
var lblTicket3 = $("#lblTicket3");
var lblTicket4 = $("#lblTicket4");

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];

var lblEscritorio1 = $("#lblEscritorio1");
var lblEscritorio2 = $("#lblEscritorio2");
var lblEscritorio3 = $("#lblEscritorio3");
var lblEscritorio4 = $("#lblEscritorio4");

var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

function actualizarHTML(ultimos4) { // Actualizar cuadro de los ultimos 4 
    for (let i = 0; i < ultimos4.length; i++) {
        lblTickets[i].text('Ticket ' + ultimos4[i].numero);
        lblEscritorios[i].text('Escritorio ' + ultimos4[i].escritorio);
    }
}