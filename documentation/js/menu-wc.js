'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">FootballAdminApp documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AboutPageModule.html" data-type="entity-link" >AboutPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AboutPageModule-8df64e26d53ca99eeb3ff8876f8f29d5e8eab6f6bb97e5d61cf794dec9bcb4c17d0217e5367145f6ed6b96902b468fd965eeb2b2d1a790b38355ce1fd4e57fd2"' : 'data-bs-target="#xs-components-links-module-AboutPageModule-8df64e26d53ca99eeb3ff8876f8f29d5e8eab6f6bb97e5d61cf794dec9bcb4c17d0217e5367145f6ed6b96902b468fd965eeb2b2d1a790b38355ce1fd4e57fd2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AboutPageModule-8df64e26d53ca99eeb3ff8876f8f29d5e8eab6f6bb97e5d61cf794dec9bcb4c17d0217e5367145f6ed6b96902b468fd965eeb2b2d1a790b38355ce1fd4e57fd2"' :
                                            'id="xs-components-links-module-AboutPageModule-8df64e26d53ca99eeb3ff8876f8f29d5e8eab6f6bb97e5d61cf794dec9bcb4c17d0217e5367145f6ed6b96902b468fd965eeb2b2d1a790b38355ce1fd4e57fd2"' }>
                                            <li class="link">
                                                <a href="components/AboutPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AboutPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AboutPageRoutingModule.html" data-type="entity-link" >AboutPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-7e74f40ace715d70abd51f7587d0c30679eb4ee5e19f140b5fffc4bdc65b9e8843bf795479050fef1b8527d492d0a1d999549dd07e7d9e4443cd1a25003fbc8a"' : 'data-bs-target="#xs-components-links-module-AppModule-7e74f40ace715d70abd51f7587d0c30679eb4ee5e19f140b5fffc4bdc65b9e8843bf795479050fef1b8527d492d0a1d999549dd07e7d9e4443cd1a25003fbc8a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-7e74f40ace715d70abd51f7587d0c30679eb4ee5e19f140b5fffc4bdc65b9e8843bf795479050fef1b8527d492d0a1d999549dd07e7d9e4443cd1a25003fbc8a"' :
                                            'id="xs-components-links-module-AppModule-7e74f40ace715d70abd51f7587d0c30679eb4ee5e19f140b5fffc4bdc65b9e8843bf795479050fef1b8527d492d0a1d999549dd07e7d9e4443cd1a25003fbc8a"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomePageModule.html" data-type="entity-link" >HomePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-HomePageModule-5b03a84d6fcfbad1d88a6d3227688755d9515db6806da2c5678f5e119e1e12679db6da66b6dba5e9b129d4fa1048be28bca30c64bc9df6c5f904867ede04f12f"' : 'data-bs-target="#xs-components-links-module-HomePageModule-5b03a84d6fcfbad1d88a6d3227688755d9515db6806da2c5678f5e119e1e12679db6da66b6dba5e9b129d4fa1048be28bca30c64bc9df6c5f904867ede04f12f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomePageModule-5b03a84d6fcfbad1d88a6d3227688755d9515db6806da2c5678f5e119e1e12679db6da66b6dba5e9b129d4fa1048be28bca30c64bc9df6c5f904867ede04f12f"' :
                                            'id="xs-components-links-module-HomePageModule-5b03a84d6fcfbad1d88a6d3227688755d9515db6806da2c5678f5e119e1e12679db6da66b6dba5e9b129d4fa1048be28bca30c64bc9df6c5f904867ede04f12f"' }>
                                            <li class="link">
                                                <a href="components/HomePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomePageRoutingModule.html" data-type="entity-link" >HomePageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LeaguesPageModule.html" data-type="entity-link" >LeaguesPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-LeaguesPageModule-b4cfb158647cd5a8e830a57710e5f239235b8cb94c2dad89dc7e9ccee31158fdf153180d0a5d7ab3e012d00cf0179fa1e397067ee5924827fd946c01a0798933"' : 'data-bs-target="#xs-components-links-module-LeaguesPageModule-b4cfb158647cd5a8e830a57710e5f239235b8cb94c2dad89dc7e9ccee31158fdf153180d0a5d7ab3e012d00cf0179fa1e397067ee5924827fd946c01a0798933"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LeaguesPageModule-b4cfb158647cd5a8e830a57710e5f239235b8cb94c2dad89dc7e9ccee31158fdf153180d0a5d7ab3e012d00cf0179fa1e397067ee5924827fd946c01a0798933"' :
                                            'id="xs-components-links-module-LeaguesPageModule-b4cfb158647cd5a8e830a57710e5f239235b8cb94c2dad89dc7e9ccee31158fdf153180d0a5d7ab3e012d00cf0179fa1e397067ee5924827fd946c01a0798933"' }>
                                            <li class="link">
                                                <a href="components/LeaguesPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LeaguesPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LeaguesPageRoutingModule.html" data-type="entity-link" >LeaguesPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LineupsPageModule.html" data-type="entity-link" >LineupsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-LineupsPageModule-fa56c23c45b4550e2733e829a5899864318c0bf8d07925178bf0dd34c000e497c54d35f7a7b363c552acea966ee9a03aecfad4ddbeb1c61cc8fe588d5078f0c3"' : 'data-bs-target="#xs-components-links-module-LineupsPageModule-fa56c23c45b4550e2733e829a5899864318c0bf8d07925178bf0dd34c000e497c54d35f7a7b363c552acea966ee9a03aecfad4ddbeb1c61cc8fe588d5078f0c3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LineupsPageModule-fa56c23c45b4550e2733e829a5899864318c0bf8d07925178bf0dd34c000e497c54d35f7a7b363c552acea966ee9a03aecfad4ddbeb1c61cc8fe588d5078f0c3"' :
                                            'id="xs-components-links-module-LineupsPageModule-fa56c23c45b4550e2733e829a5899864318c0bf8d07925178bf0dd34c000e497c54d35f7a7b363c552acea966ee9a03aecfad4ddbeb1c61cc8fe588d5078f0c3"' }>
                                            <li class="link">
                                                <a href="components/LineupsPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LineupsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LineupsPageRoutingModule.html" data-type="entity-link" >LineupsPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LoginPageModule.html" data-type="entity-link" >LoginPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-LoginPageModule-1ab252bece56cc406fde6d4f97801c8704609dfdb44d7bf3e308720c3c71be24a9ddd9da04765677f1ed5cb7c54555b32be51020493457c0c31766743b636a12"' : 'data-bs-target="#xs-components-links-module-LoginPageModule-1ab252bece56cc406fde6d4f97801c8704609dfdb44d7bf3e308720c3c71be24a9ddd9da04765677f1ed5cb7c54555b32be51020493457c0c31766743b636a12"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginPageModule-1ab252bece56cc406fde6d4f97801c8704609dfdb44d7bf3e308720c3c71be24a9ddd9da04765677f1ed5cb7c54555b32be51020493457c0c31766743b636a12"' :
                                            'id="xs-components-links-module-LoginPageModule-1ab252bece56cc406fde6d4f97801c8704609dfdb44d7bf3e308720c3c71be24a9ddd9da04765677f1ed5cb7c54555b32be51020493457c0c31766743b636a12"' }>
                                            <li class="link">
                                                <a href="components/LoginPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginPageRoutingModule.html" data-type="entity-link" >LoginPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MatchesPageModule.html" data-type="entity-link" >MatchesPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-MatchesPageModule-29706cde484ffa7b9f09ee845d3b10f5a5809448deac829593490cce70d573b5438e09746f5d233bb22bec164f612eb1a8fb392484a2ec32bda402ee78270600"' : 'data-bs-target="#xs-components-links-module-MatchesPageModule-29706cde484ffa7b9f09ee845d3b10f5a5809448deac829593490cce70d573b5438e09746f5d233bb22bec164f612eb1a8fb392484a2ec32bda402ee78270600"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MatchesPageModule-29706cde484ffa7b9f09ee845d3b10f5a5809448deac829593490cce70d573b5438e09746f5d233bb22bec164f612eb1a8fb392484a2ec32bda402ee78270600"' :
                                            'id="xs-components-links-module-MatchesPageModule-29706cde484ffa7b9f09ee845d3b10f5a5809448deac829593490cce70d573b5438e09746f5d233bb22bec164f612eb1a8fb392484a2ec32bda402ee78270600"' }>
                                            <li class="link">
                                                <a href="components/MatchesPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MatchesPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MatchesPageRoutingModule.html" data-type="entity-link" >MatchesPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PlayersPageModule.html" data-type="entity-link" >PlayersPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-PlayersPageModule-7ced4b8afd4a67d2a7e58cc7bc3d1ffd9fc37202911e06aed01e0a4320ff5b9828ec540fcfc16e7a837b78b9d5b69cd1a883597f7f0b12fcbad8a19000d351db"' : 'data-bs-target="#xs-components-links-module-PlayersPageModule-7ced4b8afd4a67d2a7e58cc7bc3d1ffd9fc37202911e06aed01e0a4320ff5b9828ec540fcfc16e7a837b78b9d5b69cd1a883597f7f0b12fcbad8a19000d351db"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PlayersPageModule-7ced4b8afd4a67d2a7e58cc7bc3d1ffd9fc37202911e06aed01e0a4320ff5b9828ec540fcfc16e7a837b78b9d5b69cd1a883597f7f0b12fcbad8a19000d351db"' :
                                            'id="xs-components-links-module-PlayersPageModule-7ced4b8afd4a67d2a7e58cc7bc3d1ffd9fc37202911e06aed01e0a4320ff5b9828ec540fcfc16e7a837b78b9d5b69cd1a883597f7f0b12fcbad8a19000d351db"' }>
                                            <li class="link">
                                                <a href="components/PlayersPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PlayersPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PlayersPageRoutingModule.html" data-type="entity-link" >PlayersPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ProfilePageModule.html" data-type="entity-link" >ProfilePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ProfilePageModule-82fcf49cc68bb909b816518c112f8bd3c7f04c1b18bcaa46c8b7a1b2bdd0e2b260b391b5d34dbb46f993792e62700491f1d37808c828d19603d76aca56c592ae"' : 'data-bs-target="#xs-components-links-module-ProfilePageModule-82fcf49cc68bb909b816518c112f8bd3c7f04c1b18bcaa46c8b7a1b2bdd0e2b260b391b5d34dbb46f993792e62700491f1d37808c828d19603d76aca56c592ae"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProfilePageModule-82fcf49cc68bb909b816518c112f8bd3c7f04c1b18bcaa46c8b7a1b2bdd0e2b260b391b5d34dbb46f993792e62700491f1d37808c828d19603d76aca56c592ae"' :
                                            'id="xs-components-links-module-ProfilePageModule-82fcf49cc68bb909b816518c112f8bd3c7f04c1b18bcaa46c8b7a1b2bdd0e2b260b391b5d34dbb46f993792e62700491f1d37808c828d19603d76aca56c592ae"' }>
                                            <li class="link">
                                                <a href="components/ProfilePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfilePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProfilePageRoutingModule.html" data-type="entity-link" >ProfilePageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RegisterPageModule.html" data-type="entity-link" >RegisterPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-RegisterPageModule-59ec18b0f03efd5ac198d06de7ac9b8495e8b111f1b52de33439f29b11769a5f63db916289a92419b3755df7f47a768461aaa784a82ad3b0d572a90db39eaa6d"' : 'data-bs-target="#xs-components-links-module-RegisterPageModule-59ec18b0f03efd5ac198d06de7ac9b8495e8b111f1b52de33439f29b11769a5f63db916289a92419b3755df7f47a768461aaa784a82ad3b0d572a90db39eaa6d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RegisterPageModule-59ec18b0f03efd5ac198d06de7ac9b8495e8b111f1b52de33439f29b11769a5f63db916289a92419b3755df7f47a768461aaa784a82ad3b0d572a90db39eaa6d"' :
                                            'id="xs-components-links-module-RegisterPageModule-59ec18b0f03efd5ac198d06de7ac9b8495e8b111f1b52de33439f29b11769a5f63db916289a92419b3755df7f47a768461aaa784a82ad3b0d572a90db39eaa6d"' }>
                                            <li class="link">
                                                <a href="components/RegisterPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RegisterPageRoutingModule.html" data-type="entity-link" >RegisterPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SharedModule-2e766c5742220efe0a6b2278ffa6e927a48ce0f3558bd2902e07ee066c7e9c826899e61170bb1d5c338ffd5dc9bddb911b8b5c85c6a3be04649803c69388998d"' : 'data-bs-target="#xs-components-links-module-SharedModule-2e766c5742220efe0a6b2278ffa6e927a48ce0f3558bd2902e07ee066c7e9c826899e61170bb1d5c338ffd5dc9bddb911b8b5c85c6a3be04649803c69388998d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-2e766c5742220efe0a6b2278ffa6e927a48ce0f3558bd2902e07ee066c7e9c826899e61170bb1d5c338ffd5dc9bddb911b8b5c85c6a3be04649803c69388998d"' :
                                            'id="xs-components-links-module-SharedModule-2e766c5742220efe0a6b2278ffa6e927a48ce0f3558bd2902e07ee066c7e9c826899e61170bb1d5c338ffd5dc9bddb911b8b5c85c6a3be04649803c69388998d"' }>
                                            <li class="link">
                                                <a href="components/LanguageSelectorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LanguageSelectorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LeagueCreateModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LeagueCreateModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LeagueSelectableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LeagueSelectableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MatchCreateComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MatchCreateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MatchMenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MatchMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PictureSelectableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PictureSelectableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PlayerCreateModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PlayerCreateModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PlayerModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PlayerModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PositionSelectableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PositionSelectableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TeamCreateModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TeamCreateModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TeamSelectableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TeamSelectableComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#directives-links-module-SharedModule-2e766c5742220efe0a6b2278ffa6e927a48ce0f3558bd2902e07ee066c7e9c826899e61170bb1d5c338ffd5dc9bddb911b8b5c85c6a3be04649803c69388998d"' : 'data-bs-target="#xs-directives-links-module-SharedModule-2e766c5742220efe0a6b2278ffa6e927a48ce0f3558bd2902e07ee066c7e9c826899e61170bb1d5c338ffd5dc9bddb911b8b5c85c6a3be04649803c69388998d"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-SharedModule-2e766c5742220efe0a6b2278ffa6e927a48ce0f3558bd2902e07ee066c7e9c826899e61170bb1d5c338ffd5dc9bddb911b8b5c85c6a3be04649803c69388998d"' :
                                        'id="xs-directives-links-module-SharedModule-2e766c5742220efe0a6b2278ffa6e927a48ce0f3558bd2902e07ee066c7e9c826899e61170bb1d5c338ffd5dc9bddb911b8b5c85c6a3be04649803c69388998d"' }>
                                        <li class="link">
                                            <a href="directives/DragDropDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DragDropDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/FilterByTeamDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilterByTeamDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/HighLightDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HighLightDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/TimeDirectiveDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TimeDirectiveDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-SharedModule-2e766c5742220efe0a6b2278ffa6e927a48ce0f3558bd2902e07ee066c7e9c826899e61170bb1d5c338ffd5dc9bddb911b8b5c85c6a3be04649803c69388998d"' : 'data-bs-target="#xs-pipes-links-module-SharedModule-2e766c5742220efe0a6b2278ffa6e927a48ce0f3558bd2902e07ee066c7e9c826899e61170bb1d5c338ffd5dc9bddb911b8b5c85c6a3be04649803c69388998d"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-SharedModule-2e766c5742220efe0a6b2278ffa6e927a48ce0f3558bd2902e07ee066c7e9c826899e61170bb1d5c338ffd5dc9bddb911b8b5c85c6a3be04649803c69388998d"' :
                                            'id="xs-pipes-links-module-SharedModule-2e766c5742220efe0a6b2278ffa6e927a48ce0f3558bd2902e07ee066c7e9c826899e61170bb1d5c338ffd5dc9bddb911b8b5c85c6a3be04649803c69388998d"' }>
                                            <li class="link">
                                                <a href="pipes/PasswordTogglePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PasswordTogglePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SplashPageModule.html" data-type="entity-link" >SplashPageModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SplashPageRoutingModule.html" data-type="entity-link" >SplashPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StatisticsPageModule.html" data-type="entity-link" >StatisticsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-StatisticsPageModule-4439dd8698c06655c95458540e1a9afc4d88fcb433814b0136e3b1357596ccb7591fe98707aca899e56de804abb224d23559dd07cd0c9ac0335273e8c36a1adb"' : 'data-bs-target="#xs-components-links-module-StatisticsPageModule-4439dd8698c06655c95458540e1a9afc4d88fcb433814b0136e3b1357596ccb7591fe98707aca899e56de804abb224d23559dd07cd0c9ac0335273e8c36a1adb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StatisticsPageModule-4439dd8698c06655c95458540e1a9afc4d88fcb433814b0136e3b1357596ccb7591fe98707aca899e56de804abb224d23559dd07cd0c9ac0335273e8c36a1adb"' :
                                            'id="xs-components-links-module-StatisticsPageModule-4439dd8698c06655c95458540e1a9afc4d88fcb433814b0136e3b1357596ccb7591fe98707aca899e56de804abb224d23559dd07cd0c9ac0335273e8c36a1adb"' }>
                                            <li class="link">
                                                <a href="components/StatisticsPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StatisticsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StatisticsPageRoutingModule.html" data-type="entity-link" >StatisticsPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TeamsPageModule.html" data-type="entity-link" >TeamsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TeamsPageModule-b419ea61ef5be9f36b69d3a620675ad8b5a1ee2be0291558adf776eced095ecedeb82daebb319c8ff414c5e29de3a2d34d2dc44d015254cb7597304158387c82"' : 'data-bs-target="#xs-components-links-module-TeamsPageModule-b419ea61ef5be9f36b69d3a620675ad8b5a1ee2be0291558adf776eced095ecedeb82daebb319c8ff414c5e29de3a2d34d2dc44d015254cb7597304158387c82"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TeamsPageModule-b419ea61ef5be9f36b69d3a620675ad8b5a1ee2be0291558adf776eced095ecedeb82daebb319c8ff414c5e29de3a2d34d2dc44d015254cb7597304158387c82"' :
                                            'id="xs-components-links-module-TeamsPageModule-b419ea61ef5be9f36b69d3a620675ad8b5a1ee2be0291558adf776eced095ecedeb82daebb319c8ff414c5e29de3a2d34d2dc44d015254cb7597304158387c82"' }>
                                            <li class="link">
                                                <a href="components/TeamsPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TeamsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TeamsPageRoutingModule.html" data-type="entity-link" >TeamsPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UsersPageModule.html" data-type="entity-link" >UsersPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-UsersPageModule-276f2a180383cdda12fb24fdaef053a48cc6cff8ebe8f1454c584aea8989c22ea32fbb307266b8744395978c81d3e1e7d51f77e8e04110ff08d9d0e6d1d0bae0"' : 'data-bs-target="#xs-components-links-module-UsersPageModule-276f2a180383cdda12fb24fdaef053a48cc6cff8ebe8f1454c584aea8989c22ea32fbb307266b8744395978c81d3e1e7d51f77e8e04110ff08d9d0e6d1d0bae0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UsersPageModule-276f2a180383cdda12fb24fdaef053a48cc6cff8ebe8f1454c584aea8989c22ea32fbb307266b8744395978c81d3e1e7d51f77e8e04110ff08d9d0e6d1d0bae0"' :
                                            'id="xs-components-links-module-UsersPageModule-276f2a180383cdda12fb24fdaef053a48cc6cff8ebe8f1454c584aea8989c22ea32fbb307266b8744395978c81d3e1e7d51f77e8e04110ff08d9d0e6d1d0bae0"' }>
                                            <li class="link">
                                                <a href="components/UsersPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersPageRoutingModule.html" data-type="entity-link" >UsersPageRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/SplashPage.html" data-type="entity-link" >SplashPage</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/StrapiMediaService.html" data-type="entity-link" >StrapiMediaService</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/BaseAuthenticationService.html" data-type="entity-link" >BaseAuthenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BaseMediaService.html" data-type="entity-link" >BaseMediaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BaseRepositoryFirebaseService.html" data-type="entity-link" >BaseRepositoryFirebaseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BaseRepositoryHttpService.html" data-type="entity-link" >BaseRepositoryHttpService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BaseRespositoryLocalStorageService.html" data-type="entity-link" >BaseRespositoryLocalStorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BaseService.html" data-type="entity-link" >BaseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FirebaseAuthenticationService.html" data-type="entity-link" >FirebaseAuthenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FirebaseAuthMappingService.html" data-type="entity-link" >FirebaseAuthMappingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FirebaseCollectionSubscriptionService.html" data-type="entity-link" >FirebaseCollectionSubscriptionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FirebaseMediaService.html" data-type="entity-link" >FirebaseMediaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JsonServerRepositoryService.html" data-type="entity-link" >JsonServerRepositoryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LanguageService.html" data-type="entity-link" >LanguageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LeagueJsonServerStorageMapping.html" data-type="entity-link" >LeagueJsonServerStorageMapping</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LeagueMappingFirebase.html" data-type="entity-link" >LeagueMappingFirebase</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LeagueMappingStrapi.html" data-type="entity-link" >LeagueMappingStrapi</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LeagueService.html" data-type="entity-link" >LeagueService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MatchMappingFirebase.html" data-type="entity-link" >MatchMappingFirebase</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MatchService.html" data-type="entity-link" >MatchService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MatchStatisticsMappingFirebase.html" data-type="entity-link" >MatchStatisticsMappingFirebase</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MatchStatsService.html" data-type="entity-link" >MatchStatsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PlayerJsonServerStorageMapping.html" data-type="entity-link" >PlayerJsonServerStorageMapping</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PlayerMappingFirebase.html" data-type="entity-link" >PlayerMappingFirebase</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PlayerMappingStrapi.html" data-type="entity-link" >PlayerMappingStrapi</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PlayerService.html" data-type="entity-link" >PlayerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StrapiAuthenticationService.html" data-type="entity-link" >StrapiAuthenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StrapiAuthMappingService.html" data-type="entity-link" >StrapiAuthMappingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StrapiRepositoryService.html" data-type="entity-link" >StrapiRepositoryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TeamJsonServerStorageMapping.html" data-type="entity-link" >TeamJsonServerStorageMapping</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TeamMappingFirebase.html" data-type="entity-link" >TeamMappingFirebase</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TeamMappingStrapi.html" data-type="entity-link" >TeamMappingStrapi</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TeamService.html" data-type="entity-link" >TeamService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersLocalStorageMapping.html" data-type="entity-link" >UsersLocalStorageMapping</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersMappingFirebase.html" data-type="entity-link" >UsersMappingFirebase</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersMappingStrapi.html" data-type="entity-link" >UsersMappingStrapi</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AdminGuard.html" data-type="entity-link" >AdminGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/CollectionChange.html" data-type="entity-link" >CollectionChange</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Data.html" data-type="entity-link" >Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Data-1.html" data-type="entity-link" >Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Data-2.html" data-type="entity-link" >Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Data-3.html" data-type="entity-link" >Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Data-4.html" data-type="entity-link" >Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FirebaseLeague.html" data-type="entity-link" >FirebaseLeague</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FirebaseMatch.html" data-type="entity-link" >FirebaseMatch</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FirebaseMatchStatistics.html" data-type="entity-link" >FirebaseMatchStatistics</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FirebasePlayer.html" data-type="entity-link" >FirebasePlayer</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FirebaseTeam.html" data-type="entity-link" >FirebaseTeam</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FirebaseUser.html" data-type="entity-link" >FirebaseUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Formats.html" data-type="entity-link" >Formats</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GroupRaw.html" data-type="entity-link" >GroupRaw</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAuthentication.html" data-type="entity-link" >IAuthentication</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAuthMapping.html" data-type="entity-link" >IAuthMapping</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBaseMapping.html" data-type="entity-link" >IBaseMapping</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBaseRepository.html" data-type="entity-link" >IBaseRepository</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBaseService.html" data-type="entity-link" >IBaseService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICollectionSubscription.html" data-type="entity-link" >ICollectionSubscription</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILeagueRepository.html" data-type="entity-link" >ILeagueRepository</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILeagueService.html" data-type="entity-link" >ILeagueService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IMatchRepository.html" data-type="entity-link" >IMatchRepository</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IMatchService.html" data-type="entity-link" >IMatchService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IMatchStatsRepository.html" data-type="entity-link" >IMatchStatsRepository</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IMatchStatsService.html" data-type="entity-link" >IMatchStatsService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPlayerRepository.html" data-type="entity-link" >IPlayerRepository</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPlayerService.html" data-type="entity-link" >IPlayerService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IStrapiAuthentication.html" data-type="entity-link" >IStrapiAuthentication</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITeamRepository.html" data-type="entity-link" >ITeamRepository</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITeamService.html" data-type="entity-link" >ITeamService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUserRepository.html" data-type="entity-link" >IUserRepository</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUserService.html" data-type="entity-link" >IUserService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Language.html" data-type="entity-link" >Language</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Large.html" data-type="entity-link" >Large</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/League.html" data-type="entity-link" >League</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LeagueAttributes.html" data-type="entity-link" >LeagueAttributes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LeagueAttributes-1.html" data-type="entity-link" >LeagueAttributes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LeagueData.html" data-type="entity-link" >LeagueData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LeagueData-1.html" data-type="entity-link" >LeagueData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LeagueData-2.html" data-type="entity-link" >LeagueData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LeagueRaw.html" data-type="entity-link" >LeagueRaw</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LeagueRaw-1.html" data-type="entity-link" >LeagueRaw</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LeagueRaw-2.html" data-type="entity-link" >LeagueRaw</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Match.html" data-type="entity-link" >Match</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MatchStatistics.html" data-type="entity-link" >MatchStatistics</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MatchWithTeams.html" data-type="entity-link" >MatchWithTeams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MatchWithTeams-1.html" data-type="entity-link" >MatchWithTeams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MatchWithTeams-2.html" data-type="entity-link" >MatchWithTeams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MediaRaw.html" data-type="entity-link" >MediaRaw</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MediaRaw-1.html" data-type="entity-link" >MediaRaw</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MediaRaw-2.html" data-type="entity-link" >MediaRaw</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MediaRaw-3.html" data-type="entity-link" >MediaRaw</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Medium.html" data-type="entity-link" >Medium</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Meta.html" data-type="entity-link" >Meta</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Meta-1.html" data-type="entity-link" >Meta</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Meta-2.html" data-type="entity-link" >Meta</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Meta-3.html" data-type="entity-link" >Meta</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Meta-4.html" data-type="entity-link" >Meta</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Model.html" data-type="entity-link" >Model</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Paginated.html" data-type="entity-link" >Paginated</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaginatedRaw.html" data-type="entity-link" >PaginatedRaw</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaginatedRaw-1.html" data-type="entity-link" >PaginatedRaw</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Pagination.html" data-type="entity-link" >Pagination</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PersonAttributes.html" data-type="entity-link" >PersonAttributes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PersonData.html" data-type="entity-link" >PersonData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PersonRaw.html" data-type="entity-link" >PersonRaw</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Player.html" data-type="entity-link" >Player</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PlayerAttributes.html" data-type="entity-link" >PlayerAttributes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PlayerData.html" data-type="entity-link" >PlayerData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PlayerRaw.html" data-type="entity-link" >PlayerRaw</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PlayerRaw-1.html" data-type="entity-link" >PlayerRaw</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProviderMetadata.html" data-type="entity-link" >ProviderMetadata</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SearchParams.html" data-type="entity-link" >SearchParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SignInPayload.html" data-type="entity-link" >SignInPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SignUpPayload.html" data-type="entity-link" >SignUpPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Small.html" data-type="entity-link" >Small</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StrapiMedia.html" data-type="entity-link" >StrapiMedia</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StrapiMediaData.html" data-type="entity-link" >StrapiMediaData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StrapiMeResponse.html" data-type="entity-link" >StrapiMeResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StrapiSignIn.html" data-type="entity-link" >StrapiSignIn</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StrapiSignInResponse.html" data-type="entity-link" >StrapiSignInResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StrapiSignUp.html" data-type="entity-link" >StrapiSignUp</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StrapiSignUpResponse.html" data-type="entity-link" >StrapiSignUpResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StrapiUser.html" data-type="entity-link" >StrapiUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Task.html" data-type="entity-link" >Task</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Team.html" data-type="entity-link" >Team</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TeamAttributes.html" data-type="entity-link" >TeamAttributes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TeamAttributes-1.html" data-type="entity-link" >TeamAttributes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TeamData.html" data-type="entity-link" >TeamData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TeamData-1.html" data-type="entity-link" >TeamData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TeamRaw.html" data-type="entity-link" >TeamRaw</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TeamRaw-1.html" data-type="entity-link" >TeamRaw</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TeamRaw-2.html" data-type="entity-link" >TeamRaw</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Thumbnail.html" data-type="entity-link" >Thumbnail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserAttributes.html" data-type="entity-link" >UserAttributes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserData.html" data-type="entity-link" >UserData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserRaw.html" data-type="entity-link" >UserRaw</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserRaw-1.html" data-type="entity-link" >UserRaw</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Users.html" data-type="entity-link" >Users</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});