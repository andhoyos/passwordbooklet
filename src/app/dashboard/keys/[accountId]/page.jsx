import Key from "@/models/Key";
import AccountEditForm from "@/components/AccountEditForm";

async function findAccountById(accountId) {
  try {
    const accountCompany = await Key.findOne({ "accounts._id": accountId });
    if (accountCompany) {
      const account = accountCompany.accounts.find((acc) =>
        acc._id.equals(accountId)
      );

      const company = accountCompany.company;
      const companyId = accountCompany._id.toString();
      return { account, company, companyId };
    } else {
      console.log("No se encontró una key con la cuenta correspondiente.");
      return null;
    }
  } catch (error) {
    console.error("Error al buscar cuenta por ID:", error);
    throw error;
  }
}

async function AccountsEditPage({ params }) {
  const accountEdit = await findAccountById(params.accountId);
  const { account, company, companyId } = accountEdit;
  console.log(accountEdit);

  return (
    <div>
      <h1>Editar cuenta</h1>
      <p>Usuario: {account.name}</p>
      <p>Company: {company}</p>
      <p>Contraseña: {account.password} </p>
      <p>ID de cuenta: {account._id.toString()} </p>
      <AccountEditForm
        company={company}
        companyId={companyId}
        usuario={account.name}
        contrasena={account.password}
        idCuenta={account._id.toString()}
      />
    </div>
  );
}

export default AccountsEditPage;
