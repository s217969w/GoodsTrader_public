import { useState } from "react";
import styles from "./UserPullDown.module.css";
import BsQuestionCircle from "react-icons/bs";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import TradeModal from "../trade/TradeModal";

interface PullDownProps {
  username: string;
}

function UserPullDown({ username }: PullDownProps) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <ul className={styles.gnavi__lists}>
        <li className={styles.gnavi__list}
          onClick={() => { setIsOpen(!isOpen) }}>
          <div style={{ display: "flex", height: "70px", padding: "10px" }}>
            <div style={{ height: "70px", padding: "10px" }}>
              {username}
            </div>
            <div style={{ height: "70px", padding: "10px" }}>
              {isOpen ? (
                <BiSolidUpArrow height={"8px"} />
              ) : (
                <BiSolidDownArrow height={"8px"} />
              )}
            </div>
          </div>
          <ul
            className={styles.dropdown__lists}
            style={{ display: (isOpen ? "block" : "none") }}
          >
            <li className={styles.dropdown__list} onClick={() => setIsOpen(false)}>
              <TradeModal />
            </li>
            <li className={styles.dropdown__list}><a href="/">メニュータイトル</a></li>
            <li className={styles.dropdown__list}><a href="/">メニュータイトル</a></li>
            <li className={styles.dropdown__list}><a href="/about">
              <BsQuestionCircle />使い方
            </a></li>
          </ul>

        </li>
      </ul>
    </div>
  )
}
export default UserPullDown