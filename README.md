# SauceDemo Playwright Automation

Automated end-to-end tests for the **SauceDemo** website using **Playwright** and **JavaScript.**

This project contains automated UI tests covering login, product navigation, cart, checkout and other flows on https://www.saucedemo.com/ using Playwright. It follows a clean test structure and can be run locally or in CI/CD pipelines.

---

## 🧠 Technology Stack

- **Playwright** — Browser automation & testing framework  
- **JavaScript** — Test language  
- **npm** — Dependency management  
- **Playwright Config** — Config file for test settings & browser options

---

## 📁 Project Structure

├── tests/ # Playwright test files
│ ├── utils/ # Herlper Files
│ ├── Login/ Verify Logijn Functionality
│ ├── inventory/ Verify Inventory page
│ 	├── Side Menu/ Verify Inventory page Sidemenu
│
├── test-results
├── playwright.config.js # Playwright configuration
├── package.json # npm project file
├── .gitignore
└── README.md # This documentation


---

## 🚀 Getting Started

### 1. Clone the repository

git clone https://github.com/talhamit/saucedemo-playwright.git
cd saucedemo-playwright

2. Install dependencies

npm install

3. Install Playwright browsers

npx playwright install

▶️ Running Tests

Run all tests
npx playwright test


Open Playwright interactive UI
npx playwright test --ui


Run with HTML Reporter
npx playwright test --reporter=html


Workflow / GitHub Actions (Optional)

You can add CI via .github/workflows/playwright.yml so tests run automatically on push/PR.

image: mcr.microsoft.com/playwright:v1.42.1-jammy

stages:
  - test

playwright_tests:
  stage: test
  script:
    - npm install
    - npx playwright install --with-deps
    - npx playwright test
  artifacts:
    when: always
    paths:
      - playwright-report/



📣 Contributing

This is a learning & growing project. All contributions, ideas, or improvements are welcome! Please open an issue or pull request.
