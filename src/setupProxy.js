// Importación de la librería http-proxy-middleware
const { createProxyMiddleware } = require("http-proxy-middleware");

// Exportación de una función que recibe la aplicación como parámetro
module.exports = function (app) {
  // Uso del middleware de proxy para redirigir las solicitudes que comienzan con "/api" a la URL del servidor de desarrollo
  app.use(
    "/api",
    createProxyMiddleware({
      // Especificación del destino de las solicitudes redirigidas
      target: "https://api.usebouncer.com",
      // Cambio del origen de la solicitud para evitar problemas de CORS
      changeOrigin: true,
      // Reescritura de la ruta de la solicitud eliminando el prefijo "/api"
      pathRewrite: {
        "^/api": "",
      },
    })
  );
};
