/**
 * Collection of default prompts for different use cases (ICE POT Format)
 */
export const DEFAULT_PROMPTS = {
 
  /**
   * Selenium Java Page Object Prompt (No Test Class)
   */
  SELENIUM_JAVA_PAGE_ONLY: `
    Instructions:
    - Generate ONLY a Selenium Java Page Object Class (no test code).
    - Add JavaDoc for methods & class.
    - Use Selenium 2.30+ compatible imports.
    - Use meaningful method names.
    - Do NOT include explanations or test code.

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`

    Example:
    \`\`\`java
    package com.testleaf.pages;

    /**
     * Page Object for Component Page
     */
    public class ComponentPage {
        // Add methods as per the DOM
    }
    \`\`\`

    Persona:
    - Audience: Automation engineer focusing on maintainable POM structure.

    Output Format:
    - A single Java class inside a \`\`\`java\`\`\` block.

    Tone:
    - Clean, maintainable, enterprise-ready.
  `,

  /**
   * Cucumber Feature File Only Prompt
   */
  CUCUMBER_ONLY: `
    Instructions:
    - Generate ONLY a Cucumber (.feature) file.
    - Use Scenario Outline with Examples table.
    - Make sure every step is relevant to the provided DOM.
    - Do not combine multiple actions into one step.
    - Use South India realistic dataset (names, addresses, pin codes, mobile numbers).
    - Use dropdown values only from provided DOM.
    - Generate multiple scenarios if applicable.

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`

    Example:
    \`\`\`gherkin
    Feature: Login to OpenTaps

    Scenario Outline: Successful login with valid credentials
      Given I open the login page
      When I type "<username>" into the Username field
      And I type "<password>" into the Password field
      And I click the Login button
      Then I should be logged in successfully

    Examples:
      | username   | password  |
      | "testuser" | "testpass"|
      | "admin"    | "admin123"|
    \`\`\`

    Persona:
    - Audience: BDD testers who only need feature files.

    Output Format:
    - Only valid Gherkin in a \`\`\`gherkin\`\`\` block.

    Tone:
    - Clear, structured, executable.
  `,

  /**
   * Test Script Only Prompt
   */
  TEST_SCRIPT_ONLY: `
    Instructions:
    - Generate ONLY an executable test script or test class.
    - Use the selected browser automation engine and language implicitly from the extension settings.
    - Include setup, teardown, and clear element interaction steps.
    - Use actual selectors from the provided DOM.
    - Do NOT include page object classes or feature files unless explicitly requested.

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`
    URL: \${pageUrl}

    Example:
    \`\`\`java
    package com.testleaf.tests;

    import org.junit.jupiter.api.*;
    import org.openqa.selenium.*;
    import org.openqa.selenium.chrome.ChromeDriver;

    public class LoginTest {
        private WebDriver driver;

        @BeforeEach
        public void setUp() {
            driver = new ChromeDriver();
            driver.manage().window().maximize();
        }

        @Test
        public void shouldLoginSuccessfully() {
            driver.get("\${pageUrl}");
            driver.findElement(By.id("username")).sendKeys("testuser");
            driver.findElement(By.id("password")).sendKeys("testpass");
            driver.findElement(By.xpath("//button[contains(text(),'Login')]")) .click();
            Assertions.assertTrue(driver.findElement(By.cssSelector(".success")).isDisplayed());
        }

        @AfterEach
        public void tearDown() {
            if (driver != null) {
                driver.quit();
            }
        }
    }
    \`\`\`

    Persona:
    - Audience: automation engineers who need a runnable test class.

    Output Format:
    - A single code block containing the test script.

    Tone:
    - Practical, concise, reliable.
  `,

  /**
   * Playwright TypeScript Page Object Prompt
   */
  PLAYWRIGHT_TS_PAGE_ONLY: `
    Instructions:
    - Generate ONLY a TypeScript Playwright page object class.
    - Use Playwright locators and page methods.
    - Use the provided DOM to infer selectors.
    - Do NOT include test runner code or feature files.

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`

    Example:
    \`\`\`ts
    import { Page } from '@playwright/test';

    export class LoginPage {
      readonly page: Page;

      constructor(page: Page) {
        this.page = page;
      }

      async enterUsername(username: string) {
        await this.page.fill('#username', username);
      }

      async enterPassword(password: string) {
        await this.page.fill('#password', password);
      }

      async submit() {
        await this.page.click('button:has-text("Login")');
      }
    }
    \`\`\`

    Persona:
    - Audience: automation engineers using Playwright with TypeScript.

    Output Format:
    - A single TypeScript page object class in a \`\`\`ts block.

    Tone:
    - Clean, modern, maintainable.
  `,

  /**
   * Playwright TypeScript Test Script Prompt
   */
  PLAYWRIGHT_TS_TEST_SCRIPT_ONLY: `
    Instructions:
    - Generate ONLY a TypeScript Playwright test script using @playwright/test.
    - Include browser navigation, actions, and assertions.
    - Use actual selectors from the provided DOM.
    - Do NOT include page object classes or Cucumber feature files.

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`
    URL: \${pageUrl}

    Example:
    \`\`\`ts
    import { test, expect } from '@playwright/test';

    test('should login successfully', async ({ page }) => {
      await page.goto('\${pageUrl}');
      await page.fill('#username', 'testuser');
      await page.fill('#password', 'testpass');
      await page.click('button:has-text("Login")');
      await expect(page.locator('.success')).toBeVisible();
    });
    \`\`\`

    Persona:
    - Audience: automation testers using TypeScript and Playwright.

    Output Format:
    - A single TypeScript test file in a \`\`\`ts block.

    Tone:
    - Practical, concise, executable.
  `,

  /**
   * Cucumber with Step Definitions
   */
  CUCUMBER_WITH_SELENIUM_JAVA_STEPS: `
    Instructions:
    - Generate BOTH:
      1. A Cucumber .feature file.
      2. A Java step definition class for selenium.
    - Do NOT include Page Object code.
    - Step defs must include WebDriver setup, explicit waits, and actual Selenium code.
    - Use Scenario Outline with Examples table (South India realistic data).

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`
    URL: \${pageUrl}

    Example:
    \`\`\`gherkin
    Feature: Login to OpenTaps

    Scenario Outline: Successful login with valid credentials
      Given I open the login page
      When I type "<username>" into the Username field
      And I type "<password>" into the Password field
      And I click the Login button
      Then I should be logged in successfully

    Examples:
      | username   | password  |
\      | "admin"    | "admin123"|
    \`\`\`

    \`\`\`java
    package com.leaftaps.stepdefs;

    import io.cucumber.java.en.*;
    import org.openqa.selenium.*;
    import org.openqa.selenium.chrome.ChromeDriver;
    import org.openqa.selenium.support.ui.*;

    public class LoginStepDefinitions {
        private WebDriver driver;
        private WebDriverWait wait;

        @io.cucumber.java.Before
        public void setUp() {
            driver = new ChromeDriver();
            wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            driver.manage().window().maximize();
        }

        @io.cucumber.java.After
        public void tearDown() {
            if (driver != null) driver.quit();
        }

        @Given("I open the login page")
        public void openLoginPage() {
            driver.get("\${pageUrl}");
        }

        @When("I type {string} into the Username field")
        public void enterUsername(String username) {
            WebElement el = wait.until(ExpectedConditions.elementToBeClickable(By.id("username")));
            el.sendKeys(username);
        }

        @When("I type {string} into the Password field")
        public void enterPassword(String password) {
            WebElement el = wait.until(ExpectedConditions.elementToBeClickable(By.id("password")));
            el.sendKeys(password);
        }

        @When("I click the Login button")
        public void clickLogin() {
            driver.findElement(By.xpath("//button[contains(text(),'Login')]")).click();
        }

        @Then("I should be logged in successfully")
        public void verifyLogin() {
            WebElement success = wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("success")));
            assert success.isDisplayed();
        }
    }
    \`\`\`

    Persona:
    - Audience: QA engineers working with Cucumber & Selenium.

    Output Format:
    - Gherkin in \`\`\`gherkin\`\`\` block + Java code in \`\`\`java\`\`\` block.

    Tone:
    - Professional, executable, structured.
  `
};

/**
 * Helper function to escape code blocks in prompts
 */
function escapeCodeBlocks(text) {
  return text.replace(/```/g, '\\`\\`\\`');
}

/**
 * Function to fill template variables in a prompt
 */
export function getPrompt(promptKey, variables = {}) {
  let prompt = DEFAULT_PROMPTS[promptKey];
  if (!prompt) {
    throw new Error(`Prompt not found: ${promptKey}`);
  }

  Object.entries(variables).forEach(([k, v]) => {
    const regex = new RegExp(`\\$\\{${k}\\}`, 'g');
    prompt = prompt.replace(regex, v);
  });

  return prompt.trim();
}

export const CODE_GENERATOR_TYPES = {
  SELENIUM_JAVA_PAGE_ONLY: 'Selenium-Java-Page-Only',
  CUCUMBER_ONLY: 'Cucumber-Only',
  CUCUMBER_WITH_SELENIUM_JAVA_STEPS: 'Cucumber-With-Selenium-Java-Steps',
};
