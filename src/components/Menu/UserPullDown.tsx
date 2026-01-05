import { useState } from "react";
import styles from "./UserPullDown.module.css";
import { BsArrowDown, BsMenuDown, BsQrCode } from "react-icons/bs";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";

interface PullDownProps {
  username: string;
}

function UserPullDown({ username }: PullDownProps) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div style={{width:"100%", textAlign:"center"}}>
      <ul className={styles.gnavi__lists} 
      onClick={() => {setIsOpen(!isOpen)}}
      >
        <li className={styles.gnavi__list} >
          <div style={{display:"flex", height:"70px", padding:"10px"}}>
            <div style={{height:"70px", padding:"10px"}}>
            {username}
            </div>
            <div style={{height:"70px", padding:"10px"}}>
            {isOpen ? (
              <BiSolidUpArrow height={"8px"}/>
            ):(
            <BiSolidDownArrow height={"8px"}/>
            )}
            </div>
          </div>
          <ul
          className={styles.dropdown__lists} 
          style={{display:(isOpen ? "block" : "none")}}
          >
            <li className={styles.dropdown__list}>
              <a href="/trade" style={{fontSize:"12px", padding:"4px"}}>
              <BsQrCode/>QR読み込み
            </a>
            </li>
            <li className={styles.dropdown__list}><a href="/">メニュータイトル</a></li>
            <li className={styles.dropdown__list}><a href="/">メニュータイトル</a></li>
            <li className={styles.dropdown__list}><a href="/">メニュータイトル</a></li>
          </ul>
        </li>
      </ul>
    </div>
  )
}
export default UserPullDown