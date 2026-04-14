// ===== MODAL AGREGAR PRODUCTO =====
import { useState } from 'react';

const ProductModal = ({ categorias, onCerrar, onGuardar }) => {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagen, setImagen] = useState('');
  const [error, setError] = useState('');

  const handleGuardar = () => {
    // Validaciones HU008
    if (!nombre.trim()) {
      setError('El nombre del producto no puede estar vacío');
      return;
    }
    if (!precio || Number(precio) <= 0) {
      setError('El precio debe ser mayor a cero');
      return;
    }
    if (!categoria) {
      setError('Debes seleccionar una categoría');
      return;
    }

    const nuevoProducto = {
      nombre,
      categoria,
      precio: Number(precio),
      imagen: imagen || '🍽️',
    };

    onGuardar(nuevoProducto);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Agregar Nuevo Producto</h2>

        {error && <p style={{ color: 'red', marginBottom: '0.8rem' }}>{error}</p>}

        <input
          type="text"
          placeholder="Nombre del Producto *"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="">Seleccionar Categoría *</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.nombre}>
              {cat.nombre}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Precio (COP) *"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />

        <input
          type="text"
          placeholder="URL de Imagen (Opcional)"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
        />

        <div className="modal-buttons">
          <button className="btn-cancelar" onClick={onCerrar}>Cancelar</button>
          <button className="btn-crear" onClick={handleGuardar}>Crear</button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;