export const encryptSymmetric = async (textEncript, key) => {
  // create a random 96-bit initialization vector (IV)
  const iv = crypto.getRandomValues(new Uint8Array(12));

  // encode the text you want to encrypt
  const encodedTextEncript = new TextEncoder().encode(textEncript);

  try {
    // prepare the secret key for encryption
    const secretKey = await crypto.subtle.importKey(
      "raw",
      Buffer.from(key, "base64"),
      {
        name: "AES-GCM",
        length: 256,
      },
      true,
      ["encrypt", "decrypt"]
    );

    // encrypt the text with the secret key
    const ciphertext = await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv,
      },
      secretKey,
      encodedTextEncript
    );

    // return the encrypted text "ciphertext" and the IV
    // encoded in base64
    return {
      ciphertext: Buffer.from(ciphertext).toString("base64"),
      iv: Buffer.from(iv).toString("base64"),
    };
  } catch (error) {
    console.error("Error during encryption:", error);
    throw new Error("Encryption failed");
  }
};
