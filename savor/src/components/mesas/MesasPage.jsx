import { useState } from "react";
import GenerarMesasModal from "./GenerarMesasModal";

export default function MesasPage() {
  const [mesas, setMesas] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <h1>Mesas</h1>

      <button onClick={() => setOpenModal(true)}>
        Generar Mesas
      </button>

      {mesas.length === 0 ? (
        <p>No hay mesas creadas todavía</p>
      ) : (
        <div className="grid">
          {mesas.map((mesa) => (
            <div key={mesa.id}>
              Mesa {mesa.numero} - {mesa.capacidad} personas
            </div>
          ))}
        </div>
      )}

      <GenerarMesasModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCreate={(nuevasMesas) =>
          setMesas([...mesas, ...nuevasMesas])
        }
      />
    </div>
  );
}