"use client";

import { useState, useEffect } from "react";
import { authenticator } from "otplib";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import QRCode from "qrcode.react";
import Link from "next/link";
import Image from "next/image";
import playLogo from "@/images/playLogo.svg";
import copy from "@/images/copy.svg";
import Info2FA from "@/components/ModalInfo2FA";
import VerificationTOTP from "@/components/VerificationModal";
import axios from "axios";

function CodeAuth() {
  const [totpSecret, setTotpSecret] = useState("");
  const [modalInfo, setmodalInfo] = useState(true);
  const [genSecret, setGenSecret] = useState("");
  const [message, setMessage] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  const generateTotpSecret = async () => {
    const secret = await authenticator.generateSecret();
    try {
      const responseUpdate = await axios.patch("/api/auth/profile", {
        totpSecret: secret,
        twoFactorAuthEnabled: true,
        user: session,
      });

      session.user = responseUpdate.data;

      if (responseUpdate.data) {
        setTotpSecret(secret);
        setGenSecret(secret);
      }
    } catch (error) {
      console.error("Error during generation:", error);
      if (error.response?.data.message) {
        setMessage({ type: "error", content: error.response.data.message });
      } else {
        setMessage({ type: "error", content: "Ocurrió un error" });
      }
    }
  };

  const handleVerificationSuccess = () => {
    sessionStorage.setItem("isVerificationValidated", "true");
    setTimeout(() => {
      router.push("/dashboard/profile");
    }, "1000");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(genSecret);
    setMessage({ content: "Texto copiado" });
    setTimeout(() => {
      setMessage({ content: "" });
    }, "2000");
  };

  return (
    <div className="flex justify-center items-center md:mt-14 mt-20 px-4">
      {message.content && (
        <div className="bg-slate-50 p-2 mb-2 rounded-md absolute">
          {message.content}
        </div>
      )}
      <div className="bg-white text-slate-500 px-8 pt-10 max-w-md  w-96 mx-auto shadow-lg  rounded-lg">
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
            <p>Ó ingresa esta clave manualmente:</p>
            <div className="font-semibold flex gap-3">
              {genSecret}{" "}
              <Image
                src={copy}
                width={18}
                height={18}
                alt="copy"
                title="Copiar"
                className="cursor-pointer"
                onClick={copyToClipboard}
              />
            </div>
          </div>
        )}
        {modalInfo && <Info2FA closeModal={() => setmodalInfo(false)} />}

        {totpSecret ? (
          <VerificationTOTP onSuccess={handleVerificationSuccess} />
        ) : (
          <>
            <div className="flex justify-around md:flex-row md:gap-0 gap-2 flex-col items-center pt-4 ">
              <Link
                className="inline-flex items-center gap-1 border-2 rounded-md px-4 py-2"
                href="https://play.google.com/store/apps/details?id=com.authy.authy&hl=es_419&gl=US"
              >
                <Image src={playLogo} width={20} height={20} alt="playLogo" />
                Authy
              </Link>
              <Link
                className="inline-flex items-center gap-1 border-2 rounded-md px-4 py-2"
                href="https://play.google.com/store/apps/details?id=com.azure.authenticator"
              >
                <Image src={playLogo} width={20} height={20} alt="playLogo" />
                Authenticator{" "}
              </Link>
            </div>
            <button
              className="w-full mt-5 mb-10"
              onClick={generateTotpSecret}
              disabled={totpSecret}
            >
              Generar clave secreta
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default CodeAuth;
