import { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ControlPresupuesto = ({ gastos, setGastos, presupuesto, setPresupuesto, setIsValidPresupuesto }) => {
  const [porcentaje, setPorcentaje] = useState(0);
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);

  const handleResetButton = () => {
    const resultado = confirm('¿Desea reiniciar el presupuesto?');

    if(resultado) {
      setIsValidPresupuesto(false);
      setPresupuesto(0)
      setGastos([]);
      return;
    } 
  }

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0
    );
    const totalDisponible = presupuesto - totalGastado;
    setGastado(totalGastado);
    setDisponible(totalDisponible);
    // Calcular el porcentaje gastado
    const nuevoPorcentaje = (
      ((presupuesto - totalDisponible) / presupuesto) *
      100
    ).toFixed(2);
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 1000);
  }, [gastos]);

  const formatterPeso = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
          styles={{
            path: {
              // Path color
              stroke: disponible < 0 ? 'red' : '#3b82f6',
            },
            trail: {
              // Trail color
              stroke: "#F5F5F5",
              },
            text: {
              // Text color
              
              fill: disponible < 0 ? 'red' : '#3b82f6',
              // Text size
              fontSize: "16px",
            },
          }}
        />
      </div>

      <div className="contenido-presupuesto">
        <button 
        className="reset-app"
        onClick={handleResetButton}
        >Resetear App</button>
        <p>
          <span>Presupuesto: </span> {formatterPeso.format(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? 'negativo': ''}`}>
          <span>Disponible: </span> {formatterPeso.format(disponible)}
        </p>
        <p>
          <span>Gastado: </span> {formatterPeso.format(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
