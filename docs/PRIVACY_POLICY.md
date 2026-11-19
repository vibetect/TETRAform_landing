# Privacy Policy for TETRAform

**Last updated:** November 19, 2026
**Source of truth.** The live page is `privacy.html` (https://tetraform.app/privacy). Keep this file, `privacy.html` and `TETRAform_local/docs/PRIVACY_POLICY.md` identical in substance.

## Data flow map (for maintainers)

| Data | Where it lives | Leaves device? | Code |
|---|---|---|---|
| Profiles, custom fields, groups | `chrome.storage.local` | Never | `src/lib/storage.ts` |
| Settings, denied domains, domain profiles | `chrome.storage.local` | Never | `src/lib/storage.ts` |
| Daily fill counter | `chrome.storage.local` | Never | `src/lib/storage.ts` |
| Feedback (type, message, optional email, version, tier, user agent, platform, language) | Firestore `feedback_submissions` (create-only rules) + email via Cloudflare Worker | Only when the user presses Send | `src/components/ContactForm.tsx`, `src/lib/firebase.ts`, `src/background.ts`, `cloudflare/tetraform-feedback-worker.js` |
| IP address | Cloudflare rate limiter (transient, not stored by us) | With feedback request | Worker |
| Website visits | Google Analytics (tetraform.app only), loaded only after the visitor accepts analytics in the CookieConsent banner | Website only, after consent | `index.html`, `privacy.html`, `shared.js` (`initCookieConsent`) |

Not used: accounts/sign-in (`AuthScreen.tsx` is not mounted), extension analytics, ads, remote code.
**Any change to this table needs a policy update and a Web Store privacy-tab review** (`TETRAform_local/docs/CHROME_STORE_ANSWERS.md`).

---

TETRAform ("we", "our", "us") is a Chrome extension that fills web forms from profiles you save. This policy explains what data the extension handles, where it goes, and the choices you have.

**The short version**
- Your profiles, fields and settings are stored **only on your device**. We cannot see them.
- There is **no account**, no tracking and no analytics inside the extension.
- Data leaves your device only when **you send the optional feedback form**. Details are in section 3.
- We never sell your data or use it for advertising.

## 1. Data stored on your device
Saved with `chrome.storage.local`, never sent to us or anyone else:
- **Profiles**: name, email, phone, address, work history and any custom fields you create.
- **Settings**: active profile, domain-specific profiles, sites where TETRAform is off, display preferences.
- **Daily fill counter**: a number used for the Free plan limit.

JSON backups are saved where you choose. We never receive them.

## 2. What we never collect
- Passwords, card numbers, CVV codes, CAPTCHA answers and one-time codes (blocked, never saved).
- Browsing history or the pages you visit.
- The contents of forms you fill (pages are read on-device only).
- Usage analytics, advertising IDs or tracking cookies inside the extension.

## 3. The optional feedback form
The only feature that sends data off your device, and only when you press Send.

| Data | Why |
|---|---|
| Feedback type and message | To read and act on your feedback |
| Email address (optional) | Only to reply to you |
| Extension version and plan | To reproduce and fix bugs |
| Browser user agent, platform, language | To reproduce and fix bugs |
| Time of submission | To answer requests in order |

Saved profiles are never included. Processors (HTTPS):
- **Google Firebase (Cloud Firestore)**: stores the submission in a private database.
- **Cloudflare (Workers and Email)**: forwards a copy to our inbox; briefly processes your IP address to block spam; we do not store it.
- **Our email provider**: holds the forwarded copy.

Kept only as long as needed to respond and improve TETRAform.

**How to delete your feedback**
1. Email contact@tetraform.app with the subject **"Delete my feedback"**.
2. Send it from the email address entered in the feedback form; that address is how we find the submissions.
3. We delete them from Firestore and the inbox, and confirm by reply.

The email field is optional. Feedback sent without an email can't be matched to the requester, so it can't be found to delete. (The extension's feedback form shows this note under the email field.)

## 4. Permissions
- `storage`: save profiles and settings on your device.
- `activeTab` and `scripting`: fill the form on the current page when you ask.
- `<all_urls>`: check pages for form fields to show the Assistant Bar, on-device. We do not record sites you visit.

## 5. Sharing and Limited Use
No selling, renting or transfer, except the processors in section 3. No advertising, credit decisions or unrelated uses. TETRAform's use of user data complies with the Chrome Web Store User Data Policy, including the Limited Use requirements.

## 6. Your choices
- Delete profiles in settings, or remove the extension to erase all local data.
- Send feedback without an email, or not at all.
- Access or delete feedback: follow the steps in section 3.

## 7. This website
tetraform.app is hosted on GitHub Pages. It uses Google Analytics to count visits **only if you accept analytics cookies** in the cookie banner; until then the script doesn't load and nothing is sent to Google. When allowed, GA sets cookies and receives standard browser info such as IP address. Change your choice any time with "Cookie settings" in the footer; rejecting removes the analytics cookies. Not used in the extension; never linked to profiles.

## 8. Security
- Local data sits in Chrome's extension storage, separate from websites.
- Feedback is sent over HTTPS; Firestore rules block all client reads.

## 9. Changes
We update this page and its date before any data-handling change ships. Features that would send profile data off-device (e.g. planned Pro cloud sync) will be opt-in and described here first.

## 10. Contact
contact@tetraform.app, or the feedback form in the extension settings.
