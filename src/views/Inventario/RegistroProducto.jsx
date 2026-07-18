import React, { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

function RegistroProducto({ navigate, notify }) {
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [proveedor, setProveedor] = useState("");
  const [lote, setLote] = useState("");
  const [fecha, setFecha] = useState("");
  const [precio, setPrecio] = useState("");
  const [unidad, setUnidad] = useState("");
  const [stock, setStock] = useState("");
  const [stockMinimo, setStockMinimo] = useState("");
  const [estado, setEstado] = useState("Activo");

  const scannerRef = useRef(null);
const historial =
  JSON.parse(localStorage.getItem("historialInventario")) || [];

historial.push({
  fecha: new Date().toLocaleString("es-CL"),
  tipo: "Ingreso",
  nombre: producto.nombre,
  codigo: producto.codigo,
  cantidad: producto.stock,
  usuario:
    JSON.parse(localStorage.getItem("sesion"))?.nombre || "Administrador",
});

localStorage.setItem(
  "historialInventario",
  JSON.stringify(historial)
);
  const iniciarScanner = () => {
    if (scannerRef.current) return;

    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: {
          width: 220,
          height: 100,
        },
        aspectRatio: 1.7,
      },
      false
    );

    scanner.render(
      (texto) => {
        setCodigo(texto);

        notify(`✅ Código leído: ${texto}`, "success");

        scanner.clear().catch(() => {});
        scannerRef.current = null;
      },
      () => {
        // Ignorar errores mientras busca el código
      }
    );

    scannerRef.current = scanner;
  };



useEffect(() => {
  const cargarProductos = async () => {
    const querySnapshot = await getDocs(collection(db, "productos"));

    const lista = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setProductos(lista);
  };

  cargarProductos();
}, []);

 const guardarProducto = async () => {
  try {
    await addDoc(collection(db, "productos"), {
      codigo,
      nombre,
      categoria,
      stock: Number(stock),
      stockMinimo: Number(stockMinimo),
      estado,
      creado: new Date()
    });

    alert("Producto guardado en Firebase");
  } catch (error) {
    console.error(error);
    alert("Error al guardar");
  }
};

  return (
    <main className="dashboard-page">
      <header className="dashboard-topbar">
        <div>
          <p className="eyebrow">Inventario</p>
          <h1>Registro de Productos</h1>
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
        <h2>Nuevo Producto</h2>

        <div
          style={{
            display: "grid",
            gap: 15,
            marginTop: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 10,
            }}
          >
            <input
              className="field"
              value={codigo}
              readOnly
              placeholder="Código de barras"
            />

            <button
              type="button"
              className="btn btn-primary"
              onClick={iniciarScanner}
            >
              📷 Escanear
            </button>
          </div>

          <div
            id="reader"
            style={{
              width: "320px",
              margin: "0 auto",
              border: "1px solid #ddd",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          ></div>

          <input
            className="field"
            placeholder="Nombre del producto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <input
            className="field"
            placeholder="Categoría"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          />

          <input
            className="field"
            placeholder="Proveedor"
            value={proveedor}
            onChange={(e) => setProveedor(e.target.value)}
          />

          <input
            className="field"
            placeholder="Número de lote"
            value={lote}
            onChange={(e) => setLote(e.target.value)}
          />

          <label>Fecha de vencimiento</label>

          <input
            className="field"
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />

          <input
            className="field"
            type="number"
            placeholder="Precio Unitario"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />

          <input
            className="field"
            placeholder="Unidad de medida"
            value={unidad}
            onChange={(e) => setUnidad(e.target.value)}
          />

          <input
            className="field"
            type="number"
            placeholder="Stock Inicial"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />

          <input
            className="field"
            type="number"
            placeholder="Stock Mínimo"
            value={stockMinimo}
            onChange={(e) => setStockMinimo(e.target.value)}
          />

          <select
            className="field"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option>Activo</option>
            <option>Inactivo</option>
          </select>

          <button
            className="btn btn-primary"
            onClick={guardarProducto}
          >
            Guardar Producto
          </button>
        </div>
      </section>
    </main>
  );
}

export default RegistroProducto;