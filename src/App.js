import React, { Suspense } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

import ProductionDashboard from "./Containers/Electronics/ProductionDashboard";
import ElectronicsCable from "./Containers/Electronics/ElectronicsCable";
import Layout from "./Containers/Electronics/FloatingButton";
import ElectronicsDownloads from "./Containers/Electronics/ElectronicsDownloads";
import SimWhiteListUpload from "./Containers/Electronics/SimWhiteListUpload";

const override = css`
  margin-top: 50%;
  margin-left: 50%;
  border-color: black;
`;

const BaseUrl = "/";

const Login = React.lazy(() => import("./Containers/Login/Login"));

const ElectronicsDash = React.lazy(() =>
  import("./Containers/Electronics/ElectronicsDash")
);
const ElectronicsTracker = React.lazy(() =>
  import("./Containers/Electronics/ElectronicsTracker")
);
const ElectronicsIIOT = React.lazy(() =>
  import("./Containers/Electronics/ElectronicsIIOT")
);

const ElectronicsIIotDash = React.lazy(() =>
  import("./Containers/Electronics/ElectronicsIIotDash")
);

const ShortageView = React.lazy(() =>
  import("./Containers/Electronics/ShortageView")
);

const IotMachAssingn = React.lazy(() =>
  import("./Containers/Electronics/IotMachAssingn")
);

const ElectronicsOrgChart = React.lazy(() =>
  import("./Containers/Electronics/ElectronicsOrgChart")
);
const ElectronicsCostSavings = React.lazy(() =>
  import("./Containers/Electronics/ElectronicsCostSavings")
);
const ElectronicsKRA = React.lazy(() =>
  import("./Containers/Electronics/ElectronicsKRA")
);
const ElectronicsHelp = React.lazy(() =>
  import("./Containers/Electronics/ElectronicsHelp")
);
const ElectronicFileUpload = React.lazy(() =>
  import("./Containers/Electronics/ElectronicFileUpload")
);
const ElectronicsProductionDashboard = React.lazy(() =>
  import("./Containers/Electronics/ElectronicsProductionDashboard")
);
const ElectronicsMonthPlanDashboard = React.lazy(() =>
  import("./Containers/Electronics/ElectronicsMonthPlanDashboard")
);
const ElectronicCostSavingInfoBar = React.lazy(() =>
  import("./Containers/Electronics/ElectronicCostSavingInfoBar")
);
const ElectronicProjecttracker = React.lazy(() =>
  import("./Containers/Electronics/ElectronicProjecttracker")
);
const HardwareAndSoftWare = React.lazy(() =>
  import("./Containers/Electronics/HardwareAndSoftware")
);
const ElectronicsHardware = React.lazy(() =>
  import("./Containers/Electronics/ElectronicsHardware")
);
const ElectronicsSoftware = React.lazy(() =>
  import("./Containers/Electronics/ElectronicsSoftware")
);
const ElectronicProgramsheet = React.lazy(() =>
  import("./Containers/Electronics/ElectronicProgramsheet")
);
const ElectronicTechDashboard = React.lazy(() =>
  import("./Containers/Electronics/ElectronicTechDashboard")
);
const ElectronicProjectProgress = React.lazy(() =>
  import("./Containers/Electronics/ElectronicProjectProgress")
);
const ElectronicServiceCalls = React.lazy(() =>
  import("./Containers/Electronics/ElectronicServiceCalls")
);
const ElectronicPricingDetail = React.lazy(() =>
  import("./Containers/Electronics/ElectronicPricingDetail")
);
const ElectronicPartPricing = React.lazy(() =>
  import("./Containers/Electronics/ElectronicPartPricing")
);

const ControlSystemComparision = React.lazy(() =>
  import("./Containers/Electronics/ControlSystemComparision")
);
const ControlSystemVerCompare = React.lazy(() =>
  import("./Containers/Electronics/ControlSystemVerCompare")
);

