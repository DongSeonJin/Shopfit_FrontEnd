import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, useNavigate, useParams } from 'react-router-dom';
import styles from '../../styles/community/PostCreate.module.css';
import PostFileUploadComponent from "../../components/community/PostFileUploadComponent";
import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';


const PostUpdate = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [nickname, setNickname] = useState('');
    const [file, setFile] = useState(null);
    const [imageUrl1, setImageUrl1] = useState('');
    const [imageUrl2, setImageUrl2] = useState('');
    const [imageUrl3, setImageUrl3] = useState('');
    const [imageUrls, setImageUrls] = useState({1:"", 2:"", 3:""})
    
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
           const response = await axios.put(`/post/${postId}`,postData,{
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
           
           if(error.response && error.response.status === 404) {
            alert('존재하지 않는 게시글입니다.');
            return;
           }

           alert("다시 시도해주세요.");
       }
     }

     return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
         <h2 style={{textAlign:"center"}}>글 수정 페이지</h2>
         <form onSubmit={handleSubmit} style={{ width: '80%', marginTop: 20 }}>
          {/* 카테고리 선택 필드 */}
           {/* <FormControl fullWidth variant="outlined" margin="normal"> */}
           <div style={{fontWeight: 'bold', marginBottom: '5px'}}>카테고리</div>
            <InputLabel id="category-label">카테고리</InputLabel>
            <Select
                labelId="category-label"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{backgroundColor: 'white', borderRadius: '5px', marginBottom: '20px', width: '100%'}}
                label="카테고리">
                    <MenuItem value="">
                        카테고리를 선택하세요
                    </MenuItem>
                    {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                            {category.name}
                        </MenuItem>
                    ))}
            </Select>
           {/* </FormControl> */}

          {/* 제목 입력 필드 */}
           <div style={{fontWeight: 'bold', marginBottom: '5px'}}>제목</div>
           <TextField 
               fullWidth 
               variant="outlined" 
               margin="normal"
               label='제목' 
               type='text'
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               style={{backgroundColor: 'white', borderRadius: '5px', marginBottom: '20px', width: '100%'}} />

           {/* 내용 입력 필드 */}
           <div style={{fontWeight: 'bold', marginBottom: '5px'}}>내용</div>
           <TextField
             fullWidth
             variant='outlined'
             margin='normal'
             multiline
             rows={7}
             label='내용'
             value={content}
             onChange={(e)=>setContent(e.target.value)}
             style={{backgroundColor: 'white', borderRadius: '5px', marginBottom: '20px', width: '100%'}}
           />

            {/* 사진 업로드 필드 */}
            <div style={{ display:'flex', justifyContent:'space-between', marginTop: 20}}> 
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

            </div> 

          {/* 수정 버튼 */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px'}}>
            <Button variant='contained' color='primary' type='submit'>
              수정하기
            </Button>
          </div>

       </form>

         
      </div>  
    );
};

export default PostUpdate;
