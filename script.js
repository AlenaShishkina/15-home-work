  
const timeFormats = ["HH:MM:SS", "H:M AM/PM", "YYYY-MM-DD HH:MM"];
let format = "f0";

function createSelect(arr) {
    const sel = document.createElement("select");
    for (let i = 0; i < arr.length; i++) {
        const option = document.createElement("option");
        option.value = "f" + i;
        option.innerText = arr[i];
        sel.appendChild(option);
    }
    return sel;
}

const selectFormat = createSelect(timeFormats);

function timeNow() {
    const time = new Date();
    let ss = time.getSeconds();
    if (ss < 10) ss = "0" + ss;
    let hh = time.getHours();
    if (hh < 10) hh = "0" + hh;
    let mm = time.getMinutes();
    if (mm < 10) mm = "0" + mm ;
    let y = time.getFullYear();
    let m = time.getMonth() + 1;
    if (m < 10) m = "0" + m;
    let d = time.getDate();
    if (d < 10) d = "0" + d;
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
}

function timeFormator(time, format) {
    let formated;
    switch (format) {
        case "f0" :
            formated = (time.split(" "))[1];
            return formated;
        case "f1" :
            formated = (time.split(" "))[1].split(":");
            if (formated[0] > 12) {
                formated[0] = formated[0] - 12;
                formated[2] = "pm";
            } else {
                formated[0] = formated[0] - 0;
                formated[2] = "am";
            }
            formated[1] = formated[1] - 0;
            return `${formated[0]}:${formated[1]} ${formated[2]}`;
        case "f2" :
            formated = time.split(":").slice(0, 2).join(":");
            return formated;
        default :
            return false;
    }
}

function creatTimeWrap(time) {
    const timeWrapper = document.createElement("div");
    timeWrapper.className = "clock";
    let count = 0;
    for (let i of time) {
        const div = document.createElement("div");
        if (i === " ") {
            div.className = "space";
            count++;
        } else if (i === "-") {
            count++;
        } else if (i === ":") {
            div.className = "blink";
            count++;
        } else if (count < 1 || count === 3) {
            div.style.color = "black";
        } else if (count < 2 || count === 4) {
            div.style.color = "red";
        } else if (count < 3) {
            div.style.color = "grey";
        }
        timeWrapper.appendChild(div);


    }
    return timeWrapper;
}

document.body.appendChild(creatTimeWrap(timeFormator(timeNow(), format)));
document.body.appendChild(selectFormat);

selectFormat.addEventListener("change", (event) => {
    format = event.target.value;
})

function timeShow(time) {
    const wrap = document.body.querySelector("div");
    const newWrap = creatTimeWrap(timeFormator(timeNow(), format));
    if (wrap) document.body.replaceChild(newWrap, wrap);
    const clock = document.body.querySelector(".clock");
    if (clock) {
        const clocksDivs = clock.querySelectorAll("div");
        for (let i = 0; i < time.length; i++) {
            clocksDivs[i].innerText = time[i];
        }
    }
    console.log(time);
}

setInterval(() => timeShow(timeFormator(timeNow(), format)), 1000);