const ElectronicsCallsKeyIn = React.lazy(() =>
  import("./Containers/Electronics/ElectronicsCallsKeyIn")
);
const ElectronicsCallsKeyInClose = React.lazy(() =>
  import("./Containers/Electronics/ElectronicsCallsKeyInClose")
);
const ProductionG12 = React.lazy(() =>
  import("./Containers/Electronics/ProductionG12")
);

const HistoryG12 = React.lazy(() =>
  import("./Containers/Electronics/HistoryG12")
);

const ElectronicsXCMM = React.lazy(() =>
  import("./Containers/Electronics/ElectronicsXCMM")
);

const ElecttronicsXcmmInstallation = React.lazy(() =>
  import("./Containers/Electronics/ElecttronicsXcmmInstallation")
);

const ElectronicsJobcreate = React.lazy(() =>
  import("./Containers/Electronics/ElectronicsJobcreate")
);
// const TodoList = React.lazy(() => import("./Containers/Electronics/TodoList"));
function App() {
  return (
    <div className="App" style={{ height: "100%", backgroundColor: "#d9d9d9" }}>
      <Suspense
        fallback={<ClipLoader loading={true} size={150} css={override} />}
      >
        <BrowserRouter>
          {/* <Layout> */}
          <Switch>
            <Route
              exact
              path={[`${BaseUrl}login`, `${BaseUrl}`]}
              component={Login}
            />

            <PrivateRoute
              exact
              path={[`${BaseUrl}ElectronicsDash`]}
              component={ElectronicsDash}
              level={"Electronics"}
            />
            <PrivateRoute
              exact
              path={[`${BaseUrl}ElectronicsIIotDash`]}
              component={ElectronicsIIotDash}
              level={"Electronics"}
            />
            <PrivateRoute
              exact
              path={[`${BaseUrl}ElectronicsTracker`]}
              component={ElectronicsTracker}
              level={"Electronics"}
            />
            <PrivateRoute
              exact
              path={[`${BaseUrl}ElectronicsIIOT`]}
              component={ElectronicsIIOT}
              level={"Electronics"}
            />
            <PrivateRoute
              exact
              path={[`${BaseUrl}IotMachAssign`]}
              component={IotMachAssingn}
              level={"Electronics"}
            />

            <PrivateRoute
              exact
              path={[`${BaseUrl}ElectronicsOrgChart`]}
              component={ElectronicsOrgChart}
              level={"Electronics"}
            />
            <PrivateRoute
              exact
              path={[`${BaseUrl}ElectronicsCostSavings`]}
              component={ElectronicsCostSavings}
              level={"Electronics"}
            />
            <PrivateRoute
              exact
              path={[`${BaseUrl}Productiondashboard`]}
              component={ProductionDashboard}
              level={"Electronics"}
            />
            <PrivateRoute
              exact
              path={[`${BaseUrl}ElectronicsKRA`]}
              component={ElectronicsKRA}
              level={"Electronics"}
            />
            <PrivateRoute
              exact
              path={[`${BaseUrl}ElectronicsHelp`]}
              component={ElectronicsHelp}
              level={"Electronics"}
            />
            <PrivateRoute
              exact
              path={[`${BaseUrl}ElectronicsDownloads`]}
              component={ElectronicsDownloads}
              level={"Electronics"}
            />
            <PrivateRoute
              exact
              path={[`${BaseUrl}ElectronicFileUpload`]}
              component={ElectronicFileUpload}
              level={"Electronics"}
            />
            <PrivateRoute
              exact
              path={[`${BaseUrl}ElectronicCostSavingInfoBar`]}
              component={ElectronicCostSavingInfoBar}
              level={"Electronics"}
            />
            <PrivateRoute
              exact
              path={[`${BaseUrl}ElectronicProjecttracker`]}
              component={ElectronicProjecttracker}
              level={"Electronics"}
            />
            <PrivateRoute
              exact
              path={[`${BaseUrl}HardwareAndSoftware`]}
              component={HardwareAndSoftWare}
              level={"Electronics"}
            />
            <PrivateRoute
              exact
              path={[`${BaseUrl}ElectronicsHardware`]}
              component={ElectronicsHardware}
              level={"Electronics"}
            />
            <PrivateRoute
              exact
              path={[`${BaseUrl}ElectronicsSoftware`]}
              component={ElectronicsSoftware}
              level={"Electronics"}
            />
            <PrivateRoute
              exact
              path={[`${BaseUrl}ElectronicProgramsheet`]}
              component={ElectronicProgramsheet}
              level={"Electronics"}
            />
            <PrivateRoute
              exact
              path={[`${BaseUrl}ElectronicTechDashboard`]}
              component={ElectronicTechDashboard}
              level={"Electronics"}
            />
            <PrivateRoute
              exact
              path={[`${BaseUrl}ElectronicProjectProgress`]}
              component={ElectronicProjectProgress}
              level={"Electronics"}
            />
            <PrivateRoute
              exact
              path={[`${BaseUrl}ElectronicServiceCalls`]}
              component={ElectronicServiceCalls}
              level={"Electronics"}
            />
            <PrivateRoute
              exact
              path={[`${BaseUrl}ElectronicPricingDetail`]}
              component={ElectronicPricingDetail}
              level={"Electronics"}
            />
            <PrivateRoute
              exact
              path={[`${BaseUrl}ElectronicPartPricing`]}
              component={ElectronicPartPricing}
              level={"Electronics"}
            />
            <PrivateRoute
              exact
              path={[`${BaseUrl}ControlSystemComparision"`]}
              component={ControlSystemComparision}
              level={"Electronics"}
            />
            <PrivateRoute
              exact
              path={[`${BaseUrl}ControlSystemVerCompare`]}
              component={ControlSystemVerCompare}
              level={"Electronics"}
            />
            <PrivateRoute
              exact
              path={[`${BaseUrl}ElectronicsCallsKeyIn`]}
              component={ElectronicsCallsKeyIn}
              level={"Electronics"}
            />
            <PrivateRoute
              exact
              path={[`${BaseUrl}ElectronicsCallsKeyInClose`]}
              component={ElectronicsCallsKeyInClose}
              level={"Electronics"}
            />
            <PrivateRoute
              exact
              path={[`${BaseUrl}ProductionG12`]}
              component={ProductionG12}
              level={"Electronics"}
            />

            <PrivateRoute
              exact
              path={[`${BaseUrl}HistoryG12`]}
              component={HistoryG12}
              level={"Electronics"}
            />

            <PrivateRoute
              exact
              path={[`${BaseUrl}ShortageView`]}
              component={ShortageView}
              level={"Electronics"}
            />
            <PrivateRoute
              exact
              path={[`${BaseUrl}ElectronicsProductionDashboard`]}
              component={ElectronicsProductionDashboard}
              level={"Electronics"}
            />

            <PrivateRoute
              exact
              path={[`${BaseUrl}ElectronicsProductionDashboard`]}
              component={ElectronicsProductionDashboard}
              level={"Electronics"}
            />

            <PrivateRoute
              exact
              path={[`${BaseUrl}SimWhiteListUpload`]}
              component={SimWhiteListUpload}
              level={"Electronics"}
            />
            <PrivateRoute
              exact
              path={[`${BaseUrl}ElectronicsXCMM`]}
              component={ElectronicsXCMM}
              level={"Electronics"}
            />
            <PrivateRoute
              exact
              path={[`${BaseUrl}ElectronicsXcmmInstallation`]}
              component={ElecttronicsXcmmInstallation}
              level={"Electronics"}
            />
            <PrivateRoute
              exact
              path={[`${BaseUrl}ElectronicsJobCreate`]}
              component={ElectronicsJobcreate}
              level={"Electronics"}
            />
            <PrivateRoute
              exact
              path={[`${BaseUrl}ElectronicsCableStock`]}
              component={ElectronicsCable}
              level={"Electronics"}
            />
          </Switch>
          {/* </Layout> */}
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
