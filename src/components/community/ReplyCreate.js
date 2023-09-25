import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TextField, Button, makeStyles, } from '@material-ui/core';
import { authApi } from './../../lib/api/authApi';

const useStyles = makeStyles({
    input: {
      color: '#fff',
    },
    textField: {
      padding: '0 21px',
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          
          borderColor: 'white',
        },
        '&:hover fieldset': {
          borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'white',
        },
      },
    },
});

const ReplyCreate = ({ postId, onReplySubmit }) => {
    const [content, setContent] = useState('');

    const userId = useSelector(state => state.authUser.userId);
    const nickname = useSelector(state => state.authUser.nickname);

    const classes = useStyles();

    const handleSubmit = async e => {
        e.preventDefault();
    
        if (userId > 0) {
          if (content.trim() === '')  {
            alert("댓글 내용을 입력해주세요.");
            return;
        }
        const replyData = {
          user: {userId: userId},
          post: {postId: postId},
          content: content,
          nickname: nickname
      };
      try {
        const response = await authApi.post('/reply', replyData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        onReplySubmit(response.data);
        setContent('');

        alert ("댓글이 등록되었습니다.")
    } catch (error) {
        console.error('댓글 등록 실패', error);
        alert("댓글이 등록되지 않았습니다.");
      }
    } else {
      alert('로그인이 필요한 기능입니다.')
    }
    }; 
    

    return (
        <div>
          <form onSubmit={handleSubmit}>
              <TextField
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  variant='outlined'
                  multiline
                  rows={4}
                  fullWidth
                  placeholder='댓글을 입력해주세요.'
                  InputProps={{
                      className: classes.input,
                  }}
                  className={classes.textField}
              />
              <div style={{textAlign: 'right', marginTop: '10px', paddingRight: '21px'}}>
                <Button type='submit' variant='contained' color='primary' className={classes.button}> 댓글 등록 </Button>
              </div>
          </form>

        </div>
    );
};

export default ReplyCreate;
