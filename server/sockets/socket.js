const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();


io.on('connection', (client) => { // Al conectarse el cliente

    // console.log('Usuario conectado');

    client.on('disconnect', () => { // Cliente desconectado
        // console.log('Usuario desconectado');
    });

    client.emit('estadoActual', { actual: ticketControl.getUltimoTicket(), ultimosCuatro: ticketControl.getUltimosCuatro() });

    client.on('siguienteTicket', (data, callback) => { // Siguiente ticket
        let siguiente = ticketControl.siguienteTicket();
        callback(siguiente);
    });

    client.on('atenderTicket', (data, callback) => { // Atender ticket
        if (!data.escritorio) { return { err: true, message: 'El escritorio es necesario' } } //Error

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);

        client.broadcast.emit('ultimos4', { ultimos4: ticketControl.getUltimosCuatro() }); // Actualizar vista Publico
    });
});