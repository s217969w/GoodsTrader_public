import { MdMail } from "react-icons/md"
import styles from "./TraderHeader.module.css";
import { IconButton } from "@chakra-ui/react";
import QRModal from "../QR/QRModal";
import { Link } from "react-router-dom";
import UserPullDown from "./UserPullDown";
import { useIsNarrow } from "../../utils/useWindowSize";

function TraderHeader() {
  const username = "negi";
  const isNarrow = useIsNarrow();
  const iconsize = (isNarrow ? "40px" : "70px")
  const menuW = (isNarrow ? "40px" : "120px")
  return (
    <div className={styles.TraderHeader}>
      <div className={styles.header_inner}>
        <Link to={"/"} key={"/"}>
          <p style={{
            textAlign: "left",
            display: "flex",
            alignItems: "center",
            gap: "0.7em",
            color: "black"
          }}>
            GoodsTrader
          </p>
        </Link>
        <p style={{
          textAlign: "right",
          display: "flex",
          alignItems: "center",
        }}>
          <div style={{ width: iconsize, height: iconsize }}>
            <IconButton
              variant={"plain"}
              height={iconsize}
              width={iconsize}
              background={"skyblue"}
              padding={"5px"}
            >
              <MdMail />
            </IconButton>
          </div>
          <div style={{ width: iconsize, height: iconsize }}>
            <QRModal name={username} size={iconsize}/>
          </div>
          <div style={{ width: menuW, height: iconsize }}>
            <UserPullDown username={username} menuH={iconsize} />
          </div>
        </p>
      </div>
    </div>
  )
}
export default TraderHeader