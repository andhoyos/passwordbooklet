import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import User from "@/models/users";
import Key from "@/models/Key";
import { getServerSession } from "next-auth/next";
import { encryptSymmetric } from "@/helpers/encryption";
import { decryptSymmetric } from "@/helpers/decryption";
import bcrypt from "bcryptjs";

const { WEB_CRYPTO } = process.env;
export async function GET(request) {
  const session = await getServerSession({ request });

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const userFound = await User.findOne({ email: session.user.email });

    const decryptedTotpSecret = await decryptSymmetric(
      userFound.totpSecret,
      userFound.iv,
      WEB_CRYPTO
    );

    return NextResponse.json(decryptedTotpSecret);
  } catch (error) {
    console.error("Error fetching User:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  const data = await request.json();
  const { updatedData, user } = data;
  const session = user;

  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    if (updatedData.password) {
      const updatedUser = updatedData;
      const hashedPassword = await bcrypt.hash(updatedData.password, 12);
      updatedUser.password = hashedPassword;
    }

    await connectDB();

    const userUpdate = await User.findOneAndUpdate(
      {
        _id: session.user._id,
      },
      {
        $set: {
          username: updatedData.username,
          email: updatedData.email,
          ...(updatedData.password && {
            password: updatedData.password,
          }),
        },
      },
      { new: true }
    );

    if (!userUpdate) {
      return NextResponse.json({ message: "user  not found" }, { status: 404 });
    }

    session.user = userUpdate;

    return NextResponse.json(userUpdate, {
      headers: {
        "set-cookie": session.cookie,
      },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  const data = await request.json();
  const { totpSecret, twoFactorAuthEnabled, user } = data;
  const session = user;

  let totpSecretUpdate, ivUpdate;

  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();

    if (twoFactorAuthEnabled) {
      const encryptedTotpSecret = await encryptSymmetric(
        totpSecret,
        WEB_CRYPTO
      );
      totpSecretUpdate = encryptedTotpSecret.ciphertext;
      ivUpdate = encryptedTotpSecret.iv;
    } else {
      totpSecretUpdate = totpSecret;
      ivUpdate = "";
    }

    const userUpdate = await User.findOneAndUpdate(
      {
        _id: session.user._id,
      },
      {
        $set: {
          totpSecret: totpSecretUpdate,
          iv: ivUpdate,
          twoFactorAuthEnabled: twoFactorAuthEnabled,
        },
      },
      { new: true }
    );

    if (!userUpdate) {
      return NextResponse.json({ message: "user  not found" }, { status: 404 });
    }

    session.user = userUpdate;

    return NextResponse.json(userUpdate, {
      headers: {
        "set-cookie": session.cookie,
      },
    });
  } catch (error) {
    console.error("Error updating twoFactor:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  const data = await request.json();
  const { userId, user } = data;
  const session = user;

  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();

    await Key.deleteMany({ user: userId });

    const deletedUser = await User.findOneAndDelete({
      _id: userId,
    });

    if (!deletedUser) {
      return NextResponse.json({ message: "user  not found" }, { status: 404 });
    }

    console.log(deletedUser);

    return NextResponse.json(deletedUser);
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
