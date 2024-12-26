import { Link } from 'react-router-dom';
// import CSS
import '../../assets/styles/components/footer.css';

export default function Privacy() {
  return (
    <>
      <h3 className="privacy-subtitle">개인정보처리방침</h3>

      <div className="container">
        <div className="row">
          <div
            className="col-10 pt-3 ps-5 privacy-content"
            style={{ margin: '0 auto' }}
          >
            <div className="privacy-box">
              {/* 제1조 (총칙) */}
              <section className="m-b-25" id="article-1">
                <h4>제1조 (총칙)</h4>
                <p>
                  <ul>
                    <li>
                      <span style={{ fontWeight: 'bold' }}>“개인정보”</span>란
                      살아 있는 개인에 관한 정보로서 성명, 휴대폰번호 등을
                      통하여 개인을 알아볼 수 있는 정보를 말합니다.
                    </li>
                    <li>
                      회사는 이용자의 개인정보를 안전하게 처리하기 위해 관련
                      법규를 준수하며, 개인정보처리방침을 통해 개인정보의 이용
                      목적과 보호 조치를 안내합니다.
                    </li>
                    <li>
                      회사는 개인정보처리방침을 홈페이지 첫 화면에 공개하여
                      이용자가 언제든 쉽게 확인할 수 있도록 조치합니다.
                    </li>
                    <li>
                      개인정보처리방침의 변경 시, 회사는 변경된 내용을 쉽게
                      확인할 수 있도록 버전 관리와 함께 절차를 마련합니다.
                    </li>
                  </ul>
                </p>
              </section>

              {/* 제2조 (개인정보의 수집 항목 및 방법) */}
              <section className="m-b-25" id="article-2">
                <h4>제2조 (개인정보의 수집 항목 및 방법)</h4>
                <p>
                  <ul>
                    <li>
                      회사는 별도의 회원가입 없이 대부분의 콘텐츠에 자유롭게
                      접근할 수 있으며, 다음 정보를 동의를 통해 수집합니다.
                    </li>
                  </ul>
                  <table>
                    <thead>
                      <tr>
                        <th style={{ width: '10%' }}>유형</th>
                        <th>수집목적</th>
                        <th style={{ width: '7%' }}>구분</th>
                        <th>수집항목</th>
                        <th style={{ width: '15%' }}>수집방법</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>회원</td>
                        <td>이메일 회원가입, 서비스 이용, 공지사항 전달</td>
                        <td>필수</td>
                        <td>
                          이름, 아이디, 비밀번호, 휴대폰 번호, 이메일 주소
                        </td>
                        <td>홈페이지, 모바일 앱</td>
                      </tr>
                      <tr>
                        <td>회원</td>
                        <td>SNS 계정 회원가입, 서비스 이용, 공지사항 전달</td>
                        <td>필수</td>
                        <td>
                          SNS별 수집항목 (카카오: 프로필정보, 이메일, 휴대폰번호
                          등, 네이버: 이름, 이메일 주소 등)
                        </td>
                        <td>홈페이지, 모바일 앱</td>
                      </tr>
                      <tr>
                        <td>비회원</td>
                        <td>상품 구매, 결제, 환불</td>
                        <td>필수</td>
                        <td>
                          주문자 정보(성명, 휴대폰 번호, 이메일, 주소),
                          배송정보, 결제정보, 환불정보
                        </td>
                        <td>홈페이지, 모바일 앱</td>
                      </tr>
                      <tr>
                        <td>기타 서비스</td>
                        <td>이벤트 당첨 및 제세공과금 처리</td>
                        <td>필수</td>
                        <td>성명, 이메일, 휴대폰 번호, 주소, 주민등록번호</td>
                        <td>홈페이지, 모바일 앱</td>
                      </tr>
                    </tbody>
                  </table>
                  ※ 회사는 이용자의 동의를 받은 경우에 한해 위 정보를 수집하며,
                  선택 동의를 거부하더라도 필수 서비스 이용은 가능합니다.
                </p>
              </section>

              {/* 제3조 (개인정보의 제3자 제공) */}
              <section className="m-b-25" id="article-3">
                <h4>제3조 (개인정보의 제3자 제공)</h4>
                <p>
                  <ul>
                    <li>
                      회사는 이용자의 개인정보를 고지된 범위 내에서 사용하며, 동
                      범위를 초과하여 이용하거나 제3자에게 제공하지 않습니다.
                    </li>
                    <li>
                      다만, 다음의 경우는 예외입니다:
                      <ul>
                        <li>이용자가 사전에 동의한 경우</li>
                        <li>관계 법령에 따라 수사 목적으로 요구받은 경우</li>
                      </ul>
                    </li>
                    <li>
                      회사는 제3자 제공 시 이용자에게 사전에 제공받는 자와 제공
                      항목, 이용 목적, 보유 기간을 고지하고 동의를 받습니다.
                    </li>
                  </ul>
                </p>
                <table>
                  <thead>
                    <tr>
                      <th>제공받는 자</th>
                      <th>제공 항목</th>
                      <th>이용 목적</th>
                      <th>보유 및 이용 기간</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>한국패션심리연구원</td>
                      <td>성명, 휴대폰 번호</td>
                      <td>예약 및 예약 확인</td>
                      <td>회원 탈퇴 시 또는 이용 목적 달성 후 즉시 파기</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              {/* 제4조 (링크사이트) */}
              <section className="m-b-25" id="article-4">
                <h4>제4조 (링크사이트)</h4>
                <p>
                  <ul>
                    <li>
                      회사는 다른 회사의 웹사이트나 자료에 대한 링크를 제공할 수
                      있습니다. 그러나 외부 사이트의 개인정보 처리에 대해
                      책임지지 않으므로, 해당 사이트의 개인정보처리방침을
                      확인하시기 바랍니다.
                    </li>
                  </ul>
                </p>
              </section>

              {/* 제5조 (개인정보의 처리 위탁) */}
              <section className="m-b-25" id="article-5">
                <h4>제5조 (개인정보의 처리 위탁)</h4>
                <p>
                  <ul>
                    <li>
                      회사는 서비스 향상을 위해 개인정보를 외부 업체에 위탁
                      처리할 수 있으며, 관련 법규를 준수합니다.
                    </li>
                  </ul>
                </p>
                <table>
                  <thead>
                    <tr>
                      <th>수탁업체</th>
                      <th>위탁 업무내용</th>
                      <th>보유 및 이용기간</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>CJ대한통운</td>
                      <td>주문 상품 배송 및 반품 수거</td>
                      <td>회원 탈퇴 시 또는 위탁 업무 종료 시</td>
                    </tr>
                    <tr>
                      <td>KG이니시스, 주식회사 카카오</td>
                      <td>결제 및 결제 대행 서비스</td>
                      <td>회원 탈퇴 시 또는 위탁 업무 종료 시</td>
                    </tr>
                    <tr>
                      <td>㈜루나소프트</td>
                      <td>카카오 알림톡 및 상담 서비스</td>
                      <td>회원 탈퇴 시 또는 위탁 업무 종료 시</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              {/* 제6조 (개인정보의 처리 및 보유 기간) */}
              <section className="m-b-25" id="article-6">
                <h4>제6조 (개인정보의 처리 및 보유 기간)</h4>
                <p>
                  <ul>
                    <li>
                      이용자가 회사에서 제공하는 서비스를 받는 동안 이용자의
                      개인정보는 회사에서 계속 보유하며 서비스 제공을 위해
                      이용됩니다. 단, 수집 목적 또는 제공받은 목적이 달성되거나,
                      회사 이용약관에 따라 탈퇴를 요청한 경우, 지체 없이
                      파기합니다.
                    </li>
                    <li>
                      다음의 경우, 기재된 기간 동안 개인정보를 보관 및
                      이용합니다:
                    </li>
                  </ul>
                </p>
                <table>
                  <thead>
                    <tr>
                      <th>대상</th>
                      <th>관련법 조항</th>
                      <th>보유기간</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>계약 또는 청약 철회 등에 관한 기록</td>
                      <td>전자상거래 등에서의 소비자보호에 관한 법률</td>
                      <td>5년</td>
                    </tr>
                    <tr>
                      <td>대금결제 및 재화 등의 공급에 관한 기록</td>
                      <td>전자상거래 등에서의 소비자보호에 관한 법률</td>
                      <td>5년</td>
                    </tr>
                    <tr>
                      <td>회원 불만 또는 분쟁처리에 관한 기록</td>
                      <td>전자상거래 등에서의 소비자보호에 관한 법률</td>
                      <td>3년</td>
                    </tr>
                    <tr>
                      <td>본인 확인에 대한 기록</td>
                      <td>정보통신 이용촉진 및 정보보호 등에 관한 법률</td>
                      <td>6개월</td>
                    </tr>
                    <tr>
                      <td>인터넷 로그기록자료, 접속지 추적자료</td>
                      <td>통신비밀보호법</td>
                      <td>3개월</td>
                    </tr>
                    <tr>
                      <td>부정이용 방지에 관한 기록</td>
                      <td>부정거래의 배제</td>
                      <td>30일</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              {/* 제7조 (개인정보의 파기 절차 및 방법) */}
              <section className="m-b-25" id="article-7">
                <h4>제7조 (개인정보의 파기 절차 및 방법)</h4>
                <p>
                  <ul>
                    <li>
                      회사는 개인정보 수집 및 이용 목적이 달성된 후에는 해당
                      정보를
                      <span style={{ fontWeight: 'bold' }}>지체 없이 파기</span>
                      하는 것을 원칙으로 합니다.
                    </li>
                    <li>
                      이용내역이 1년 이상 없는 개인정보는 분리 저장·관리되며,
                      최대 4년 이후 파기됩니다. 분리 저장 30일 전에 이용자에게
                      해당 사실을 알립니다.
                    </li>
                    <li>
                      개인정보는 재생 불가능한 방법으로 파기되며, 전자 파일은
                      기술적 방법으로 삭제하고, 종이 기록은 분쇄기로 파기합니다.
                    </li>
                  </ul>
                </p>
              </section>

              {/* 제8조 (개인정보 제공) */}
              <section className="m-b-25" id="article-8">
                <h4>제8조 (개인정보 제공)</h4>
                <p>
                  <ul>
                    <li>
                      회사는 원칙적으로 이용자의 개인정보를 외부에 제공하지
                      않습니다. 다만, 아래의 경우 예외로 합니다:
                      <ul>
                        <li>이용자가 사전에 동의한 경우</li>
                        <li>
                          법령에 따라 수사 목적 등으로 수사기관의 요구가 있을
                          경우, 적법한 절차에 따라 제공합니다.
                        </li>
                      </ul>
                    </li>
                  </ul>
                </p>
              </section>

              {/* 제9조 (게시물) */}
              <section className="m-b-25" id="article-9">
                <h4>제9조 (게시물)</h4>
                <p>
                  <ul>
                    <li>
                      회사는 이용자의 게시물을 보호하며, 변조, 훼손, 삭제되지
                      않도록
                      <span style={{ fontWeight: 'bold' }}>
                        {' '}
                        최선을 다합니다.
                      </span>
                    </li>
                    <li>
                      다음의 경우 게시물은 삭제되거나 수정될 수 있습니다:
                      <ul>
                        <li>타인을 비방하거나 명예를 훼손하는 내용</li>
                        <li>동의 없이 타인의 정보를 공개하는 경우</li>
                        <li>저작권, 제3자의 권리를 침해하는 경우</li>
                      </ul>
                    </li>
                    <li>
                      게시물과 관련된 권리와 책임은 작성자에게 있으며,
                      자발적으로 공개한 정보는 보호받기 어렵습니다.
                    </li>
                  </ul>
                </p>
              </section>

              {/* 제10조 (광고성 정보 전송) */}
              <section className="m-b-25" id="article-10">
                <h4>제10조 (광고성 정보 전송)</h4>
                <p>
                  <ul>
                    <li>
                      회사는 이용자의 수신 거부 의사에 반하여 영리 목적의 광고성
                      정보를
                      <span style={{ fontWeight: 'bold' }}>
                        {' '}
                        전송하지 않습니다.
                      </span>
                    </li>
                    <li>
                      광고성 정보 전송 시 제목과 본문에 쉽게 알아볼 수 있도록
                      표시하며, 수신 거부 방법을 명시합니다.
                    </li>
                    <li>
                      청소년에게 유해한 정보를 전송할 경우, “(광고)” 문구를
                      표시합니다.
                    </li>
                  </ul>
                </p>
              </section>

              {/* 제11조 (개인정보 자동 수집 장치의 설치 / 운영 및 거부에 관한 사항) */}
              <section className="m-b-25" id="article-11">
                <h4>
                  제11조 (개인정보 자동 수집 장치의 설치 / 운영 및 거부에 관한
                  사항)
                </h4>
                <p>
                  <ul style={{ listStylePosition: 'outside' }}>
                    <li>
                      <span style={{ fontWeight: 'bold' }}>쿠키란?</span>
                      <br />
                      회사는 이용자에 대한 정보를 저장하고 수시로 찾아내는
                      ‘쿠키(cookie)’를 사용합니다. 쿠키는 웹사이트가 이용자의
                      컴퓨터 브라우저(인터넷 익스플로러 등)에 전송하는 소량의
                      정보입니다.
                    </li>
                    <li>
                      <span style={{ fontWeight: 'bold' }}>쿠키 사용 목적</span>
                      <br />
                      회사는 다음과 같은 목적을 위해 쿠키를 통하여 수집된
                      이용자의 개인정보를 사용합니다.
                      <ul>
                        <li>개인의 관심 분야에 따라 차별화된 정보를 제공</li>
                        <li>
                          접속빈도 또는 방문시간 등을 분석하고 이용자의 취향과
                          관심분야를 파악하여 타겟 마케팅 및 서비스 개선
                        </li>
                        <li>
                          쇼핑한 품목들에 대한 정보와 관심 있게 둘러본 품목을
                          추적하여 개인 맞춤 쇼핑서비스 제공
                        </li>
                      </ul>
                    </li>
                    <li>
                      <span style={{ fontWeight: 'bold' }}>
                        쿠키의 설치, 운영과 거부
                      </span>
                      <ul>
                        <li>
                          쿠키는 이용자의 컴퓨터는 식별하지만 이용자를
                          개인적으로 식별하지는 않습니다. 이용자는 쿠키에 대한
                          선택권이 있습니다.
                        </li>
                        <li>
                          브라우저의 설정을 통해 쿠키를 다 받아들이거나, 설치 시
                          통지를 보내거나, 모든 쿠키를 거부할 수 있습니다. 설정
                          방법은 아래를 참조하세요:
                          <ul>
                            <li>
                              Internet Explorer: 도구 메뉴 &gt; 인터넷 옵션 &gt;
                              개인정보 탭 &gt; 개인정보처리 수준 설정
                            </li>
                            <li>
                              Chrome: 설정 메뉴 &gt; 고급 설정 표시 &gt;
                              개인정보 - 콘텐츠 설정 &gt; 쿠키 수준 설정
                            </li>
                            <li>
                              Firefox: 옵션 메뉴 &gt; 개인정보 &gt; 방문기록 -
                              사용자 정의 설정 &gt; 쿠키 수준 설정
                            </li>
                            <li>
                              Safari: 환경 설정 메뉴 &gt; 개인정보 탭 &gt; 쿠키
                              및 웹 사이트 데이터 수준 설정
                            </li>
                          </ul>
                        </li>
                        <li>
                          쿠키를 거부할 경우 일부 서비스 이용에 어려움이 있을 수
                          있습니다.
                        </li>
                      </ul>
                    </li>
                  </ul>
                </p>
              </section>

              {/* 제12조 (모바일 앱 사용 시 광고 식별자 (ADID/IDFA) 수집) */}
              <section className="m-b-25" id="article-12">
                <h4>제12조 (모바일 앱 사용 시 광고 식별자 (ADID/IDFA) 수집)</h4>
                <p>
                  <ul style={{ listStylePosition: 'outside' }}>
                    <li>
                      회사는 이용자의 ADID/IDFA를 수집할 수 있습니다.
                      ADID/IDFA는 모바일 앱 이용자의 광고 식별 값으로, 맞춤
                      서비스 제공과 더 나은 환경의 광고를 위해 사용됩니다.
                    </li>
                    <li>거부 방법:</li>
                    <ul>
                      <li>
                        Android: 설정 &gt; 구글(구글설정) &gt; 광고 &gt; 광고
                        맞춤 설정 선택 해제
                      </li>
                      <li>
                        iOS: 설정 &gt; 개인 정보 보호 &gt; 광고 &gt; 광고 추적
                        제한
                      </li>
                    </ul>
                  </ul>
                </p>
              </section>

              {/* 제13조 (온라인 맞춤형 광고 서비스) */}
              <section className="m-b-25" id="article-13">
                <h4>제13조 (온라인 맞춤형 광고 서비스)</h4>
                <p>
                  <ul>
                    <li>
                      행태정보를 수집 및 처리하는 광고 사업자: 구글, 페이스북,
                      카카오, 크리테오
                    </li>
                    <li>
                      행태정보 수집 방법: 이용자가 당사 웹사이트를 방문하거나 앱
                      실행 시 자동 수집 및 전송
                    </li>
                  </ul>
                </p>
              </section>

              {/* 제14조 (개인정보의 기술적·관리적 보호 대책 등 안전성 확보 조치에 관한 사항) */}
              <section className="m-b-25" id="article-14">
                <h4>
                  제14조 (개인정보의 기술적·관리적 보호 대책 등 안전성 확보
                  조치에 관한 사항)
                </h4>
                <p>
                  <ul>
                    <li>
                      <span style={{ fontWeight: 'bold' }}>기술적 대책</span>
                      <ul>
                        <li>
                          중요 개인정보를 암호화하여 통신하며, 인증된 SSL로
                          데이터 보호
                        </li>
                        <li>첨단 방화벽과 IP 숨김 기능을 통해 해킹 방지</li>
                        <li>첨단 보안 시스템 도입으로 개인정보보호 강화</li>
                      </ul>
                    </li>
                    <li>
                      <span style={{ fontWeight: 'bold' }}>관리적 대책</span>
                      <ul>
                        <li>개인정보 접근 권한 최소화</li>
                        <li>정기적인 개인정보보호 교육 및 외부 위탁 교육</li>
                        <li>전산실을 출입통제구역으로 지정</li>
                        <li>개인정보 유출 발생 시 즉시 통보 및 대책 강구</li>
                      </ul>
                    </li>
                  </ul>
                </p>
              </section>

              {/* 제15조 (이용자 및 법정대리인의 권리와 그 행사방법) */}
              <section className="m-b-25" id="article-15">
                <h4>제15조 (이용자 및 법정대리인의 권리와 그 행사방법)</h4>
                <p>
                  <ul>
                    <li>
                      이용자는 개인정보를 조회하거나 수정할 수 있으며, 가입
                      해지를 요청할 수 있습니다.
                    </li>
                    <li>
                      오류 정정을 요청하면 완료 전까지 개인정보 이용 및 제공이
                      제한됩니다.
                    </li>
                    <li>
                      삭제된 개인정보는 회사의 보유 기간 정책에 따라 관리되며,
                      이후 열람이 불가합니다.
                    </li>
                  </ul>
                </p>
              </section>

              {/* 제16조 (개인정보에 관한 민원서비스) */}
              <section className="m-b-25" id="article-16">
                <h4>제16조 (개인정보에 관한 민원서비스)</h4>
                <p>
                  <ul style={{ listStylePosition: 'outside' }}>
                    <li>
                      <span style={{ fontWeight: 'bold' }}>
                        고객서비스 담당 부서:
                      </span>{' '}
                      CS고객행복센터
                      <br />
                      <span style={{ fontWeight: 'bold' }}>전화번호:</span>{' '}
                      1588-0000
                      <br />
                      <span style={{ fontWeight: 'bold' }}>이메일:</span>{' '}
                      closet@closet.com
                      <br />
                      <span style={{ fontWeight: 'bold' }}>
                        개인정보보호책임자:
                      </span>{' '}
                      이정민
                    </li>
                    <li>기타 신고는 아래 기관에 문의하세요:</li>
                    <ul>
                      <li>
                        <Link
                          to="https://www.kopico.go.kr"
                          target="_blank"
                          rel="noreferrer"
                        >
                          개인분쟁조정위원회
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="http://www.eprivacy.or.kr"
                          target="_blank"
                          rel="noreferrer"
                        >
                          정보보호인증마크제도
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="https://cyberbureau.police.go.kr"
                          target="_blank"
                          rel="noreferrer"
                        >
                          경찰청 사이버안전국
                        </Link>
                      </li>
                    </ul>
                  </ul>
                </p>
              </section>

              {/* 제17조 (고지의 의무) */}
              <section className="m-b-25" id="article-17">
                <h4>제17조 (고지의 의무)</h4>
                <p>
                  <ul>
                    <li>
                      본 개인정보처리방침은 정책 또는 기술 변경 시
                      업데이트됩니다. 변경 사항은 홈페이지의 공지란에
                      고지됩니다.
                    </li>
                    <li>
                      <span style={{ fontWeight: 'bold' }}>고지일자:</span>{' '}
                      2024년 12월 10일
                      <br />
                      <span style={{ fontWeight: 'bold' }}>시행일자:</span>{' '}
                      2024년 12월 10일
                    </li>
                  </ul>
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
