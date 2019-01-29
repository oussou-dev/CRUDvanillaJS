// gets element

const itemForm = document.getElementById("itemForm")
const itemInput = document.getElementById("itemInput")
const itemList = document.querySelector(".item-list")
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
		addItem(textValue)
	}
})

// feedback funtio
showFeedback = (text, action) => {
	// display feedback
	feedback.classList.add("showItem", `alert-${action}`)
	feedback.innerHTML = `${text}`

	setTimeout(() => {
		feedback.classList.remove("showItem", `alert-${action}`)
	}, 1500)
}
