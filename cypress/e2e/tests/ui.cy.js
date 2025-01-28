import videoPlayerPage from "../pageObjects/videoPlayer.page";

describe("verify that", () => {
	beforeEach(() => {
		cy.visit("");
	});

	it("the play btn changes to pause when pressed", () => {
		cy.get(videoPlayerPage.playPauseBtn).scrollIntoView().click();
		cy.get(videoPlayerPage.playPauseBtn)
			.invoke("attr", "src")
			.then((source) => {
				expect(source).to.equal("assets/pause.svg");
			});
	});

    it("the video plays after play btn is pressed", () => {
		cy.get(videoPlayerPage.video)
		.should('have.prop', 'paused', true)
		.and('have.prop', 'ended', false)
		cy.get(videoPlayerPage.playPauseBtn).scrollIntoView().click();
		cy.get(videoPlayerPage.video).should('have.prop', 'paused', false);
	});

	it("user can control video play", () => {
		cy.get(videoPlayerPage.video)
			.scrollIntoView()
			.then((video) => {
				video[0].play()
		  })
		cy.get(videoPlayerPage.video).should('have.prop', 'paused', false)
	});

	it("user can control video pause", () => {
		cy.get(videoPlayerPage.video)
			.scrollIntoView()
			.then((video) => {
				video[0].play()
				video[0].pause()
		  })
		cy.get(videoPlayerPage.video).should('have.prop', 'paused', true)
	});

    it("the pause btn changes to play when pressed", () => {
        cy.get(videoPlayerPage.playPauseBtn).scrollIntoView().click();
        cy.get(videoPlayerPage.playPauseBtn).click();
        cy.get(videoPlayerPage.playPauseBtn)
            .invoke("attr", "src")
            .then((source) => {
                expect(source).to.equal("assets/play.svg")
            });
    });

	it("the video pause after pause btn is pressed", () => {
		cy.get(videoPlayerPage.video).should('have.prop', 'paused', true);
		cy.get(videoPlayerPage.playPauseBtn).scrollIntoView().click();
		cy.get(videoPlayerPage.playPauseBtn).click();
		cy.get(videoPlayerPage.video).should('have.prop', 'paused', true);
    });

	it("the mute btn changes to mute when pressed", () => {
		cy.get(videoPlayerPage.muteUnmuteBtn).scrollIntoView().click();
		cy.get(videoPlayerPage.muteUnmuteBtn)
			.invoke("attr", "src")
			.then((source) => {
				expect(source).to.equal("assets/mute.svg");
			});
	});

	it("the video mute after mute btn is pressed", () => {
		cy.get(videoPlayerPage.video).should('have.prop', 'muted', false);
		cy.get(videoPlayerPage.muteUnmuteBtn).scrollIntoView().click();
		cy.get(videoPlayerPage.video).should('have.prop', 'muted', true);
    });

	it("the video unmute after mute btn is pressed twice", () => {
		cy.get(videoPlayerPage.video).should('have.prop', 'muted', false);
		cy.get(videoPlayerPage.muteUnmuteBtn).scrollIntoView().click();
		cy.get(videoPlayerPage.muteUnmuteBtn).click();
		cy.get(videoPlayerPage.video).should('have.prop', 'muted', false);
    });

	it("the settings menu is shown when the settings btn is pressed", () => {
		cy.get(videoPlayerPage.settingsBtn).scrollIntoView().click();
		cy.get(videoPlayerPage.playbackSpeedLink).should("be.visible");
		cy.get(videoPlayerPage.qualityLink).should("be.visible");
	});

	it("playback speed menu opens when btn is pressed", () => {
		cy.get(videoPlayerPage.settingsBtn).scrollIntoView().click();
		cy.get(videoPlayerPage.playbackSpeedLink).click();
		cy.get(videoPlayerPage.playbackSpeedMenu).should("be.visible");
	});

	it("normal speed is selected by default", () => {
		cy.get(videoPlayerPage.settingsBtn).scrollIntoView().click();
		cy.get(videoPlayerPage.playbackSpeedLink).click();
		cy.get(videoPlayerPage.video).should('have.prop', 'defaultPlaybackRate', 1)
		cy.get("#playbackSpeedMenu")
			.find("[alt=tick]")
			.should("be.visible")
	});

	it("clicking 0.5 speed decrease the video speed", () => {
		cy.get(videoPlayerPage.settingsBtn).scrollIntoView().click();
		cy.get(videoPlayerPage.playbackSpeedLink).click();
		cy.get("#playbackSpeedMenu li:nth-child(2)").click();
		cy.get(videoPlayerPage.video).should('have.prop', 'playbackRate', 0.5)
		cy.get("#playbackSpeedMenu")
			.find("[alt=tick]")
			.should("be.visible")
	});

	it("clicking 2x speed increase the video speed", () => {
		cy.get(videoPlayerPage.settingsBtn).scrollIntoView().click();
		cy.get(videoPlayerPage.playbackSpeedLink).click();
		cy.get(videoPlayerPage.video).then((video) => {
			video[0].playbackRate = 2
			video[0].play()
		  })
		cy.get(videoPlayerPage.video).should('have.prop', 'playbackRate', 2)
	});

	it("clicking playback speed twice exits playback speed menu", () => {
		cy.get(videoPlayerPage.settingsBtn).scrollIntoView().click();
		cy.get(videoPlayerPage.playbackSpeedLink).click();
		cy.get(videoPlayerPage.playbackSpeedLink).click();
		cy.get(videoPlayerPage.playbackSpeedLink).should("be.visible");
		cy.get(videoPlayerPage.qualityLink).should("be.visible");
	});

	it("quality menu opens when btn is pressed", () => {
		cy.get(videoPlayerPage.settingsBtn).scrollIntoView().click();
		cy.get(videoPlayerPage.qualityLink).click();
		cy.get(videoPlayerPage.qualityMenu).should("be.visible");
	});

	it("clicking quality twice exits quality menu", () => {
		cy.get(videoPlayerPage.settingsBtn).scrollIntoView().click();
		cy.get(videoPlayerPage.qualityLink).click();
		cy.get(videoPlayerPage.qualityLink).click();
		cy.get(videoPlayerPage.qualityLink).should("be.visible");
		cy.get(videoPlayerPage.playbackSpeedLink).should("be.visible");
	});

	it("the video duration is known", () => {
		cy.get(videoPlayerPage.video)
			.scrollIntoView()
			.then((video) => {
				video[0].load();
		  })
		cy.get(videoPlayerPage.video).should('have.prop', 'duration', 253.933424);
	});

	it("the video duration is unknown", () => {
		cy.get(videoPlayerPage.video).scrollIntoView();
		cy.get(videoPlayerPage.video).should((video) => {
			expect(video[0].duration).to.be.gt(0)
		})
	});

	it("clicking progress bar increases current time of video", () => {
		cy.get(videoPlayerPage.video).scrollIntoView();

		cy.get(videoPlayerPage.video).should((video) => {
			expect(video[0].duration).to.be.gt(0)
		})

		cy.get(videoPlayerPage.video).should('have.prop', 'seeking', false);
		cy.get(videoPlayerPage.video).should('have.prop', 'currentTime', 0);
		cy.get(videoPlayerPage.scrubBar).click();

		cy.get(videoPlayerPage.video).should((video) => {
			expect(video[0].currentTime).to.be.gt(0);
		})
	});

	it("sliding progress bar increases current time of video", () => {
		cy.get(videoPlayerPage.video).scrollIntoView();

		cy.get(videoPlayerPage.video).should((video) => {
			expect(video[0].duration).to.be.gt(0)
		})

		cy.get(videoPlayerPage.video).should('have.prop', 'seeking', false);
		cy.get(videoPlayerPage.video).should('have.prop', 'currentTime', 0);

		cy.get(videoPlayerPage.scrubCircle)
			.trigger('mousedown')
			.trigger('mousemove', { movementX: 410 })
			.trigger('mouseup')

		cy.get(videoPlayerPage.video).should((video) => {
			expect(video[0].currentTime).to.be.gt(0);
		})
	});
});
