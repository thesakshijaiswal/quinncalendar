# 📆 QuinnCalendar: A truly Infinite Scrollable Calendar

QuinnCalendar is a responsive, mobile-optimized calendar app featuring infinite vertical scrolling, dynamic month headers, and integrated journal entries with a swipable card UI.

## ⭐️ Feature List

- Infinite Vertical Scrolling  
  Seamlessly scroll through past and future months without flicker or lag.

- Continuous Scrolling Experience  
  Allows partial overlap of months for smooth scrolling.

- Dynamic Month Header  
  Header updates based on the most visible month in the viewport.

- Responsive Calendar Grid  
  Proper week-aligned layout which adapts to all screen sizes: mobile, tablet, desktop.

- Journal Entry Display  
  Entries show on the correct date and include image, rating, categories, description, and date.

- Swipable Journal Card UI  
  Tap an entry to open a modal card view and swipe left/right to navigate between journal entries.

- Smooth Mobile Optimization  
  Touch-friendly interactions and fully responsive on mobile devices.

- High Performance  
  Efficient rendering to maintain performance during long scroll sessions.

## 🧰 Tech Stack

| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="48" height="48" alt="react"> | <img src="https://skillicons.dev/icons?i=javascript" width="48" height="48" alt="Javascript"> | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"  width="48" height="48" alt="tailwindcss" /> |<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" width="48" height="48" alt="vite">|<img src="https://camo.githubusercontent.com/04e1c9eeac89e2a758bbe60c01bf92332a45f7bac62c614aaed646f8fd58c19d/68747470733a2f2f70726574746965722e696f2f69636f6e2e706e67" width="48" height="48" alt="prettier"> |<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg" width="48" height="48" alt="eslint">|
|:---:|:---:|:---:|:---:|:---:|:---:|
| **React** | **Javascript** | **Tailwind CSS** | **Vite** | **Prettier** | EsLint |

| <img src="https://raw.githubusercontent.com/date-fns/date-fns/master/docs/logotype.svg" width="70" height="48" alt="date-fns"> |<img src="https://raw.githubusercontent.com/react-icons/react-icons/master/react-icons.svg" width="48" height="48"> |
|:---:|:---:|
| **Date-fns** | **React Icons** |

## ✨ Installation Steps

### 1. Clone the Repository

git clone https://github.com/thesakshijaiswal/quinncalendar.git
cd quinncalendar

### 2. Install Dependencies

npm install

### 3. Start Development Server

npm run dev

## 📁 Folder Structure

```

├── .gitignore
├── .prettierrc
├── LICENSE
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── public
    ├── logo.png
    ├── robots.txt
    └── sitemap.xml
├── src
    ├── App.jsx
    ├── components
    │   ├── CalendarMonth.jsx
    │   ├── CalenderDay.jsx
    │   ├── CarouselContainer.jsx
    │   ├── CarouselNavigation.jsx
    │   ├── Header.jsx
    │   ├── InfiniteCalendar.jsx
    │   ├── JournalCard.jsx
    │   ├── JournalCarousel.jsx
    │   └── StarRating.jsx
    ├── data
    │   └── journal.json
    ├── hooks
    │   ├── useCarouselLogic.js
    │   ├── useDragHandlers.js
    │   └── useInfiniteScroll.js
    ├── index.css
    ├── main.jsx
    └── utils
    │   └── dateUtils.js
└── vite.config.js

```

## 🛠 Developer

[![GitHub](https://img.shields.io/badge/GitHub-thesakshijaiswal-181717?style=for-the-badge&logo=github)](https://github.com/thesakshijaiswal)

## 📄 License

This project is licensed under the [MIT License](LICENSE).
