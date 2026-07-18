import React, { useEffect, useState } from "react";

function Productos({ navigate, notify }) {
  const [productos, setProductos] = useState([]);
  const [buscar, setBuscar] = useState("");

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = () => {
    const datos = JSON.parse(localStorage.getItem("productos")) || [];
    setProductos(datos);
  };

  const eliminarProducto = (id) => {
    if (!window.confirm("¿Desea eliminar este producto?")) return;

    const nuevos = productos.filter((p) => p.id !== id);

    localStorage.setItem("productos", JSON.stringify(nuevos));

    setProductos(nuevos);

    notify("Producto eliminado correctamente", "success");
  };

  const filtrados = productos.filter((p) =>
    (p.nombre || "").toLowerCase().includes(buscar.toLowerCase()) ||
    (p.codigo || "").includes(buscar) ||
    (p.categoria || "").toLowerCase().includes(buscar.toLowerCase())
  );

  return (
    <main className="dashboard-page">

      <header className="dashboard-topbar">

        <div>
          <p className="eyebrow">Inventario</p>
          <h1>Productos Registrados</h1>
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
          padding: 25,
          borderRadius: 12,
          marginTop: 20,
        }}
      >

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >

          <input
            className="field"
            style={{ width: "350px" }}
            placeholder="Buscar producto..."
            value={buscar}
            onChange={(e) => setBuscar(e.target.value)}
          />

          <button
            className="btn btn-primary"
            onClick={() => navigate("registroProducto")}
          >
            + Nuevo Producto
          </button>

        </div>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >

          <thead>

            <tr>

              <th>Código</th>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Proveedor</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Estado</th>
              <th>Acciones</th>

            </tr>

          </thead>

          <tbody>

            {filtrados.length === 0 ? (

              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: 20 }}>
                  No existen productos registrados.
                </td>
              </tr>

            ) : (

              filtrados.map((producto) => (

                <tr key={producto.id}>

                  <td>{producto.codigo}</td>

                  <td>{producto.nombre}</td>

                  <td>{producto.categoria}</td>

                  <td>{producto.proveedor}</td>

                  <td>${producto.precio}</td>

                  <td>{producto.stock}</td>

                  <td>{producto.estado}</td>

                  <td>

                    <button
                      className="btn btn-secondary"
                      onClick={() =>
                        notify("Próximamente edición de productos", "info")
                      }
                    >
                      Editar
                    </button>

                    <button
                      className="btn btn-danger"
                      style={{ marginLeft: 10 }}
                      onClick={() => eliminarProducto(producto.id)}
                    >
                      Eliminar
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </section>

    </main>
  );
}

export default Productos;