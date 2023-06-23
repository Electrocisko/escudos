const btn1 = document.getElementById("btn_1");
const btn2 = document.getElementById("btn_2");
const btn3 = document.getElementById("btn_3");
const imagelogo = document.getElementById("image-logo");
const buttons = document.getElementsByTagName('button');
const logo = document.getElementById('logo')

let randomClub;
let counter = 0;
let points = 0;

const randomIndexClub = (max,min) => {
  const index = Math.floor(Math.random() * (max - min + 1) + min);
  return index;
};

const checkClub = (e) => {
  counter++;
  if (e.target.innerText == randomClub.name) {
    Toastify({
      text: "Correcto!!",
      offset: {
        x: 300, 
        y: 20, 
      },
    }).showToast();
    points++;
  } else {
    Toastify({
      text: "MAL !!!!",
      offset: {
        x: 300, 
        y: 20, 
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

logo.addEventListener('click', () => {
  listClubes();
}, {once: true})


const listClubes = async () => {
  const response = await fetch("/api/club");
  const data = await response.json();
  imagelogo.src = data.clubes[0].imageUrl;
  randomClub = data.clubes[0];
  let shufleList=[];
  let originalList = data.clubes;
  let max = 2;
  let min = 0;
  let i;
  

  do {
   i =  randomIndexClub(max,min);
   let sliced = originalList.splice(i,1);
   shufleList.push(sliced);
    max = max-1
  } while (originalList.length > 0);

  console.log('shufleList', shufleList[0][0].name)
  console.log('shufleList', shufleList[1][0])
  console.log('shufleList', shufleList[2])

  btn1.innerText = shufleList[0][0].name;
  btn2.innerText = shufleList[1][0].name;
  btn3.innerText = shufleList[2][0].name;

 
};


