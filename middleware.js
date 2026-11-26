// Password gate for the whole site. Runs on Vercel before any file is served,
// so nothing (including data.js) is reachable without logging in.
// The password is the SITE_PASSWORD environment variable in the Vercel project.
// Changing it logs everyone out.
import { next } from "@vercel/functions";

export const config = { matcher: "/:path*" };

const COOKIE = "aoc_auth";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

async function token(pw) {
  const data = new TextEncoder().encode(pw + ":account-org-charts:v1");
  const hash = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(hash)].map(b => b.toString(16).padStart(2, "0")).join("");
}

function safeEqual(a, b) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

function getCookie(req, name) {
  const m = (req.headers.get("cookie") || "").match(new RegExp("(?:^|;\\s*)" + name + "=([^;]+)"));
  return m ? m[1] : "";
}

const loginPage = (error = "") => new Response(`<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow"><title>Sign in · Account Org Charts</title>
<style>
  body{margin:0;min-height:100vh;display:grid;place-items:center;background:#101828;font:15px/1.4 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:#1c2330}
  form{background:#fff;padding:28px 28px 24px;border-radius:12px;width:min(360px,90vw);box-shadow:0 20px 60px #0006}
  h1{font-size:18px;margin:0 0 4px}p{margin:0 0 18px;color:#667085;font-size:13px}
  input{width:100%;box-sizing:border-box;font:inherit;padding:10px 12px;border:1px solid #d0d5dd;border-radius:8px;margin-bottom:12px}
  button{width:100%;font:inherit;font-weight:600;padding:10px;border:0;border-radius:8px;background:#2457d6;color:#fff;cursor:pointer}
  .err{color:#b42318;font-size:13px;margin:-4px 0 12px}
</style></head><body>
<form method="POST" action="/login">
  <h1>Account Org Charts</h1><p>Private – enter the password to continue.</p>
  <input type="password" name="password" placeholder="Password" autofocus required autocomplete="current-password">
  ${error ? `<div class="err">${error}</div>` : ""}
  <button type="submit">Sign in</button>
</form></body></html>`, {
  status: error ? 401 : 200,
  headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", "x-robots-tag": "noindex, nofollow" },
});

export default async function middleware(req) {
  const password = process.env.SITE_PASSWORD;
  if (!password) return new Response("Site locked: SITE_PASSWORD is not configured.", { status: 503 });

  const url = new URL(req.url);
  const expected = await token(password);

  if (url.pathname === "/logout") {
    return new Response(null, { status: 302, headers: { location: "/login", "set-cookie": `${COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax` } });
  }

  if (url.pathname === "/login") {
    if (req.method === "POST") {
      const form = await req.formData().catch(() => null);
      const given = String(form?.get("password") || "");
      if (given && safeEqual(await token(given), expected)) {
        return new Response(null, { status: 303, headers: { location: "/", "set-cookie": `${COOKIE}=${expected}; Path=/; Max-Age=${MAX_AGE}; HttpOnly; Secure; SameSite=Lax` } });
      }
      await new Promise(r => setTimeout(r, 800)); // slow down guessing
      return loginPage("Incorrect password.");
    }
    return loginPage();
  }

  if (safeEqual(getCookie(req, COOKIE), expected)) return next();

  const wantsHtml = (req.headers.get("accept") || "").includes("text/html");
  return wantsHtml
    ? new Response(null, { status: 302, headers: { location: "/login", "cache-control": "no-store" } })
    : new Response("Unauthorized", { status: 401 });
}
