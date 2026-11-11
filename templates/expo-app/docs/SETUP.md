# Setting up {{Name}} on a PC

For a fresh PC or a fresh Claude Code session. The easiest way: open Claude Code in `C:\dev` and say
"clone jcarts31/{{slug}} and follow docs/SETUP.md". It will do these steps and tell you if anything
needs you.

## 1. Tools (check, don't assume)

| Tool | Check | If missing |
|---|---|---|
| Git | `git --version` | `winget install Git.Git` |
| GitHub CLI, signed in | `gh auth status` | `winget install GitHub.cli`, then `gh auth login` (you sign in in the browser) |
| Node (via nvm) | `node -v` (22 or newer) | `winget install CoreyButler.NVMforWindows`, then `nvm install lts` and `nvm use lts` (needs Windows Developer Mode on) |
| JDK 17 | `java -version` | `winget install Microsoft.OpenJDK.17`; set `JAVA_HOME` to it |
| Android SDK + adb | `adb version` | Install Android Studio once; set `ANDROID_HOME` to `%LOCALAPPDATA%\Android\Sdk` and add `platform-tools` to PATH |

Don't rewrite your user PATH when adding tools; it can break nvm's entries.

## 2. Get the project

```
git clone https://github.com/jcarts31/{{slug}}.git C:\dev\{{slug}}
cd C:\dev\{{slug}}
npm install
npx expo-doctor
npm test
```

## 3. Run it on the Pixel (local route)

1. Phone: Settings > System > Developer options > Wireless debugging: on.
2. `adb devices`. If the Pixel isn't listed: `adb mdns services`, then `adb connect <ip:port>`.
   Never paired with this PC? Android Studio > Device Manager > Pair devices using Wi-Fi > scan the QR code
   shown on the phone's Wireless debugging screen.
3. First time (and after native changes): `npm run android`. The first build takes 30–40 minutes.
4. Every other time: `adb reverse tcp:8081 tcp:8081`, then `npm start`, and open **{{Name}} (dev)** on the phone.

## 4. Run it on the PC

`npm run web` opens {{Name}} in the browser. (Installing it as its own app from Edge comes in milestone 1, task M1.4.)

## 5. The second PC

Same steps. The folder will be identical on both. Always `git pull` before you start and push before you stop.
