export const getEmailContent = (ResetLink) => {
  return `   
      <div>
        <div >
        <h1 >Hola,</h1>
        <br/>
        <p >Recibimos una nueva solicitud de recuperacion de password.
        Puedes hacer click en el link de abajo para restablecer.
        Si no lo has solicitado no hace falta hacer nada.</p>
        
        <a  href="${ResetLink}">Restablecer Password</a>
        </div>
        <br/>
        <p>Saludos el equipo de Passwordbooklet</p>
      </div>   
  `;
};
