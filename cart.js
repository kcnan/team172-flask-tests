ids = [];
names = [];
costs = [];
max = [];
items_get_json = [];

function set_amounts() {
    retrieve();
    var target = document.getElementById("item_list").innerHTML;
    for (let i = 0; i < items_get_json.length; i++) {
        target = target + target;
    }
    document.getElementById("item_list").innerHTML = target;
    const myNode = document.getElementById("item_list");
    while (myNode.childElementCount > items_get_json.length) {
        myNode.removeChild(myNode.firstChild);
    }
    for (let i = 0; i < items_get_json.length; i++) {
        document.getElementsByClassName("icon")[i].src = `${items_get_json[i].id}.jpg`;
        try {
            document.getElementsByClassName("item_name")[i].innerText = `${names[ids.index(items_get_json[i].id)]}`;
        } catch (error) {
            console.log(error);
            document.getElementsByClassName("item_name")[i].innerText = `${items_get_json[i].id}`;
        }
        document.getElementsByClassName("in_qut")[i].value = items_get_json[i].amount;
        document.getElementsByClassName("in_qut")[i].id = items_get_json[i].id;
        try {
            document.getElementsByClassName("cost")[i].innerText = `$${costs[ids.index(items_get_json[i].id)]}`;
        } catch (error) {
            console.log(error);
            document.getElementsByClassName("cost")[i].innerText = `undefinded`;
        }
    }
}
set_amounts();
// handles changes in the cart
for (let i = 0; i < document.getElementsByClassName("in_qut").length; i++) {
    var inputs = document.getElementsByClassName("in_qut")[i];
    inputs.addEventListener('input', function() {
        change_data(this);
    });
}
function change_data(element) {
    var amounts = document.getElementById(element.getAttribute("id"));
    if (amounts.value < 0) {
        amounts.value = 0;
    } else {
        items_get_json.push(new items(element.getAttribute("id")), amount.value);
    }
}
// local storage data management
class items {

    constructor(id, amount) {
        this.id = id;
        this.amount = amount;
    }
}
function retrieve() {
    const itemExists = localStorage.getItem('items') !== null;

    if (itemExists) {
        items_get_json = JSON.parse(localStorage.getItem('items'));
    } else {
        console.warn("the local storage does not contain the required data");
    }
}
function store_items() {
    localStorage.setItem('items', JSON.stringify(items_get_json));
}
function condense() {
    const condensedList = items_get_json.reduce((result, item) => {

        const existingItem = result.find(i => i.id === item.id);
        if (existingItem) {
            existingItem.amount += item.amount;
        } else {
            result.push({id: item.id, amount: item.amount});
        }
        return result;
    }, []);

    items_get_json = condensedList;
}
async function send_data() {
    await condense();
    await store_items();
    return(true);
}
window.addEventListener('beforeunload', function(event) {
  // Run your function here
  send_data();
});
// payment handler
function check_out() {
    condense();
    // rest of payment hadling
}
