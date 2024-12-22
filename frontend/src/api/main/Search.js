// 검색 폼 제출
export default function Search({ inputValue }) {
  fetch(`http://13.209.5.239/api/product?key=${inputValue}`, {
    method: 'POST',
    body: JSON.stringify({ key: inputValue }),
  }).then((res) => {
    console.log(res);
    return res.json();
  });
}
