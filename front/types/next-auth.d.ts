import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        accessToken?: string;
        user: {
            id: string;
            role: string;
            active: boolean;
        } & DefaultSession["user"];
    }
}