// ===== TABLA DE PRODUCTOS =====
const MenuTable = ({ productos, onEliminar }) => {
    if (productos.length === 0) {
      return <p style={{ textAlign: 'center', color: '#888' }}>No hay productos registrados aún.</p>;
    }
  
    return (
      <table className="menu-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>
                {producto.imagen && producto.imagen.startsWith('http') ? (
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="product-img"
                  />
                ) : (
                  <span style={{ fontSize: '2rem' }}>{producto.imagen || '🍽️'}</span>
                )}
              </td>
              <td>{producto.nombre}</td>
              <td>{producto.categoria}</td>
              <td>${producto.precio.toLocaleString('es-CO')}</td>
              <td>
                <button
                  onClick={() => onEliminar(producto.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                  }}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default MenuTable;