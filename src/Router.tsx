import { Routes, Route } from "react-router-dom";
import ProposePage from "./pages/ProposePage.tsx";
import Manage from "./pages/manage.tsx";
import Guide from "./pages/Guide.tsx";
import MobileGuide from "./pages/MobileGuide.tsx";
import { useIsNarrow } from "./utils/useWindowSize.ts";

export default function Router() {
  const isNarrow = useIsNarrow();
  return (
    <Routes>
      <Route path="/" element={<Manage />} />{/*デフォルト */}
      <Route path="/trade/propose" element={<ProposePage />} />
      <Route path="/about" element={isNarrow ? <MobileGuide /> : <Guide />} />
      <Route path="*" element={<div>404 not found</div>} />
    </Routes>
  );
}