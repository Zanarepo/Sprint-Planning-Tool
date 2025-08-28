// cypress/e2e/logins.integration.cy.js
describe("Logins Component - Integration Test", () => {
  beforeEach(() => {
     cy.visit("http://localhost:3000/login"); // Adjust if Logins component is on a different route
  });

  it("renders email and password inputs and the login button", () => {
    cy.get("input#email").should("exist");
    cy.get("input#password").should("exist");
    cy.get("button[type=submit]").should("exist");
  });

  it("shows error when fields are empty", () => {
    cy.get("button[type=submit]").click();
    cy.contains("Please fill in all fields.").should("exist");
  });

  it("shows error for invalid credentials", () => {
    cy.get("input#email").type("wrong@example.com");
    cy.get("input#password").type("wrongpassword");
    cy.get("button[type=submit]").click();
    cy.contains("Invalid email or password.").should("exist");
  });

  it("navigates to dashboard for correct credentials", () => {
    cy.get("input#email").type("pzana.fred@gmail.com");
    cy.get("input#password").type("1234@Tests");
    cy.get("button[type=submit]").click();

    // Wait for the simulated async login
    cy.contains("Login successful! Redirecting shortly...").should("exist");

    // Check if the navigation happened
    cy.url().should("include", "/dashboard");
  });

  it("toggles show/hide password", () => {
    cy.get("input#password").type("mypassword");
    cy.contains("Show").click();
    cy.get("input#password").should("have.attr", "type", "text");
    cy.contains("Hide").click();
    cy.get("input#password").should("have.attr", "type", "password");
  });
});
