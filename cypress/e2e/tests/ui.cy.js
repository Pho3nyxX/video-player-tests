import uiPage from "../pageObjects/ui.page";

describe("verify that", () => {
	beforeEach(() => {
		cy.visit("");
	});

	it("the play btn changes when pressed", () => {
		cy.get(uiPage.playPauseBtn).scrollIntoView().click();

		cy.get(uiPage.playPauseBtn)
			.invoke("attr", "src")
			.then((source) => {
				expect(source).to.equal("assets/pause.svg");
			});
	});

    it.only("the video plays after play btn pressed", () => {
		cy.get(uiPage.video).should('have.prop', 'paused', true);
        
		cy.get(uiPage.playPauseBtn).scrollIntoView().click();
		cy.get(uiPage.video)
            .should('have.prop', 'paused', false);
	});

    it("the video can pause", () => {
        cy.get(uiPage.playPauseBtn).scrollIntoView().click();
        cy.get(uiPage.playPauseBtn).click();

        cy.get(uiPage.playPauseBtn)
            .invoke("attr", "src")
            .then((source) => {
                expect(source).to.equal("assets/play.svg")
            });
    });

    it("the video can mute", () => {
		cy.get(uiPage.muteUnmuteBtn).scrollIntoView().click();

		cy.get(uiPage.muteUnmuteBtn)
			.invoke("attr", "src")
			.then((source) => {
				expect(source).to.equal("assets/unmute.svg");
			});
	});

    it("the video can unmute", () => {
		cy.get(uiPage.muteUnmuteBtn).scrollIntoView().click();
        cy.wait(3000);
        cy.get(uiPage.muteUnmuteBtn).click();

		cy.get(uiPage.muteUnmuteBtn)
			.invoke("attr", "src")
			.then((source) => {
				expect(source).to.equal("assets/mute.svg");
			});
	});


});
