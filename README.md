# Playwright Automation Framework

## Overview

A production-style Playwright automation framework built with JavaScript to automate the **Practice Software Testing** application.

The project focuses on building a scalable, maintainable automation framework using industry best practices rather than creating isolated test scripts.

---

## Tech Stack

* Playwright
* JavaScript
* Node.js
* Git
* GitHub

---

## Framework Design

* Page Object Model (POM)
* Test Data Management
* Reusable Business Methods
* Clean Test Structure (Arrange → Act → Assert)

---

## Current Project Structure

playwright-automation-framework
│
├── data
│   └── users.js
│
├── pages
│   ├── HomePage.js
│   ├── LoginPage.js
│   └── MyAccountPage.js
│
├── tests
│   └── login.spec.js
│
├── docs
├── fixtures
├── helpers
├── utils
└── playwright.config.js
```

---

## Implemented Features

### Sprint 1 – Authentication Module

* User login with valid credentials
* User login with invalid credentials
* Home Page Object
* Login Page Object
* My Account Page Object
* Externalized user test data
* Shared test setup using `beforeEach()`
* Clean Page Object Model implementation

---

## Upcoming Features

* Invalid Login
* Product Search
* Product Filters
* Product Details
* Shopping Cart
* Checkout
* API Automation
* CI/CD with GitHub Actions
* Reporting
* Parallel Execution

---

## Project Status

🚧 In Progress

Current Sprint: **Sprint 1**
