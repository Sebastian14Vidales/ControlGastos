import { useState, useEffect } from "react";
import Header from "./components/Header";
import Modal from "./components/Modal";
import ListadoGastos from "./components/ListadoGastos";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";
import Filtros from "./components/Filtros";

function App() {
  const gastosLocalStorage = JSON.parse(localStorage.getItem('gastos')) ?? [];
  const presupuestoLocalStorage = Number(localStorage.getItem('presupuesto')) ?? 0;

  const [gastos, setGastos] = useState(gastosLocalStorage);
  const [presupuesto, setPresupuesto] = useState(presupuestoLocalStorage);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [gastoEditar, setGastoEditar] = useState({});
  
  // Filtrar gastos 
  const [filtro, setFiltro] = useState("");
  const [gastosfiltrados, setGastosFiltrados] = useState([]);

  // LOCAL STORAGE DE LOS GASTOS
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos))
  }, [gastos])

  // LOCAL STORAGE DEL PRESUPUESTO
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  // USE EFFECT PARA QUE CUANDO RECARGUE, ME MUESTRE LA VISTA DE LOS GASTOS Y NO DE INSERTAR UN NUEVO PRESUPUESTO
  useEffect(() => {
    if(presupuestoLocalStorage > 0) {
      setIsValidPresupuesto(true);
    }
  }, []) //Que se ejecute una sola vez

// USE EFFECT PARA CUANDO HAYA UN FILTRO
  useEffect(() => {
    if(filtro) { //filtro sería la opción: salud, ocio, comida, suscripciones
      const filtrarGasto = gastos.filter(gasto => gasto.categoria === filtro);
      setGastosFiltrados(filtrarGasto);
    }
  }, [filtro])

  // USE EFFECT PARA CUANDO SE EDITEN LOS GASTOS
  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }
  }, [gastoEditar]);

  const handleNuevoGasto = () => {
    setGastoEditar({});

    setModal(true);
    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };

  // Guardar Gasto y También editarlo
  const guardarGasto = (gasto) => {
    if (gasto.id) {
      // Actualizar
      const gastosActualizados = gastos.map((gastoState) =>
        gastoState.id === gasto.id ? gasto : gastoState
      );
      setGastos(gastosActualizados);
      setGastoEditar({})
    } else {
      // Nuevo Gasto
      gasto.id = new Date().getTime();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }

    setAnimarModal(false); //Ocultar el modal

    setTimeout(() => {
      //ocultar el modal
      setModal(false);
    }, 500);
  };

  // Eliminar Gasto
  const eliminarGasto = (id) => {
    const gastoEliminado = gastos.filter(gasto => gasto.id !== id);
    setGastos(gastoEliminado);
  };

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros
            filtro={filtro}
            setFiltro={setFiltro}
            />

            <ListadoGastos 
            gastos={gastos} 
            setGastoEditar={setGastoEditar} 
            eliminarGasto={eliminarGasto}
            filtro={filtro}
            gastosfiltrados={gastosfiltrados}
            />
          </main>

          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="Imagen Nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  );
}

export default App;
