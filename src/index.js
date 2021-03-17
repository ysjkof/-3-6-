const colors = ['#1abc9c', '#3498db', '#white', '#f39c12', '#e74c3c'];
const h2 = document.querySelector('h2');

const body = document.querySelector('body');

const clock = document.querySelector('.clock-clock');
const clockTitle = document.querySelector('.clock-title');
const now = new Date(),
  nowYear = now.getFullYear(),
  nowMonth = now.getMonth(),
  nowDate = now.getDate(),
  nowHours = now.getHours(),
  nowMinutes = now.getMinutes(),
  nowSeconds = now.getSeconds(),
  xmasDay = new Date(`${nowYear}-12-24:00:00:00+0900`),
  newYear = new Date(`${nowYear + 1}-01-01:00:00:00+0900`),
  arborDay = new Date(`${nowYear + 1}-01-01:00:00:00+0900`),
  _xmasDay = xmasDay.getTime(),
  _getTime = now.getTime(),
  xmasDDay = _xmasDay - _getTime,
  reminingSec = Math.floor(xmasDDay / 1000) % 60,
  reminingMin = Math.floor(xmasDDay / 1000 / 60) % 60,
  reminingHou = Math.floor(xmasDDay / 1000 / 60 / 60) % 24,
  reminingDat = Math.floor(xmasDDay / 1000 / 60 / 60 / 24),
  reminingMon = Math.floor(xmasDDay / 1000 / 60 / 60 / 24 / 30) % 365;

const chooseHoliday = localStorage.getItem('chooseHoliday');
const selectedSelect = document.querySelector(
  `#holiday-selector option[value=${chooseHoliday}]`
);

// 4번 숙제: JavaScript localStorage와 HTML select
function loadHoliday() {
  if (chooseHoliday) {
    selectedSelect.setAttribute('selected', 'selected');
    console.log('최근 선택 불러오기 완료.');
    console.log(selectedSelect.innerText);
  } else {
    console.log('최근 선택을 불러올 수 없습니다.');
  }
}

function saveHoliday(event) {
  const currentChooseHoliday = event.target.value;
  // localStorage.removeItem('chooseHoliday');
  localStorage.setItem('chooseHoliday', currentChooseHoliday);
  clockTitle.innerText = event.target.value;
  console.log(`변경함 : ${currentChooseHoliday}`);
}

function detectChange() {
  const holidaySelect = document.querySelector('#holiday-selector');
  holidaySelect.addEventListener('change', saveHoliday);
}

function forthHomework() {
  loadHoliday();
  detectChange();
}

// 3번 숙제: D-Day 만들기
function thirdHomework() {
  if (selectedSelect) {
    // clockTitle.innerText = selectedSelect.innerText;
    clock.innerText = _getTime.year;
    clock.innerText = `
    ${xmasDay.getFullYear()}년 ${
      xmasDay.getMonth() + 1
    }월 ${xmasDay.getDate()}일 입니다.

    지금 시간은 ${nowYear}년 ${
      nowMonth + 1
    }월 ${nowDate}일 ${nowHours}시 ${nowMinutes}분 ${nowSeconds}초

    D - day
    크리스마스까지 ${reminingDat}일 ${reminingHou}시 ${reminingMin}분 ${reminingSec}초 남았어요.
    ${reminingDat}일은 ${reminingMon}개월 입니다.`;
  } else {
    clock.innerText = `지금 시간은 ${nowYear}년 ${
      nowMonth + 1
    }월 ${nowDate}일 ${nowHours}시 ${nowMinutes}분 ${nowSeconds}초
      
    D - day를 선택해주세요.`;
  }
}

// 2번 숙제: 화면 크기 변화에 따라 배경색 바꾸기
function changeWindowBgColor(width) {
  console.log(width);
  if (width < 800) {
    // body.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    body.classList.add('yellow');
  } else if (width < 1100) {
    body.classList.remove('yellow', 'blue');
  } else {
    body.classList.add('blue');
  }
}

// 1번 숙제… 마우스 이벤트리스너
const superEventHandler = {
  changeMouseOver: function (e) {
    console.log(e);
    h2.innerText = '마우스를 올렸어!';
    h2.style.color = colors[0];
  },
  changeMouseLeave: function () {
    h2.innerText = '마우스를 내렸네...';
    h2.style.color = colors[1];
  },
  changeWindowResize: function (event) {
    const innerWidth = event.target.innerWidth;
    const innerHeight = event.target.innerHeight;
    console.log(`가로${innerWidth} : 높이${innerHeight}`);
    // 2번 숙제
    changeWindowBgColor(innerWidth);

    h2.innerText = '창 크기를 바꿨어!';
    h2.style.color = colors[2];
  },
  changeMouseRtClick: function () {
    h2.innerText = '우클릭을 했네?';
    h2.style.color = colors[3];
  },
};

function firstHomework() {
  h2.addEventListener('mouseover', superEventHandler.changeMouseOver);
  h2.addEventListener('mouseleave', superEventHandler.changeMouseLeave);
  window.addEventListener(
    'resize',
    superEventHandler.changeWindowResize,
    changeWindowBgColor
  );
  window.addEventListener('contextmenu', superEventHandler.changeMouseRtClick);
}

function init() {
  firstHomework();
  thirdHomework();
  setInterval(thirdHomeworkTimer, 1000);
  forthHomework();
}

init();
