import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import TrailingSlashRedirect from "./components/TrailingSlashRedirect";
import { buildOrganizationSchema, buildWebSiteSchema } from "./lib/schema";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Apply from "./pages/Apply";
import HowItWorks from "./pages/HowItWorks";
import BestBadCreditAutoLoans from "./pages/BestBadCreditAutoLoans";
import BestBuyHerePayHere from "./pages/BestBuyHerePayHere";
import BestNoMoneyDown from "./pages/BestNoMoneyDown";
import BestGuaranteedApproval from "./pages/BestGuaranteedApproval";
import BestPreApproved from "./pages/BestPreApproved";
import BestNoCreditCheck from "./pages/BestNoCheckLoans";
import BestFirstTimeBuyers from "./pages/BestFirstTimeBuyer";
import BestAfterBankruptcy from "./pages/BestAfterBankruptcy";
import BestAfterRepossession from "./pages/BestAfterRepossession";
import BestSecondChance from "./pages/BestSecondChance";
import BestITIN from "./pages/BestITINLoans";
import BestRefinance from "./pages/BestRefinanceBadCredit";
import BestLowIncome from "./pages/BestLowIncome";
import CityPhoenixAzBadCreditAutoLoans from "@/pages/cities/CityPhoenixAzBadCreditAutoLoans";
import CityPhoenixAzBuyHerePayHere from "@/pages/cities/CityPhoenixAzBuyHerePayHere";
import CityPhoenixAzNoCreditCheckCarLoans from "@/pages/cities/CityPhoenixAzNoCreditCheckCarLoans";
import CityPhoenixAzGuaranteedApprovalAutoLoans from "@/pages/cities/CityPhoenixAzGuaranteedApprovalAutoLoans";
import CityPhoenixAzNoMoneyDownCarLoans from "@/pages/cities/CityPhoenixAzNoMoneyDownCarLoans";
import CityPhoenixAzSecondChanceAutoLoans from "@/pages/cities/CityPhoenixAzSecondChanceAutoLoans";
import CityPhoenixAzCarLoansAfterBankruptcy from "@/pages/cities/CityPhoenixAzCarLoansAfterBankruptcy";
import CityPhoenixAzAutoLoansAfterRepossession from "@/pages/cities/CityPhoenixAzAutoLoansAfterRepossession";
import CityDallasTxBadCreditAutoLoans from "@/pages/cities/CityDallasTxBadCreditAutoLoans";
import CityDallasTxBuyHerePayHere from "@/pages/cities/CityDallasTxBuyHerePayHere";
import CityDallasTxNoCreditCheckCarLoans from "@/pages/cities/CityDallasTxNoCreditCheckCarLoans";
import CityDallasTxGuaranteedApprovalAutoLoans from "@/pages/cities/CityDallasTxGuaranteedApprovalAutoLoans";
import CityDallasTxNoMoneyDownCarLoans from "@/pages/cities/CityDallasTxNoMoneyDownCarLoans";
import CityDallasTxSecondChanceAutoLoans from "@/pages/cities/CityDallasTxSecondChanceAutoLoans";
import CityDallasTxCarLoansAfterBankruptcy from "@/pages/cities/CityDallasTxCarLoansAfterBankruptcy";
import CityDallasTxAutoLoansAfterRepossession from "@/pages/cities/CityDallasTxAutoLoansAfterRepossession";
import CityChicagoIlBadCreditAutoLoans from "@/pages/cities/CityChicagoIlBadCreditAutoLoans";
import CityChicagoIlBuyHerePayHere from "@/pages/cities/CityChicagoIlBuyHerePayHere";
import CityChicagoIlNoCreditCheckCarLoans from "@/pages/cities/CityChicagoIlNoCreditCheckCarLoans";
import CityChicagoIlGuaranteedApprovalAutoLoans from "@/pages/cities/CityChicagoIlGuaranteedApprovalAutoLoans";
import CityChicagoIlNoMoneyDownCarLoans from "@/pages/cities/CityChicagoIlNoMoneyDownCarLoans";
import CityChicagoIlSecondChanceAutoLoans from "@/pages/cities/CityChicagoIlSecondChanceAutoLoans";
import CityChicagoIlCarLoansAfterBankruptcy from "@/pages/cities/CityChicagoIlCarLoansAfterBankruptcy";
import CityChicagoIlAutoLoansAfterRepossession from "@/pages/cities/CityChicagoIlAutoLoansAfterRepossession";
import CityFortWorthTxBadCreditAutoLoans from "@/pages/cities/CityFortWorthTxBadCreditAutoLoans";
import CityFortWorthTxBuyHerePayHere from "@/pages/cities/CityFortWorthTxBuyHerePayHere";
import CityFortWorthTxNoCreditCheckCarLoans from "@/pages/cities/CityFortWorthTxNoCreditCheckCarLoans";
import CityFortWorthTxGuaranteedApprovalAutoLoans from "@/pages/cities/CityFortWorthTxGuaranteedApprovalAutoLoans";
import CityFortWorthTxNoMoneyDownCarLoans from "@/pages/cities/CityFortWorthTxNoMoneyDownCarLoans";
import CityFortWorthTxSecondChanceAutoLoans from "@/pages/cities/CityFortWorthTxSecondChanceAutoLoans";
import CityFortWorthTxCarLoansAfterBankruptcy from "@/pages/cities/CityFortWorthTxCarLoansAfterBankruptcy";
import CityFortWorthTxAutoLoansAfterRepossession from "@/pages/cities/CityFortWorthTxAutoLoansAfterRepossession";
import CityDetroitMiBadCreditAutoLoans from "@/pages/cities/CityDetroitMiBadCreditAutoLoans";
import CityDetroitMiBuyHerePayHere from "@/pages/cities/CityDetroitMiBuyHerePayHere";
import CityDetroitMiNoCreditCheckCarLoans from "@/pages/cities/CityDetroitMiNoCreditCheckCarLoans";
import CityDetroitMiGuaranteedApprovalAutoLoans from "@/pages/cities/CityDetroitMiGuaranteedApprovalAutoLoans";
import CityDetroitMiNoMoneyDownCarLoans from "@/pages/cities/CityDetroitMiNoMoneyDownCarLoans";
import CityDetroitMiSecondChanceAutoLoans from "@/pages/cities/CityDetroitMiSecondChanceAutoLoans";
import CityDetroitMiCarLoansAfterBankruptcy from "@/pages/cities/CityDetroitMiCarLoansAfterBankruptcy";
import CityDetroitMiAutoLoansAfterRepossession from "@/pages/cities/CityDetroitMiAutoLoansAfterRepossession";
import CityTulsaOkBadCreditAutoLoans from "@/pages/cities/CityTulsaOkBadCreditAutoLoans";
import CityTulsaOkBuyHerePayHere from "@/pages/cities/CityTulsaOkBuyHerePayHere";
import CityTulsaOkNoCreditCheckCarLoans from "@/pages/cities/CityTulsaOkNoCreditCheckCarLoans";
import CityTulsaOkGuaranteedApprovalAutoLoans from "@/pages/cities/CityTulsaOkGuaranteedApprovalAutoLoans";
import CityTulsaOkNoMoneyDownCarLoans from "@/pages/cities/CityTulsaOkNoMoneyDownCarLoans";
import CityTulsaOkSecondChanceAutoLoans from "@/pages/cities/CityTulsaOkSecondChanceAutoLoans";
import CityTulsaOkCarLoansAfterBankruptcy from "@/pages/cities/CityTulsaOkCarLoansAfterBankruptcy";
import CityTulsaOkAutoLoansAfterRepossession from "@/pages/cities/CityTulsaOkAutoLoansAfterRepossession";
import CityColumbusOhBadCreditAutoLoans from "@/pages/cities/CityColumbusOhBadCreditAutoLoans";
import CityColumbusOhBuyHerePayHere from "@/pages/cities/CityColumbusOhBuyHerePayHere";
import CityColumbusOhNoCreditCheckCarLoans from "@/pages/cities/CityColumbusOhNoCreditCheckCarLoans";
import CityColumbusOhGuaranteedApprovalAutoLoans from "@/pages/cities/CityColumbusOhGuaranteedApprovalAutoLoans";
import CityColumbusOhNoMoneyDownCarLoans from "@/pages/cities/CityColumbusOhNoMoneyDownCarLoans";
import CityColumbusOhSecondChanceAutoLoans from "@/pages/cities/CityColumbusOhSecondChanceAutoLoans";
import CityColumbusOhCarLoansAfterBankruptcy from "@/pages/cities/CityColumbusOhCarLoansAfterBankruptcy";
import CityColumbusOhAutoLoansAfterRepossession from "@/pages/cities/CityColumbusOhAutoLoansAfterRepossession";
import CityCharlotteNcBadCreditAutoLoans from "@/pages/cities/CityCharlotteNcBadCreditAutoLoans";
import CityCharlotteNcBuyHerePayHere from "@/pages/cities/CityCharlotteNcBuyHerePayHere";
import CityCharlotteNcNoCreditCheckCarLoans from "@/pages/cities/CityCharlotteNcNoCreditCheckCarLoans";
import CityCharlotteNcGuaranteedApprovalAutoLoans from "@/pages/cities/CityCharlotteNcGuaranteedApprovalAutoLoans";
import CityCharlotteNcNoMoneyDownCarLoans from "@/pages/cities/CityCharlotteNcNoMoneyDownCarLoans";
import CityCharlotteNcSecondChanceAutoLoans from "@/pages/cities/CityCharlotteNcSecondChanceAutoLoans";
import CityCharlotteNcCarLoansAfterBankruptcy from "@/pages/cities/CityCharlotteNcCarLoansAfterBankruptcy";
import CityCharlotteNcAutoLoansAfterRepossession from "@/pages/cities/CityCharlotteNcAutoLoansAfterRepossession";
import CitySanAntonioTxBadCreditAutoLoans from "@/pages/cities/CitySanAntonioTxBadCreditAutoLoans";
import CitySanAntonioTxBuyHerePayHere from "@/pages/cities/CitySanAntonioTxBuyHerePayHere";
import CitySanAntonioTxNoCreditCheckCarLoans from "@/pages/cities/CitySanAntonioTxNoCreditCheckCarLoans";
import CitySanAntonioTxGuaranteedApprovalAutoLoans from "@/pages/cities/CitySanAntonioTxGuaranteedApprovalAutoLoans";
import CitySanAntonioTxNoMoneyDownCarLoans from "@/pages/cities/CitySanAntonioTxNoMoneyDownCarLoans";
import CitySanAntonioTxSecondChanceAutoLoans from "@/pages/cities/CitySanAntonioTxSecondChanceAutoLoans";
import CitySanAntonioTxCarLoansAfterBankruptcy from "@/pages/cities/CitySanAntonioTxCarLoansAfterBankruptcy";
import CitySanAntonioTxAutoLoansAfterRepossession from "@/pages/cities/CitySanAntonioTxAutoLoansAfterRepossession";
import CityColoradoSpringsCoBadCreditAutoLoans from "@/pages/cities/CityColoradoSpringsCoBadCreditAutoLoans";
import CityColoradoSpringsCoBuyHerePayHere from "@/pages/cities/CityColoradoSpringsCoBuyHerePayHere";
import CityColoradoSpringsCoNoCreditCheckCarLoans from "@/pages/cities/CityColoradoSpringsCoNoCreditCheckCarLoans";
import CityColoradoSpringsCoGuaranteedApprovalAutoLoans from "@/pages/cities/CityColoradoSpringsCoGuaranteedApprovalAutoLoans";
import CityColoradoSpringsCoNoMoneyDownCarLoans from "@/pages/cities/CityColoradoSpringsCoNoMoneyDownCarLoans";
import CityColoradoSpringsCoSecondChanceAutoLoans from "@/pages/cities/CityColoradoSpringsCoSecondChanceAutoLoans";
import CityColoradoSpringsCoCarLoansAfterBankruptcy from "@/pages/cities/CityColoradoSpringsCoCarLoansAfterBankruptcy";
import CityColoradoSpringsCoAutoLoansAfterRepossession from "@/pages/cities/CityColoradoSpringsCoAutoLoansAfterRepossession";

