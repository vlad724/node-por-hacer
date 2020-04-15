/* const argv = require('yargs').argv; */
const argv = require('./config/yargs').argv;
const colors = require('colors');
const porHacer = require('./por-hacer/por-hacer');


let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;
    case 'listar':
        let listado = porHacer.getListado();

        for (let tarea of listado) {
            console.log('=== === === por hacer === === === === '.green);
            console.log(tarea.descripcion);
            console.log('estado: ', tarea.completado);
            console.log('=== === === === === === === === === === '.green);
        }
        break;
    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
        break;
    case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion);
        console.log(borrado);
        break;
    case 'buscar':
        let listado2 = porHacer.getBuscar(argv.descripcion);

        if (listado2 != false) {
            console.log('=== === === por hacer === === === === '.green);
            console.log(listado2.descripcion);
            console.log('estado: ', listado2.completado);
            console.log('=== === === === === === === === === === '.green);
        } else {
            console.log('No se encontro la tarea');
        }


        break;
    default:
        console.log('Comando no reconocido');
}