const fs = require('fs');




let listadoPorHacer = [];

const guardarBD = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) {
            throw new Error('No se pudo grabar');
        }
    })
}


const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];

    }


}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false,

    };

    listadoPorHacer.push(porHacer);
    guardarBD();
    return porHacer;
}


const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}


const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion); // en caso de que no enuentre tira un -1
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarBD();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();

    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarBD();
        return true;
    }
}
module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}