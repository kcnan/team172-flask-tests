function width_set() {
  const main_panel = document.getElementsByClassName("login_main")[0].offsetWidth;
  const lower_button = document.getElementsByClassName("login_button")[0];
  const shadower = document.getElementsByClassName("shadower")[0];
  lower_button.style.width = `${main_panel}px`;
  shadower.style.width = `${main_panel}px`;
}
width_set();
function login() {
    var url = "http://192.168.12.190:8000"; // Replace with your actual login URL

    var data = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
    // Handle the response data
    })
    .catch(error => {
    // Handle any errors that occur during the request
    });
}
