import HeaderSubComm from '../common/HeaderSubComm';
import Community from '../../pages/Community';

const PostList = () => {
    
  const [categoryId, setCategoryId] = useState(1);
  const navigate = useNavigate();

  const onCategoryClick = (clickedcategoryId) => {
    setCategoryId(clickedcategoryId);
    navigate(`/community/${clickedcategoryId}`);
  };

  return (
    <div>
      <HeaderSubComm onCategoryClick={onCategoryClick}/>
      <Community categoryId={categoryId}/>
    </div>
  );
};

export default PostList;