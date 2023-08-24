import React, { useCallback } from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import axios from "axios";

// import styles from "../../styles/news/DeleteNews.module.css";

// 부모 컴포넌트로부터 newsId 값을 전달받기
// 부모 컴포넌트의 리턴문에 <DeleteNews newsId={newsId} /> 형식으로 작성하기
const DeleteNews = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const onClickDelete = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        const data = {
          newsId: parseInt(props.newsId),
        };

        console.log(data);

        await axios.delete(`/news/${data.newsId}`);
        setOpen(false);

        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    },
    [props.newsId]
  );

  // const handleClick = () => {
  //   window.location.reload();
  // };

  return (
    <div>
      <Button variant="outlined" color="error" onClick={() => setOpen(true)}>
        삭제
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>뉴스를 삭제하시겠습니까?</DialogTitle>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            취소
          </Button>
          <Button variant="contained" color="error" onClick={onClickDelete}>
            삭제하기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteNews;
