describe("Tests notes", () => {
  let note = require("../fixtures/notes");

  it("create note with title and description", () => {
    cy.request({
      method: "POST",
      url: "https://practice.expandtesting.com/notes/api/notes",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token":
          "91a65b89ff2a4721b17dc5cc90a3761b8f708ea5cae04083b9c712cac4a34d55",
      },
      body: {
        title: "nouvelle note",
        description: "c'est une nouvelle description",
        category: "Work",
      },
    }).then((response) => {
      expect(response.body.data).to.have.property("id");
      expect(response.status).to.equal(200);
      console.log("response.body.data :>> ", response.body.data);
    });
  });

  it("calsse the notes in differents category", () => {
    cy.request({
      method: "POST",
      url: "https://practice.expandtesting.com/notes/api/notes",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token":
          "91a65b89ff2a4721b17dc5cc90a3761b8f708ea5cae04083b9c712cac4a34d55",
      },
      body: {
        title: "note 1",
        description: "test",
        category: "Home",
      },
    }).then((response) => {
      expect(response.body.data.category).to.equal("Home");
      expect(response.status).to.equal(200);
    });
  });

  it("Update and delete the notes", () => {
    cy.request({
      methode: "POST",
      url: "https://practice.expandtesting.com/notes/api/notes",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token":
          "91a65b89ff2a4721b17dc5cc90a3761b8f708ea5cae04083b9c712cac4a34d55",
      },
      body: {
        title: "note 1",
        description: "test",
        category: "Home",
      },
    }).then((response) => {
      const noteId = "643e531dc2507a0211370c94";
      //MAJ une note
      cy.request({
        methode: "PUT",
        url: `https://practice.expandtesting.com/notes/api/notes/${noteId}`,
        headers: {
          "Content-Type": "application/json",
          "x-auth-token":
            "91a65b89ff2a4721b17dc5cc90a3761b8f708ea5cae04083b9c712cac4a34d55",
        },
        body: {
          title: "note 1",
          description: "test",
          category: "Home",
        },
      }).then((updateResponse) => {
        expect(updateResponse.status).to.equal(200);
        expect(updateResponse.body.data.title).to.equal("Note mise à jour");
        cy.request({
          methode: "DELETE",
          url: `https://practice.expandtesting.com/notes/api/notes${noteId}`,
        }).then((deleteResponse) => {
          expect(deleteResponse.status).to.equal(204);
        });
      });
    });
  });
  it("Recherche des notes par titre ou catégorie", () => {
    // Créer une note pour la recherche
    cy.request({
      methode: "POST",
      url: "https://practice.expandtesting.com/notes/api/notes",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token":
          "91a65b89ff2a4721b17dc5cc90a3761b8f708ea5cae04083b9c712cac4a34d55",
      },
      body: {
        title: "note 1",
        description: "test",
        category: "Home",
      },
    }).then((response) => {
      const noteId = response.body.id;

      // Rechercher des notes par titre
      cy.request({
        methode: "GET",
        url: `https://practice.expandtesting.com/notes/api/notes`,
        headers: {
          "Content-Type": "application/json",
          "x-auth-token":
            "91a65b89ff2a4721b17dc5cc90a3761b8f708ea5cae04083b9c712cac4a34d55",
        },
        body: {
          title: "note 1",
          description: "test",
          category: "Home",
        },
      }).then((searchResponse) => {
        expect(searchResponse.status).to.equal(200);
        expect(searchResponse.body.data).length.to.equal([searchResponse]);
      });
    });
  });
});
