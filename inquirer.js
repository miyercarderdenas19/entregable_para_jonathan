const inquirer = require('inquirer');

const reservas = [];

const mostrarMenu = async () => {
  console.clear();
  console.log('Bienvenido al sistema de gestión de reservas de hotel');
  const respuesta = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcion',
      message: 'Selecciona una opción:',
      choices: [
        'Hacer una reserva',
        'Consultar disponibilidad',
        'Número de personas',
        'Cancelar reserva',
        'Salir',
      ],
    },
  ]);

  switch (respuesta.opcion) {
    case 'Hacer una reserva':
      const nombre = await inquirer.prompt({
        type: 'input',
        name: 'nombre',
        message: 'Ingrese su nombre:',
      });
      const fecha = await inquirer.prompt({
        type: 'input',
        name: 'fecha',
        message: 'Ingrese la fecha de reserva:',
      });
      reservas.push({ nombre: nombre.nombre, fecha: fecha.fecha });
      console.log('Reserva realizada con éxito.');
      break;
    case 'Consultar disponibilidad':
      const fechaConsulta = await inquirer.prompt({
        type: 'input',
        name: 'fecha',
        message: 'Ingrese la fecha que desea consultar:',
      });
      const disponibilidad = verificarDisponibilidad(fechaConsulta.fecha);
      console.log(
        disponibilidad
          ? 'El hotel tiene disponibilidad para esa fecha.'
          : 'Lo sentimos, no hay disponibilidad para esa fecha.'
      );
      break;
    case 'Número de personas':
      console.log(`El hotel tiene un total de ${calcularNumeroPersonas()} personas.`);
      break;
    case 'Cancelar reserva':
      const reservaCancelar = await inquirer.prompt({
        type: 'input',
        name: 'nombre',
        message: 'Ingrese su nombre para cancelar la reserva:',
      });
      cancelarReserva(reservaCancelar.nombre);
      break;
    case 'Salir':
      console.log('Gracias por utilizar nuestro sistema. ¡Hasta luego!');
      process.exit(0);
      break;
  }

  await pausa();
};

const pausa = async () => {
  await inquirer.prompt({
    type: 'input',
    name: 'pausa',
    message: '\nPresiona Enter para continuar...',
  });
  mostrarMenu();
};

const verificarDisponibilidad = (fecha) => {
  // Implementa la lógica para verificar la disponibilidad de acuerdo a tu sistema
  return true; // Cambia esto según tu lógica real
};

const calcularNumeroPersonas = () => {
  // Implementa la lógica para calcular el número de personas de acuerdo a tus reservas
  return reservas.length;
};

const cancelarReserva = (nombre) => {
  const index = reservas.findIndex((reserva) => reserva.nombre === nombre);
  if (index !== -1) {
    reservas.splice(index, 1);
    console.log('Reserva cancelada con éxito.');
  } else {
    console.log('No se encontró una reserva con ese nombre.');
  }
};

mostrarMenu();
