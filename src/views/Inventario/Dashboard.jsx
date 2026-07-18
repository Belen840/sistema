import React from "react";

function Inventario({ navigate }) {
  return (
    <main className="dashboard-page">
      <header className="dashboard-topbar">
        <div>
          <p className="eyebrow">Módulo de Inventario</p>
          <h1>Dashboard Inventario</h1>
        </div>

        <button
          className="btn btn-secondary"
          onClick={() => navigate("portal")}
        >
          Volver
        </button>
        <button
  className="btn btn-primary"
  onClick={() => navigate("registroProducto")}
>
  Registrar Producto
</button>
      </header>

      <section className="stats-grid">
        <div className="stat-card">
          <span>Productos</span>
          <strong>150</strong>
          <small>Productos registrados</small>
        </div>

        <div className="stat-card">
          <span>Stock Bajo</span>
          <strong>8</strong>
          <small>Productos críticos</small>
        </div>

        <div className="stat-card">
          <span>Por vencer</span>
          <strong>4</strong>
          <small>Próximos 30 días</small>
        </div>

        <div className="stat-card">
          <span>Proveedores</span>
          <strong>12</strong>
          <small>Registrados</small>
        </div>
      </section>

      <section
        style={{
          marginTop: "30px",
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        <h2>Alertas</h2>

        <ul>
          <li>⚠ Pollo Broaster con stock bajo.</li>
          <li>⚠ Leche vence en 5 días.</li>
          <li>📅 Hoy visita el proveedor Coca-Cola.</li>
        </ul>
      </section>
    </main>
  );
}

export default Inventario;