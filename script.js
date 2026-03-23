let dialogue = [];
let historyLines = [];

const input = document.getElementById("input");
const historyContainer = document.getElementById("history");

input.addEventListener("keydown", function(event) {
	if (event.key === "Enter") {
		const text = input.value.trim();
		if (text === "") return;

		dialogue.push(text);
		addHistoryLine(text);

		input.value = "";
	}
});

function addHistoryLine(text) {
	const div = document.createElement("div");
	div.className = "line";
	div.textContent = text;

	historyContainer.prepend(div);
	historyLines.unshift(div);

	// Keep only last 3
	if (historyLines.length > 3) {
		const old = historyLines.pop();

		// fade out animation before removal
		old.style.opacity = "0";
		old.style.transform = "translateY(-100px)";

		setTimeout(() => old.remove(), 300);
	}

	updatePositions();
}

function updatePositions() {
	historyLines.forEach((line, index) => {
		line.style.zIndex = 10 - index;
	});
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
function undoLast() {
	if (dialogue.length === 0) return;

	// Remove last dialogue entry
	dialogue.pop();

	// Remove most recent visual line
	if (historyLines.length > 0) {
		const line = historyLines.shift();

		line.style.opacity = "0";
		line.style.transform = "translateY(20px)";

		setTimeout(() => line.remove(), 200);
	}

	updatePositions();
}
function clearAll() {
	dialogue = [];

	// Remove all visual lines
	historyLines.forEach(line => {
		line.style.opacity = "0";
		line.style.transform = "translateY(-50px)";
		setTimeout(() => line.remove(), 200);
	});

	historyLines = [];
}
