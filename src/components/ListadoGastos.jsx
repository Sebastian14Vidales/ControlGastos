import Gasto from "./Gasto";

const ListadoGastos = ({
  gastos,
  setGastoEditar,
  eliminarGasto,
  filtro,
  gastosfiltrados,
}) => {
  return (
    <div className="listado-gastos contenedor">
      {filtro ? ( //Si hay un filtro, iteramos sobre los gastos filtrados
        <>
          <h2>{gastosfiltrados.length ? "Gastos" : "No hay gastos aún"}</h2>
          {gastosfiltrados.map((gasto) => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
            />
          ))}
        </>
      ) : ( //Sino, vamos a los gastos normales
        <>
        <h2>{gastosfiltrados.length ? "Gastos" : "No hay gastos aún"}</h2>
          {gastos.map(gasto => (
              <Gasto
                key={gasto.id}
                gasto={gasto}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
              />
            )
          )}
        </>
      )}
    </div>
  );
};

export default ListadoGastos;
