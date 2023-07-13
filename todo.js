const item = document.querySelector("#add_item");
const addbtn = document.querySelector("#add_btn");
const table = document.querySelector("table");
const del = document.querySelectorAll(".del");
const totoday = document.querySelector("#totoday");
let info = document.querySelector(".info");

const today = () => {
  const KST = new Date();
  const year = KST.getFullYear();
  const month = KST.getMonth()+1;
  const date = KST.getDate();
  const day1 = KST.getDay()+1;
  let day2;

  totoday.classList.remove("sunday", "saturday");

  switch(day1) {
    case 0 : 
      day2 = "Sunday"; 
      totoday.classList.add("sunday");
      break;
    case 1 :  
      day2 = "Monday"; break;
    case 2 : 
      day2 = "Tuesday"; break;
    case 3 : 
      day2 = "Wednesday"; break;
    case 4 : 
      day2 = "Thursday"; break;
    case 5 : 
      day2 = "Friday"; break;
    case 6 : 
      day2 = "Saturday";
      totoday.classList.add("saturday");
      break;
  };

  const time = `${year}.${month}.${date}.${day2}`;
  return(time);
}

totoday.innerHTML = today();

let work = () => {
  let allrow = table.rows.length-1;
  let checkedrow = document.querySelectorAll("table input[type='checkbox']:checked").length;

  let per = (checkedrow / allrow) * 100;

  if(per < 50){
    return("Just Do It!!!")
  };
  if(per >= 50 && per < 100){
    return("More Work!!")
  }
  if(per == 100){
    return("Well Done!");
  }
}

info.innerText = work();

let now = () => {
  let KST = new Date();
  let hrs = KST.getHours();
  let min = KST.getMinutes();

  hrs = (hrs < 10) ? "0" + hrs : hrs;
  min = (min < 10) ? "0" + min : min;

  let time = `${hrs}:${min}`;

  return time;
};



addbtn.addEventListener("click", () => {
  const input = item.value;

  if(input == ""){
    alert('Please input Work Out!');
  }
  else{
    const newrow = document.createElement("tr");

    const newcheck = document.createElement("td");
    const newinput = document.createElement("td");
    const newtime = document.createElement("td");
    const newdel = document.createElement("button");

    newcheck.innerHTML = '<input type="checkbox">';
    newcheck.classList.add("checkbox");
    newinput.innerText = input;
    newinput.classList.add("workout");
    newtime.innerText = "00:00";
    newtime.classList.add("time");
    newdel.innerText = "x";
    newdel.classList.add("del");
    
    newinput.appendChild(newdel);

    newrow.appendChild(newcheck);
    newrow.appendChild(newtime);
    newrow.appendChild(newinput);

    table.appendChild(newrow);

    item.value = "";

    info.innerText = work();
  }
});

table.addEventListener("click", (e) => {
  if (e.target.type == "checkbox") {
    const checkbox = e.target;
    const row = checkbox.parentNode.parentNode;

    if (checkbox.checked) {
      row.children[1].innerText = now();
      row.children[2].style.textDecoration = "line-through";
    } else {
      row.children[1].innerText = "00:00";
      row.children[2].style.textDecoration = "none";
    }
  }
  if(e.target.className == "del"){
    delcheck(e.target);
  }

  info.innerText = work();
});

function delcheck(target) {
  if(!confirm("Want to delete?")){
    alert("Cancle.");
  }else{
      alert("Delete.");
      target.parentNode.parentNode.remove();
  }
};

