// get elements
const itemForm = document.getElementById("itemForm")
const itemInput = document.getElementById("itemInput")
const itemList = document.querySelector(".list-item")
const clearBtn = document.getElementById("clearList")
const feedback = document.querySelector(".feedback")

let itemData = []

// form submission
itemForm.addEventListener("submit", e => {
	e.preventDefault()

	const textValue = itemInput.value
	console.log(textValue)

	if (!textValue.length) {
		showFeedback("Please enter valid value", "danger")
	} else {
		// add item to the list
		addItem(textValue)
		// add to itemData
		itemData.push(textValue)
		// clear form
		itemInput.value = ""
		// console.log(itemData)

		//=> LOCAL STORAGE
		//.......

		// add events listeners to items
		// problematique de la selection de l'item et des icons edit / remove ...
		// après avoir fait un submit
		handleItem(textValue)
	}
})

// feedback function
let showFeedback = (text, action) => {
	// display feedback
	feedback.classList.add("showItem", `alert-${action}`)
	feedback.innerHTML = `${text}`

	setTimeout(() => {
		feedback.classList.remove("showItem", `alert-${action}`)
	}, 1500)
}

// addItem function
let addItem = value => {
	const div = document.createElement("div")
	div.classList.add("item", "my-3")
	div.innerHTML = `
		<h6 class="item-name text-capitalize">${value}</h6>
		<div class="item-icons">
			<a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
			<a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
			<a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
		</div>
	`
	itemList.appendChild(div)
}

// running if submiting
let handleItem = textValue => {
	const items = itemList.querySelectorAll(".item")
	console.log(items)
	items.forEach(function(item) {
		if (item.querySelector(".item-name").textContent === textValue) {
		}
	})
}
