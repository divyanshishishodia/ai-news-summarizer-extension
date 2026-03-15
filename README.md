# 🧠 AI News Summarizer Extension

A browser extension that automatically summarizes news articles into short, easy-to-read bullet points using AI.

The extension detects news articles on supported websites and displays a clean sidebar containing the AI-generated summary.

---

## 🚀 Features

- 🧠 AI-generated news summaries  
- 📑 Bullet point key highlights  
- 🌗 Light and dark mode toggle  
- 🪟 Resizable sidebar  
- ✨ Glass UI design  
- 🎯 Floating button to trigger summary  
- ⚡ Fast summarization using Gemini AI  

---

## 📸 Screenshots

### Light Mode
![Light Mode](screenshots/light.jpeg)

### Dark Mode
![Dark Mode](screenshots/dark.jpeg)

---

## 🖥️ How It Works

1. Open a news article on a supported website.
2. Click the 🧠 floating button on the page.
3. The extension extracts the article text.
4. The AI model generates a concise summary.
5. The summary appears in a sidebar with key bullet points.

---

## 🛠️ Tech Stack

- JavaScript  
- HTML / CSS  
- Browser Extension APIs  
- Gemini AI API  

---

## 📂 Project Structure

AI-News-Summarizer  
│  
├── manifest.json  
├── content.js  
├── screenshots  
│   ├── light-mode.png  
│   └── dark-mode.png  
└── README.md  

---

## ⚙️ Installation (Manual)

1. Download or clone this repository.
2. Open your browser and go to:

edge://extensions  

or

chrome://extensions  

3. Enable Developer Mode  
4. Click Load Unpacked  
5. Select the project folder  

The extension will now be installed.

---

## 🔑 API Key Setup

This project uses Gemini AI to generate summaries.

Replace the placeholder in content.js:

const API_KEY = "YOUR_GEMINI_API_KEY";

You can generate an API key from Google AI Studio.

---
