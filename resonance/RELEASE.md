# Releasing Resonance (Android)

The web build happens on this machine; the `.aab` (Android App Bundle) must be
built on a machine with **JDK 17** + the **Android SDK**. Easiest is Android
Studio, which bundles both.

---

## One-time setup

### 1. Install the toolchain

- **Android Studio** — https://developer.android.com/studio (bundles JDK + SDK).
  On first run let it install the SDK + build-tools.
- Or, without Android Studio: JDK 17 (`winget install Microsoft.OpenJDK.17`) +
  Android command-line tools, with `ANDROID_HOME` set and
  `android/local.properties` containing `sdk.dir=C:\\path\\to\\Android\\Sdk`.

### 2. Create the upload keystore (once, ever)

From the `android/` folder:

```bash
keytool -genkey -v \
  -keystore resonance-release.jks \
  -alias resonance \
  -keyalg RSA -keysize 2048 -validity 10000
```

It asks for a keystore password, a key password, and your name/org. Keep it
simple but write everything down.

> **Back up `android/resonance-release.jks` and both passwords** to somewhere
> safe and offline. With Play App Signing enabled (recommended, and the default
> for new apps) a lost upload key can be reset by Google support — but don't
> rely on that. `keystore.properties` and `*.jks` are git-ignored on purpose.

### 3. Point the build at the keystore

```bash
cp android/keystore.properties.example android/keystore.properties
```

Edit `android/keystore.properties` with the real values:

```
storeFile=resonance-release.jks
storePassword=<the keystore password>
keyAlias=resonance
keyPassword=<the key password>
```

`build.gradle` only signs when this file exists, so debug/CI builds are unaffected.

---

## Every release

### 1. Bump the version

`android/app/build.gradle` → `defaultConfig`:

```
versionCode 2        // integer, +1 every upload to Play
versionName "1.0.1"  // human-facing string
```

### 2. Build the web bundle + sync

```bash
cd resonance
npm run mobile:sync      # tsc + vite build + cap sync android
```

*(For a Pro-features-unlocked review build instead: `npm run review:sync`.)*

### 3. Build the AAB

**Android Studio** — `npx cap open android`, wait for Gradle sync, then:

- **Build → Generate Signed App Bundle / APK → Android App Bundle**, pick the
  keystore, choose the `release` variant, Finish.
- Output: `android/app/release/app-release.aab`

**Command line** (keystore.properties must be filled in):

```bash
cd android
./gradlew bundleRelease
```

- Output: `android/app/build/outputs/bundle/release/app-release.aab`

### 4. Upload

Play Console → the target track (start with **Internal testing**) → Create
release → upload the `.aab`.

---

## Pre-submission checklist

- [ ] `versionCode` incremented
- [ ] Privacy policy URL live and pasted into the Play listing
      (`docs/index.html` → GitHub Pages; see `src/lib/links.ts`)
- [ ] Data safety form filled (email, birth data, location, purchase status —
      collected, not shared, deletable; no ads/analytics)
- [ ] Permissions declaration form: justify `SCHEDULE_EXACT_ALARM`
      ("time-specific astrological reminders the user schedules")
- [ ] RevenueCat: `VITE_REVENUECAT_ANDROID_KEY` set, Play products active,
      entitlement `pro` + a current offering with monthly/annual packages
- [ ] `delete-account` Supabase Edge Function deployed (Play requires in-app
      account deletion)
- [ ] Store listing: 512×512 icon (`store-assets/icon-512.png`), screenshots,
      short + full description
- [ ] Built from `npm run mobile:sync`, **not** `review:sync`
