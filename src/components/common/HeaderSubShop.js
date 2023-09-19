import { Link } from 'react-router-dom';

const HeaderSubShop = () => {
  return (
    <div style={{ display: 'flex', height: "100%" }}>
      <div style={{ width: '200px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Link to="/shopping/1" style={{ fontSize: '20px', fontWeight: 'bold', textDecoration: 'none', color: 'inherit' }}>모두보기</Link>
      </div>
      <div style={{ width: '200px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Link to="/shopping/category/1/1" style={{ fontSize: '20px', fontWeight: 'bold', textDecoration: 'none', color: 'inherit' }}>닭가슴살</Link>
      </div>
      <div style={{ width: '200px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Link to="/shopping/category/2/1" style={{ fontSize: '20px', fontWeight: 'bold', textDecoration: 'none', color: 'inherit' }}>음료/보충제</Link>
      </div>
      <div style={{ width: '200px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Link to="/shopping/category/3/1" style={{ fontSize: '20px', fontWeight: 'bold', textDecoration: 'none', color: 'inherit' }}>운동용품</Link>
      </div>
    </div>
  );
};

export default HeaderSubShop;