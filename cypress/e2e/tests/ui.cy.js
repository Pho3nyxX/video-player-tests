import uiPage from "../pageObjects/ui.page";

describe("verify that", () => {
	beforeEach(() => {
		cy.visit("");
	});

	it("the play btn changes to pause when pressed", () => {
		cy.get(uiPage.playPauseBtn).scrollIntoView().click();
		cy.get(uiPage.playPauseBtn)
			.invoke("attr", "src")
			.then((source) => {
				expect(source).to.equal("assets/pause.svg");
			});
	});

    it("the video plays after play btn pressed", () => {
		cy.get(uiPage.video).should('have.prop', 'paused', true);
		cy.get(uiPage.playPauseBtn).scrollIntoView().click();
		cy.get(uiPage.video).should('have.prop', 'paused', false);
	});

    it("the pause btn changes to play when pressed", () => {
        cy.get(uiPage.playPauseBtn).scrollIntoView().click();
        cy.get(uiPage.playPauseBtn).click();
        cy.get(uiPage.playPauseBtn)
            .invoke("attr", "src")
            .then((source) => {
                expect(source).to.equal("assets/play.svg")
            });
    });

	it("the video pause after pause btn pressed", () => {
		cy.get(uiPage.video).should('have.prop', 'paused', true);
		cy.get(uiPage.playPauseBtn).scrollIntoView().click();
		cy.get(uiPage.playPauseBtn).click();
		cy.get(uiPage.video).should('have.prop', 'paused', true);
    });
});
