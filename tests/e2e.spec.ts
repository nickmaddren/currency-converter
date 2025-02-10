import { test, expect, Page } from "@playwright/test";

const mockConvertRoute = async (page: Page, value: number) =>
  await page.route("*/**/v1/convert*", async (route) => {
    const json = {
      value,
    };
    await route.fulfill({ json });
  });

test("E2E Test", async ({ page }) => {
  await mockConvertRoute(page, 1.24);
  await page.goto("http://localhost:5173/");

  // Expect heading to be visible
  await expect(page.getByText(/nick's currency converter/i)).toBeVisible();

  // Expect default from and to currency conversion
  await expect(page.getByText(/1 pound sterling equals/i)).toBeVisible();
  await expect(page.getByText(/1.24 us dollar/i)).toBeVisible();

  // Changing the amount input should update update the to currency conversion
  await mockConvertRoute(page, 12.4);
  page.getByLabel("amount").fill("10");

  await expect(page.getByText(/10 pound sterling equals/i)).toBeVisible();
  await expect(page.getByText(/12.40 us dollar/i)).toBeVisible();

  // Changing both currency selectors should update the from and to currency conversion
  await mockConvertRoute(page, 8.33);

  const fromSelect = page.getByLabel("From", {
    exact: true,
  });
  fromSelect.selectOption("EUR");
  const toSelect = page.getByLabel("To", { exact: true });
  toSelect.selectOption("GBP");

  await expect(page.getByText(/10 euro equals/i)).toBeVisible();
  await expect(page.getByText(/8.33 pound sterling/i)).toBeVisible();
});
