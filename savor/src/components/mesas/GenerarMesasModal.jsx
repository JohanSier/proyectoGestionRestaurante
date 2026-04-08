import { useState } from "react";

export default function GenerarMesasModal({ open, onClose, onCreate }) {
  const [cantidad, setCantidad] = useState(10);
  const [inicio, setInicio] = useState(1);
  const [capacidad, setCapacidad] = useState(4);

  if (!open) return null;

  const handleCreate = () => {
    const nuevasMesas = [];

    for (let i = 0; i < cantidad; i++) {
      nuevasMesas.push({
        id: inicio + i,
        numero: inicio + i,
        capacidad,
        estado: "Disponible",
      });
    }

    onCreate(nuevasMesas);
    onClose();
  };

  return (
    <div className="modal">
      <h2>Generar Mesas Múltiples</h2>

      <input
        type="number"
        value={cantidad}
        onChange={(e) => setCantidad(Number(e.target.value))}
      />

      <input
        type="number"
        value={inicio}
        onChange={(e) => setInicio(Number(e.target.value))}
      />

      <input
        type="number"
        value={capacidad}
        onChange={(e) => setCapacidad(Number(e.target.value))}
      />

      <button onClick={onClose}>Cancelar</button>
      <button onClick={handleCreate}>
        Crear {cantidad} mesas
      </button>
    </div>
  );
}