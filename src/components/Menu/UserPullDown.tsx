import { useEffect, useRef, useState } from "react";
import styles from "./UserPullDown.module.css";
import { BsQrCode, BsQuestionCircle } from "react-icons/bs";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import TradeModal from "../trade/TradeModal";
import { useIsNarrow } from "../../utils/useWindowSize";
import { MdMenu } from "react-icons/md";
import { IconButton } from "@chakra-ui/react";
import { TbCards } from "react-icons/tb";

interface PullDownProps {
  username: string;
  menuH: string;
}

function UserPullDown({ username, menuH }: PullDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const isNarrow = useIsNarrow();
  const menuRef: any = useRef()

  useEffect(() => {
    isOpen && menuRef.current.focus()
  }, [isOpen])

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <ul className={styles.gnavi__lists}>
        <li className={styles.gnavi__list}
          onClick={() => { setIsOpen(!isOpen) }}>
          {isNarrow ? (
            <div style={{ display: "flex", height: menuH, padding: "10px" }}>
              <IconButton
                variant={"plain"}
                height={menuH}
                width={menuH}
                background={"skyblue"}
                padding={"5px"}
              >
                <MdMenu />
              </IconButton>
            </div>
          ) : (
            <div style={{ display: "flex", height: menuH, padding: "10px" }}>
              <div style={{ height: menuH, padding: "10px" }}>
                {username}
              </div>
              <div style={{ height: menuH, padding: "10px" }}>
                {isOpen ? (
                  <BiSolidUpArrow height={"8px"} />
                ) : (
                  <BiSolidDownArrow height={"8px"} />
                )}
              </div>
            </div>
          )
          }
          <ul
            className={styles.dropdown__lists}
            style={{ display: (isOpen ? "block" : "none") }}
            onBlur={() => { if (!modalOpen) setTimeout(() => setIsOpen(false), 100) }}
            ref={menuRef}
            tabIndex={1}
          >
            <li className={styles.dropdown__list}>
              <a href="/">
                <TbCards /> ホーム
              </a>
            </li>
            <li className={styles.dropdown__list}>
              <button
                style={{ color:"white", background: "none", border: "none", cursor: "pointer", width: "100%" }}
                onClick={() => {
                  setModalOpen(true);
                  setIsOpen(false);
                }}
              >
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <BsQrCode />QR読み込み
                </div>
              </button>
            </li>
            <li className={styles.dropdown__list}><a href="/about">
              <BsQuestionCircle />使い方
            </a></li>
          </ul>
        </li>
      </ul>
      <TradeModal isOpen={modalOpen} setIsOpen={setModalOpen} />
    </div>
  )
}
export default UserPullDown