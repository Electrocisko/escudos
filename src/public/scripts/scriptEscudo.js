const btn1 = document.getElementById("btn_1");
const btn2 = document.getElementById("btn_2");
const btn3 = document.getElementById("btn_3");
const imagelogo = document.getElementById("image-logo");



btn1.addEventListener("click", () => console.log("Boton 1"));
btn2.addEventListener("click", () => console.log("Boton 2"));
btn3.addEventListener("click", () => console.log("Boton 3"));

const listClubes = async () => {
  const response = await fetch("/api/club");
  const data = await response.json();
  imagelogo.src=data.clubes[0].imageUrl;
btn1.innerText=data.clubes[0].name;
btn2.innerText=data.clubes[1].name;
btn3.innerText=data.clubes[2].name;

};


listClubes();