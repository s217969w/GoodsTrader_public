import GoodsTable from "../components/GoodsTable/GoodsTable";
import MobileList from "../components/GoodsTable/MobileList";
import { useIsNarrow } from "../utils/useWindowSize";

export default function Manage() {
  const isNarrow = useIsNarrow();
  return (
    <div style={{
      height: "100vh-50px",
      overflow: "auto",
      backgroundColor: "#FFFFCC"
    }}>
      {isNarrow ? <MobileList /> : <GoodsTable />}
    </div>
  )
}