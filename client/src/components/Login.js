import React, { useRef } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const emailRef = useRef();
  const pwdRef = useRef();
  const navigate = useNavigate();

  async function fnLogin() {
    try {
      const res = await axios.post("http://localhost:3100/user", {
        email: emailRef.current.value,
        password: pwdRef.current.value,
      });

      if (res.data.success) {
        alert("로그인 성공!");
        localStorage.setItem("userInfo", JSON.stringify({ name: res.data.name })); // 사용자 이름만 저장
        localStorage.setItem("token", res.data.token);
        navigate("/feed");
      } else {
        alert("아이디/비밀번호 다시 확인");
      }
    } catch (err) {
      console.log("오류 발생:", err);
      alert('로그인 중 오류가 발생했습니다.');
    }
  }

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h4" gutterBottom>
          로그인
        </Typography>
        <TextField inputRef={emailRef} label="Email" variant="outlined" margin="normal" fullWidth />
        <TextField
          inputRef={pwdRef}
          label="Password"
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
        />
        <Button onClick={fnLogin} variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
          로그인
        </Button>
        <Typography variant="body2" style={{ marginTop: '10px' }}>
          회원이 아닙니까 ? <Link to="/join">회원가입</Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Login;
