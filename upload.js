//data_change = [[`!0{'year' : $2024},`]];
chars_filter = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
var added = 3;
result = false;
function submit() {
    var date_start = document.getElementById("date_start");
    var time_start = document.getElementById("time_start");
    var dateValue_start = date_start.value;
    var [year_start, month_start, day_start] = dateValue_start.split('-');

    var date_end = document.getElementById("date_end");
    var time_end = document.getElementById("time_end");
    var dateValue_end = date_end.value;
    var [year_end, month_end, day_end] = dateValue_end.split('-');

    var title = document.getElementById("title").value;
    var descrip = document.getElementById("description").value;

    // encodes the data
    console.log(year_start)
    console.log(title)
    console.log(descrip)
    var send_json_start = {"year_start": year_start, "month_start": month_start, "day_start": day_start, "time_start": time_start.value};
    var send_json_end = {"year_end": year_end, "month_end": month_end, "day_end": day_end, "time_end": time_end.value};
    var send_json_additional = {"title": title, "discrip": descrip};
    /*var start = JSON.stringify(send_json_start);
    var end = JSON.stringify(send_json_end);
    var additional = JSON.stringify(send_json_additional);

    console.log(start);
    console.log(end);
    console.log(additional);*/

    data = [{"start_data": send_json_start, "end_data": send_json_end, "add": send_json_additional}];

    result = sendJsonData(data);
    console.log(result);
    function blank() {
        date_start.value = ``;
        time_start.value = ``;
        date_end.value = ``;
        time_end.value = ``;
        document.getElementById("title").value = '';
        document.getElementById("description").value = '';
    }
    function sendJsonData(data) {
        fetch("http://192.168.86.211:8000/cal_upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
        .then(response => {
          if (response.ok) {
            console.log("JSON data sent successfully!");
            blank();
          } else {
            console.error("Error sending JSON data:", response.status);
            alert("error code: ", response.status);
          }
        })
        .catch(error => {
          console.error("Error sending JSON data:", error);
          alert("error: ", error);
        });
    }
}
/*function sendJsonData(data) {
    fetch("http://192.168.86.211:8000/cal_upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        console.log("JSON data sent successfully!");
        blank();
      } else {
        console.error("Error sending JSON data:", response.status);
        alert("error code: ", response.status);
      }
    })
    .catch(error => {
      console.error("Error sending JSON data:", error);
      alert("error: ", error);
    });
}*/
// DO NOT DELETE
// will countinue after season
/*
function find_month(month, year) {
    var months_count = 0;
    for (let i = 0; i < data_change.length; i++) {
        if (data_change[i][0].charAt(i) == '!') {
            if (find_year(i) == year) {
                const temp_months = 
            } else {
                i = i + read_skip_year(i) + 1; // 1 could bug it
            }
        }
    }
}
function year_func(year, add) {
    var years_count = 0;
    var counter = 1;
    var start = false;
    var temp_string = ``;
    var temp_year = ``;
    var lines = ``;
    var set = false;
    for (let i = 0; i<data_change.length; i++) {
        temp_string = data_change[i][0];
        if (temp_string.charAt(0) == '!') {
            years_count++;

            temp_year = ``;
            start = false;
            for (let s = 0; s < temp_string.length; s++) {
                if (temp_string[s] == '$') {
                    start = true;
                }
                if (start) {
                    if (temp_string.charAt(s) != '}' && chars_filter.includes(temp_string.charAt(s))) {
                        temp_year = temp_year + temp_string[s];
                        console.log(temp_year);
                    }
                }
            }
            if (Number(temp_year) == year) {
                // logic here

                /*counter = 1;
                lines = ``;
                var new_line = ``;
                while (temp_string.charAt(counter) != '{') {
                    lines = lines + temp_string.charAt(counter);
                    counter++;
                }
                console.log(lines);
                new_line = (Number(lines)+added);
                temp_string = `!${new_line}{'year' : ${year}},`;
                set = true;
                break;
            }
        }
    }
    if (!set && add) {
        var new_row = [`!${added}{'year' : $${year}},`];
        data_change.push(new_row);
    }
    if (!add) {
        return(years_count);
    }
}
function find_year(year) {
    var temp = year_func(year, false)-1;
    console.log(temp);
    return(temp);
}
function update_skip_year(year, amount) {
    var line = find_year(year);
    var line_store = data_change[line][0];
    var line_skip = "";
    for (let i = 1; i < line_store.length; i++) {
        if (line_store.charAt(i) == '{') {
            break;
        }
        if (line_store.charAt(i) != '{' && chars_filter.includes(line_store.charAt(i))) {
                line_skip = line_skip + line_store.charAt(i);
                console.error(line_skip)
        }
    }
    var new_line_skip = Number(line_skip) + amount;
    data_change[line][0] = `!${new_line_skip}{'year' : $${year}},`
    return(new_line_skip);
}
update_skip_year(2024, 2);
//console.log(find_year(2024)-1);

function read_skip_year(line) {
    const temp_string = data_change[line][0];
    var line_skip = "";
    if (temp_string != '!') {
        console.error("improper start of year in cdb");
    } else {
        for (let i = 1; i < temp_string.length; i++) {
            if (temp_string.charAt(i) == '{') {
                break;
            }
            if (chars_filter.includes(temp_string.charAt(i))) {
                line_skip = line_skip + temp_string.charAt(i);
            }
        }
        return(Number(line_skip));
    }
}
function read_year(line) {
    const temp_string = data_change[line][0];
    var line_year = "";
    for (let i = 0; i < temp_string.length; i++) {
        if (temp_string.charAt(i) == '}') {
            break;
        }
        if (chars_filter.includes(temp_string.charAt(i))) {
            line_year = line_year + temp_string.charAt(i);
        }
    }
    return(Number(line_year));
}
*/