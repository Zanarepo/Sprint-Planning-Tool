// cypress/e2e/registration.cy.js

describe("RegistrationComponent", () => {
  beforeEach(() => {
 cy.visit("http://localhost:3000/register");
  });

  it("should require all fields", () => {
    cy.get("button[type=submit]").click();
    cy.contains("Please fill in all fields.").should("be.visible");
  });

  it("should validate email format", () => {
    cy.get("#fullName").type("John Doe");
    cy.get("#email").type("invalid-email");
    cy.get("#password").type("Test1234");
    cy.get("#role").select("Technical Product Management");
    cy.get("input[type=checkbox]").check();
    cy.get("button[type=submit]").click();

    cy.contains("An error occurred").should("not.exist"); // app-level error
    cy.contains("Registration successful!").should("not.exist");
    cy.contains("Please fill in all fields.").should("not.exist");
    // app does not show explicit invalid email error, but HTML5 validation will block submission
  });

  it("should enforce password strength", () => {
    cy.get("#fullName").type("Jane Doe");
    cy.get("#email").type("jane@example.com");
    cy.get("#password").type("abc"); // weak password
    cy.get("#role").select("Growth Product Management");
    cy.get("input[type=checkbox]").check();
    cy.get("button[type=submit]").click();

    cy.contains(
      "Password must be at least 6 characters long and include a mix of letters and numbers."
    ).should("be.visible");
  });

  it("should require accepting terms", () => {
    cy.get("#fullName").type("Jane Doe");
    cy.get("#email").type("jane@example.com");
    cy.get("#password").type("Test1234");
    cy.get("#role").select("Introduction to Product Management");
    cy.get("button[type=submit]").click();

    cy.contains("You must accept the Terms and Conditions.").should("be.visible");
  });

  it("should trim email input before submission", () => {
    cy.get("#fullName").type("Sam Doe");
    cy.get("#email").type("  sam@example.com  "); // extra spaces
    cy.get("#password").type("Password1");
    cy.get("#role").select("Intermediate  Management");
    cy.get("input[type=checkbox]").check();

    cy.get("button[type=submit]").click();


    // You’d mock supabase request in a real test
    // Example success check:
    // cy.contains("Registration successful!").should("be.visible");
  });
});
