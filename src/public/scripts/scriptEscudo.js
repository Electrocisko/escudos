const btn1 = document.getElementById("btn_1");
const btn2 = document.getElementById("btn_2");
const btn3 = document.getElementById("btn_3");
const imagelogo = document.getElementById("image-logo");
const buttons = document.getElementsByTagName("button");
const logo = document.getElementById("logo");
const levels = document.getElementsByName("level");
const logoutBtn = document.getElementById("logoutBtn");
const levelsRadio = document.getElementById("levels-radio");
const playerData = document.getElementById("player-data");

btn1.classList.add("hidden");
btn2.classList.add("hidden");
btn3.classList.add("hidden");

let randomClub;
let counter = 0;
let points = 0;
let duplicity = [];
let time;
let level = 0;
let attempts = 10;
let good = 0;

function playSound(name) {
  let audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

const saveRecordPlayer = async (points, elapsed) => {
  try {
    const urlRecord = `/api/record`
    const data = await fetch(urlRecord);
    const response = await data.json();
    let recordPoints = 0;
    let recordTime = 0;
 // Defino los records en cero
    if (response.recordData.length > 0) {
      recordPoints = response.recordData[0].recordPoints;
      recordTime = response.recordData[0].recordTime
    }
    const url = `/api/record`;
    const record = { recordPoints: points, recordTime: elapsed };
    if (points > recordPoints) {
      const saveData = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
      });
    }
    if (points == recordPoints && recordTime > elapsed) {
      const saveData = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
      });
    }
  } catch (error) {
    console.log(error);
  }
}

const randomIndexClub = (max, min) => {
  const index = Math.floor(Math.random() * (max - min + 1) + min);
  return index;
};

const getClubList = async () => {
  let flag = true;
  //Cheque el nivel de dificultad antes de hacer el fetch al api
  if (levels[0].checked) level = 1;
  if (levels[1].checked) level = 2;
  if (levels[2].checked) level = 3;
  do {
    if (duplicity.length == 0) {
      const response = await fetch(`/api/club/${level}`);
      const data = await response.json();
      let idClub = data.ThreeClubs[0].id;
      duplicity.push(idClub);
      flag = false;
      return data.ThreeClubs;
    } else {
      const response = await fetch(`/api/club/${level}`);
      const data = await response.json();
      let idClub = data.ThreeClubs[0].id;
      let exist = duplicity.includes(idClub); // Para ver si ya esta dentro de los clubes que fueron mostrando antes
      if (exist) {
        console.log("salio antes");
      } else {
        duplicity.push(idClub);
        flag = false;
        return data.ThreeClubs;
      }
    }
  } while (flag);
};

const checkClub = (e) => {
  let add = level;
  counter++;
  if (e.target.innerText == randomClub.name) {
    playSound('good');
    Toastify({
      text: "Bien",
      style: {
        width: "70px",
      },
    }).showToast();
    //Here I add the points obtained according to difficulty
    points = points + add;
    good++;
  } else {
    playSound('wrong');
    Toastify({
      text: "Mal",
      style: {
        background: "linear-gradient(to right, #ff6242, #ff4122)",
        color: "black",
        width: "70px",
      },
    }).showToast();
  }
  // compare max attempts
  if (counter < attempts) {
    renderClubs();
  } else {
    const elapsed = (Date.now() - time) / 1000;
    //Save record points
    saveRecordPlayer(points, elapsed);
    //SweetAlert
    playSound('game-over')
    Swal.fire({
      title: "Game Over",
      text: `${good} Correctos  en ${elapsed}'', ${points} Pts`,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Volver a Jugar!"
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      } else if (result.isDenied) {
        Swal.fire({
          title: "Adios!!",
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.reload();
      }
    });
  }
};

//event listeners a los botones
btn1.addEventListener("click", (e) => {
  checkClub(e);
});
btn2.addEventListener("click", (e) => {
  checkClub(e);
});
btn3.addEventListener("click", (e) => {
  checkClub(e);
});

// eventlistener al logo para arrancar el jueg0
logo.addEventListener(
  "click",
  () => {
    levelsRadio.classList.add("hidden");
    time = Date.now();
    renderClubs();
    logo.classList.remove("pointer-active");
  },
  { once: true }
);

const renderClubs = async () => {
  const clubes = await getClubList();
  imagelogo.src = clubes[0].imageUrl;
  randomClub = clubes[0];
  let shufleList = [];
  let originalList = clubes;
  let max = 2;
  let min = 0;
  let i;

  do {
    i = randomIndexClub(max, min);
    let sliced = originalList.splice(i, 1);
    shufleList.push(sliced[0]);
    max = max - 1;
  } while (originalList.length > 0);
  btn1.innerText = shufleList[0].name;
  btn2.innerText = shufleList[1].name;
  btn3.innerText = shufleList[2].name;
  btn1.classList.remove("hidden");
  btn2.classList.remove("hidden");
  btn3.classList.remove("hidden");
};
