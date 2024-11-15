// DOMContentLoaded 이벤트가 발생하면 함수 ㄱㄱ
document.addEventListener("DOMContentLoaded", function() {
  // 모든 typewriter 요소 선택
  const typewriterElements = document.querySelectorAll('.typewriter');

  // 각 문장별로 typewriter 요소에 대해 타이핑 효과 부여하기 깔깔
  typewriterElements.forEach(element => {
    const text = element.getAttribute('data-text'); // data-text 속성에서 텍스트 가가온나
    let charIndex = 0; // 현재 문자 인덱스 날려뿌기

    // 타이핑 함수 정의
    function type() {
      if (charIndex < text.length) {
        element.innerHTML += text.charAt(charIndex); // 한 글자씩 추가
        charIndex++;
        setTimeout(type, 100); // 쪼매 기다리소
      }
    }

    type(); // 재귀함수의 재귀함수의 재귀함수의 재귀함수의...
  });
});