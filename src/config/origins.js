export const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map(origin => origin.trim().replace(/\/$/, ""))
  .filter(Boolean);

export function isAllowedOrigin(origin) {
  return !origin || allowedOrigins.includes(origin.replace(/\/$/, ""));
}
