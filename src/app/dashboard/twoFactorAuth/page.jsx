"use client";

import { useState, useEffect } from "react";
import { authenticator } from "otplib";
import { useSession } from "next-auth/react";
import QRCode from "qrcode.react";
import Link from "next/link";
import Image from "next/image";
import playLogo from "@/images/playLogo.svg";
import Info2FA from "@/components/ModalInfo2FA";
import axios from "axios";

function CodeAuth() {
  const [totpSecret, setTotpSecret] = useState("");
  const [modalInfo, setmodalInfo] = useState(true);
  const [message, setMessage] = useState("");
  const { data: session } = useSession();

  const generateTotpSecret = async () => {
    const secret = await authenticator.generateSecret();
    setTotpSecret(secret);
    setMessage(`Ó ingresa esta clave manualmente: ${secret}`);
    // try {
    //   const responseUpdate = await axios.patch("/api/auth/profile", {
    //     totpSecret: secret,
    //     twoFactorAuthEnabled: true,
    //     user: session,
    //   });

    //   session.user = responseUpdate.data;

    //   if (responseUpdate.data) {
    //     setTotpSecret(secret);
    //     setMessage(`Ó ingresa esta clave manualmente: ${secret}`);
    //   }
    // } catch (error) {
    //   console.error("Error during generation:", error);
    //   if (error.response?.data.message) {
    //     setMessage({ type: "error", content: error.response.data.message });
    //   } else {
    //     setMessage({ type: "error", content: "Ocurrió un error" });
    //   }
    // }
  };

  return (
    <div className="flex  justify-center items-center md:mt-14 mt-20">
      <div className="bg-white text-slate-500 px-8 py-10 max-w-md  w-96 mx-auto shadow-lg  rounded-lg">
        {totpSecret && (
          <div>
            <p>Escanee este código QR con su aplicación de autenticación.</p>
            <QRCode
              value={authenticator.keyuri(
                "Passwordbooklet",
                "Passwordbooklet",
                totpSecret
              )}
              className="mx-auto my-5"
            />
            <div>{message}</div>
          </div>
        )}
        {modalInfo && <Info2FA closeModal={() => setmodalInfo(false)} />}
        <div className="flex justify-around md:flex-row md:gap-0 gap-2 flex-col items-center pt-4">
          <Link
            className="inline-flex items-center gap-1 border-2 rounded-md px-4 py-2"
            href="https://play.google.com/store/apps/details?id=com.authy.authy&hl=es_419&gl=US"
          >
            <Image src={playLogo} width={20} height={20} alt="playLogo" />
            Authy
          </Link>
          <Link
            className="inline-flex items-center gap-1 border-2 rounded-md px-4 py-2"
            href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=es&gl=US"
          >
            <Image src={playLogo} width={20} height={20} alt="playLogo" />
            Google Authenticator{" "}
          </Link>
        </div>
        <button className="w-full mt-5" onClick={generateTotpSecret}>
          Generar clave secreta
        </button>
      </div>
    </div>
  );
}

export default CodeAuth;
