import axios from "axios";

const bouncerApiKey = import.meta.env.VITE_BOUNCER_API_KEY;

export const verificarEmail = async (email) => {
  try {
    const res = await axios.get(
      `https://api.usebouncer.com/v1.1/email/verify?email=${email}&timeout=10`,
      {
        headers: {
          "x-api-key": bouncerApiKey,
        },
      }
    );
    return res.data.status === "deliverable";
  } catch (error) {
    console.log(error);
  }
};
