// 출처: '자주 쓰이는 한국어 낱말 5800'
var wordBox = ["참다", "크기", "고기", "남기다", "서양", "주요",
    "지나치다", "가져오다", "냄새", "부드럽다", "여기다", "이",
    "공연", "남녀", "내놓다", "떼다", "만들어지다", "속도", "심각하다",
    "준비", "계속되다", "구월", "맑다", "소년", "소식", "유월", "작용",
    "허리", "골", "공업", "그중", "노인", "벌다", "살리다", "새", "영어",
    "출신", "결정", "경향", "기록", "나름", "대답하다", "반면", "썰다",
    "움직임", "이미지", "터지다", "특성", "교장", "벗다", "업무", "입시",
    "준비하다", "청소년", "돕다", "응", "이기다", "찾아보다", "취하다",
    "다루다", "달", "사장", "삼월", "그렇지만", "선배", "업체", "키",
    "구하다", "국회", "그러므로", "포함하다", "걱정", "결혼하다", "만약",
    "바르다", "세월", "숨", "행사", "깨닫다", "누나", "신", "왕", "점점",
    "질문", "특별", "판단", "해결하다", "거리", "계속하다", "그치다",
    "근처", "너무나", "높이다", "부정", "사정", "도대체", "막", "부모님",
    "수출", "계시다", "그", "자르다", "데리다", "마리", "무척", "비용",
    "비행기", "옳다", "원래", "처리", "최초", "꼴", "놀이", "뜨겁다",
    "뿌리", "수입", "초", "그리하여", "낮", "일찍", "직원", "찍다",
    "가볍다", "내부", "다소", "상대", "오전", "피부", "가게", "가득",
    "그저", "도", "벽", "장군", "무역", "부담", "약속", "인사", "줄",
    "쳐다보다", "충분히", "대", "신체", "에너지", "위원", "정리하다",
    "집안", "배경", "죽이다", "단순하다", "반대", "법칙", "빠지다",
    "소금", "오염", "자전거", "참여하다", "탓", "푸르다", "그래",
    "목", "발표", "범죄", "위", "흔들다", "기초", "논리", "드라마",
    "뽑다", "피우다", "감각", "미리", "부족하다", "인사", "저희",
    "진행되다", "교통", "기구", "법", "오랜", "젊은이", "후보",
    "거리", "과제", "근거", "기록하다", "다가오다", "불다", "시각",
    "이끌다", "종합", "한글", "가을", "개발하다", "내일", "떨다",
    "매일", "손가락", "수단", "자", "자유롭다", "적극적", "판매",
    "형성", "기울이다", "길이", "장면", "점차", "톤", "관련되다",
    "급", "나머지", "날씨", "더불다", "동물", "의사", "개방",
    "건강하다", "미래", "앞서", "여러분", "왜냐하면", "인구",
    "기대하다", "네", "도착하다", "병", "소프트웨어", "흘리다",
    "반응", "주인공", "당연하다", "따뜻하다", "따로", "비판",
    "빌리다", "세대", "축구", "형님", "놓이다", "당장", "무렵",
    "밝다", "사물", "일반적", "장소", "곱다", "바닥", "새끼",
    "생각되다", "서비스", "선택하다", "심다", "적다", "코",
    "간단하다", "고등학교", "공개", "교실", "스스로", "견디다",
    "기사", "막히다", "매체", "별", "복잡하다", "뿌리다",
    "영역", "체험", "구속", "때로", "어쩌면", "극복하다", "불법",
    "비밀", "색", "쓰이다", "일정하다", "다지다", "밝혀지다",
    "아까", "알맞다", "이념", "희다", "가리키다"];

const MAX_LEVEL = 5;
const DEAD_LINE = 275;
const LIFE = 10;

var is_it_run = false;
var is_it_clear = false;

var childList = [];
var goalScore = 10;
var dropTick = 2000;
var downTick = 1000;

var startButton = document.getElementById("startButton");
var inputText = document.getElementById("inputText")
var contents = document.getElementById("contents");
var levelDiv = document.getElementById("level");
var scoreDiv = document.getElementById("score");
var failDiv = document.getElementById("fail");

var level = 1;
levelDiv.innerHTML = "레벨: " + level;
var score = 0;
scoreDiv.innerHTML = "점수: " + score + " (목표: " + goalScore + ")";
var fail = 0;
failDiv.innerHTML = "실패: " + fail + " (목숨: " + LIFE + ")";

startButton.addEventListener('click', function() {
    if (is_it_run == false) {
        startGame();
        is_it_run = true;
    }    
})

function startGame() {
    alert(level + "단계 게임 시작!");
    is_it_clear = false;
    dropWord();
    downWord();
}

function dropWord() {
    var dropInterval = setInterval(function() {
        var wordPosition = getRandomPosition();
        var word = document.createElement("div");
        word.style.position = "absolute";
        word.style.left = wordPosition + "px";
        word.innerHTML = wordBox[getRandomIndex()];

        contents.appendChild(word);
        childList.push(word);

        if (is_it_clear) {
            clearChild();
            clearInterval(dropInterval);
        } else if (fail == LIFE) {
            clearChild();
            clearInterval(dropInterval);
        }
    }, dropTick)
}

function downWord() {
    var downInterval = setInterval(function() {
        for (let i = 0; i < childList.length; i++) {
            var nowTop = Number(childList[i].style.top.replace('px',''))
            childList[i].style.top = (nowTop + 25) + "px" ;
            if (nowTop >= DEAD_LINE) {
                if (contents.contains(childList[i])) {
                    contents.removeChild(childList[i]);
                    fail++;
                    failDiv.innerHTML = "실패: " + fail + " (목숨: " + LIFE + ")";
                }
            }
        }
        if (is_it_clear) {
            clearChild();
            clearInterval(downInterval);
        } else if (fail == LIFE) {
            alert("Game Over!");
            clearChild();
            clearInterval(downInterval);
        }
    }, downTick)
}

function levelClear() {
    if (level >= MAX_LEVEL) {
        alert("게임을 모두 클리어 하셨습니다!");
        location.reload();
    }
    level++;
    startButton.value = level + "단계 진행";

    goalScore = 10 + (5 * (level - 1));
    dropTick = 2000 - (200 * level);
    downTick = 1000 - (100 * level);
    levelDiv.innerHTML = "레벨: " + level;
    score = 0;
    scoreDiv.innerHTML = "점수: " + score + " (목표: " + goalScore + ")";
    fail = 0;
    failDiv.innerHTML = "실패: " + fail + " (목숨: " + LIFE + ")";
    clearChild();
    is_it_run = false;
    for (let i = 0; i < childList.length; i++)
        childList.pop();
}

function clearChild() {
    for (let i = 0; i < childList.length; i++) {
        if (contents.contains(childList[i])) {
            contents.removeChild(childList[i]);
        }
    }
}

inputText.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        for (let i = 0; i < childList.length; i++) {
            if (inputText.value == childList[i].innerHTML) {
                if (contents.contains(childList[i])) {
                    contents.removeChild(childList[i]);
                    score += 1;
                    scoreDiv.innerHTML = "점수: " + score + " (목표: " + goalScore + ")";

                    if (score == goalScore) {
                        alert(level + "단계 성공!");
                        alert("점수: " + score + "\n실패: " + fail);
                        levelClear();
                        is_it_clear = true;
                    }
                    break;
                }
            }
        }
        inputText.value = "";
    }
})

function getRandomPosition() {
    return Math.floor(Math.random() * 420) + 10;
}

function getRandomIndex() {
    return Math.floor(Math.random() * wordBox.length);
}