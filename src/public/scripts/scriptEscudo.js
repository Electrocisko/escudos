const btn1 = document.getElementById("btn_1");
const btn2 = document.getElementById("btn_2");
const btn3 = document.getElementById("btn_3");
const imagelogo = document.getElementById("image-logo");
const buttons = document.getElementsByTagName('button');

let randomClub;
let counter = 0;
let points = 0;

const randomIndexClub = () => {
  const max = 2;
  const min = 0;
  const index = Math.floor(Math.random() * (max - min + 1) + min);
  return index;
};

// const indexClub = randomIndexClub();

const checkClub = (e) => {
  counter++;
  if (e.target.innerText == randomClub.name) {
    Toastify({
      text: "Correcto!!",
      offset: {
        x: 600, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
        y: 20, // vertical axis - can be a number or a string indicating unity. eg: '2em'
      },
    }).showToast();
    points++;
  } else {
    Toastify({
      text: "MAL !!!!",
      offset: {
        x: 600, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
        y: 20, // vertical axis - can be a number or a string indicating unity. eg: '2em'
      },
      style: {
        background: "linear-gradient(to right, #ff6242, #ff4122)",
        color: "black",
      },
    }).showToast();
  }
  if (counter < 10) {
    listClubes();
  } else {
    
    Swal.fire({
      title: "Game Over",
      text: `Respondiste ${points} veces bien `,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Volver a Jugar!",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
  }
};

btn1.addEventListener('click', (e) => {
  checkClub(e)
});
btn2.addEventListener('click', (e) => {
  checkClub(e)
})
btn3.addEventListener('click', (e) => {
  checkClub(e)
})



const listClubes = async () => {
  const response = await fetch("/api/club");
  const data = await response.json();
  const i = randomIndexClub();
  imagelogo.src = data.clubes[i].imageUrl;
  btn1.innerText = data.clubes[0].name;
  btn2.innerText = data.clubes[1].name;
  btn3.innerText = data.clubes[2].name;
  randomClub = data.clubes[i];
};

listClubes();
