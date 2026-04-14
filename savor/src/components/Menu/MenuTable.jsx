// ===== TABLA DE PRODUCTOS =====
const MenuTable = ({ productos, onEliminar, busqueda, setBusqueda }) => {
  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      {/* Buscador */}
      <div className="search-bar">
        <span>🔍</span>
        <input
          type="text"
          placeholder="Buscar productos..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {/* Tabla */}
      <div className="menu-table-wrapper">
        <table className="menu-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', color: '#888', padding: '2rem' }}>
                  No hay productos registrados aún.
                </td>
              </tr>
            ) : (
              productosFiltrados.map((producto) => (
                <tr key={producto.id}>
                  <td style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    {producto.imagen && producto.imagen.startsWith('http') ? (
                      <img src={producto.imagen} alt={producto.nombre} className="product-img" />
                    ) : (
                      <span style={{ fontSize: '2rem' }}>{producto.imagen || '🍽️'}</span>
                    )}
                    {producto.nombre}
                  </td>
                  <td>
                    <span className="categoria-badge">{producto.categoria}</span>
                  </td>
                  <td>${producto.precio.toLocaleString('es-CO')}</td>
                  <td>
                    <button className="btn-editar">✏️</button>
                    <button className="btn-eliminar" onClick={() => onEliminar(producto.id)}>🗑️</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MenuTable;