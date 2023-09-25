// import styles from "../../styles/common/Footer.module.css";

const Footer = () => {
  return (
    <div style={{display: 'flex', width: '100%', maxWidth: '1420px', margin: 'auto', padding: '50px 200px', borderTop: '1px solid white'}}>

      <div style={{flex: "3", lineHeight: '2'}}>
        <div style={{ fontSize: '20px'}}>
          CONTACT US 
        </div> <br />
        <div style={{minWidth: '300px'}}>
          권아영 : https://github.com/KwonAYeong
        </div>
        <div>
          오연수 : https://github.com/lilylemonoh
        </div>
        <div>
          진동선 : https://github.com/DongSeonJin
        </div>
        <div>
          한국인 : https://github.com/HANKUGIN
        </div>
      </div>

      <div style={{flex: "3", lineHeight: '2', marginTop: '80px', paddingLeft: '200px'}}>
        <div style={{minWidth: '396px'}}>
          (주) #FIT |  서울 강남구 강남대로94길 20, 삼오빌딩 5층
        </div>

        <div>
          고객센터    | 02 - 3486 - 0070
        </div>

        <div>
          Copyright 2023. workout, Co., Ltd. All rights reserved.
        </div>
       
      </div>
      
    </div>
  );
};

export default Footer;