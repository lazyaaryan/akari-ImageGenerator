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

## ✨ Planned Features

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

### Bonus Features (Planned)
- **Debounced Search** — 300ms debounce on search input
- **Pagination** — Gallery displays 6 items per page with page navigation

---

## 🛠 Technologies

| Technology | Purpose |
|---|---|
| HTML5 | Semantic page structure |
| CSS3 | Styling, CSS custom properties for theming, responsive grid layout, animations |
| Vanilla JavaScript | Application logic, DOM manipulation, event handling |
| Fetch API | HTTP requests to Hugging Face Inference API |
| localStorage | Persistent storage for gallery images and theme preference |

---

## 📁 Project Structure (Planned)

```
├── index.html          # Main HTML page
├── style.css           # Styles with CSS variables for light/dark theming
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
   git clone https://github.com/lazyaaryan/skills-copilot-codespaces-vscode.git
   cd skills-copilot-codespaces-vscode
   ```
2. Open `js/api.js` and add your Hugging Face API token
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

- All search, filter, and sort operations will use **Array Higher-Order Functions** (`map`, `filter`, `sort`, `slice`, `reduce`) — no `for` or `while` loops
- Code will be organized into **separate modules** by concern (API, storage, theme, filters, UI)
- CSS will use **CSS custom properties (variables)** for seamless light/dark theming
- The app will handle **API errors gracefully** with user-friendly toast messages

---

## 📅 Timeline

| Milestone | Description | Deadline |
|---|---|---|
| Milestone 1 | Project setup, README, idea planning | March 23 |
| Milestone 2 | API integration, display data, responsive design | April 1 |
| Milestone 3 | Search, filter, sort, dark mode, interactions | April 8 |
| Milestone 4 | Documentation, cleanup, deployment | April 10 |

---

## 📄 License

This project is for educational purposes.
