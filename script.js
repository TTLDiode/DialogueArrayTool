let dialogue = [];

const input = document.getElementById("input");
const list = document.getElementById("list");

input.addEventListener("keydown", function(event) {
	if (event.key === "Enter") {
		const text = input.value.trim();
		if (text === "") return;

		dialogue.push(text);
		addToList(text);

		input.value = "";
	}
});

function addToList(text) {
	const div = document.createElement("div");
	div.className = "line";
	div.textContent = text;
	list.appendChild(div);
}

function downloadJSON() {
	const dataStr = JSON.stringify(dialogue, null, 2);
	const blob = new Blob([dataStr], { type: "application/json" });
	const url = URL.createObjectURL(blob);

	const a = document.createElement("a");
	a.href = url;
	a.download = "dialogue.json";
	a.click();

	URL.revokeObjectURL(url);
}
