import React, { useState } from 'react';
import './UploadForm.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../api/auth/UserContext'; // 유저 데이터 가져오기 위한 훅

const UploadForm = () => {
  const [title, setTitle] = useState(''); // 코디 제목 상태 추가
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { user } = useUser(); // 로그인된 유저 데이터 가져오기

  // 이미지 파일 변경 이벤트
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // 미리보기 설정
    }
  };

  // 제목 입력 이벤트
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // 설명 입력 이벤트
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  // 폼 제출 이벤트
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !image || !description) {
      setMessage('모든 필드를 채워주세요!');
      return;
    }

    if (!user || !user.id) {
      setMessage('로그인이 필요합니다.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title); // 제목 추가
    formData.append('image', image);
    formData.append('description', description);
    formData.append('userId', user.id); // userId 추가

    try {
      const response = await fetch('http://localhost/api/coordi/upload', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Authorization 헤더 추가
        },
      });

      if (response.ok) {
        alert('코디가 성공적으로 업로드되었습니다!');
        setTitle('');
        setImage(null);
        setDescription('');
        setPreview(null);
        navigate('/coordi');
      } else {
        setMessage('업로드에 실패했습니다.');
      }
    } catch (error) {
      console.error('업로드 오류:', error);
      setMessage('서버 오류가 발생했습니다.');
    }
  };

  return (
    <div className="upload-form-container">
      <h2 className="upload-title">나의 코디 업로드</h2>
      <form onSubmit={handleSubmit}>
        {/* 제목 입력 */}
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            코디 제목
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="코디 제목을 입력해주세요."
            className="text-input"
          />
        </div>

        {/* 이미지 업로드 */}
        <div className="form-group">
          <label htmlFor="imageUpload" className="form-label">
            코디 이미지 업로드
          </label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input"
          />
          {preview && (
            <img src={preview} alt="미리보기" className="preview-image" />
          )}
        </div>

        {/* 코디 스타일 설명 */}
        <div className="form-group">
          <label htmlFor="description" className="form-label">
            코디 스타일 설명
          </label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="코디 스타일을 간단히 설명해주세요."
            className="text-area"
          />
        </div>

        {/* 제출 버튼 */}
        <button type="submit" className="upload-button">
          업로드
        </button>
      </form>

      {/* 메시지 표시 */}
      {message && <p className="upload-message">{message}</p>}
    </div>
  );
};

export default UploadForm;
