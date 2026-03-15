let isLoading = false;
let currentTheme = "light";
let aiButton = null;

function getArticleText(){

let article = document.querySelector("article");
let paragraphs = [];

if(article){
paragraphs = article.querySelectorAll("p");
}
else{

let main = document.querySelector("main");

if(main){
paragraphs = main.querySelectorAll("p");
}
else{
paragraphs = document.querySelectorAll("p");
}

}

let text = "";

paragraphs.forEach(p=>{
text += p.innerText + " ";
});

return text;

}

async function getAISummary(articleText){

const API_KEY = "AIzaSyAxw-3Or7mRDYtnUFCRr1xsTJlVNc2cjRI";

try{

const response = await fetch(
"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + API_KEY,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
contents:[{
parts:[{
text:"Summarize this news article into 5–8 concise bullet points starting with '- ':\n\n"+articleText.substring(0,3000)
}]
}]
})
}
);

const data = await response.json();

if(data.candidates && data.candidates.length>0){
return data.candidates[0].content.parts[0].text;
}

return null;

}
catch(err){
console.error(err);
return null;
}

}

function applyTheme(theme){

currentTheme = theme;

let sidebar = document.getElementById("ai-summary-sidebar");

if(!sidebar) return;

if(theme==="dark"){
sidebar.style.background="rgba(30,30,30,0.6)";
sidebar.style.color="#ffffff";
}
else{
sidebar.style.background="rgba(255,255,255,0.6)";
sidebar.style.color="#000000";
}

let cards = sidebar.querySelectorAll(".summary-card");

cards.forEach(card=>{
card.style.background = theme==="dark"
? "rgba(60,60,60,0.45)"
: "rgba(255,255,255,0.45)";
});

}

function addResizer(sidebar){

let resizer = document.createElement("div");

resizer.style.position="absolute";
resizer.style.left="0";
resizer.style.top="0";
resizer.style.width="8px";
resizer.style.height="100%";
resizer.style.cursor="ew-resize";
resizer.style.zIndex="1000000";

sidebar.appendChild(resizer);

let startX = 0;
let startWidth = 0;

resizer.addEventListener("mousedown",(e)=>{

startX = e.clientX;
startWidth = sidebar.offsetWidth;

function resize(e){

let newWidth = startWidth + (startX - e.clientX);

if(newWidth > 260 && newWidth < 900){
sidebar.style.width = newWidth + "px";
}

}

function stopResize(){

document.removeEventListener("mousemove",resize);
document.removeEventListener("mouseup",stopResize);

}

document.addEventListener("mousemove",resize);
document.addEventListener("mouseup",stopResize);

});

}

async function runSimplifier(){

if(isLoading) return;
isLoading = true;

let existing = document.getElementById("ai-summary-sidebar");
if(existing) existing.remove();

let sidebar = document.createElement("div");

sidebar.id="ai-summary-sidebar";

sidebar.style.position="fixed";
sidebar.style.right="0";
sidebar.style.top="0";
sidebar.style.width="360px";
sidebar.style.height="100%";
sidebar.style.padding="20px";
sidebar.style.boxShadow="-4px 0 20px rgba(0,0,0,0.1)";
sidebar.style.zIndex="999999";
sidebar.style.overflowY="auto";
sidebar.style.fontFamily="Segoe UI";

sidebar.style.backdropFilter="blur(14px)";
sidebar.style.borderLeft="1px solid rgba(255,255,255,0.2)";

sidebar.style.transform="translateX(100%)";
sidebar.style.transition="transform 0.3s ease";

sidebar.innerHTML=`
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px;">
<h2>🧠 AI News Summary</h2>

<div>
<button id="light-mode">☀️</button>
<button id="dark-mode">🌙</button>
<button id="close-summary">✕</button>
</div>

</div>

<p id="loading">Generating summary...</p>
`;

document.body.appendChild(sidebar);

addResizer(sidebar);

setTimeout(()=>{
sidebar.style.transform="translateX(0)";
},10);

if(aiButton) aiButton.style.display="none";

applyTheme(currentTheme);

document.getElementById("light-mode").onclick=()=>applyTheme("light");
document.getElementById("dark-mode").onclick=()=>applyTheme("dark");

document.getElementById("close-summary").onclick=()=>{

sidebar.style.transform="translateX(100%)";

setTimeout(()=>{
sidebar.remove();
if(aiButton) aiButton.style.display="flex";
},300);

};

let article = getArticleText();

if(article.length<200){
document.getElementById("loading").innerText="No article detected.";
isLoading=false;
return;
}

let summary = await getAISummary(article);

if(!summary){
document.getElementById("loading").innerText="Failed to generate summary.";
isLoading=false;
return;
}

sidebar.innerHTML=`
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px;">
<h2>🧠 AI News Summary</h2>

<div>
<button id="light-mode">☀️</button>
<button id="dark-mode">🌙</button>
<button id="close-summary">✕</button>
</div>

</div>

<div id="summary-container"></div>
`;

addResizer(sidebar);

let container = sidebar.querySelector("#summary-container");

let points = summary.split("\n");

points.forEach(point=>{

let cleaned = point.replace(/^[-•*]\s*/,"").trim();

if(cleaned.length>5){

let card=document.createElement("div");

card.className="summary-card";

card.style.padding="14px 16px";
card.style.borderRadius="14px";
card.style.marginBottom="12px";
card.style.boxShadow="0 6px 16px rgba(0,0,0,0.08)";
card.style.fontSize="14px";
card.style.lineHeight="1.5";
card.style.transition="all 0.2s ease";
card.style.border="1px solid rgba(255,255,255,0.15)";
card.style.backdropFilter="blur(6px)";

card.textContent=cleaned;

card.onmouseenter=()=>{
card.style.transform="translateY(-2px)";
};

card.onmouseleave=()=>{
card.style.transform="translateY(0)";
};

container.appendChild(card);

}

});

applyTheme(currentTheme);

document.getElementById("light-mode").onclick=()=>applyTheme("light");
document.getElementById("dark-mode").onclick=()=>applyTheme("dark");

document.getElementById("close-summary").onclick=()=>{

sidebar.style.transform="translateX(100%)";

setTimeout(()=>{
sidebar.remove();
if(aiButton) aiButton.style.display="flex";
},300);

};

isLoading=false;

}

function createFloatingButton(){

aiButton=document.createElement("div");

aiButton.innerText="🧠";

aiButton.style.position="fixed";
aiButton.style.bottom="25px";
aiButton.style.right="25px";
aiButton.style.width="55px";
aiButton.style.height="55px";
aiButton.style.background="#4c6ef5";
aiButton.style.color="white";
aiButton.style.borderRadius="50%";
aiButton.style.display="flex";
aiButton.style.alignItems="center";
aiButton.style.justifyContent="center";
aiButton.style.fontSize="24px";
aiButton.style.cursor="pointer";
aiButton.style.boxShadow="0 4px 12px rgba(0,0,0,0.25)";
aiButton.style.zIndex="999999999";

document.body.appendChild(aiButton);

aiButton.onclick=()=>{
runSimplifier();
};

}

createFloatingButton();