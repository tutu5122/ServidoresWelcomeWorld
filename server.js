import express from 'express';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PUERTO = 3000;

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

///// ruta para crear un archivo
app.get('/crear', (req, res) => {

    const { archivo,contenido } = req.query

    const fecha = new Date();
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const año = fecha.getFullYear();
    const fechaFormateada = `${dia}/${mes}/${año}`;

    fs.writeFile(`${archivo}.txt`, `${fechaFormateada}: ${contenido}`,'utf8',()=>{
        console.log(`archivo creado`)
        res.send('Archivo creado con EXITO!');
    })
});

app.get('/leer', (req, res) => {

    const { archivo } = req.query

    fs.readFile(`${archivo}.txt`,'utf8',(err,data)=>{
        if (err) {
            console.log(err);
            res.send(`Archivo no encontrado: ${archivo}.txt`);
        } else {
            res.send(`El Archivo es: ${archivo}.txt <br> ${data}`);
        }
    })
});

app.get('/renombrar', (req, res) => {

    const { nombre,nuevoNombre } = req.query

    fs.rename(`${nombre}.txt`, `${nuevoNombre}.txt`, (err) => {
        if (err) {
            console.log(err);
            return res.send('Error al renombrar el archivo');
        }

        res.send(`Archivo Actual es: ${nombre}.txt <br> Archivo Nuevo: ${nuevoNombre}.txt`);
    })
});

app.get('/eliminar', (req, res) => {

    const { archivo } = req.query

    fs.unlink(`${archivo}.txt`, () => {
        console.log('Archivo Eliminado')
    })

    res.send(`El Archivo: ${archivo}.txt fue ELIMINADO!`);
});
































app.listen( PUERTO, () => console.log(`Servidor listo ${PUERTO}`));