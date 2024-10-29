import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Avatar, Grid, Paper } from '@mui/material';
import axios from 'axios';

function MyPage() {
  const [userInfo, setUserInfo] = useState({}); // 사용자 정보 상태
  const [followerCount, setFollowerCount] = useState(0); // 팔로워 수 상태

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');

    if (storedUserInfo) {
      try {
        const parsedUserInfo = JSON.parse(storedUserInfo); // JSON을 자바스크립트 객체로 변환
        console.log('파싱된 사용자 정보:', parsedUserInfo); // 로그로 데이터 확인

        if (parsedUserInfo && parsedUserInfo.name) {
          setUserInfo(parsedUserInfo); // 사용자 정보 설정
          fetchFollowerCount(parsedUserInfo.name); // 팔로워 수 요청
        } else {
          throw new Error("유효하지 않은 사용자 정보");
        }
      } catch (error) {
        console.error('사용자 정보 파싱 오류:', error);
        alert('사용자 정보가 올바르지 않습니다. 로그인 페이지로 이동합니다.');
        window.location.href = '/login'; // 로그인 페이지로 리다이렉트
      }
    } else {
      alert('로그인 정보가 없습니다. 로그인 페이지로 이동합니다.');
      window.location.href = '/login'; // 로그인 페이지로 리다이렉트
    }
  }, []);

  async function fetchFollowerCount(name) {
    try {
      const response = await axios.post('http://localhost:3100/follower', { name });
      if (response.data.success) {
        setFollowerCount(response.data.count); // 팔로워 수를 상태에 저장
      } else {
        console.error('팔로워 수 가져오기 실패:', response.data.message);
      }
    } catch (error) {
      console.error('오류 발생:', error);
    }
  }

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        minHeight="100vh"
        sx={{ padding: '20px' }}
      >
        <Paper elevation={3} sx={{ padding: '20px', borderRadius: '15px', width: '100%' }}>
          <Box display="flex" flexDirection="column" alignItems="center" sx={{ marginBottom: 3 }}>
            <Avatar
              alt="프로필 이미지"
              src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e" // 프로필 이미지 경로
              sx={{ width: 100, height: 100, marginBottom: 2 }}
            />
            <Typography variant="h5">{userInfo.name || "이름이 없습니다."}</Typography>
            <Typography variant="body2" color="text.secondary">
              @{userInfo.name ? userInfo.name : "사용자명"}
            </Typography>
          </Box>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={4} textAlign="center">
              <Typography variant="h6">팔로워</Typography>
              <Typography variant="body1">{followerCount}</Typography> {/* 팔로워 수 표시 */}
            </Grid>
            <Grid item xs={4} textAlign="center">
              <Typography variant="h6">팔로잉</Typography>
              <Typography variant="body1">0</Typography> {/* 팔로잉 수 (예시) */}
            </Grid>
            <Grid item xs={4} textAlign="center">
              <Typography variant="h6">게시물</Typography>
              <Typography variant="body1">0</Typography> {/* 게시물 수 (예시) */}
            </Grid>
          </Grid>
          <Box sx={{ marginTop: 3 }}>
            <Typography variant="h6">내 소개</Typography>
            <Typography variant="body1">
              안녕하세요! SNS를 통해 친구들과 소통하고 있습니다. 사진과 일상을 공유하는 것을 좋아해요.
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default MyPage;
