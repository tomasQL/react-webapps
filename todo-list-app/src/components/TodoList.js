import React, { Fragment, useRef, useState, useEffect} from "react";
import { TodoItem } from "./TodoItem";
import {v4 as uuid } from "uuid";

export function TodoList() {

    // El hook useState permite ratrear un estado (datos o propiedades)
    // tareas: estado que se desea mantener, array de tareas
    // setTareas: función usada para actualizar el estado
    const [tareas, setTareas] = useState([])

    // El hook useRef permite persistir valores entre renderizados. Se pueden
    // utilizar para almacenar valores mutables
    const tarea = useRef();

    const KEY = "todolist-tareas";

    // El hook useEffect permite realizar tareas adicionales en un componente:
    // obtener datos, manipular directamente el DOM, temporizador

    // useEffect(<funcion>, <dependencia>)
    // dependencias: vacio, array vacío (primer renderizado), array con valores (cuando se
    // produce un cambio en el array)

    // Obtener desde el localStorage la lista de tareas (en formato JSON), bajo el nombre
    // "todolist-tareas", y las carga en el array "tareas" en el primer renderizado

    useEffect( () => {
        const tareasStorage = JSON.parse(localStorage.getItem(KEY));
        console.log(tareasStorage);
        setTareas( (tareasAnteriores) => {
            return [...tareasAnteriores, ...tareasStorage];
        });
    }, [] );

    // Almacena en el localStorage la lista de tareas (en formato JSON) bajo el nombre
    // clave "todolist-tareas" cada vez que se produce un cambio en el array
    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(tareas));
    }, [tareas] );

    function agregarTarea() {
        const value = tarea.current.value;
        if (value === '') return;
        console.log(value);
        console.log(uuid());
        
        // Objeto con 2 propiedades: id, valor
        const nuevaTarea = {
            id: uuid(),
            valor: value
        }

        // Operador de propagación (spread) permite hacer una copia de un array en
        // un array existente
        setTareas( (tareasAnteriores) => {
            return [...tareasAnteriores, nuevaTarea];
        });
    }

    return (
        <Fragment>
            <div className="container m-2">
                <h2>Listado de tareas</h2>
                <div className="input-group mt-4 mb-2">
                    <input ref={tarea} type="text" className="form-control" placeholder="Ingrese una tarea"/>
                    <button onClick={agregarTarea} className="btn btn-success ms-2">+</button>
                </div>
                <ul className="list-group">
                    {tareas.map((item) => <TodoItem key={item.id} nombre={item.valor}></TodoItem>)}
                </ul>
            </div>
        </Fragment>
    );
}