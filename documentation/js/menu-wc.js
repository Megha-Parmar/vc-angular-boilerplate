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
                    <a href="index.html" data-type="index-link">vc-angular-boilerplate documentation</a>
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
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AppComponent.html" data-type="entity-link" >AppComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BreadcrumbComponent.html" data-type="entity-link" >BreadcrumbComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CpActionToolbarComponent.html" data-type="entity-link" >CpActionToolbarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CpButtonComponent.html" data-type="entity-link" >CpButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CpLoaderComponent.html" data-type="entity-link" >CpLoaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CpTelInputComponent.html" data-type="entity-link" >CpTelInputComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DashboardComponent.html" data-type="entity-link" >DashboardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ForgotPasswordComponent.html" data-type="entity-link" >ForgotPasswordComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HeaderComponent.html" data-type="entity-link" >HeaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoginComponent.html" data-type="entity-link" >LoginComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LogoutComponent.html" data-type="entity-link" >LogoutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PagesComponent.html" data-type="entity-link" >PagesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PartnerAddComponent.html" data-type="entity-link" >PartnerAddComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PartnerListComponent.html" data-type="entity-link" >PartnerListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SidebarComponent.html" data-type="entity-link" >SidebarComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#directives-links"' :
                                'data-bs-target="#xs-directives-links"' }>
                                <span class="icon ion-md-code-working"></span>
                                <span>Directives</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="directives-links"' : 'id="xs-directives-links"' }>
                                <li class="link">
                                    <a href="directives/AllowNumberOnlyDirective.html" data-type="entity-link" >AllowNumberOnlyDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/DynamicDirective.html" data-type="entity-link" >DynamicDirective</a>
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
                                <a href="classes/LoggerService.html" data-type="entity-link" >LoggerService</a>
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
                                    <a href="injectables/AdminService.html" data-type="entity-link" >AdminService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AlertToastrService.html" data-type="entity-link" >AlertToastrService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthenticationService.html" data-type="entity-link" >AuthenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CpEventsService.html" data-type="entity-link" >CpEventsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CryptoService.html" data-type="entity-link" >CryptoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HttpClientService.html" data-type="entity-link" >HttpClientService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStorageService.html" data-type="entity-link" >LocalStorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PartnerService.html" data-type="entity-link" >PartnerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SessionStorageService.html" data-type="entity-link" >SessionStorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UtilityService.html" data-type="entity-link" >UtilityService</a>
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
                                <a href="interfaces/ActionToolbar.html" data-type="entity-link" >ActionToolbar</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddPartnerForm.html" data-type="entity-link" >AddPartnerForm</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Address.html" data-type="entity-link" >Address</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BreadCrumb.html" data-type="entity-link" >BreadCrumb</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BreadcrumbEventModel.html" data-type="entity-link" >BreadcrumbEventModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BuyingRedeemDetail.html" data-type="entity-link" >BuyingRedeemDetail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BuyingRedeemList.html" data-type="entity-link" >BuyingRedeemList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CardAccountingStats.html" data-type="entity-link" >CardAccountingStats</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CardCodeDetail.html" data-type="entity-link" >CardCodeDetail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CardCodeList.html" data-type="entity-link" >CardCodeList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreatePartner.html" data-type="entity-link" >CreatePartner</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DashboardAccountingStats.html" data-type="entity-link" >DashboardAccountingStats</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GenerateCards.html" data-type="entity-link" >GenerateCards</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GenerateCardsForm.html" data-type="entity-link" >GenerateCardsForm</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InvoiceDetail.html" data-type="entity-link" >InvoiceDetail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InvoiceList.html" data-type="entity-link" >InvoiceList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginParams.html" data-type="entity-link" >LoginParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginResponse.html" data-type="entity-link" >LoginResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OpenPayment.html" data-type="entity-link" >OpenPayment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PartnerAddress.html" data-type="entity-link" >PartnerAddress</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PartnerDetail.html" data-type="entity-link" >PartnerDetail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PartnerList.html" data-type="entity-link" >PartnerList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PartnerListQueryParams.html" data-type="entity-link" >PartnerListQueryParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PerformanceOverview.html" data-type="entity-link" >PerformanceOverview</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PerformanceStats.html" data-type="entity-link" >PerformanceStats</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PerformanceStatsParams.html" data-type="entity-link" >PerformanceStatsParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RedemptionDetail.html" data-type="entity-link" >RedemptionDetail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RedemptionList.html" data-type="entity-link" >RedemptionList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TopPartners.html" data-type="entity-link" >TopPartners</a>
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
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
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