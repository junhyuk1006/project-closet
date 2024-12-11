// 서버에 GET 요청을 보내는 커스텀 훅입니다.
// useFetch('/경로') 의 방식으로 호출합니다.
// 반환값은 각각 요청 성공 데이터, 에러 객체, 로딩 여부입니다.
/*
 *  ex)
 *  const { data, error, loading } = useFetch('/api/products');
 */

import { useState, useEffect } from 'react';

export default function useFetch(url) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('useFetch 호출');
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:80${url}`);
        const json = await response.json();
        console.log(`Fetched data: ${json.length && json}`);
        setData(json);
      } catch (e) {
        console.error(`Error occured while Fetch Data: ${e}`);
        setError(e);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return { data, error, loading };
}