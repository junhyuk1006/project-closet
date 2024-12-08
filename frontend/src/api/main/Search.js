// 검색 폼 제출
export default function submitSearchForm({ inputValue }) {
  fetch(`http://localhost:80/product?key=${inputValue}`, {
    method: 'POST',
    body: JSON.stringify({ key: inputValue }),
  }).then((res) => {
    console.log(res);
    return res.json();
  });
}
