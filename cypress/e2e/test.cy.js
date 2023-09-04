describe("authentication", () => {
  it("should successfully authenticate and receive a token", () => {
    cy.visit("https://preprod.backmarket.fr/fr-fr/register");
    cy.get("input[Prénom=firstName]").type("admin");
    cy.get("input[Nom=lastName]").type("admin");
    cy.get("Saisissez un e-mail valide").type("<EMAIL>");
    cy.get("Mot de passe").type("<PASSWORD>");
    cy.get(
      "j’accepte de recevoir les meilleurs plan du web et la newsletter par mail."
    ).click();
    cy.get("button[type=submit]").click();
    cy.contains("Enchantés");
    cy.url().should("include", "/register");
  });
  describe("Failed authentication", () => {
    it("should display an error message on registration failure", () => {
      cy.visit("https://preprod.backmarket.fr/fr-fr/register");
      //Fill in the regestration fields with incorrect information

      cy.get("Saisissez un e-mail valide").type("invalid_email");
      cy.get("Mot de passe").type("invalide_password");
      cy.get("Enchantés[type=submit]").click();
      //An error message is displayed
      cy.get(
        "Veuillez indiquer un adresse mail ou mot de passe valides !"
      ).should("be.visible");
    });
  });
});
