const URL = "https://opentdb.com/api.php?amount=5&category=19&difficulty=medium&type=multiple";

const questionParent = document.querySelector(".question-container");
const optionsParent  = document.querySelector(".option-container");
const nextButton     = document.querySelector(".next");


let quizzes = [];
let currentQuestionIndex = 0;



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

optionsParent.addEventListener("click",(e)=>{
    if(e.target.name===quizzes[currentQuestionIndex].correct_answer){
        e.target.classList.add("correct");
    }
    else if(e.target.name !== quizzes[currentQuestionIndex].correct_answer){
        e.target.classList.add("incorrect");
    }
})

nextButton.addEventListener("click",()=>{
    currentQuestionIndex++;
    questionParent.innerText="";
    optionsParent.innerText = "";
    createQuestionAndOption(quizzes,currentQuestionIndex);

})

setTimeout(()=>createQuestionAndOption(quizzes,currentQuestionIndex),2000);


