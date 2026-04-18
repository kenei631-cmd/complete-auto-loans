import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import BestBadCreditAutoLoans from "./pages/BestBadCreditAutoLoans";
import BestBuyHerePayHere from "./pages/BestBuyHerePayHere";
import BestNoMoneyDown from "./pages/BestNoMoneyDown";
import BestGuaranteedApproval from "./pages/BestGuaranteedApproval";
import BestPreApproved from "./pages/BestPreApproved";
import BestNoCheckLoans from "./pages/BestNoCheckLoans";
import BestFirstTimeBuyer from "./pages/BestFirstTimeBuyer";
import BestAfterBankruptcy from "./pages/BestAfterBankruptcy";
import BestAfterRepossession from "./pages/BestAfterRepossession";
import BestSecondChance from "./pages/BestSecondChance";
import BestITINLoans from "./pages/BestITINLoans";
import BestRefinanceBadCredit from "./pages/BestRefinanceBadCredit";
import BestLowIncome from "./pages/BestLowIncome";
import Apply from "./pages/Apply";
import HowItWorks from "./pages/HowItWorks";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/best-bad-credit-auto-loans" component={BestBadCreditAutoLoans} />
      <Route path="/best-buy-here-pay-here-dealerships" component={BestBuyHerePayHere} />
      <Route path="/best-no-money-down-car-loans" component={BestNoMoneyDown} />
      <Route path="/best-guaranteed-approval-auto-loans" component={BestGuaranteedApproval} />
      <Route path="/best-pre-approved-car-loans-bad-credit" component={BestPreApproved} />
      <Route path="/best-no-credit-check-car-loans" component={BestNoCheckLoans} />
      <Route path="/best-first-time-car-buyer-loans" component={BestFirstTimeBuyer} />
      <Route path="/best-car-loans-after-bankruptcy" component={BestAfterBankruptcy} />
      <Route path="/best-auto-loans-after-repossession" component={BestAfterRepossession} />
      <Route path="/best-second-chance-auto-loans" component={BestSecondChance} />
      <Route path="/best-itin-auto-loans" component={BestITINLoans} />
      <Route path="/best-auto-refinance-bad-credit" component={BestRefinanceBadCredit} />
      <Route path="/best-car-loans-low-income" component={BestLowIncome} />
      <Route path="/apply" component={Apply} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
