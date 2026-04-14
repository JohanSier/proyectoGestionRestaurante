// ===== PAGINA MENU DE PLATOS =====
import { useState, useEffect } from 'react';
import MenuTable from '../components/Menu/MenuTable';
import ProductModal from '../components/Menu/ProductModal';
import { getProductos, crearProducto, eliminarProducto, getCategorias } from '../services/menuService';
import '../styles/menu.css';

const MenuPage = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [error, setError] = useState('');

  // Cargar productos y categorias al iniciar
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [prods, cats] = await Promise.all([getProductos(), getCategorias()]);
      setProductos(prods);
      setCategorias(cats);
    } catch (err) {
      // Si el backend no esta listo, usamos datos de prueba
      setCategorias([
        { id: 1, nombre: 'Entradas' },
        { id: 2, nombre: 'Platos Fuertes' },
        { id: 3, nombre: 'Postres' },
        { id: 4, nombre: 'Bebidas' },
      ]);
      setProductos([]);
    }
  };

  const handleGuardar = async (nuevoProducto) => {
    try {
      const productoCreado = await crearProducto(nuevoProducto);
      setProductos([...productos, productoCreado]);
    } catch (err) {
      // Si el backend no esta listo, agregamos localmente
      const productoLocal = { ...nuevoProducto, id: Date.now() };
      setProductos([...productos, productoLocal]);
    }
    setMostrarModal(false);
  };

  const handleEliminar = async (id) => {
    try {
      await eliminarProducto(id);
    } catch (err) {
      // Si el backend no esta listo, eliminamos localmente
    }
    setProductos(productos.filter((p) => p.id !== id));
  };

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h1>Menú de Platos</h1>
        <button className="btn-agregar" onClick={() => setMostrarModal(true)}>
          + Agregar Producto
        </button>
      </div>

      <MenuTable productos={productos} onEliminar={handleEliminar} />

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