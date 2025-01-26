import uiPage from "../pageObjects/ui.page";

describe("verify that the user", () => {
	beforeEach(() => {
		cy.visit("");
	});

	it("is able to play a video", () => {
		cy.get(uiPage.playBtn).scrollIntoView().click();

		cy.get(uiPage.playBtn)
			.invoke("attr", "src")
			.then((source) => {
				expect(source).to.equal("assets/pause.svg");
			});
	});

    it("is able to pause a video", () => {
        cy.get(uiPage.playBtn).scrollIntoView().click();
        cy.get(uiPage.pauseBtn).click();

        cy.get(uiPage.pauseBtn)
            .invoke("attr", "src")
            .then((source) => {
                expect(source).to.equal("assets/play.svg")
            });
    });
});
