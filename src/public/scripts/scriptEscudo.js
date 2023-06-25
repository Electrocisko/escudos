const btn1 = document.getElementById("btn_1");
const btn2 = document.getElementById("btn_2");
const btn3 = document.getElementById("btn_3");
const imagelogo = document.getElementById("image-logo");
const buttons = document.getElementsByTagName("button");
const logo = document.getElementById("logo");
const level1=document.getElementById("level1");
const level2=document.getElementById("level2");
const level3=document.getElementById("level3");

btn1.classList.add("hidden");
btn2.classList.add("hidden");
btn3.classList.add("hidden");

let randomClub;
let counter = 0;
let points = 0;
let duplicity = [];
let time;

const randomIndexClub = (max, min) => {
  const index = Math.floor(Math.random() * (max - min + 1) + min);
  return index;
};

const getClubList = async () => {
  let flag = true;
  do {
    if (duplicity.length == 0) {
      const response = await fetch("/api/club");
      const data = await response.json();
      let idClub = data.ThreeClubs[0].id;
      duplicity.push(idClub);
      flag = false;
      return data.ThreeClubs;
    } else {
      const response = await fetch("/api/club");
      const data = await response.json();
      let idClub = data.ThreeClubs[0].id;
      let exist = duplicity.includes(idClub); // Para ver si ya esta dentro de los clubes que fueron mostrando antes
      if (exist) {
        console.log("existe");
      } else {
        console.log("No existe");
        duplicity.push(idClub);
        flag = false;
        return data.ThreeClubs;
      }
    }
  } while (flag);
};

const checkClub = (e) => {
  counter++;
  if (e.target.innerText == randomClub.name) {
    Toastify({
      text: "Correcto!",
      style: {
        width: "70px"
      }
    }).showToast();
    points++;
  } else {
    Toastify({
      text: "Equivocado",
      style: {
        background: "linear-gradient(to right, #ff6242, #ff4122)",
        color: "black",
        width: "70px"
      },
    }).showToast();
  }
  if (counter < 10) {
    renderClubs();
  } else {
    const elapsed =  (Date.now() - time)/1000;
    Swal.fire({
      title: "Game Over",
      text: `Respondiste ${points} veces bien  en ${elapsed} segundos`,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Volver a Jugar!",
    }).then((result) => {
      if (result.isConfirmed) {
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
    console.log('levels', level1.checked,level2.checked,level3.checked
    )
    time=Date.now();
    renderClubs();
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
