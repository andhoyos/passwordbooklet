import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import Key from "@/models/Key";
import User from "@/models/users";
import { encryptSymmetric } from "@/helpers/encryption";
import { decryptSymmetric } from "@/helpers/decryption";
import { getServerSession } from "next-auth/next";
const { WEB_CRYPTO } = process.env;

export async function GET(request) {
  const session = await getServerSession({ request });

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const keys = await Key.find({ user: user._id }).sort({ company: 1 });

    const decryptedKeys = await Promise.all(
      keys.map(async (key) => {
        const decryptedAccounts = await Promise.all(
          key.accounts.map(async (account) => {
            const decryptedPassword = await decryptSymmetric(
              account.password,
              account.iv,
              WEB_CRYPTO
            );
            return {
              ...account.toJSON(),
              password: decryptedPassword,
            };
          })
        );
        return {
          ...key.toJSON(),
          accounts: decryptedAccounts,
        };
      })
    );

    return NextResponse.json(decryptedKeys);
  } catch (error) {
    console.error("Error fetching keys:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const data = await request.json();
  const { company, accounts, user, companyId } = data;
  const session = user;

  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  console.log(data);

  try {
    for (const account of accounts) {
      const encryptedPassword = await encryptSymmetric(
        account.password,
        WEB_CRYPTO
      );
      account.password = encryptedPassword.ciphertext;
      account.iv = encryptedPassword.iv;
    }
    await connectDB();
    if (companyId) {
      const updateKey = await Key.findOneAndUpdate(
        { _id: companyId, user: session.user._id },
        { $push: { accounts: { $each: accounts } } },
        { new: true }
      );
      console.log(updateKey);
      return NextResponse.json(updateKey);
    } else {
      const companyName = await Key.findOne({ company });
      if (companyName) {
        const updateKey = await Key.findOneAndUpdate(
          { company: company, user: session.user._id },
          { $push: { accounts: { $each: accounts } } },
          { new: true }
        );
        console.log(updateKey);
        return NextResponse.json(updateKey);
      } else {
        const newKey = await Key.create({
          company,
          accounts:
            Array.isArray(accounts) && accounts.length > 0 ? accounts : [],
          user: session.user._id,
        });

        console.log(newKey);
        return NextResponse.json(newKey);
      }
    }
  } catch (error) {
    console.error("Error creating/updating key:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  const data = await request.json();
  const { accountId, updatedData, user } = data;
  const session = user;

  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    if (updatedData.password) {
      const updatedAccount = updatedData;
      const encryptedPassword = await encryptSymmetric(
        updatedAccount.password,
        WEB_CRYPTO
      );
      updatedAccount.password = encryptedPassword.ciphertext;
      updatedAccount.iv = encryptedPassword.iv;
    }
    await connectDB();
    const key = await Key.findOneAndUpdate(
      {
        user: session.user._id,
        "accounts._id": accountId,
      },
      {
        $set: {
          "accounts.$.name": updatedData.name,
          ...(updatedData.password && {
            "accounts.$.password": updatedData.password,
            "accounts.$.iv": updatedData.iv,
          }),
        },
      },
      { new: true }
    );

    if (!key) {
      return NextResponse.json(
        { message: "Key or account not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(key);
  } catch (error) {
    console.error("Error updating key:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  const data = await request.json();
  const { companyId, updatedData, user } = data;
  const session = user;

  if (!session?.user) {
    return NextResponse.json({ message: "Unautorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const companyUpdate = await Key.findOneAndUpdate(
      {
        _id: companyId,
        user: session.user._id,
      },
      {
        $set: updatedData,
      },
      {
        new: true,
      }
    );

    if (!companyUpdate) {
      NextResponse.json({ message: "Company not found" }, { status: 404 });
    }

    return NextResponse.json(companyUpdate);
  } catch (error) {
    console.error("error updating company");
    return NextResponse.json(
      { message: "Internal server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  const data = await request.json();
  const { accountId, companyId, user } = data;
  const session = user;
  if (!session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();

    if (accountId) {
      const deletedAccount = await Key.findOneAndUpdate(
        { user: session.user._id, "accounts._id": accountId },
        { $pull: { accounts: { _id: accountId } } },
        { new: true }
      );

      console.log(deletedAccount);
      if (deletedAccount) {
        return NextResponse.json(deletedAccount);
      }
      return NextResponse.json(
        { message: "Account not found" },
        { status: 404 }
      );
    } else if (companyId) {
      const deleteCompany = await Key.findOneAndDelete({
        _id: companyId,
        user: session.user._id,
      });
      if (deleteCompany) {
        return NextResponse.json(deleteCompany);
      }
      return NextResponse.json(
        { message: "Company not found" },
        { status: 404 }
      );
    }

    NextResponse.json({ message: "Invalid request" }, { status: 400 });
  } catch (error) {
    console.error("Error during delete:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
