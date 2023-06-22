const btn1 = document.getElementById("btn_1");
const btn2 = document.getElementById("btn_2");
const btn3 = document.getElementById("btn_3");
const imagelogo = document.getElementById("image-logo");
const buttons = document.getElementById("buttons");

let randomClub;

const randomIndexClub = () => {
    const max = 2;
    const min = 0;
    const index = Math.floor(Math.random() * (max - min + 1) + min);
    return index;
  };

  const indexClub = randomIndexClub();

const checkClub = (e) => {
    if (e.target.innerText == randomClub.name )
  console.log("coinciden ", e.target.innerText);
  else {
    console.log("no coinciden", e.target.innerText)
  }
};

buttons.addEventListener(
  "click",
  (e) => {
    checkClub(e);
  },
  { once: true }
);

const listClubes = async () => {
  const response = await fetch("/api/club");
  const data = await response.json();
  imagelogo.src = data.clubes[indexClub].imageUrl;
  btn1.innerText = data.clubes[0].name;
  btn2.innerText = data.clubes[1].name;
  btn3.innerText = data.clubes[2].name;
  randomClub = data.clubes[indexClub]
};

listClubes();
