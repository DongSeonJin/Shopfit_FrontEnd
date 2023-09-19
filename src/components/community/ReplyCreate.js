import React, { useState } from 'react';
import axios from 'axios';
import { Reply } from '@material-ui/icons';
import { TextField, Button, Box, makeStyles, InputAdornment } from '@material-ui/core';

const useStyles = makeStyles({
    input: {
      color: '#fff',
    },
    textField: {
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
    buttonContainer: {
      position:'relative'
    }, 
    button:{
      position:'absolute', 
      bottom:'12px', 
      right:'10px'
    }
});


const ReplyCreate = ({ postId, onReplySubmit }) => {
    const [content, setContent] = useState('');
    const nickname = 'nickname1';
    const userId = 1;
    const classes = useStyles();

    const handleSubmit = async e => {
        e.preventDefault();
    
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
            const response = await axios.post('/reply', replyData, {
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
    }; 
    

    return (
        <div>
            {/* <h2>댓글 작성</h2> */}
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
                        endAdornment:
                        <InputAdornment position='end'>
                            <Button type='submit' variant='contained' color='primary' className={classes.button}> 댓글 등록 </Button>
                        </InputAdornment>
                    }}
                    className={classes.textField}
                />

                {/* <Button mt={2}
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ marginTop: '10px', marginLeft: '10px' }}
                > 댓글 등록 </Button> */}
            </form>
        </div>
    );
};

export default ReplyCreate;
