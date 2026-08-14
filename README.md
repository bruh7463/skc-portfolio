# Simon Chanda — Portfolio

A modern, dark-themed, glassmorphism developer portfolio built with **plain HTML, CSS
and vanilla JavaScript** — no framework, no bundler, no build step. Open it and it works.

**Live demo:** deploy to GitHub Pages (see below) — no build required.

## ✨ Features

- Single-page app with instant, JS-driven section switching (Home, About, Experience,
  Projects, Skills, Contact) — no page reloads
- Fixed glassmorphism **sidebar** with icon nav, hover tooltip labels, and an active-state
  highlight
- **Letter-by-letter** animated headings
- 3D **flip card** for the featured project
- Interactive **skills word cloud** (TagCloud via CDN)
- Working **contact form** wired to **EmailJS** (no backend)
- Custom lightweight **toast notifications** in vanilla JS
- Fully **responsive** — the sidebar collapses to a bottom nav bar on mobile
- Dark theme with a single electric-orange accent and custom properties for easy theming

## 📁 Project Structure

```
skc-portfolio/
├── index.html            # All sections + sidebar (single page)
├── styles/
│   └── main.css          # Theme variables, glassmorphism, animations, responsive
├── scripts/
│   ├── main.js           # Section switching, animated headings, active nav, flip cards
│   ├── wordcloud.js      # TagCloud word cloud (built on demand)
│   └── contact.js        # EmailJS contact form + custom toasts
├── assets/
│   ├── logo.svg          # Sidebar logo (replace with your own if you like)
│   └── favicon.svg       # Browser favicon
└── README.md
```

## 🖥️ Preview Locally

No build step needed. Pick one:

**Option A — VS Code Live Server**
1. Open this folder in VS Code.
2. Install the **Live Server** extension.
3. Right-click `index.html` → **Open with Live Server**.

**Option B — Python**
```bash
# from this folder
python -m http.server 8000
# then open http://localhost:8000
```

> Tip: for local development you need an internet connection, because the page loads
> Google Fonts, FontAwesome, TagCloud, and EmailJS from CDNs.

## ✉️ Setting Up the Contact Form (EmailJS)

1. Create a free account at [emailjs.com](https://www.emailjs.com).
2. Go to **Email Services** → **Add New Service** and connect your email provider
   (Gmail, Outlook, etc.). Note the **Service ID**.
3. Go to **Email Templates** → **Create New Template**. Give it an ID (**Template ID**)
   and include these variables in the message body / subject:
   - `{{name}}` (same as `{{from_name}}`)
   - `{{email}}` (same as `{{from_email}}`)
   - `{{subject}}` (same as `{{title}}`)
   - `{{message}}`
   - `{{time}}` (auto-filled sent timestamp)
   
   `contact.js` sends the params under both naming conventions, so you can use
   whichever placeholder names you like — but the spelling must match exactly.
   Use `{{name}}`, `{{email}}`, and `{{message}}` in your template so the
   sender details actually appear.
4. Go to **Account** → **General**. Copy the **Public Key**.
5. Open `scripts/contact.js` and replace the three placeholders near the top:

```js
var CONFIG = {
  serviceId: 'YOUR_SERVICE_ID',   // e.g. service_abcd1234
  templateId: 'YOUR_TEMPLATE_ID', // e.g. template_abcd1234
  publicKey: 'YOUR_PUBLIC_KEY'
};
```

That's it. The form is fully client-side — no backend or secrets stored in a server.

> Security note: EmailJS public keys are meant for client-side use and are rate-limited by
> EmailJS. Do not put private keys in this file.

> 🚨 **Why the email arrives "from me", not from the visitor:** EmailJS relays every
> message through your own connected mail account (Gmail/Outlook), so the **From** address
> will always be **your own** email — never the visitor's. That is a provider/EmailJS
> limitation and cannot be changed from code. To still know who wrote to you, show
> `{{name}}` and `{{email}}` in the template body. The form also sends EmailJS's special
> `reply_to` param, so when you press **Reply** the reply goes directly to the visitor.
> If you don't see the visitor's details at all, it's almost always a **spelling mismatch**
> between the placeholder in your template and the param name sent from `contact.js`.

## 🚀 Deploy to GitHub Pages

No build scripts needed — just push your files.

1. Create a **new repository** on GitHub (public or private).
2. Push this folder to it:
   ```bash
   git init
   git add .
   git commit -m "Add portfolio"
   git branch -M main
   git remote add origin https://github.com/your-username/your-repo.git
   git push -u origin main
   ```
3. In the repo, go to **Settings** → **Pages** (left sidebar).
4. Under **Build and deployment** → **Source**, choose **Deploy from a branch**.
5. Set the branch to `main` and the folder to **`/ (root)`** (this project's
   `index.html` sits at the root, so the root folder is correct).
6. Click **Save**. After a minute or two your site will be live at:
   `https://your-username.github.io/your-repo/`

> All asset paths in this project are **relative** (`styles/...`, `scripts/...`,
> `assets/...`), so it works from any Pages sub-path without extra configuration.

## 🖼️ Swapping in personal photos / branding

- **Logo:** replace `assets/logo.svg` with your own image (any format — just update the
  `src` in `index.html`).
- **Favicon:** replace `assets/favicon.svg` with your own, or keep it.
- **Profile photo:** there's no photo section yet; to add one, drop an image into
  `assets/` and reference it from a section. The sidebar logo is the current brand mark.

## 📇 Placeholders to update

- **LinkedIn URL:** replace `your-linkedin-username` in `index.html` (appears in the Home
  social links and Contact details).
- **EmailJS keys:** see the section above.

## 🎨 Theming

All colors are CSS custom properties at the top of `styles/main.css`. To change the accent
color, edit `--accent` (currently electric orange `#ff7a3d`):

```css
:root {
  --accent: #ff7a3d; /* try #00bfa5 (teal) or #f5c542 (gold) */
}
```

---

© Simon Chanda. Built with plain HTML, CSS & vanilla JS.
