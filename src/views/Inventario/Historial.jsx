import React, { useEffect, useState } from "react";

function Historial({ navigate }) {
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem("historialInventario")) || [];
    setHistorial(datos.reverse());
  }, []);

  return (
    <main className="dashboard-page">

      <header className="dashboard-topbar">
        <div>
          <p className="eyebrow">Inventario</p>
          <h1>Historial de Movimientos</h1>
        </div>

        <button
          className="btn btn-secondary"
          onClick={() => navigate("inventario")}
        >
          Volver
        </button>
      </header>

      <section
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          marginTop: "20px",
        }}
      >

        {historial.length === 0 ? (

          <p>No existen movimientos registrados.</p>

        ) : (

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >

            <thead>

              <tr>

                <th>Fecha</th>
                <th>Tipo</th>
                <th>Producto</th>
                <th>Código</th>
                <th>Cantidad</th>
                <th>Usuario</th>

              </tr>

            </thead>

            <tbody>

              {historial.map((movimiento, index) => (

                <tr key={index}>

                  <td>{movimiento.fecha}</td>

                  <td>{movimiento.tipo}</td>

                  <td>{movimiento.nombre}</td>

                  <td>{movimiento.codigo}</td>

                  <td>{movimiento.cantidad}</td>

                  <td>{movimiento.usuario}</td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </section>

    </main>
  );
}

export default Historial;