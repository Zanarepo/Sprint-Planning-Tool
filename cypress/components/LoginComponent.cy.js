// cypress/component/LoginComponent.cy.js
import React from "react";
import { MemoryRouter } from "react-router-dom";
import Login from "../../src/component/Auth/Login";

describe("LoginComponent UI", () => {
  beforeEach(() => {
    cy.mount(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  });

  it("renders email and password inputs", () => {
    cy.get("input#email").should("exist");
    cy.get("input#password").should("exist");
  });

  it("shows error if fields are empty", () => {
    cy.get("button[type=submit]").click();
    cy.contains("Please fill in all fields.").should("exist");
  });

  it("can toggle show/hide password", () => {
    cy.get("input#password").type("mypassword");
    cy.contains("Show").click();
    cy.get("input#password").should("have.attr", "type", "text");
    cy.contains("Hide").click();
    cy.get("input#password").should("have.attr", "type", "password");
  });
});
