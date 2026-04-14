package com.restaurante.menu_service.service;

import com.restaurante.menu_service.model.Producto;
import com.restaurante.menu_service.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    // Obtener todos los productos
    public List<Producto> obtenerTodos() {
        return productoRepository.findAll();
    }

    // Crear un nuevo producto
    public Producto crear(Producto producto) {
        return productoRepository.save(producto);
    }

    // Eliminar un producto
    public void eliminar(Long id) {
        productoRepository.deleteById(id);
    }
}