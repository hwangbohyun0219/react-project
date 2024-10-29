import React from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Avatar,
  IconButton,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

function Register() {
  const [file, setFile] = React.useState(null);
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [category, setCategory] = React.useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // 기본 폼 제출 방지

    // FormData 객체 생성하여 데이터 전송
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', category);
    if (file) {
      formData.append('image', file);
    }

    // 예시: 서버에 데이터 전송
    /*
    fetch('YOUR_API_ENDPOINT', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        // 성공 시 처리 (예: 폼 초기화, 성공 메시지 표시)
      })
      .catch(error => {
        console.error('Error:', error);
        // 오류 처리 (예: 오류 메시지 표시)
      });
    */

    console.log('Form submitted:', {
      title,
      content,
      category,
      file,
    });
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit} // onSubmit 핸들러 추가
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        minHeight="100vh"
        sx={{ padding: '20px' }}
      >
        <Typography variant="h4" gutterBottom>
          등록
        </Typography>

        <FormControl fullWidth margin="normal"> {/* fullWidth로 수정 */}
          <InputLabel>카테고리</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)} // 카테고리 상태 업데이트
            label="카테고리"
          >
            <MenuItem value={1}>일상</MenuItem>
            <MenuItem value={2}>여행</MenuItem>
            <MenuItem value={3}>음식</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="제목"
          variant="outlined"
          margin="normal"
          fullWidth // 여기에 fullWidth 속성을 추가
          value={title} // 제목 상태 바인딩
          onChange={(e) => setTitle(e.target.value)} // 제목 상태 업데이트
        />
        <TextField
          label="내용"
          variant="outlined"
          margin="normal"
          fullWidth // 여기에 fullWidth 속성을 추가
          multiline
          rows={4}
          value={content} // 내용 상태 바인딩
          onChange={(e) => setContent(e.target.value)} // 내용 상태 업데이트
        />

        <Box display="flex" alignItems="center" margin="normal" fullWidth>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="file-upload"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload">
            <IconButton color="primary" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
          {file && (
            <Avatar
              alt="첨부된 이미지"
              src={URL.createObjectURL(file)}
              sx={{ width: 56, height: 56, marginLeft: 2 }}
            />
          )}
          <Typography variant="body1" sx={{ marginLeft: 2 }}>
            {file ? file.name : '첨부할 파일 선택'}
          </Typography>
        </Box>

        <Button
          type="submit" // 버튼 유형을 submit으로 설정
          variant="contained"
          color="primary"
          fullWidth // 여기에 fullWidth 속성을 추가
          style={{ marginTop: '20px' }}
        >
          등록하기
        </Button>
      </Box>
    </Container>
  );
}

export default Register;
