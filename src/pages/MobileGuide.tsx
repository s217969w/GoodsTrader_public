import "./MobileGuideCSS.css"

export default function MobileGuide() {
  return (
    <div className="guideContainer">
      <h1 className="Title">使い方</h1>
      <h2 className="Section">所持状況管理画面</h2>
      <img src="/pic/guide/list.png" alt="管理画面" className="Image" />
      <div className="Label">① グッズの画像</div>
      <div style={{ marginBottom: "0.5em" }}>
        各グッズの画像です。画像をクリックすると画面の右側に詳細情報が表示されます。
      </div>
      <div className="Label">② 所持数・欲しい数</div>
      <div style={{ marginBottom: "0.5em" }}>
        左側の数字は、このグッズを持っている数です。
        右側の数字は、自分の所持数を含め何枚欲しい(持っていたい)かを表しています。<br />
      </div>
      <br />
      <h2 className="Section">詳細画面</h2>
      <img src="/pic/guide/detail.png" alt="detail" className="ImageSmall" />
      <div className="Label">① 所持数</div>
      <div style={{ marginBottom: "0.5em" }}>
        このグッズを持っている数です。
        <br />
        赤枠で囲まれた部分をクリックすると、直接変更できるようになります。
      </div>
      <div className="Label">② 欲しい数</div>
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
      <div className="Label">③ 無限回収</div>
      <div>
        このグッズを無限回収したい時、オンにしてください。<br />
        欲しい数が∞となり、交換時に譲渡候補から外れます。
      </div>
      <h2 className="Section">交換・読み込み</h2>
      <img src="/pic/guide/QR.png" alt="QR" className="Image" />
      <div style={{ marginBottom: "0.5em" }}>
        ファイルをアップロード、またはカメラでQRコードを読み取ってください。<br />
        交換用とデータ読み込み用で形式が異なるため、正しいQRコードを読み取ってください。
      </div>
      <h2 className="Section">QRコードの生成</h2>
      <img src="/pic/guide/generate.png" alt="QR" className="Image" />
      <div style={{ marginBottom: "0.5em" }}>
        名前と種類を入力するとQRコードが生成されます。生成されたコードは他の端末で読み取ることで<br />
        使用することができます。

      </div>

    </div>
  );
}