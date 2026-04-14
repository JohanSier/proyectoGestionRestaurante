// ===== PAGINA MENU DE PLATOS =====
import { useState, useEffect } from 'react';
import MenuTable from '../components/Menu/MenuTable';
import ProductModal from '../components/Menu/ProductModal';
import { getProductos, crearProducto, eliminarProducto } from '../services/menuService';
import '../styles/menu.css';

const MenuPage = () => {
  const [productos, setProductos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [busqueda, setBusqueda] = useState('');

  const categorias = [
    { id: 1, nombre: 'Entradas' },
    { id: 2, nombre: 'Platos Fuertes' },
    { id: 3, nombre: 'Postres' },
    { id: 4, nombre: 'Bebidas' },
    { id: 5, nombre: 'Cocteles' },
  ];

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const data = await getProductos();
      setProductos(data);
    } catch {
      setProductos([]);
    }
  };

  const handleGuardar = async (nuevoProducto) => {
    try {
      const creado = await crearProducto(nuevoProducto);
      setProductos((prev) => [...prev, creado]);
    } catch {
      setProductos((prev) => [...prev, { ...nuevoProducto, id: Date.now() }]);
    }
    setMostrarModal(false);
  };

  const handleEliminar = async (id) => {
    try { await eliminarProducto(id); } catch { /* ok */ }
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div>
      {/* ===== NAVBAR ===== */}
      <nav className="navbar">
        <div className="navbar-logo">
          <span>🍽️</span> SAVOR
        </div>
        <ul className="navbar-links">
          <li><button>🏠 Inicio</button></li>
          <li><button>🪑 Mesas</button></li>
          <li className="active"><button>🍴 Menú</button></li>
          <li><button>🧾 Recibos</button></li>
          <li><button>⚙️ Configuración</button></li>
        </ul>
        <div className="navbar-right">
          <button className="btn-alerta">⚠️ Generar Alerta</button>
          <span>🔔</span>
          <div className="usuario-info">
            <div>
              <strong>Hernan R.</strong>
              <div style={{ fontSize: '0.75rem', color: '#666' }}>Gerente</div>
            </div>
            <div className="usuario-avatar">HR</div>
          </div>
        </div>
      </nav>

      {/* ===== CONTENIDO ===== */}
      <div className="menu-container">
        <div className="menu-header">
          <div style={{ paddingLeft: '0.5rem' }}>
            <h1>Menú de Platos</h1>
            <p>Administra el menú del restaurante.</p>
          </div>
          <div className="menu-header-actions">
            <button className="btn-categorias">🏷️ Categorías</button>
            <button className="btn-agregar" onClick={() => setMostrarModal(true)}>
              + Agregar Producto
            </button>
          </div>
        </div>

        <MenuTable
          productos={productos}
          onEliminar={handleEliminar}
          busqueda={busqueda}
          setBusqueda={setBusqueda}
        />
      </div>

      {mostrarModal && (
        <ProductModal
          categorias={categorias}
          onCerrar={() => setMostrarModal(false)}
          onGuardar={handleGuardar}
        />
      )}
    </div>
  );
};

export default MenuPage;