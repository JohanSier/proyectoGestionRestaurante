// ===== MENU SERVICE =====
// Este archivo maneja la comunicación con el backend (Spring Boot)

const API_URL = 'http://localhost:8080/api';

// Obtener todos los productos
export const getProductos = async () => {
  const response = await fetch(`${API_URL}/productos`);
  if (!response.ok) throw new Error('Error al obtener productos');
  return response.json();
};

// Crear un nuevo producto
export const crearProducto = async (producto) => {
  const response = await fetch(`${API_URL}/productos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto),
  });
  if (!response.ok) throw new Error('Error al crear producto');
  return response.json();
};

// Eliminar un producto
export const eliminarProducto = async (id) => {
  const response = await fetch(`${API_URL}/productos/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error al eliminar producto');
};

// Obtener todas las categorias
export const getCategorias = async () => {
  const response = await fetch(`${API_URL}/categorias`);
  if (!response.ok) throw new Error('Error al obtener categorias');
  return response.json();
};