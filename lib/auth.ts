import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { phoneNumber } from "better-auth/plugins";
import { db } from "./db";

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: { enabled: true },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  plugins: [
    phoneNumber({
      // Ekhon SMS jachche na, OTP terminal e print hobe. Porer step e SMS gateway boshabo.
      sendOTP: async ({ phoneNumber, code }) => {
        console.log(`[DEV] OTP for ${phoneNumber}: ${code}`);
      },
    }),
    nextCookies(), // sobar last e thakte hobe
  ],
});