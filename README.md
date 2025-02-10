# Nick's Currency Converter App

## Overview

Hello, thanks for checking out my **Currency Converter** web application built using **TypeScript and React**.

## Tech Stack

- **Frontend:** TypeScript, React, TanStack Query React
- **API:** [CurrencyBeacon](https://currencybeacon.com/)
- **Styling:** Tailwind and Daisy UI
- **Tooling:** [Vite](https://vite.dev/)
- **Testing:** [Playwright](https://playwright.dev/)

## Installation & Setup

1. **Clone the repository**

```bash
 git clone https://github.com/nickmaddren/currency-converter.git
```

2. **Navigate to the project folder**

```bash
cd currency-converter
```

3. **Install dependencies**

```bash
npm install
```

4. **Add your CurrencyBeacon API key**

Sign-up at the [CurrencyBeacon](https://currencybeacon.com/) website to get your own API key.

Create a `env.local` file and add your API key like so: `VITE_CURRENCY_BEACON_API_KEY=***********`

5. **Start the development server**

```bash
npm run dev
```

The app should now be running on `http://localhost:5173/` (default Vite port and spells "site" 🤓).

## Testing

To run the Playwright E2E tests you can use the following command:

```bash
npx playwright test
```

Want to learn more about Playwright? You can do that [here](https://playwright.dev/).

## TO-DOs

- **Test edge cases:** The E2E test covers the critical flow, however, it would be beneficial to create some component tests that cover edge cases (error states etc.).
- **CurrencyBeacon client:** A reusable client function for the CurrencyBeacon API would be nice to have.
- **Styling:** I used Daisy UI V5 and native inputs for the sake of simplicity. We could definitely improve the UX with extra styling and maybe a few Shadcn components. Note: I used the Daisy UI V5 beta for this project as the setup is easier to follow and the release is a few days away.
