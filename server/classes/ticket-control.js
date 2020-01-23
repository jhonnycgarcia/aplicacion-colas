/**
 * Requires
 */
const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor() {
        this.ultimo = 0; // Ultimo ticket
        this.hoy = new Date().getDate(); // fehca de hoy
        this.tickets = []; // todos los tickets pendientes
        this.ultimosCuatro = []; // Los ultimos 4 tickets

        let data = require('../data/data.json'); // Cargar data almacenada dentro del archivo

        if (data.hoy === this.hoy) { // Validar si la fecha es la misma del dia
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimosCuatro = data.ultimosCuatro;
        } else { // No es la misma fecha
            this.reiniciarConteo();
        }
    }

    siguienteTicket() { // Generar siguiente Ticket
        this.ultimo += 1;
        let nuevoTicket = new Ticket(this.ultimo, null);
        this.tickets.push(nuevoTicket);
        this.grabarArchivo();
        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket() { // Retornar el ultimo ticket
        return `Ticket ${this.ultimo}`;
    }

    getUltimosCuatro() { // Retornar el ultimo ticket
        return this.ultimosCuatro;
    }

    atenderTicket(escritorio) { // Atender tickets en espera
        if (this.tickets.length === 0) { // Si no existen tickets pendientes
            return { err: true, message: 'No hay tickets pendientes' };
        }

        let numeroTicket = this.tickets[0].numero; // obtener numero del primer tickets
        this.tickets.shift(); // eliminar el primer ticket

        let atenderTicket = new Ticket(numeroTicket, escritorio); // Atender ticket

        this.ultimosCuatro.unshift(atenderTicket); //agregar a los ultimos 4
        if (this.ultimosCuatro.length > 4) { this.ultimosCuatro.splice(-1, 1) } // Eliminar el ultimo registro de los 4
        // console.log('Ultimos 4: ', this.ultimosCuatro);
        this.grabarArchivo(); // actualizar data
        return atenderTicket; // ticket atender
    }

    reiniciarConteo() { // Funcion para reiniciar el conteo
        this.ultimo = 0;
        this.tickets = [];
        this.ultimosCuatro = [];
        console.log('Se ha reinicializado el sistema');
        this.grabarArchivo();
    }

    grabarArchivo() {
        let jsonData = { ultimo: this.ultimo, hoy: this.hoy, tickets: this.tickets, ultimosCuatro: this.ultimosCuatro };
        let jsonDataString = JSON.stringify(jsonData); // Convertir data en string
        fs.writeFileSync('./server/data/data.json', jsonDataString); // Sobreescribir el archivo de data
    }
};

module.exports = {
    TicketControl
};