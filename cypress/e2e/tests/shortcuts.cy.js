import videoPlayerPage from "../pageObjects/videoPlayer.page";

describe("Verify that", () => {
	beforeEach(() => {
		cy.visit("");
	});

	it("the play btn changes to pause when space key is pressed", () => {
        cy.get(videoPlayerPage.playPauseBtn)
            .scrollIntoView()
            .type(" ");
        cy.get(videoPlayerPage.playPauseBtn)
            .invoke("attr", "src")
            .then((source) => {
                expect(source).to.equal("assets/pause.svg");
            });
    });

    it("the video plays after space key is pressed", () => {
        cy.get(videoPlayerPage.video)
            .should('have.prop', 'paused', true)
            .and('have.prop', 'ended', false);
        cy.get(videoPlayerPage.playPauseBtn)
            .scrollIntoView()
            .type(" ");
        cy.get(videoPlayerPage.video).should('have.prop', 'paused', false);
    });

    it("the user can control video play with the K key", () => {
        cy.get(videoPlayerPage.playPauseBtn)
            .scrollIntoView()
            .type("keyK")
        cy.get(videoPlayerPage.video).should('have.prop', 'paused', false);
    });

    it("the user can control the pausing of the video by clicking the K key twice", () => {
        cy.get(videoPlayerPage.playPauseBtn)
            .scrollIntoView()
            .type("keyK")
            .type("keyK");
        cy.get(videoPlayerPage.video).should('have.prop', 'paused', true);
    });
});
