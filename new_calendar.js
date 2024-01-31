let loaded_data;

const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

const flex_element = document.getElementById("days_container");

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const currentMonthName = months[currentMonth];

const back_arrow = document.getElementById("back");
const for_arrow = document.getElementById("forward");

var month = currentMonth;
var year = currentYear;

var year_month = document.getElementById("year_month")
year_month.innerText = `${currentMonthName} ${currentYear}`;
document.getElementById("title").innerText = `${currentMonthName} ${currentYear}`;

function getDaysInMonth(year, month) {
    const lastDayOfMonth = new Date(year, month + 1, 0);
    return lastDayOfMonth.getDate();
}

const target = document.getElementById("days_container");
//const item = document.createElement("div");
function dates(year, month) {
    for (let i = 0; i < getDaysInMonth(year, month); i++) {
        const item = document.createElement("div");
        item.className = "flex_item";
        item.id = `flex${i}`;
        item.innerText = `${i+1}`;
        target.appendChild(item);
    }
}
dates(currentYear, currentMonth);
eventer();
function remove_all() {
    const container = document.getElementById("days_container").innerHTML = ``;
}

function getNextMonthAndYear(year, month) {
    let nextMonth;
    let nextYear;
  
    if (month === 11) {
      nextMonth = 0;
      nextYear = year + 1;
    } else {
      nextMonth = month + 1;
      nextYear = year;
    }
  
    return {
      month: nextMonth,
      year: nextYear
    };
}

function getPreviousMonthAndYear(year, month) {
    let previousMonth;
    let previousYear;
  
    if (month === 0) {
      previousMonth = 11;
      previousYear = currentYear - 1;
    } else {
      previousMonth = month - 1;
      previousYear = year;
    }
  
    return {
      month: previousMonth,
      year: previousYear
    };
}

// event listeners
function eventer() {
const tiles = document.querySelectorAll('.flex_item');
tiles.forEach(function(element) {
    element.addEventListener('click', function() {
      console.log(element.innerText);
      displayer(element.innerText);
    });
  });
}
function back() {
    const new_time = getPreviousMonthAndYear(year, month);
    remove_all();
    dates(new_time.year, new_time.month);
    year = new_time.year;
    month = new_time.month;
    eventer();
}
function forword() {
    const new_time = getNextMonthAndYear(year, month);
    remove_all();
    dates(new_time.year, new_time.month);
    year = new_time.year;
    month = new_time.month;
    eventer();
}
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
        forword();
    } else if (event.key === 'ArrowLeft') {
        back();
    }
    year_month.innerText = `${months[month]} ${year}`;
    document.getElementById("title").innerText = `${months[month]} ${year}`;
});
back_arrow.addEventListener('click', function(event) {
    back();
    year_month.innerText = `${months[month]} ${year}`;
    document.getElementById("title").innerText = `${months[month]} ${year}`;
});
for_arrow.addEventListener('click', function(event) {
    forword();
    year_month.innerText = `${months[month]} ${year}`;
    document.getElementById("title").innerText = `${months[month]} ${year}`;
});

// json data loader

fetch('http://192.168.86.211:8000/get_event')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    loaded_data = data;
  })
  .catch(error => {
    console.error('Error:', error);
    alert("failed to connect to the server");
  });

function displayer(element_num) {
  // find the proper event data
  var temp_year;
  var temp_month;
  var temp_day;
  var lines = [];
  var lines_times = [];
  for (let i = 0; i < loaded_data.length; i++) {
    temp_year = loaded_data[i].start_data.year_start;
    temp_month = loaded_data[i].start_data.month_start;
    temp_day = loaded_data[i].start_data.day_start;
    if (year == temp_year) {
      if (month+1 == temp_month) {
        if (temp_day == element_num) {
          lines.push(i);
        }
      }
    }
  }
  function sort_times() {
    for (let i = 0; i < lines.length; i++) {
      lines_times.push(Number((loaded_data[lines[i]].start_data.time_start).replace(":", "")));
    }
    const combinedList = lines_times.map((element, index) => {
      return { a: element, b: lines[index] };
    });
    combinedList.sort((obj1, obj2) => obj1.a - obj2.a);
    for (let i = 0; i < combinedList.length; i++) {
      lines_times[i] = combinedList[i].a;
      lines[i] = combinedList[i].b;
    }
  }
  sort_times();
  console.log(lines);
  function events_veiwer() {
    // turns the regulare calendar veiw into an event oreiented veiw
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    document.body.style.backgroundColor = '#ffffff';
    span.onclick = function() {
      modal.style.display = "none";
    }

    // gives the popup the data
    var target = document.getElementById("inner_times");
    console.log(`lines length: ${lines.length}`);
    target.innerHTML = '';
    let i;
    for (i = 0; i < lines.length; i++) {
      const data_div = document.createElement('div');
      const line_next = document.createElement('br');
      data_div.innerText = `${loaded_data[lines[i]].add.title} start time: ${loaded_data[lines[i]].start_data.time_start} end time: ${loaded_data[lines[i]].end_data.time_end} end day: ${loaded_data[lines[i]].end_data.day_end}\ndescription:\n${loaded_data[lines[i]].add.discrip}`;
      target.appendChild(data_div);
      target.appendChild(line_next);
    }
    if (i == 0) {
      const data_div = document.createElement('div');
      data_div.innerText = "no events";
      target.appendChild(data_div);
    }
  }
  events_veiwer();
}