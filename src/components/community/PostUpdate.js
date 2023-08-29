import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../../styles/community/PostCreate.module.css';

const PostUpdate = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [nickname, setNickname] = useState('');
    const [file, setFile] = useState(null);
    
    const { postId } = useParams();
    
    const categories = [
        { id: 1, name: '자유게시판' },
        { id: 2, name: '오운완' },
    ];

    
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
         
        const requestData = {
          title: title,
          content: content,
          category: category,
          nickname: nickname
        };  

         if(file){
          requestData.file = file;
         }
         
         
       try{
           const response = await axios.put(`/post/update/${postId}`,requestData,{
               headers:{
                   "Content-Type": "application/json"
               }
           });
           console.log(response);
           
           alert("게시글이 수정되었습니다.");
           
           navigate(`/post/${postId}`);
           
       }catch(error){
           console.error("게시글 수정 실패:",error)
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

                <div>
                    첨부 : 
                    <input type="file" onChange={handleFileChange} />
                </div> <br />
                <div>
                    첨부 : 
                    <input type="file" onChange={handleFileChange} />
                </div> <br />
                <div>
                    첨부 : 
                    <input type="file" onChange={handleFileChange} />
                </div> <br />

                <input type='submit' value="수정하기" className={styles['submit-button']} />



   
</form>

          
       </div>
       
     );
};

export default PostUpdate;
