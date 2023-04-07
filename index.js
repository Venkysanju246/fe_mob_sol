const formEl = document.querySelector("form")
const nameEl = document.getElementById("name")
const complaintEl = document.getElementById("complaint")
const modelEl = document.getElementById("model")
const priceEl = document.getElementById("price")
const phoneEl = document.getElementById("phone")
const othersEl = document.getElementById("others")
const tbodyEl = document.querySelector("tbody")
let formelse = document.getElementById("mainsearch")
let search = document.getElementById("search")
let btn = document.getElementById("btn")
let global = []
formEl.addEventListener("submit", (e) => {
    e.preventDefault()
    let obj = {
        name: nameEl.value,
        complaint: complaintEl.value,
        mobile_model: modelEl.value,
        price: priceEl.value,
        phone: phoneEl.value,
        others: othersEl.value
    }
    console.log(obj)
    fetch("https://successful-bat-underclothes.cyclic.app/mobile/add", {
        method: "POST",
        headers: {
            "Content-type": "Application/json"
        },
        body: JSON.stringify(obj)
    }).then((res) => res.json())
        .then((data) => {
            console.log(data)

        })
        .catch((err) => {
            console.log(err.message)
        })
    location.reload()
})

fetch("https://successful-bat-underclothes.cyclic.app/mobile/all", {
    method: "GET"
})
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        global = data
        display(data)
    }).catch(err => {
        console.log(err.message)
    })

function display(data) {
    tbodyEl.innerHTML = ""
    data.map((ele, ind) => {
        let tr = document.createElement("tr")
        let name = document.createElement("td")
        let complaint = document.createElement("td")
        let model = document.createElement("td")
        let price = document.createElement("td")
        let mobile = document.createElement("td")
        let others = document.createElement("td")

        name.textContent = ele.name
        complaint.textContent = ele.complaint
        model.textContent = ele.mobile_model
        price.textContent = ele.price
        mobile.textContent = ele.phone
        others.textContent = ele.others

        tr.append(name, complaint, model, price, mobile, others)
        tbodyEl.append(tr)
    })
}
btn.addEventListener("click", () => {

    let val = search.value;
    console.log(val)

    let filtered = global.filter((el) => {
        if (el.name.toUpperCase().includes(val.toUpperCase()) == true) {
            return true
        } else {
            return false
        }
    })

    display(filtered)
})
