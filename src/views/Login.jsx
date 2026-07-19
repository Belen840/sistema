import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";

import {
  contrasenaSegura,
  mensajeContrasenaSegura,
  obtenerVistaInicial,
  rutConFormatoValido,
  rutValido,
} from "../models/authModel";

import { auth, db } from "../firebase";
import "../styles/views/login.css";

function Login({ navigate, notify }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [modoRegistro, setModoRegistro] = useState(false);

  const [registro, setRegistro] = useState({
    nombre: "",
    apellido: "",
    rut: "",
    correo: "",
    contrasena: "",
    telefono: "",
  });

  const actualizarRegistro = (campo, valor) => {
    setRegistro({
      ...registro,
      [campo]: valor,
    });
  };

  const iniciarSesion = (usuario) => {
    if (usuario.estado !== "activo") {
      notify("Tu cuenta está deshabilitada.", "error");
      return;
    }

    localStorage.setItem("sesion", JSON.stringify(usuario));

    notify(
      `Bienvenido ${usuario.nombre}`,
      "success"
    );

    navigate(obtenerVistaInicial(usuario));
  };

  const handleLogin = async () => {
    const email = user.trim().toLowerCase();
    const password = pass.trim();

    if (!email || !password) {
      notify(
        "Ingresa correo y contraseña.",
        "error"
      );
      return;
    }

    try {
      const credenciales =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      const uid = credenciales.user.uid;

      const usuario = await getDoc(
        doc(db, "usuarios", uid)
      );

      if (!usuario.exists()) {
        notify(
          "Este usuario no existe en Firestore.",
          "error"
        );
        return;
      }

      iniciarSesion({
        uid,
        ...usuario.data(),
      });

    } catch (error) {
      console.error(error);
      notify(
        "Correo o contraseña incorrectos.",
        "error"
      );
    }
  };

  const restablecerContrasena = async () => {
    const correo = user.trim().toLowerCase();

    if (!correo) {
      notify(
        "Ingresa tu correo.",
        "error"
      );
      return;
    }

    try {
      await sendPasswordResetEmail(
        auth,
        correo
      );

      notify(
        "Correo enviado correctamente.",
        "success"
      );

    } catch (error) {
      console.error(error);
      notify(
        "No se pudo enviar el correo.",
        "error"
      );
    }
  };

  const crearCuenta = async (e) => {
    e.preventDefault();

    const nombre = registro.nombre.trim();
    const apellido = registro.apellido.trim();
    const rut = registro.rut.trim();
    const correo = registro.correo.trim().toLowerCase();
    const contrasena = registro.contrasena.trim();
    const telefono = registro.telefono.trim();

    if (
      !nombre ||
      !apellido ||
      !rut ||
      !correo ||
      !contrasena ||
      !telefono
    ) {
      notify(
        "Completa todos los campos.",
        "error"
      );
      return;
    }

    if (
      !rutConFormatoValido(rut) ||
      !rutValido(rut)
    ) {
      notify(
        "RUT inválido.",
        "error"
      );
      return;
    }

    if (!contrasenaSegura(contrasena)) {
      notify(
        mensajeContrasenaSegura,
        "error"
      );
      return;
    }

    try {

      // Verificar si ya existe un administrador
      const usuarios = await getDocs(
        collection(db, "usuarios")
      );

      const primerUsuario =
        usuarios.empty;

      const credenciales =
        await createUserWithEmailAndPassword(
          auth,
          correo,
          contrasena
        );

      const uid =
        credenciales.user.uid;

      await setDoc(
        doc(db, "usuarios", uid),
        {
          uid,
          user: correo,
          nombre,
          apellido,
          rut,
          telefono,

          rol: primerUsuario
            ? "admin"
            : "empleado",

          estado: "activo",

          local: primerUsuario
            ? "Administración"
            : "General",

          creadaEn:
            new Date().toISOString(),
        }
      );

      notify(
        primerUsuario
          ? "Administrador creado correctamente."
          : "Usuario creado correctamente.",
        "success"
      );

      setRegistro({
        nombre: "",
        apellido: "",
        rut: "",
        correo: "",
        contrasena: "",
        telefono: "",
      });

      setModoRegistro(false);

    } catch (error) {

      console.error(error);

      if (
        error.code ===
        "auth/email-already-in-use"
      ) {
        notify(
          "Ese correo ya existe.",
          "error"
        );
      } else {
        notify(
          "No se pudo crear la cuenta.",
          "error"
        );
      }
    }
  };

  return (
        <main className="auth-page">
      <section className="auth-panel">

        <div className="brand-mark">SV</div>

        <p className="eyebrow">
          Sistema de venta e inventario
        </p>

        <h1>
          {modoRegistro ? "Crear cuenta" : "Iniciar sesión"}
        </h1>

        <p className="muted">
          {modoRegistro
            ? "Completa el formulario para crear una cuenta."
            : "Ingresa con tu correo electrónico."}
        </p>

        {modoRegistro ? (

          <form
            onSubmit={crearCuenta}
            className="auth-register-form"
          >

            <input
              className="field"
              placeholder="Nombres"
              value={registro.nombre}
              onChange={(e) =>
                actualizarRegistro(
                  "nombre",
                  e.target.value
                )
              }
            />

            <input
              className="field"
              placeholder="Apellidos"
              value={registro.apellido}
              onChange={(e) =>
                actualizarRegistro(
                  "apellido",
                  e.target.value
                )
              }
            />

            <input
              className="field"
              placeholder="RUT"
              value={registro.rut}
              onChange={(e) =>
                actualizarRegistro(
                  "rut",
                  e.target.value
                )
              }
            />

            <input
              type="email"
              className="field"
              placeholder="Correo"
              value={registro.correo}
              onChange={(e) =>
                actualizarRegistro(
                  "correo",
                  e.target.value
                )
              }
            />

            <input
              type="password"
              className="field"
              placeholder="Contraseña"
              value={registro.contrasena}
              onChange={(e) =>
                actualizarRegistro(
                  "contrasena",
                  e.target.value
                )
              }
            />

            <input
              className="field"
              placeholder="Teléfono"
              value={registro.telefono}
              onChange={(e) =>
                actualizarRegistro(
                  "telefono",
                  e.target.value
                )
              }
            />

            <p className="hint">
              {mensajeContrasenaSegura}
            </p>

            <button
              type="submit"
              className="btn btn-primary btn-full"
            >
              Crear cuenta
            </button>

          </form>

        ) : (

          <>

            <input
              className="field"
              placeholder="Correo electrónico"
              value={user}
              onChange={(e) =>
                setUser(e.target.value)
              }
            />

            <input
              type="password"
              className="field"
              placeholder="Contraseña"
              value={pass}
              onChange={(e) =>
                setPass(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
            />

            <button
              type="button"
              className="link-button auth-reset"
              onClick={restablecerContrasena}
            >
              ¿Olvidaste tu contraseña?
            </button>

            <button
              className="btn btn-primary btn-full"
              onClick={handleLogin}
            >
              Entrar
            </button>

          </>

        )}

        <button
          type="button"
          className="btn btn-secondary btn-full"
          onClick={() =>
            setModoRegistro(!modoRegistro)
          }
        >
          {modoRegistro
            ? "Volver al inicio de sesión"
            : "Crear cuenta"}
        </button>

      </section>
    </main>
  );
}

export default Login;