import { MdMail, MdQrCode } from "react-icons/md"
import styles from "./TraderHeader.module.css";
import { IconButton } from "@chakra-ui/react";
import { BsQrCode } from "react-icons/bs";
import QRModal from "../QR/QRModal";
import { Link } from "react-router-dom";
import UserPullDown from "./UserPullDown";

function TraderHeader() {
  const username = "negi";
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
          <div style={{ width: "70px", height: "70px" }}>
            <IconButton
              variant={"plain"}
              height={"70px"}
              width={"70px"}
              background={"skyblue"}
              padding={"5px"}
            >
              <MdMail />
            </IconButton>
          </div>
          <div style={{ width: "70px", height: "70px" }}>
            <QRModal name={username} />
          </div>
          <div style={{ width: "100px", height: "70px" }}>
            <UserPullDown username={username} />
          </div>
        </p>
      </div>
    </div>
  )
}
export default TraderHeader