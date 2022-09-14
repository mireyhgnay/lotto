const lotto = new Array(6) 
let isCreate = false
let step = 0; // 6되면 완료
let intervalId = 0;
const createComment = ["생성중..","생성중...","생성중."]

// lotto 전체 번호
function createWholeNumber(){
  for(let i = 1; i <= 45; i++){
    const numDiv = document.createElement("div")
    numDiv.innerHTML = `<p class="number">${i}</p>`
    numDiv.id = `no-${i}`
    $(".js-numbers").append(numDiv)
  }
}

// 선택된 번호 표시 없애기
function clearNumbers(){
  $('.selected').removeClass('selected');
}

// 6개 번호 랜덤으로 선택
function createNumbers(){
  if(isCreate){
    return;  
  }
  isCreate = true; // 생성상태
  
  clearNumbers();
  
  let count = 0; 
  let flag = true;
  
  while(count < 6){
    let number = parseInt(Math.random() * 45) + 1; 
    for(let i = 0; i < count; i++){
      if(lotto[i] == number){
        flag = false;  
      }
    }

    if(flag){
      lotto[count] = number;
      count++; 
    }
    flag = true;
  }
  
  // 0.5s마다 숫자 하나씩 visible
  $(".ing").addClass("visible")
  intervalId = setInterval(pointNumbers, 500)
  
}

// 배열 lotto에 번호 6개가 다 들어갔다면
function pointNumbers(){
  $(`#no-${lotto[step]}`).addClass("selected")
  $(".ing").text(createComment[step % 3])
  step++;
  
  // 번호 표시 끝
  if(step == 6){
    clearInterval(intervalId)
    displayNumbers();
    $(".ing").removeClass("visible")
    step = 0;
    isCreate = false;
  }
}

// 6개 번호 선택을 마치고 나면, result에 보여주기
function displayNumbers(){
  const numberContainer = document.createElement("div")

  for(let i = 0; i < 6; i++){
    const number = document.createElement("div")
    number.textContent = `${lotto[i]}`
    if(lotto[i] < 10){
      $(number).css('backgroundColor','#008565')
    }else if(lotto[i] < 20){
      $(number).css('backgroundColor','#ea4307')
    }else if(lotto[i] < 30){
      $(number).css('backgroundColor','#ef6e6f')
    }else if(lotto[i] < 40){
      $(number).css('backgroundColor','#5b5ba2')
    }else{
      $(number).css('backgroundColor','#f4b926')
    }
    $(numberContainer).css("display", "none")
    numberContainer.appendChild(number)
  } 

  $(".result").append(numberContainer)
  $(numberContainer).fadeIn(3000)
  $(".js-reset").show();
  
}

// init
function init(){
  createWholeNumber();
  $(".ing").removeClass("visible")
}

// 처음상태로 reset
function resetNumbers(){
  clearNumbers();
  $(".result").empty(); 
  $(".js-reset").hide();  
}

$(document).ready(function(){
  init();
  $(".js-btn").click(createNumbers)
  $(".js-reset").click(resetNumbers)
})




