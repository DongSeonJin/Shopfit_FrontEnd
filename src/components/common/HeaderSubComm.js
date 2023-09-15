import { Link } from 'react-router-dom';


const HeaderSubComm = () => { 
  return (
    <div style={{ display: 'flex', height: "100%" }}>
      <div style={{ width: '200px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Link to="/community/post/list/1" style={{ fontSize: '16px', fontWeight: 'bold', textDecoration: 'none', color: 'inherit' }}>
          오운완
        </Link>
      </div>
      <div style={{ width: '200px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Link to="/community/post/list/2" style={{ fontSize: '16px', fontWeight: 'bold', textDecoration: 'none', color: 'inherit' }}>
          식단
        </Link>
      </div>
    </div>
  );
  
};

export default HeaderSubComm;