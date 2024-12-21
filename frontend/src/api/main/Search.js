// 검색 폼 제출
export default function Search({ inputValue }) {
  fetch(`http://localhost:8090/product?key=${inputValue}`, {
    method: 'POST',
    body: JSON.stringify({ key: inputValue }),
  }).then((res) => {
    console.log(res);
    return res.json();
  });
}
