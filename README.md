# 💌 Valentine's Love Letter App

A beautiful, animated Valentine's Day love letter web app built with React + Vite.

## Features

- 🤖 **Fun "Captcha" Verification** — "Select the most beautiful girl" (with your photos!)
- 💌 **Animated Love Letter** — A beautifully styled letter that reveals paragraph by paragraph
- 💕 **"Will You Be My Valentine?"** — Interactive question where the "No" button runs away!
- 🎉 **Celebration Page** — Confetti explosion + photo memories carousel
- ❤️ **Floating Hearts** — Ambient animated hearts throughout the app
- 📱 **Fully Responsive** — Looks great on mobile and desktop

## Quick Start

```bash
npm install
npm run dev
```

## How to Customize

### 1. Add Captcha Photos
Place 6 images in `/public/captcha/`:
- `girl1.jpg` through `girl6.jpg`
- Edit `src/components/Captcha.jsx` to set which image is the "correct" one (default: `girl3.jpg`)

### 2. Write Your Love Letter
Edit the letter text in `src/components/LoveLetter.jsx`:
- Change the greeting, paragraphs, closing, and signature

### 3. Add Memory Photos
Place photos in `/public/memories/`:
- `photo1.jpg` through `photo4.jpg`
- Edit captions in `src/components/Celebration.jsx`

### 4. Customize Messages
- Valentine question messages: `src/components/ValentineQuestion.jsx`
- Celebration message: `src/components/Celebration.jsx`

## Deploy on Render

1. Push this repo to GitHub
2. Go to [render.com](https://render.com) → New → **Static Site**
3. Connect your GitHub repo
4. Settings:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
5. Click **Deploy** 🚀

That's it! Render will auto-deploy on every push.

## Tech Stack

- React 18
- Vite 5
- Pure CSS animations (no extra dependencies!)

---

Made with 💖
