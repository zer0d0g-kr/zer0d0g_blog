const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.clearRect(0, 0, canvas.width, canvas.height);
let particlesArray = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 윈도우 리사이즈 이벤트
window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init(); // 초기화 함수 호출
});

// 파티클 클래스 justice
class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
    this.opacity = Math.random(); // 초기 불투명도 랜덤 설정
    this.fadeRate = (Math.random() * 0.02) + 0.005; // 페이드 아웃 속도 랜덤 설정
    this.fadingOut = true; // 초기 페이드 아웃 상태
  }

  // 파티클 그리기
  draw() {
    ctx.fillStyle = `rgba(0, 255, 255, ${this.opacity})`;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  // 파티클 업데이트
  update() {
    // 경계 체크 및 방향 전환
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }

    this.x += this.directionX * 0.5; // 속도 감소
    this.y += this.directionY * 0.5; // 속도 감소

    // 불투명도 조정
    if (this.fadingOut) {
      this.opacity -= this.fadeRate;
      if (this.opacity <= 0) {
        this.fadingOut = false; // 페이드 인으로 전환
      }
    } else {
      this.opacity += this.fadeRate;
      if (this.opacity >= 1) {
        this.fadingOut = true; // 페이드 아웃으로 전환
      }
    }

    this.draw(); // 파티클 참 쉽죠잉?
  }
}

// 파티클 초기화
function init() {
  particlesArray = [];
  let numberOfParticles = 40; // 맻끼고? 파티클 갯수말이다.
  for (let i = 0; i < numberOfParticles; i++) {
    let size = (Math.random() * 5) + 1;
    let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
    let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
    let directionX = Math.random() < 0.5 ? 1 : -1;
    let directionY = Math.random() < 0.5 ? 1 : -1;
    let color = '#00FFFF';

    particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}

// 파티클 간의 connection (heart)
function connectParticles() {
  let opacity;
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
        ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
      if (distance < (canvas.width / 7) * (canvas.height / 7)) {
        opacity = 1 - (distance / 20000);
        ctx.strokeStyle = `rgba(0, 255, 255, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

// 애니메이션 함수
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스를 지울 때 배경색을 설정하지 않음

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update(); // 파티클 업데이트 호출
  }
  connectParticles(); // 파티클 맻기고 호출
}

init(); // 초기화 
animate(); // 애니메이션 