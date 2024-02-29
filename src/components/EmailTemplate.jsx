const EmailTemplate = ({ resetLink }) => (
  <div>
    <h1>¡Bienvenido!</h1>
    <p>Para cambiar tu contraseña, haz clic en el siguiente enlace:</p>
    <a href={resetLink}>Cambiar contraseña</a>
  </div>
);

export default EmailTemplate;
