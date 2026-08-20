# Playwright Automation Framework

## Overview

A production-style Playwright automation framework built with JavaScript to automate the **Practice Software Testing** application.

The project focuses on building a scalable, maintainable automation framework using industry best practices rather than creating isolated test scripts.

---

## Tech Stack

- Playwright Test
- JavaScript
- Node.js
- Git
- GitHub
- GitHub Actions

---

## Framework Design

- Page Object Model (POM)
- Custom Playwright Fixtures
- Fixture Dependencies
- Test Data Management
- Dynamic Test Data Generation
- Reusable Business Methods
- Arrange → Act → Assert
- Web-first Assertions
- Condition-based Synchronization
- Test Isolation
- `test.step()` Business-flow Reporting

---

## Current Project Structure

playwright-automation-framework

├── data/
│   └── users.js
│
├── pages/
│   ├── HomePage.js
│   ├── RegisterPage.js
│   ├── LoginPage.js
│   ├── MyAccountPage.js
│   ├── ProductDetailsPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
│
├── fixtures/
│   └── base.fixture.js
│
├── tests/
│   ├── login.spec.js
│   └── products.spec.js
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── utils/
├── helpers/
├── docs/
├── package.json
└── playwright.config.js

---

## Implemented Features

### Authentication

- User registration
- User login with valid credentials
- User login with invalid credentials
- Home Page Object
- Register Page Object
- Login Page Object
- My Account Page Object
- Externalized test data
- Dynamic test-user generation
- Shared Playwright fixtures
- Fixture dependencies
- Test isolation
- Arrange → Act → Assert structure
- `test.step()` business-flow reporting
- Web-first assertions
- Condition-based synchronization

### Product / Shopping Flows

- Product details
- Product quantity
- Add to cart
- Cart quantity verification
- Shopping cart
- Checkout
- Payment method selection

### CI/CD

Initial GitHub Actions pipeline implemented.

Current workflow:

- Runs on pushes to `main`
- Runs on pull requests targeting `main`
- Uses an Ubuntu runner
- Sets up Node.js 20
- Installs dependencies using `npm ci`
- Uses npm dependency caching
- Installs Playwright Chromium with required dependencies
- Executes the Playwright test suite

---

## Upcoming Features

- Advanced locator strategies
- Advanced fixtures
- Authentication state management
- API automation with Playwright
- API + UI integration
- Network interception and mocking
- Advanced reporting
- CI test reports and artifacts
- Screenshots, traces, and videos in CI
- Cross-browser CI execution
- Parallel execution
- Environment-specific configuration
- Environment variables and secrets
- Scheduled test execution
- Flaky-test management
- CI failure investigation and optimization

---

## Project Status

🚧 In Progress

Current Sprint: **Sprint 1 — Framework Foundation & Authentication**

The project is progressively being expanded from UI automation into a complete automation engineering framework covering API automation, framework architecture, Git/GitHub, CI/CD, reporting, and real-world automation practices.

---

## Automation Framework Architecture

This project uses Playwright Test with JavaScript and follows a layered automation framework design focused on maintainability, reusability, test isolation, and scalability.

### Structure

- `tests/` — Test scenarios and business-level validations
- `pages/` — Page Object classes containing UI locators and reusable actions
- `fixtures/` — Shared Playwright fixtures, dependencies, and test setup
- `data/` — Test data and dynamic test-data factories
- `utils/` — Reusable helper functions
- `playwright.config.js` — Playwright test configuration and browser projects
- `.github/workflows/` — GitHub Actions CI/CD workflows

### Execution Flow

Test
  ↓  
Custom Fixture
  ↓
Page Object
  ↓
Playwright Page
  ↓
Browser Context
  ↓
Browser

### Test Isolation

Tests should remain independently executable and should not rely on state created by another test. Test-scoped fixtures and Playwright's browser context isolation help maintain independent test execution.

### Current Browser Coverage

- Chromium
- Firefox
- WebKit

### Current Automation Coverage

- User Registration
- Valid Login
- Invalid Login
- Product Details
- Product Quantity
- Add to Cart
- Shopping Cart
- Checkout
- Payment Method Selection

---