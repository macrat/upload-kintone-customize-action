import fs from "node:fs";
import path from "node:path";
import os from "node:os";

import { run, type CustomizeManifest } from "@kintone/customize-uploader/dist/commands";
import * as core from "@actions/core";

function getManifest(): CustomizeManifest {
  return {
    app: core.getInput("app-id", { required: true }),
    scope: (core.getInput("scope", { required: false }) as "ALL" | "ADMIN" | "NONE") || "ALL",
    desktop: {
      js: core.getMultilineInput("desktop-js", { required: false }),
      css: core.getMultilineInput("desktop-css", { required: false }),
    },
    mobile: {
      js: core.getMultilineInput("mobile-js", { required: false }),
      css: core.getMultilineInput("mobile-css", { required: false }),
    },
  };
}

async function main() {
  const baseUrl = core.getInput("base-url", { required: true });
  const guestSpaceId = core.getInput("guest-space-id", { required: false });
  const username = core.getInput("username", { required: false });
  const password = core.getInput("password", { required: false });
  const oauthToken = core.getInput("oauth-token", { required: false });
  const basicAuthUsername = core.getInput("basic-auth-username", { required: false });
  const basicAuthPassword = core.getInput("basic-auth-password", { required: false });
  const manifest = getManifest();

  if ((!username || !password) && !oauthToken) {
    core.setFailed("Either username/password or oauthToken must be provided.");
    return;
  }

  if (manifest.desktop.js.length + manifest.desktop.css.length + manifest.mobile.js.length + manifest.mobile.css.length === 0) {
    core.setFailed("At least one of desktopJs, desktopCss, mobileJs, or mobileCss must be provided.");
    return;
  }

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "kintone-manifest-"));
  const manifestPath = path.join(tempDir, "/manifest.json");

  try {
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

    await run({
      baseUrl,
      username: username || null,
      password: password || null,
      oAuthToken: oauthToken || null,
      basicAuthUsername: basicAuthUsername || null,
      basicAuthPassword: basicAuthPassword || null,
      manifestFile: manifestPath,
      options: {
        lang: "en",
        proxy: process.env.HTTPS_PROXY || process.env.HTTP_PROXY || "",
        guestSpaceId: guestSpaceId ? Number(guestSpaceId) : 0,
      },
    })
  } catch (error) {
    if (error instanceof Error || typeof error === "string") {
      core.setFailed(error);
    } else {
      core.setFailed(`An unknown error occurred.\n${JSON.stringify(error)}`);
    }
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

main();
