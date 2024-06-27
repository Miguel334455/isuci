"use client";

import Link from "next/link";
import { ChangeEvent, useState, useEffect } from "react";

function Register() {
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [correo, setCorreo] = useState("");
  const [genero, setGenero] = useState("");
  const [edad, setEdad] = useState("");
  const [experiencia, setExperiencia] = useState("");
  const [rol, setRol] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [contextura, setContextura] = useState("");
  const [paises, setPaises] = useState([]);
  const [nacionalidad, setNacionalidad] = useState("");
  const [loadingPaises, setLoadingPaises] = useState(true);
  const [infoFormulario, setInfoFormulario] = useState({
    nombreInput: "",
    cedulaInput: "",
    correoInput: "",
    generoInput: "",
    edadInput: "",
    experienciaInput: "",
    rolInput: "",
    especialidadInput: "",
    contexturaInput: "",
    nacionalidadInput: "",
  });

  useEffect(() => {
    const fetchPaises = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        setPaises(data);
      } catch (error) {
        console.error("Error al obtener los países", error);
      } finally {
        setLoadingPaises(false);
      }
    };

    fetchPaises();
  }, []);

  const handleNombreChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNombre(event.target.value);
  };

  const handleCedulaChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCedula(event.target.value);
  };

  const handleCorreoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCorreo(event.target.value);
  };

  const handleGeneroChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setGenero(event.target.value);
  };

  const handleEdadChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEdad(event.target.value);
  };

  const handleExperienciaChange = (event: ChangeEvent<HTMLInputElement>) => {
    setExperiencia(event.target.value);
  };

  const handleRolChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setRol(event.target.value);
  };

  const handleEspecialidadChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setEspecialidad(event.target.value);
  };

  const handleContexturaChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setContextura(event.target.value);
  };

  const handleNacionalidadChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setNacionalidad(event.target.value);
  };

  function emailIsValid(correo: string) {
    return /\S+@\S+\.\S+/.test(correo);
  }

  const checkInfoForm = () => {
    const updatedInfoForm = { ...infoFormulario };

    nombre === ""
      ? (updatedInfoForm.nombreInput = " - Campo obligatorio")
      : (updatedInfoForm.nombreInput = "");
    cedula === "" || cedula.length !== 10
      ? (updatedInfoForm.cedulaInput = " - Campo no válido")
      : (updatedInfoForm.cedulaInput = "");
    correo === "" || emailIsValid(correo) === false
      ? (updatedInfoForm.correoInput = " - Correo no válido")
      : (updatedInfoForm.correoInput = "");
    genero === ""
      ? (updatedInfoForm.generoInput = " - Campo obligatorio")
      : (updatedInfoForm.generoInput = "");
    edad === "" || parseInt(edad) < 18 || parseInt(edad) > 80
      ? (updatedInfoForm.edadInput = " - Edad no válida")
      : (updatedInfoForm.edadInput = "");
    experiencia === "" ||
    parseInt(experiencia) < 0 ||
    parseInt(experiencia) > 50 ||
    parseInt(experiencia) > parseInt(edad) - 15
      ? (updatedInfoForm.experienciaInput = " - Experiencia no válida")
      : (updatedInfoForm.experienciaInput = "");
    rol === ""
      ? (updatedInfoForm.rolInput = " - Campo obligatorio")
      : (updatedInfoForm.rolInput = "");
    especialidad === ""
      ? (updatedInfoForm.especialidadInput = " - Campo obligatorio")
      : (updatedInfoForm.especialidadInput = "");
    contextura === ""
      ? (updatedInfoForm.contexturaInput = " - Campo obligatorio")
      : (updatedInfoForm.contexturaInput = "");
    nacionalidad === ""
        ? (updatedInfoForm.nacionalidadInput = " - Campo obligatorio")
        : (updatedInfoForm.nacionalidadInput = "");
    setInfoFormulario(updatedInfoForm);

    if (
      nombre !== "" &&
      cedula !== "" &&
      correo !== "" &&
      genero !== "" &&
      edad !== "" &&
      experiencia !== "" &&
      rol !== "" &&
      nacionalidad !== ""
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    const inputValidation = checkInfoForm();
  };

  return (
    <div className="md:p-20 h-screen max-md:py-10  flex justify-center items-center">
      <div className="w-full max-xl:w-full container">
        <div className="w-full flex flex-wrap bg-bg-dark-secondary rounded-2xl">
          <div className="hidden lg:block lg:w-1/2 lg:h-auto w-full h-52 relative lg:rounded-l-2xl max-lg:rounded-xl lg:order-2 order-2 max-lg:mt-5">
            <div
              className="absolute inset-0 lg:rounded-l-2xl rounded-b-2xl brightness-[0.8]"
              style={{
                backgroundImage: "url('/images/imagen-login.png')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            />
          </div>
          <div className="lg:w-1/2 xl:p-5 lg:!p-12 p-10 !pb-6 max-sm:p-14 rounded-r-2xl max-lg:rounded-xl lg:order-1 order-1">
            <div>
              <h1 className="text-3xl font-semibold xl:mb-2 mb-4 w-full py-1 text-white">
                Registro 🚵
              </h1>
            </div>
            <form>
              <label>
                <p className="text-white/80 font-medium">
                  Nombre Completo
                  <span className="text-red-500 font-medium text-sm select-none">
                    {infoFormulario.nombreInput}
                  </span>
                </p>
              </label>
              <input
                className="w-full h-10 pl-5 pr-3 rounded-md mb-3 mt-1 bg-white/10 border-none focus:outline-none text-white/50 placeholder:text-white/20"
                type="text"
                value={nombre}
                onChange={handleNombreChange}
                placeholder="Ingresa tu nombre completo"
                onKeyPress={handleKeyPress}
                autoComplete="name"
              />
              <label>
                <p className="text-white/80 font-medium">
                  Cédula de ciudadanía
                  <span className="text-red-500 font-medium text-sm select-none">
                    {infoFormulario.cedulaInput}
                  </span>
                </p>
              </label>
              <input
                className="w-full h-10 pl-5 pr-3 rounded-md mb-3 mt-1 bg-white/10 border-none focus:outline-none text-white/50 placeholder:text-white/20"
                type="number"
                value={cedula}
                onChange={handleCedulaChange}
                onKeyPress={handleKeyPress}
                placeholder="Ingresa el número de tu cedula"
                autoComplete="cedula"
              />
              <label>
                <p className="text-white/80 font-medium">
                  Correo electrónico
                  <span className="text-red-500 font-medium text-sm select-none">
                    {infoFormulario.correoInput}
                  </span>
                </p>
              </label>
              <input
                className="w-full h-10 pl-5 pr-3 rounded-md mb-3 mt-1 bg-white/10 border-none focus:outline-none text-white/50 placeholder:text-white/20"
                type="email"
                value={correo}
                onChange={handleCorreoChange}
                onKeyPress={handleKeyPress}
                placeholder="Ingresa tu correo electrónico"
                autoComplete="email"
              />
              <label>
                <p className="text-white/80 font-medium">
                  Genero
                  <span className="text-red-500 font-medium text-sm select-none">
                    {infoFormulario.generoInput}
                  </span>
                </p>
              </label>
              <select
                onChange={handleGeneroChange}
                className="w-full h-10 pl-5 pr-3 rounded-md mb-3 mt-1 bg-white/10 border-none focus:outline-none text-white/50 placeholder:text-white/20"
              >
                <option disabled selected>
                  -- Selecciona genero --
                </option>
                <option value="MASCULINO">Masculino</option>
                <option value="FEMENINO">Femenino</option>
              </select>
              <label>
                <p className="text-white/80 font-medium">
                  Edad
                  <span className="text-red-500 font-medium text-sm select-none">
                    {infoFormulario.edadInput}
                  </span>
                </p>
              </label>
              <input
                className="w-full h-10 pl-5 pr-3 rounded-md mb-3 mt-1 bg-white/10 border-none focus:outline-none text-white/50 placeholder:text-white/20"
                type="number"
                value={edad}
                onChange={handleEdadChange}
                onKeyPress={handleKeyPress}
                placeholder="Ingresa tu edad"
                autoComplete="edad"
              />
              <label>
                <p className="text-white/80 font-medium">
                  Experiencia (años)
                  <span className="text-red-500 font-medium text-sm select-none">
                    {infoFormulario.experienciaInput}
                  </span>
                </p>
              </label>
              <input
                className="w-full h-10 pl-5 pr-3 rounded-md mb-3 mt-1 bg-white/10 border-none focus:outline-none text-white/50 placeholder:text-white/20"
                type="number"
                value={experiencia}
                onChange={handleExperienciaChange}
                onKeyPress={handleKeyPress}
                placeholder="Ingresa tus años de experiencia"
                autoComplete="experiencia"
              />
              <label>
                <p className="text-white/80 font-medium">
                  Nacionalidad
                  <span className="text-red-500 font-medium text-sm select-none">
                    {infoFormulario.nacionalidadInput}
                  </span>
                  {paises.map((pais) =>
                    pais.name.common === nacionalidad ? (
                      <img
                        key={pais.cca2}
                        src={pais.flags?.svg || ""}
                        alt={pais.name.common}
                        className="inline-block w-6 h-4 ml-2"
                      />
                    ) : null
                  )}
                </p>
              </label>
              {loadingPaises ? (
                <p className="text-white/80 font-medium">Cargando países...</p>
              ) : (
                <select
                  onChange={handleNacionalidadChange}
                  className="w-full h-10 pl-5 pr-3 rounded-md mb-3 mt-1 bg-white/10 border-none focus:outline-none text-white/50 placeholder:text-white/20"
                >
                  <option disabled selected>
                    -- Selecciona tu Nacionalidad --
                  </option>
                  {paises.map((pais) =>
                    typeof pais !== "object" || pais === null ? null : (
                      <option key={pais.cca2} value={pais.name.common}>
                        {pais.name.common}
                      </option>
                    )
                  )}
                </select>
              )}
              <label>
                <p className="text-white/80 font-medium">
                  Rol
                  <span className="text-red-500 font-medium text-sm select-none">
                    {infoFormulario.rolInput}
                  </span>
                </p>
              </label>
              <select
                onChange={handleRolChange}
                className="w-full h-10 pl-5 pr-3 rounded-md mb-3 mt-1 bg-white/10 border-none focus:outline-none text-white/50 placeholder:text-white/20"
              >
                <option disabled selected>
                  -- Selecciona rol --
                </option>
                <option value="1">Ciclista</option>
                <option value="2">Masajista</option>
                <option value="3">Director deportivo</option>
              </select>

              {rol === "1" ? (
                <div>
                  <label>
                    <p className="text-white/80 font-medium">
                      Especialidad
                      <span className="text-red-500 font-medium text-sm select-none">
                        {infoFormulario.especialidadInput}
                      </span>
                    </p>
                  </label>
                  <select
                    onChange={handleEspecialidadChange}
                    className="w-full h-10 pl-5 pr-3 rounded-md mb-3 mt-1 bg-white/10 border-none focus:outline-none text-white/50 placeholder:text-white/20"
                  >
                    <option disabled selected>
                      -- Selecciona tu especialidad --
                    </option>
                    <option value="ESCALADOR">Escalador</option>
                    <option value="RODADORES">Rodadores</option>
                    <option value="SPRINTERS">Sprinters</option>
                    <option value="GREGARIOS">Gregarios</option>
                    <option value="CLASICOMANOS">Clasicomanos</option>
                    <option value="CONTRARRELOJISTA">Contrarrelojista</option>
                  </select>
                  <label>
                    <p className="text-white/80 font-medium">
                      Contextura
                      <span className="text-red-500 font-medium text-sm select-none">
                        {infoFormulario.contexturaInput}
                      </span>
                    </p>
                  </label>
                  <select
                    onChange={handleContexturaChange}
                    className="w-full h-10 pl-5 pr-3 rounded-md mb-3 mt-1 bg-white/10 border-none focus:outline-none text-white/50 placeholder:text-white/20"
                  >
                    <option disabled selected>
                      -- Selecciona tu contextura --
                    </option>
                    <option value="MUY_DELGADA">Muy delgada</option>
                    <option value="DELGADA">Delgada</option>
                    <option value="MEDIA">Media</option>
                  </select>
                </div>
              ) : null}
              <button
                className="w-full bg-bg-green-secondary hover:bg-[#3C5B6F] transition-all h-10 rounded-md text-white font-medium mb-3"
                type="button"
                onClick={handleLogin}
              >
                Registrarme
              </button>
              <Link
                href={"/"}
                className="w-fit mt-1 font-medium block text-gray-white"
              >
                ¿Ya tienes una cuenta? Inicia sesión
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
