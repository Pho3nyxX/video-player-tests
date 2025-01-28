class UI{
    get video(){
        return ('.video');
    }

    get playPauseBtn(){
        return ('.play-pause');
    }

    get muteUnmuteBtn(){
        return ('.mute-icon');
    }

    get settingsBtn(){
        return ('.settings');
    }

    get settingsMenu(){
        return ('.settings-menu');
    }

    get playbackSpeedLink(){
        return ('.settings-menu .menu-item:first-child .menu-item-link');
    }

    get playbackSpeedMenu(){
        return ('#playbackSpeedMenu');
    }

    get qualityLink(){
        return ('.settings-menu .menu-item:last-child .menu-item-link');
    }

    get qualityMenu(){
        return ('#qualityMenu');
    }
}
export default new UI();