function SiteSchemas() {
  useEffect(() => {
    // Inject sitewide Organization + WebSite JSON-LD once at app mount
    const schemas = [buildOrganizationSchema(), buildWebSiteSchema()];
    schemas.forEach((s) => {
      const existing = document.querySelector(`script[data-schema-type="${s['@type']}"]`);
      if (existing) return;
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-schema-type", s["@type"]);
      script.textContent = JSON.stringify(s);
      document.head.appendChild(script);
    });
  }, []);
  return null;
}

function Router() {
  return (
    <>
      <TrailingSlashRedirect />
      <Switch>
      <Route path="/" component={Home} />
      <Route path="/apply" component={Apply} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/best-bad-credit-auto-loans" component={BestBadCreditAutoLoans} />
      <Route path="/best-buy-here-pay-here-dealerships" component={BestBuyHerePayHere} />
      <Route path="/best-no-money-down-car-loans-bad-credit" component={BestNoMoneyDown} />
      <Route path="/best-guaranteed-approval-auto-loans" component={BestGuaranteedApproval} />
      <Route path="/best-pre-approved-car-loans-bad-credit" component={BestPreApproved} />
      <Route path="/best-no-credit-check-car-loans" component={BestNoCreditCheck} />
      <Route path="/best-first-time-car-buyer-loans-no-credit" component={BestFirstTimeBuyers} />
      <Route path="/best-car-loans-after-bankruptcy" component={BestAfterBankruptcy} />
      <Route path="/best-auto-loans-after-repossession" component={BestAfterRepossession} />
      <Route path="/best-second-chance-auto-loans" component={BestSecondChance} />
      <Route path="/best-itin-auto-loans" component={BestITIN} />
      <Route path="/best-auto-refinance-bad-credit" component={BestRefinance} />
      <Route path="/best-car-loans-low-income" component={BestLowIncome} />
      <Route path="/phoenix-az/bad-credit-auto-loans" component={CityPhoenixAzBadCreditAutoLoans} />
      <Route path="/phoenix-az/buy-here-pay-here" component={CityPhoenixAzBuyHerePayHere} />
      <Route path="/phoenix-az/no-credit-check-car-loans" component={CityPhoenixAzNoCreditCheckCarLoans} />
      <Route path="/phoenix-az/guaranteed-approval-auto-loans" component={CityPhoenixAzGuaranteedApprovalAutoLoans} />
      <Route path="/phoenix-az/no-money-down-car-loans" component={CityPhoenixAzNoMoneyDownCarLoans} />
      <Route path="/phoenix-az/second-chance-auto-loans" component={CityPhoenixAzSecondChanceAutoLoans} />
      <Route path="/phoenix-az/car-loans-after-bankruptcy" component={CityPhoenixAzCarLoansAfterBankruptcy} />
      <Route path="/phoenix-az/auto-loans-after-repossession" component={CityPhoenixAzAutoLoansAfterRepossession} />
      <Route path="/dallas-tx/bad-credit-auto-loans" component={CityDallasTxBadCreditAutoLoans} />
      <Route path="/dallas-tx/buy-here-pay-here" component={CityDallasTxBuyHerePayHere} />
      <Route path="/dallas-tx/no-credit-check-car-loans" component={CityDallasTxNoCreditCheckCarLoans} />
      <Route path="/dallas-tx/guaranteed-approval-auto-loans" component={CityDallasTxGuaranteedApprovalAutoLoans} />
      <Route path="/dallas-tx/no-money-down-car-loans" component={CityDallasTxNoMoneyDownCarLoans} />
      <Route path="/dallas-tx/second-chance-auto-loans" component={CityDallasTxSecondChanceAutoLoans} />
      <Route path="/dallas-tx/car-loans-after-bankruptcy" component={CityDallasTxCarLoansAfterBankruptcy} />
      <Route path="/dallas-tx/auto-loans-after-repossession" component={CityDallasTxAutoLoansAfterRepossession} />
      <Route path="/chicago-il/bad-credit-auto-loans" component={CityChicagoIlBadCreditAutoLoans} />
      <Route path="/chicago-il/buy-here-pay-here" component={CityChicagoIlBuyHerePayHere} />
      <Route path="/chicago-il/no-credit-check-car-loans" component={CityChicagoIlNoCreditCheckCarLoans} />
      <Route path="/chicago-il/guaranteed-approval-auto-loans" component={CityChicagoIlGuaranteedApprovalAutoLoans} />
      <Route path="/chicago-il/no-money-down-car-loans" component={CityChicagoIlNoMoneyDownCarLoans} />
      <Route path="/chicago-il/second-chance-auto-loans" component={CityChicagoIlSecondChanceAutoLoans} />
      <Route path="/chicago-il/car-loans-after-bankruptcy" component={CityChicagoIlCarLoansAfterBankruptcy} />
      <Route path="/chicago-il/auto-loans-after-repossession" component={CityChicagoIlAutoLoansAfterRepossession} />
      <Route path="/fort-worth-tx/bad-credit-auto-loans" component={CityFortWorthTxBadCreditAutoLoans} />
      <Route path="/fort-worth-tx/buy-here-pay-here" component={CityFortWorthTxBuyHerePayHere} />
      <Route path="/fort-worth-tx/no-credit-check-car-loans" component={CityFortWorthTxNoCreditCheckCarLoans} />
      <Route path="/fort-worth-tx/guaranteed-approval-auto-loans" component={CityFortWorthTxGuaranteedApprovalAutoLoans} />
      <Route path="/fort-worth-tx/no-money-down-car-loans" component={CityFortWorthTxNoMoneyDownCarLoans} />
      <Route path="/fort-worth-tx/second-chance-auto-loans" component={CityFortWorthTxSecondChanceAutoLoans} />
      <Route path="/fort-worth-tx/car-loans-after-bankruptcy" component={CityFortWorthTxCarLoansAfterBankruptcy} />
      <Route path="/fort-worth-tx/auto-loans-after-repossession" component={CityFortWorthTxAutoLoansAfterRepossession} />
      <Route path="/detroit-mi/bad-credit-auto-loans" component={CityDetroitMiBadCreditAutoLoans} />
      <Route path="/detroit-mi/buy-here-pay-here" component={CityDetroitMiBuyHerePayHere} />
      <Route path="/detroit-mi/no-credit-check-car-loans" component={CityDetroitMiNoCreditCheckCarLoans} />
      <Route path="/detroit-mi/guaranteed-approval-auto-loans" component={CityDetroitMiGuaranteedApprovalAutoLoans} />
      <Route path="/detroit-mi/no-money-down-car-loans" component={CityDetroitMiNoMoneyDownCarLoans} />
      <Route path="/detroit-mi/second-chance-auto-loans" component={CityDetroitMiSecondChanceAutoLoans} />
      <Route path="/detroit-mi/car-loans-after-bankruptcy" component={CityDetroitMiCarLoansAfterBankruptcy} />
      <Route path="/detroit-mi/auto-loans-after-repossession" component={CityDetroitMiAutoLoansAfterRepossession} />
      <Route path="/tulsa-ok/bad-credit-auto-loans" component={CityTulsaOkBadCreditAutoLoans} />
      <Route path="/tulsa-ok/buy-here-pay-here" component={CityTulsaOkBuyHerePayHere} />
      <Route path="/tulsa-ok/no-credit-check-car-loans" component={CityTulsaOkNoCreditCheckCarLoans} />
      <Route path="/tulsa-ok/guaranteed-approval-auto-loans" component={CityTulsaOkGuaranteedApprovalAutoLoans} />
      <Route path="/tulsa-ok/no-money-down-car-loans" component={CityTulsaOkNoMoneyDownCarLoans} />
      <Route path="/tulsa-ok/second-chance-auto-loans" component={CityTulsaOkSecondChanceAutoLoans} />
      <Route path="/tulsa-ok/car-loans-after-bankruptcy" component={CityTulsaOkCarLoansAfterBankruptcy} />
      <Route path="/tulsa-ok/auto-loans-after-repossession" component={CityTulsaOkAutoLoansAfterRepossession} />
      <Route path="/columbus-oh/bad-credit-auto-loans" component={CityColumbusOhBadCreditAutoLoans} />
      <Route path="/columbus-oh/buy-here-pay-here" component={CityColumbusOhBuyHerePayHere} />
      <Route path="/columbus-oh/no-credit-check-car-loans" component={CityColumbusOhNoCreditCheckCarLoans} />
      <Route path="/columbus-oh/guaranteed-approval-auto-loans" component={CityColumbusOhGuaranteedApprovalAutoLoans} />
      <Route path="/columbus-oh/no-money-down-car-loans" component={CityColumbusOhNoMoneyDownCarLoans} />
      <Route path="/columbus-oh/second-chance-auto-loans" component={CityColumbusOhSecondChanceAutoLoans} />
      <Route path="/columbus-oh/car-loans-after-bankruptcy" component={CityColumbusOhCarLoansAfterBankruptcy} />
      <Route path="/columbus-oh/auto-loans-after-repossession" component={CityColumbusOhAutoLoansAfterRepossession} />
      <Route path="/charlotte-nc/bad-credit-auto-loans" component={CityCharlotteNcBadCreditAutoLoans} />
      <Route path="/charlotte-nc/buy-here-pay-here" component={CityCharlotteNcBuyHerePayHere} />
      <Route path="/charlotte-nc/no-credit-check-car-loans" component={CityCharlotteNcNoCreditCheckCarLoans} />
      <Route path="/charlotte-nc/guaranteed-approval-auto-loans" component={CityCharlotteNcGuaranteedApprovalAutoLoans} />
      <Route path="/charlotte-nc/no-money-down-car-loans" component={CityCharlotteNcNoMoneyDownCarLoans} />
      <Route path="/charlotte-nc/second-chance-auto-loans" component={CityCharlotteNcSecondChanceAutoLoans} />
      <Route path="/charlotte-nc/car-loans-after-bankruptcy" component={CityCharlotteNcCarLoansAfterBankruptcy} />
      <Route path="/charlotte-nc/auto-loans-after-repossession" component={CityCharlotteNcAutoLoansAfterRepossession} />
      <Route path="/san-antonio-tx/bad-credit-auto-loans" component={CitySanAntonioTxBadCreditAutoLoans} />
      <Route path="/san-antonio-tx/buy-here-pay-here" component={CitySanAntonioTxBuyHerePayHere} />
      <Route path="/san-antonio-tx/no-credit-check-car-loans" component={CitySanAntonioTxNoCreditCheckCarLoans} />
      <Route path="/san-antonio-tx/guaranteed-approval-auto-loans" component={CitySanAntonioTxGuaranteedApprovalAutoLoans} />
      <Route path="/san-antonio-tx/no-money-down-car-loans" component={CitySanAntonioTxNoMoneyDownCarLoans} />
      <Route path="/san-antonio-tx/second-chance-auto-loans" component={CitySanAntonioTxSecondChanceAutoLoans} />
      <Route path="/san-antonio-tx/car-loans-after-bankruptcy" component={CitySanAntonioTxCarLoansAfterBankruptcy} />
      <Route path="/san-antonio-tx/auto-loans-after-repossession" component={CitySanAntonioTxAutoLoansAfterRepossession} />
      <Route path="/colorado-springs-co/bad-credit-auto-loans" component={CityColoradoSpringsCoBadCreditAutoLoans} />
      <Route path="/colorado-springs-co/buy-here-pay-here" component={CityColoradoSpringsCoBuyHerePayHere} />
      <Route path="/colorado-springs-co/no-credit-check-car-loans" component={CityColoradoSpringsCoNoCreditCheckCarLoans} />
      <Route path="/colorado-springs-co/guaranteed-approval-auto-loans" component={CityColoradoSpringsCoGuaranteedApprovalAutoLoans} />
      <Route path="/colorado-springs-co/no-money-down-car-loans" component={CityColoradoSpringsCoNoMoneyDownCarLoans} />
      <Route path="/colorado-springs-co/second-chance-auto-loans" component={CityColoradoSpringsCoSecondChanceAutoLoans} />
      <Route path="/colorado-springs-co/car-loans-after-bankruptcy" component={CityColoradoSpringsCoCarLoansAfterBankruptcy} />
      <Route path="/colorado-springs-co/auto-loans-after-repossession" component={CityColoradoSpringsCoAutoLoansAfterRepossession} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <SiteSchemas />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
