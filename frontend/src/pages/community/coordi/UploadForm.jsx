import React, { useState } from 'react';
import './UploadForm.css';
import { useNavigate } from 'react-router-dom';

const UploadForm = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // 이미지 파일 변경 이벤트
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // 미리보기 설정
    }
  };

  // 설명 입력 이벤트
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  // 폼 제출 이벤트
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!image || !description) {
      setMessage('모든 필드를 채워주세요!');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('description', description);

    try {
      const response = await fetch('http://localhost:80/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('코디가 성공적으로 업로드되었습니다!');
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