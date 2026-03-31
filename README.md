# 🎨 Akari — Image Generator

## 📌 Project Description

**Akari - Image Generator** is a web application that allows users to generate stunning AI-powered images from text prompts. Users type a description of what they want to see, select an art style, and the app generates a unique image using AI. All generated images are saved in a personal gallery where users can search, filter, sort, and organize their creations.

This project demonstrates API integration, dynamic DOM manipulation, and the use of JavaScript Array Higher-Order Functions for data operations.

---

## 🌐 API Used

**Hugging Face Inference API**
- **Model**: `stabilityai/stable-diffusion-xl-base-1.0` (Stable Diffusion XL)
- **Endpoint**: `https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0`
- **Method**: `POST` request with JSON body containing the text prompt
- **Response**: Returns image data as a binary blob (PNG)
- **Authentication**: Requires a free API token (Bearer token in Authorization header)
- **Documentation**: [Hugging Face Inference API Docs](https://huggingface.co/docs/api-inference)

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
| Fetch API | HTTP requests to Hugging Face Inference API |
| localStorage | Persistent storage for gallery images and theme preference |
| Google Fonts (Inter) | Typography |

---

## 📁 Project Structure

```
├── index.html          # Main HTML page with all sections
├── style.css           # Styles with light/dark theming, responsive breakpoints
├── js/
│   ├── api.js          # API integration (fetch calls to Hugging Face)
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
- A free Hugging Face account and API token ([Get one here](https://huggingface.co/settings/tokens))

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/lazyaaryan/akari-ImageGenerator.git
   cd akari-ImageGenerator
   ```
2. Open `js/api.js` and replace the API token with your own Hugging Face token
3. Open `index.html` in a browser, or start a local server:
   ```bash
   python3 -m http.server 8080
   ```
4. Visit `http://localhost:8080` in your browser

---

## 📊 Gallery Item Data Structure

Each image in the gallery is stored as an object:
```js
{
  id: "unique-id",        // Unique identifier
  prompt: "user prompt",  // The text prompt used to generate the image
  style: "Anime",         // The selected art style
  imageUrl: "data:...",   // Base64 image data
  date: "2026-03-24...",  // ISO date string
  liked: false            // Whether the user has liked/favorited this image
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

The project is deployed using GitHub Pages:
- **Live URL**: [https://lazyaaryan.github.io/akari-ImageGenerator/](https://lazyaaryan.github.io/akari-ImageGenerator/)

---

## 📄 License

This project is for educational purposes.
