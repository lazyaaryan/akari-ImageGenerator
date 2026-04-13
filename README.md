# 🎨 Akari — Image Generator

## 📌 Project Description

**Akari - Image Generator** is a web application that allows users to generate stunning AI-powered images from text prompts. Users type a description of what they want to see, select an art style, and the app generates a unique image using AI. All generated images are saved in a personal gallery where users can search, filter, sort, and organize their creations.

This project demonstrates API integration, dynamic DOM manipulation, and the use of JavaScript Array Higher-Order Functions for data operations.

---

## 🌐 API Used

**Pollinations.ai**
- **Endpoint**: `https://image.pollinations.ai/prompt/{prompt}`
- **Method**: `GET` request with the text prompt encoded in the URL
- **Response**: Returns image data as JPEG
- **Authentication**: None required (free and open)
- **Documentation**: [Pollinations.ai](https://pollinations.ai)

---

## ✨ Features

### Core Features
1. **Text-to-Image Generation** — Enter a descriptive text prompt and generate AI art
2. **Art Style Selection** — Choose from 6 art styles: Realistic, Anime, Cartoon, Oil Painting, Cyberpunk, Watercolor
3. **Loading Indicator** — Visual spinner overlay while the API processes the request
4. **Image Gallery** — All generated images are saved and displayed in a gallery grid
5. **Search** — Search gallery images by prompt keywords (using `Array.filter()`)
6. **Style Filter** — Filter gallery by art style (using `Array.filter()`)
7. **Sort** — Sort images by date (newest/oldest) or alphabetically (using `Array.sort()`)
8. **Like / Favorite** — Mark images as favorites and view only liked items (using `Array.filter()`)
9. **Dark / Light Mode** — Theme toggle with preference saved to localStorage
10. **Download** — Download any generated image as a PNG file
11. **Responsive Design** — Fully responsive across mobile, tablet, and desktop

### Bonus Features
- **Debounced Search** — 300ms debounce on search input to avoid excessive re-renders
- **Pagination** — Gallery displays 6 items per page with page navigation
- **Toast Notifications** — User-friendly feedback messages for all actions
- **Local Storage** — Gallery images and theme preference persist across sessions

---

## 🛠 Technologies

| Technology | Purpose |
|---|---|
| HTML5 | Semantic page structure |
| CSS3 | Styling, dark mode with `[data-theme]` selectors, responsive grid layout |
| Vanilla JavaScript | Application logic, DOM manipulation, event handling |
| Fetch API | HTTP requests to Pollinations.ai for image generation |
| Vercel Serverless Functions | API proxy route (`/api/generate`) |
| localStorage | Persistent storage for gallery images and theme preference |
| Google Fonts (Inter) | Typography |

---

## 📁 Project Structure

```
├── index.html          # Main HTML page with all sections
├── style.css           # Styles with light/dark theming, responsive breakpoints
├── api/
│   └── generate.js     # Vercel serverless function (proxies to Pollinations.ai)
├── js/
│   ├── api.js          # Client-side API calls to /api/generate
│   ├── storage.js      # localStorage helpers for gallery and preferences
│   ├── theme.js        # Dark/Light mode toggle logic
│   ├── filters.js      # Search, filter, sort, pagination using Array HOFs
│   └── app.js          # Main UI rendering and event handling
└── README.md           # Project documentation
```

---

## ⚙️ How to Set Up and Run

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, Safari)
- Node.js installed

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/lazyaaryan/akari-ImageGenerator.git
   cd akari-ImageGenerator
   ```
2. Install and run with Vercel CLI:
   ```bash
   npx vercel dev
   ```
3. Visit `http://localhost:3000` in your browser

---

## 📊 Gallery Item Data Structure

Each image in the gallery is stored as an object:
```js
{
  id: "unique-id",
  prompt: "user prompt",
  style: "Anime",
  imageUrl: "data:...",
  date: "2026-03-24...",
  liked: false
}
```

---

## 📝 Key Implementation Notes

### Array Higher-Order Functions Used
- **`Array.filter()`** — Used for search (by prompt text), filtering by style, and filtering favorites
- **`Array.sort()`** — Used for sorting by date (newest/oldest) and alphabetically (A-Z, Z-A)
- **`Array.map()`** — Used for rendering gallery cards and toggling liked status
- **`Array.slice()`** — Used for pagination (selecting items for current page)
- **`Array.from()`** — Used for generating page number buttons

### Code Organization
- Code is organized into **separate modules** by concern (API, storage, theme, filters, UI)
- No `for` or `while` loops used — all data operations use Array HOFs
- The app handles **API errors gracefully** with user-friendly toast messages
- **Event delegation** used for gallery card interactions (like, download, delete)
- **Debounce** implemented for search input to optimize performance

---

## 🚀 Deployment

Deployed on Vercel:
- **Live URL**: [https://akari-image-generator.vercel.app](https://akari-image-generator.vercel.app)

---

## 📄 License

This project is for educational purposes.

