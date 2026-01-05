import { Routes, Route } from "react-router-dom";
import QR from "./pages/QR.tsx";
import Trade from "./pages/Trade.tsx";
import ProposePage from "./pages/ProposePage.tsx";
import Load from "./pages/Load.tsx";
import Confirm from "./components/ImportData/ImportModal.tsx";
import Manage from "./pages/manage.tsx";
import Portal from "./pages/portal.tsx";
import Guide from "./pages/Guide.tsx";
import MobileGuide from "./pages/MobileGuide.tsx";
import { useIsNarrow } from "./utils/useWindowSize.ts";

export default function Router() {
  const isNarrow = useIsNarrow();
  return (
    <Routes>
      <Route path="/" element={<Manage />} />{/*デフォルト */}
      <Route path="/trade" element={<Trade />} />
      <Route path="/trade/propose" element={<ProposePage />} />
      <Route path="/about" element={isNarrow ? <MobileGuide /> : <Guide />} />
      <Route path="*" element={<div>404 not found</div>} />
    </Routes>
  );
}