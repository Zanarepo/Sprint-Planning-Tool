describe("Login Flow", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login"); // Adjust route if needed
  });

  it("fails with invalid credentials", () => {
    cy.get("input#email").type("wrong@test.com");
    cy.get("input#password").type("wrongpass");
    cy.get("button[type=submit]").click();
    cy.contains("Invalid email or password.").should("exist");
  });

  it("logs in successfully and redirects user", () => {
    cy.get("input#email").type("pzana.fred@gmail.com");
    cy.get("input#password").type("1234@Tests");
    cy.get("button[type=submit]").click();

    cy.contains("Login successful!").should("exist");
    cy.url().should("include", "/dashboard"); // adjust if admin
  });

  it("shows role selection if multiple roles", () => {
    cy.get("input#email").type("prinzana@gmail.com");
    cy.get("input#password").type("1234@Test");
    cy.get("button[type=submit]").click();

    cy.contains("Select a Role").should("exist");
    cy.contains("admin").click();
    cy.url().should("include", "/admindashboard");
  });
});
