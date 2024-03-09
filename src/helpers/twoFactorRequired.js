import axios from "axios";

export async function handleTwoFactorAuth(phoneNumber) {

    try {
      await axios.post("/api/auth/send-verification-code", {
        phoneNumber
      });
      return true;
    } catch (error) {
      console.error("Error sending verification code:", error);
      throw new Error("Error sending verification code");
    }
  }


