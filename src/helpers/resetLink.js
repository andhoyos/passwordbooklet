
  
export function getTokenFromURL() {
  // Obtener la URL actual del navegador
  const url = window.location.href;

  
  // Buscar el parámetro 'token' en la URL
  const tokenParam = new URLSearchParams(new URL(url).search).get('token');
  
  console.log("esta es el token",tokenParam)
  return tokenParam;
}

