// get elements
const itemForm = document.getElementById("itemForm")
const itemInput = document.getElementById("itemInput")
const itemList = document.querySelector(".list-item")
const clearBtn = document.getElementById("clear-list")
const feedback = document.querySelector(".feedback")

let itemData = JSON.parse(localStorage.getItem("list")) || []

if (itemData.length > 0) {
	itemData.forEach(function(singleItem) {
		itemList.insertAdjacentHTML(
			"beforeend",
			`
			<div class="item my-3">
				<h6 class="item-name text-capitalize">${singleItem}</h6>
				<div class="item-icons">
					<a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
					<a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
					<a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
				</div>
			</div>
		`
		)
		handleItem(singleItem)
	})
}

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
		localStorage.setItem("list", JSON.stringify(itemData))

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
// seule solution dans un contexte de callback d'avoir la main sur les options liées à un item : edit / remove ...
// donc à faire pendant la submission de la form => à l'interieur du submit
function handleItem(textValue) {
	// let handleItem = textValue => {
	const items = itemList.querySelectorAll(".item")
	console.log(items)
	items.forEach(function(item) {
		if (item.querySelector(".item-name").textContent === textValue) {
			// complete event listener
			item
				.querySelector(".complete-item")
				.addEventListener("click", function() {
					item
						.querySelector(".item-name")
						.classList.toggle("completed")
					this.classList.toggle("visibility")
				})

			// edit event listener
			item
				.querySelector(".edit-item")
				.addEventListener("click", function() {
					// le contenu de l'item à éditer est inséré dans l'input
					itemInput.value = textValue
					// on retire l'item à editer du DOM => de la liste des items affichés
					itemList.removeChild(item)
					// on display les autres items => !== de l'item à editer
					itemData = itemData.filter(function(item) {
						return item !== textValue
					})
				})

			// delete event listener
			item
				.querySelector(".delete-item")
				.addEventListener("click", function() {
					itemList.removeChild(item)
					itemData = itemData.filter(function(item) {
						return item !== textValue
					})
					//=> update LOCAL STORAGE
					localStorage.setItem("list", JSON.stringify(itemData))
					showFeedback("item deleted", "success")
				})
		}
	})
}

clearBtn.addEventListener("click", function() {
	itemData = []
	//=> LOCAL STORAGE
	localStorage.removeItem("list")
	const items = itemList.querySelectorAll(".item")
	if (items.length > 0) {
		items.forEach(function(item) {
			itemList.removeChild(item)
		})
	}
	console.log(itemData)
})
