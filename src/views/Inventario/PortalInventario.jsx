import React, { useEffect, useState } from "react";

function PortalInventario({ navigate }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem("productos")) || [];
    setProductos(datos);
  }, []);

  const stockBajo = productos.filter(
    (p) => Number(p.stock) <= Number(p.stockMinimo)
  ).length;

  const activos = productos.filter(
    (p) => p.estado === "Activo"
  ).length;

  const inactivos = productos.filter(
    (p) => p.estado === "Inactivo"
  ).length;

  return (
    <main className="dashboard-page">

      <header className="dashboard-topbar">
        <div>
          <p className="eyebrow">Inventario</p>
          <h1>Portal de Inventario</h1>
          <p className="muted">
            Gestión de productos e inventario.
          </p>
        </div>

        <button
          className="btn btn-secondary"
          onClick={() => navigate("portal")}
        >
          Volver al Portal
        </button>
      </header>

      <section className="stats-grid">

        <div className="stat-card">
          <span>Total Productos</span>
          <strong>{productos.length}</strong>
          <small>Productos registrados</small>
        </div>

        <div className="stat-card">
          <span>Stock Bajo</span>
          <strong>{stockBajo}</strong>
          <small>Productos críticos</small>
        </div>

        <div className="stat-card">
          <span>Activos</span>
          <strong>{activos}</strong>
          <small>Disponibles</small>
        </div>

        <div className="stat-card">
          <span>Inactivos</span>
          <strong>{inactivos}</strong>
          <small>Fuera de uso</small>
        </div>

      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          marginTop: "35px",
        }}
      >

        <button
          className="module-card module-blue"
          onClick={() => navigate("registroProducto")}
        >
          <span className="module-icon">📦</span>

          <strong>Registrar Producto</strong>

          <small>
            Crear un nuevo producto para el inventario.
          </small>
        </button>

 <button
  className="module-card module-green"
  onClick={() => navigate("productos")}
>
  <span className="module-icon">📋</span>

  <strong>Productos</strong>

  <small>
    Ver todos los productos registrados.
  </small>
</button>

<button
  className="module-card module-orange"
  onClick={() => navigate("historial")}
>
  <span className="module-icon">📊</span>

  <strong>Historial</strong>

  <small>
    Ver todos los movimientos del inventario.
  </small>
</button>

        <button
          className="module-card module-red"
          onClick={() => navigate("alertas")}
        >
          <span className="module-icon">⚠️</span>

          <strong>Alertas</strong>

          <small>
            Stock bajo y productos por vencer.
          </small>
        </button>

      </section>

      <section
        style={{
          marginTop: "40px",
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
        }}
      >

        <h2>Últimos Productos Registrados</h2>

        {productos.length === 0 ? (
          <p style={{ marginTop: "15px" }}>
            No existen productos registrados.
          </p>
        ) : (
          <table
            style={{
              width: "100%",
              marginTop: "20px",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th align="left">Código</th>
                <th align="left">Producto</th>
                <th align="left">Categoría</th>
                <th align="center">Stock</th>
                <th align="center">Estado</th>
              </tr>
            </thead>

            <tbody>
              {productos.slice(-5).reverse().map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.codigo}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.categoria}</td>
                  <td align="center">{producto.stock}</td>
                  <td align="center">{producto.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </section>

    </main>
  );
}

export default PortalInventario;