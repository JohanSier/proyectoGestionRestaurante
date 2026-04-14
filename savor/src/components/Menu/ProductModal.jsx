// ===== MODAL AGREGAR PRODUCTO =====
import { useState } from 'react';

const ProductModal = ({ categorias, onCerrar, onGuardar }) => {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('Entradas');
  const [precio, setPrecio] = useState('');
  const [imagen, setImagen] = useState('');
  const [error, setError] = useState('');

  const handleGuardar = () => {
    if (!nombre.trim()) {
      setError('El nombre del producto no puede estar vacío');
      return;
    }
    if (!precio || Number(precio) <= 0) {
      setError('El precio debe ser mayor a cero');
      return;
    }

    onGuardar({
      nombre,
      categoria,
      precio: Number(precio),
      imagen: imagen || null,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Agregar Nuevo Producto</h2>
          <button className="modal-close" onClick={onCerrar}>✕</button>
        </div>

        {error && <p className="modal-error">{error}</p>}

        <div className="modal-field">
          <label>Nombre del Producto</label>
          <input
            type="text"
            placeholder="ej. Salmón a la parrilla"
            value={nombre}
            onChange={(e) => { setNombre(e.target.value); setError(''); }}
          />
        </div>

        <div className="modal-field">
          <label>Categoría</label>
          <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.nombre}>{cat.nombre}</option>
            ))}
          </select>
        </div>

        <div className="modal-field">
          <label>Precio (COP)</label>
          <input
            type="number"
            placeholder="0"
            value={precio}
            onChange={(e) => { setPrecio(e.target.value); setError(''); }}
          />
        </div>

        <div className="modal-field">
          <label>URL de Imagen (opcional)</label>
          <input
            type="text"
            placeholder="https://..."
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
          />
        </div>

        <div className="modal-buttons">
          <button className="btn-cancelar" onClick={onCerrar}>Cancelar</button>
          <button className="btn-crear" onClick={handleGuardar}>Crear</button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;