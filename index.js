const URL = "https://opentdb.com/api.php?amount=5&category=19&difficulty=medium&type=multiple";

const questionParent = document.querySelector(".question-container");
const optionsParent  = document.querySelector(".option-container");
const nextButton     = document.querySelector(".next");
const quizCategory  = document.querySelector(".quiz-category");
const qnsCount =    document.querySelector(".qns-count");
const curScore = document.querySelector(".cur-score");

let quizzes = [];
let currentQuestionIndex = 0;
let score=0;



const getData = async ( URL) =>{
    try {
        const {
            data : {results},
        } = await axios.get(URL);

       return results;
    }
    catch(err){
        console.log(err);
    }
};

const getQuizzes = async()=>{
    quizzes  = await getData(URL);
};

getQuizzes();

function createQuestionAndOption(quizzes,index){
   quizCategory.innerText = quizzes[index].category;
   qnsCount.innerHTML = `Q${index+1}/${quizzes.length}`
   const questionEle = document.createElement("p");
   questionEle.innerText = quizzes[index].question;
   questionParent.appendChild(questionEle);

   let options = [
        quizzes[index].correct_answer,
        ...quizzes[index].incorrect_answers
   ].sort(()=>Math.random()-0.5);

   for(option of options){
        const optionBtn = document.createElement("button");
        optionBtn.setAttribute("name",option);
        optionBtn.classList.add("button");
        optionBtn.innerHTML=option;
        optionsParent.appendChild(optionBtn);
   }

}

function disableOption(){
    document.
        querySelectorAll(".button")
        .forEach((button)=>(button.disabled)=true)
}

optionsParent.addEventListener("click",(e)=>{
    if(e.target.name===quizzes[currentQuestionIndex].correct_answer){
        e.target.classList.add("correct");
        score++;
        curScore.innerText = `Score : ${score}`;
        disableOption();
    }
    else if(e.target.name !== quizzes[currentQuestionIndex].correct_answer){
        e.target.classList.add("incorrect");
        disableOption();
    }
})



nextButton.addEventListener("click",()=>{
    currentQuestionIndex++;
    questionParent.innerText="";
    optionsParent.innerText = "";
    createQuestionAndOption(quizzes,currentQuestionIndex);

})

setTimeout(()=>createQuestionAndOption(quizzes,currentQuestionIndex),2000);


