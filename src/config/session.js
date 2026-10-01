import session from "express-session"; import connectPgSimple from "connect-pg-simple";
const PgStore = connectPgSimple(session);
const production = process.env.NODE_ENV === "production";
export const cookieOptions = { httpOnly: true, secure: production, sameSite: production ? "none" : "lax", maxAge: 1000 * 60 * 60 * 8 };
export const sessionMiddleware = session({ store: new PgStore({ conString: process.env.DATABASE_URL, createTableIfMissing: true }), name: "institute.sid", secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false, rolling: true, cookie: cookieOptions });
