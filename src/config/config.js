const API_BASE_URL = "http://localhost/movil2";

export const API_URLS={
  CHECKBD: `${API_BASE_URL}/api/auth/checkbd.php`,
  LOGIN: `${API_BASE_URL}/api/auth/login.php`,
  REGISTRAR_DISPOSITIVO: `${API_BASE_URL}/core/dispositivo.php`,
  REGISTRAR_BITACORA: `${API_BASE_URL}/core/logger.php`,
  CONSULTA_BITACORA: `${API_BASE_URL}/core/consultarBitacora.php`,
  MENU: `${API_BASE_URL}/api/logs/get_accessos.php`,
  LISTAR_USUARIOS: `${API_BASE_URL}/api/accesos/listarUsuarios.php`,
CONSULTAR_ACCESOS: `${API_BASE_URL}/api/accesos/consultarAccesos.php`,
GUARDAR_ACCESO: `${API_BASE_URL}/api/accesos/guardarAcceso.php`,
}