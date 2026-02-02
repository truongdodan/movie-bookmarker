import { getServerSession } from "next-auth";
import { authOptions } from "./api/routers/auth";

export function getServerAuthSession() {
    return getServerSession(authOptions);
}