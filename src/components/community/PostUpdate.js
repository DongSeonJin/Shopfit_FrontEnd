import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, useNavigate, useParams } from 'react-router-dom';
import styles from '../../styles/community/PostCreate.module.css';
import PostFileUploadComponent from "../../components/community/PostFileUploadComponent";

const PostUpdate = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [nickname, setNickname] = useState('');
    const [file, setFile] = useState(null);
    const [imageUrl1, setImageUrl1] = useState('');
    const [imageUrl2, setImageUrl2] = useState('');
    const [imageUrl3, setImageUrl3] = useState('');
    
    const { postId } = useParams();
    
    const categories = [
        { id: 1, name: '오운완' },
        { id: 2, name: '식단' },
    ];

    const handleUploadSuccess =(url) => {
      setImageUrl1(url);
      setImageUrl2(url);
      setImageUrl3(url);
    }

    
    const navigate = useNavigate();

      // 기존 게시글 데이터 가져오기
     useEffect(() => {
        const fetchData = async () => {
          try {
            // 서버에서 게시글 정보를 가져오는 요청 보내기
            let response;
            response= await axios.get(`/post/${postId}`);
            
            setTitle(response.data.title);
            setContent(response.data.content);
            setCategory(response.data.category);
            setNickname(response.data.nickname);
            setImageUrl1(response.data.imageUrl1);
            setImageUrl2(response.data.imageUrl2);
            setImageUrl3(response.data.imageUrl3);

          } catch (error) {
            console.error('게시글 가져오기 실패:', error);
          }
        };
        
        fetchData();
        
      },[postId]);

     
      const handleFileChange=(e)=>{
         setFile(e.target.files[0]);
       }

      const handleSubmit=async (e)=>{
         e.preventDefault();
         console.log("버튼 눌림");
         
         const postData = new FormData();
         postData.append('title', title);
         postData.append('content', content);
         postData.append('category', category);
         postData.append('nickname', nickname);  
         postData.append ('imageUrl1', imageUrl1);
         postData.append ('imageUrl2', imageUrl2);        
         postData.append ('imageUrl3', imageUrl3);
         
         
       try{
           const response = await axios.put(`/post/update/${postId}`,postData,{
               headers:{
                   "Content-Type": "application/json"
               }
           });
           console.log(response);
           
           alert("게시글이 수정되었습니다.");

           // 입력 필드 초기화
           setTitle('');
           setContent('');
           setNickname('');
           setImageUrl1('');
           setImageUrl2('');
           setImageUrl3('');
           
           navigate(`/community/post/${postId}`);
           
       }catch(error){
           console.error("게시글 수정 실패:",error);
           alert("다시 시도해주세요.");
       }
     }

     return (
       <div>
          <h2 style={{textAlign:"center"}}>글 수정 페이지</h2>
          <form onSubmit={handleSubmit} className={styles['post-form']}>

            <div className={styles['form-row']}>
                

                <label className={styles['form-label']}>
                    카테고리:
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className={styles['input-field']} >
                        <option value="">카테고리를 선택하세요</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </label>
        
        </div>  <br />

                <label>
                    제목: 
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={`${styles['input-field']} ${styles.title}`}  />
                </label> <br />

                <label>
                    내용: 
                    <textarea
                        value={content}
                        onChange={(e)=>setContent(e.target.value)}
                        className={`${styles['input-field']} ${styles.content}`} />
                </label> <br />


                {imageUrl1 ? (
                  <div>
                    <img src={imageUrl1} style={{ width: '200px', height: '200px' }} alt="첨부이미지" />
                    <button onClick={() => setImageUrl1('')}>삭제</button>
                  </div>
                ) : (
                  <PostFileUploadComponent onUploadSuccess={(url) => setImageUrl1(url)} />
                )}

                {imageUrl2 ? (
                  <div>
                    <img src={imageUrl2} style={{ width: '200px', height: '200px' }} alt="첨부이미지" />
                    <button onClick={() => setImageUrl2('')}>삭제</button>
                  </div>
                ) : (
                  <PostFileUploadComponent onUploadSuccess={(url) => setImageUrl2(url)} />
                )}

                {imageUrl3 ? (
                  <div>
                    <img src={imageUrl3} style={{ width: '200px', height: '200px' }} alt="첨부이미지" />
                    <button onClick={() => setImageUrl3('')}>삭제</button>
                  </div>
                ) : (
                  <PostFileUploadComponent onUploadSuccess={(url) => setImageUrl3(url)} />
                )}


      


          
                <input type='submit' value="수정하기" className={styles['submit-button']} />



   
</form>

          
       </div>
       
     );
};

export default PostUpdate;
