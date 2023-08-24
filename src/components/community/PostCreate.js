import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import styles from '../../styles/community/PostCreate.module.css';

const PostCreate = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [nickname, setNickname] = useState('');
    const userId = 1;
    const imageUrl1 = 'a';
    const imageUrl2 = 'b';
    const imageUrl3 = 'c;'
    // const categoryId = 1;

    const categories = [
        { id: 1, name: '자유게시판' },
        { id: 2, name: '오운완' },
    ];

    const navigate = useNavigate();

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        // 서버로 보낼 데이터 구성
        const postData = {
            title: title,
            content: content,
            categoryId: category,
            nickname: nickname,
            userId: userId,
            imageUrl1: imageUrl1,
            imageUrl2: imageUrl2,
            imageUrl3: imageUrl3

        };

        try {
            // '/post/create' 경로에 post 요청 보내기
            await axios.post('/post/create', postData);

            alert('게시글이 등록되었습니다.');

            // 입력 필드 초기화
            setTitle('');
            setContent('');
            setCategory('');

            navigate('/post/list');
        } catch (error) {
            console.error('There was an error!', error);
            alert('게시글 등록에 실패했습니다.');
        }
    };

    return (
        <div>
            <h2 style={{textAlign:"center"}}>글 작성 페이지</h2>
            <div className={styles['post-create-container']}> {/* 클래스 이름을 가져옴 */}
                <form onSubmit={handleSubmit} className={styles['post-form']}> {/* 클래스 이름을 가져옴 */}
                    <div className={styles['form-row']}>
                    <label className={styles['form-label']}>
                            작성자:
                            <input
                                type="text"
                                value={nickname}
                                onChange={handleNicknameChange}
                                className={styles['input-field']}
                            />
                        </label>

                        <label className={styles['form-label']}>
                            카테고리:
                            <select
                                value={category}
                                onChange={handleCategoryChange}
                                className={styles['input-field']}
                            >
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        
                    </div> <br />

                    <label>
                        제목: 
                        <input
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                            className={styles['input-field']} // 클래스 이름을 가져옴
                            style={{width: '100%'}}
                        />
                    </label>
                    <br />

                    <label>
                        내용: 
                        <textarea
                            value={content}
                            onChange={handleContentChange}
                            className={styles['input-field']} // 클래스 이름을 가져옴
                            style={{width: '100%', height: '200px'}}
                        />
                    </label>
                    <br />

                    <input
                        type="submit"
                        value="등록"
                        className={styles['submit-button']} // 클래스 이름을 가져옴
                    />
                    <input
                    type="hidden"
                    value={userId}></input>
                </form>
            </div>
        </div>
        
    );
};

export default PostCreate;