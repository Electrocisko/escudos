const btn1 = document.getElementById("btn_1");
const btn2 = document.getElementById("btn_2");
const btn3 = document.getElementById("btn_3");
const imagelogo = document.getElementById("image-logo");
const buttons = document.getElementById("buttons");

let randomClub;
let counter = 0;
let points = 0;

const randomIndexClub = () => {
  const max = 2;
  const min = 0;
  const index = Math.floor(Math.random() * (max - min + 1) + min);
  return index;
};

const indexClub = randomIndexClub();

const checkClub = (e) => {
  counter++;
  if (e.target.innerText == randomClub.name) {
    alert("Muy Bien !!");
    points++;
  } else {
    alert("Sigue Participando");
  }
  if (counter < 3) {
    listClubes();
  } else {
    alert("Game Over Usted hizo: "+points+" puntos.");
    window.location.reload();
  }
};

buttons.addEventListener("click", (e) => {
  checkClub(e);
});

const listClubes = async () => {
  const response = await fetch("/api/club");
  const data = await response.json();
  imagelogo.src = data.clubes[indexClub].imageUrl;
  btn1.innerText = data.clubes[0].name;
  btn2.innerText = data.clubes[1].name;
  btn3.innerText = data.clubes[2].name;
  randomClub = data.clubes[indexClub];
};

listClubes();
