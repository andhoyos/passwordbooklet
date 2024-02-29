const EmailTemplate = ({ resetLink }) => (
  <div>
    <h1>¡Bienvenido!</h1>
    <p>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p>
    <a href={resetLink}>Restablecer contraseña</a>
  </div>
);

export default EmailTemplate;
