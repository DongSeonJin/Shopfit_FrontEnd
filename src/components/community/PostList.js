import React, { useState } from 'react';
import axios from 'axios';

const InputField = ({ label, value, name, onChange }) => (
    <label>
        {label}:
        <input type="text" value={value} name={name} onChange={onChange} />
    </label>
);

const TextAreaField = ({ label, value, name, onChange }) => (
    <label>
        {label}:
        <textarea value={value} name={name} onChange={onChange} />
    </label>
);

const PostCreate = () => {
    const [formState, setFormState] = useState({
        title: '',
        content: '',
        category: '',
    });

    const categories = [
        { id: 1, name: '자유게시판' },
        { id: 2, name: '오운완' },
    ];

    const handleInputChange = (e) => {
      setFormState({
          ...formState,
          [e.target.name]: e.target.value,
      });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();

      // 서버로 보낼 데이터 구성
      const postData = {
          userId: 1,
          nickname: '사용자 닉네임',
          categoryId: parseInt(formState.category),
          title: formState.title,
          content: formState.content,
          imageUrl1:'',
          imageUrl2:'',
          imageUrl3:''
      };

      try {
            await axios.post('/post/create', postData);
            alert('게시글이 저장되었습니다.');
            setFormState({title:'', content:'', category:''});
            
       } catch (error) {
           console.error('게시글 저장에 실패했습니다.', error);
           alert('게시글 저장에 실패했습니다.');
       }
   };

   return (
       <div>
           <h2>글 작성 페이지</h2>
           <form onSubmit={handleSubmit}>
               <select 
                   value={formState.category}
                   name="category"
                   onChange={handleInputChange}
               >
                  {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                          {category.name}
                      </option>
                  ))}
               </select>

               {/* 입력 필드 컴포넌트 사용 */}
               <InputField
                   label="제목"
                   value={formState.title}
                   name="title"
                   onChange={handleInputChange}
                />

                {/* 텍스트 영역 필드 컴포넌트 사용 */}
                <TextAreaField
                    label="내용"
                    value={formState.title}
                    name="content"
                    onchange={handleInputChange}
                 />

                 {/* ... */}

                 <input type="submit" value="제출" />
             </form>
         </div>
     );
};

export default PostCreate;
