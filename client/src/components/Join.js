import React, { useRef } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';

function Join() {
  const nameRef = useRef();
  const emailRef = useRef();
  const pwdRef = useRef();

  async function fnRegister() {
    try {
      const res = await axios.post('http://localhost:3100/register', {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: pwdRef.current.value,
      });

      if (res.data.success) {
        alert('회원가입 성공!');
        window.location.href = '/login';
      } else {
        alert('회원가입 실패');
      }
    } catch (err) {
      console.error('오류 발생:', err);
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
          회원가입
        </Typography>
        <TextField inputRef={nameRef} label="name" variant="outlined" margin="normal" fullWidth />
        <TextField inputRef={emailRef} label="Email" variant="outlined" margin="normal" fullWidth />
        <TextField
          inputRef={pwdRef}
          label="Password"
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
        />
        <Button onClick={fnRegister} variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
          회원가입
        </Button>
      </Box>
    </Container>
  );
}

export default Join;