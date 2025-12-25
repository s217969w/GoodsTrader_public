import styles from "./GuideCSS.module.css"

export default function Guide() {
  return (
    <div className={styles.guideContainer}>
      <h1 className={styles.Title}>使い方</h1>
      <h2 className={styles.Section}>所持状況管理画面</h2>
      <img src="/pic/guide/list.png" alt="管理画面" className={styles.Image} />
      <div className={styles.Label}>① グッズの画像</div>
      <div style={{ marginBottom: "0.5em" }}>
        各グッズの画像です。画像をクリックすると画面の右側に詳細情報が表示されます。
      </div>
      <div className={styles.Label}>② 所持数</div>
      <div style={{ marginBottom: "0.5em" }}>
        このグッズを持っている数です。両側のボタンで変更できます。
      </div>
      <div className={styles.Label}>③ 欲しい数</div>
      <div>
        自分の所持数を含め、何枚欲しい(持っていたい)かを決めます。<br />
        無限回収でない場合、両側のボタンで変更できます。
      </div>
      <br />
      <h2 className={styles.Section}>詳細画面</h2>
      <img src="/pic/guide/detail.png" alt="detail" style={{ maxWidth: "30%", marginBottom: "1em" }} />
      <div className={styles.Label}>① 所持数</div>
      <div style={{ marginBottom: "0.5em" }}>
        このグッズを持っている数です。
        <br />
        赤枠で囲まれた部分をクリックすると、直接変更できるようになります。
      </div>
      <div className={styles.Label}>② 欲しい数</div>
      <div>
        自分の所持数を含め、何枚欲しい(持っていたい)かを決めます。<br />
        無限回収でない場合、赤枠で囲まれた部分をクリックすると、直接変更できるようになります。
        <br />
      </div>
      <div className="Example">
        例): <br />
        3個持っているが1個あれば十分な時、欲しい数は1にします。<br />
        2個持っていてもう1個欲しいとき、欲しい数は3にします。
      </div>
      <div className={styles.Label}>③ 無限回収</div>
      <div>
        このグッズを無限回収したい時、オンにしてください。<br />
        欲しい数が∞となり、交換時に譲渡候補から外れます。
      </div>
      <h2 className={styles.Section}>交換・読み込み</h2>
      <img src="/pic/guide/QR.png" alt="QR" style={{ maxWidth: "80%", marginBottom: "1em" }} />
      <div style={{ marginBottom: "0.5em" }}>
        ファイルをアップロード、またはカメラでQRコードを読み取ってください。<br />
        交換用とデータ読み込み用で形式が異なるため、正しいQRコードを読み取ってください。
      </div>
      <h2 className={styles.Section}>QRコードの生成</h2>
      <img src="/pic/guide/generate.png" alt="QR" style={{ maxWidth: "80%", marginBottom: "1em" }} />
      <div style={{ marginBottom: "0.5em" }}>
        名前と種類を入力するとQRコードが生成されます。生成されたコードは他の端末で読み取ることで<br />
        使用することができます。

      </div>

    </div>
  );
}