const slides = document.querySelector(".slider_container");
const buttons = document.querySelectorAll(".nav_btn");
const boxes = document.querySelectorAll(".sbox");

const form = document.querySelector("form");
const cars = document.getElementById("cars");
const passengers = document.getElementById("passengers");
const luggage = document.getElementById("luggage");


function check() {
    var nums = [3, 6, 6, 3, 14, 50];
    var maxNum = nums[cars.selectedIndex];
    var messege = "";
    
    if(passengers.value != "" && luggage.value != "") {
        if (passengers.value > maxNum) {
            messege += `Passengers number can't excced ${maxNum} for selected vehicle. `;
        }
        if (luggage.value > maxNum) {
            messege += `Luggage number can't excced ${maxNum} for selected vehicle. `;
        }
    }

    if (messege != "") {
            alert(messege);
            return false;
    }
}

function convertTo12Hour(time24) {
    const [hourStr, minute] = time24.split(":");
    let hour = parseInt(hourStr);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`
}

buttons.forEach((btn) => {
    btn.addEventListener("click", () => {

        buttons.forEach((b) => b.classList.remove("active"));

        if (btn.id == "view_services") {
            buttons[4].classList.add("active")
        }
        else if (btn.id == "book") {
            buttons[5].classList.add("active")
        }
        else {
            btn.classList.add("active")
        }

        const index = btn.getAttribute("data-slide");

        if (window.scrollY >= 450) {
            scrollTo(0, 0)
        }
        slides.style.transform = `translateX(-${index * 100}vw)`;
    });
});

boxes.forEach((box) => {
    box.addEventListener("click", () => {

        buttons.forEach((b) => b.classList.remove("active"));

        buttons[5].classList.add("active")

        if (box.id != "") {
            cars.selectedIndex = parseInt(box.id);
        }

        slides.style.transform = `translateX(-${5 * 100}vw)`;
    });
});

form.addEventListener("submit", function (e) {
    const p1 = document.getElementById("phone1").value.trim();
    const p2 = document.getElementById("phone2").value.trim();
    const p3 = document.getElementById("phone3").value.trim();

    const n1 = document.getElementById("fname").value.trim();
    const n2 = document.getElementById("lname").value.trim();

    const time24 = document.getElementById("24time").value;

    document.getElementById("12time").value = convertTo12Hour(time24);

    document.getElementById("full_phone").value = `${p1}-${p2}-${p3}`;
    document.getElementById("full_name").value = `${n1} ${n2}`;

});

const strip = document.querySelector('.slide_show');
let scrollInterval;

strip.addEventListener('mousemove', (e) => {
  const rect = strip.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  clearInterval(scrollInterval);

  const speed = 50; // scroll speed
  const edgeSize = 100; // edge zone width
  const scrollbarZone = 20; // height from bottom where scrollbar exists

  // If mouse is over scrollbar area, don't auto-scroll
  if (mouseY > rect.height - scrollbarZone) {
    return;
  }

  if (mouseX < edgeSize) {
    scrollInterval = setInterval(() => {
      strip.scrollLeft -= speed;
    }, 10);
  } 
  else if (mouseX > rect.width - edgeSize) {
    scrollInterval = setInterval(() => {
      strip.scrollLeft += speed;
    }, 10);
  }
});

strip.addEventListener('mouseleave', () => {
  clearInterval(scrollInterval);
});