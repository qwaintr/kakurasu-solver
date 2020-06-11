function getInputs(direction) {
	const inputs = [];
	for (let i = 1; i <= 5; i++) {
		const el = document.querySelector(`#${direction}_${i}`);
		inputs.push(el.value);
	}
	return inputs;
}

function isEmpty(input) {
	return input.trim() === '';
}

function convertToNumber(input) {
	return Number(input);
}

function isInvalidTotal(total) {
	return isNaN(total) || total < 1 || total > 15;
}

function runSolver() {
	const rowInputs = getInputs('row');
	const colInputs = getInputs('col');

	const emptyRowValues = rowInputs.filter(isEmpty);
	const emptyColValues = colInputs.filter(isEmpty);
	if (emptyRowValues.length !== 0 || emptyColValues.length !== 0) {
		alert('Please fill in all the required numbers.');
		return;
	}

	const rowTotals = rowInputs.map(convertToNumber);
	const colTotals = colInputs.map(convertToNumber);

	const invalidRowValues = rowTotals.filter(isInvalidTotal);
	const invalidColValues = colTotals.filter(isInvalidTotal);
	if (invalidRowValues.length !== 0 ||  invalidColValues.length !== 0) {
		alert('Please only enter valid numbers.');
		return;
	}

	const solver = new KakurasuSolver(rowTotals, colTotals);
	const solution = solver.solve();

	if (solution.length === 0) {
		alert('Unable to solve provided puzzle. Please check your numbers.');
		return;
	}

	isSolved = true;

	let els = document.querySelectorAll('.output');
	els.forEach(function displayStar(el, index) {
		if (solution[index] !== 0) {
			el.classList.add('starred');
			el.appendChild(star.cloneNode(true));
		}
	});
	els = document.querySelectorAll('input');
	els.forEach(function removeText(el) {
		el.classList.add('darken');
	});
}

function runReset() {
	let els = document.querySelectorAll('.output');
	els.forEach(function removeStar(el) {
		el.classList.remove('starred');
		if (el.children.length > 0) el.textContent = '';
	});
	els = document.querySelectorAll('input');
	els.forEach(function clearInput(el) {
		el.value = '';
		el.classList.remove('darken');
	});
	isSolved = false;
}

function solveClickHandler(event) {
	if (isSolved) return;
	runSolver();
}

function resetClickHandler(event) {
	runReset();
}

let isSolved = false;
const star = document.querySelector('#star');
document.querySelector('#solve').addEventListener('click', solveClickHandler);
document.querySelector('#reset').addEventListener('click', resetClickHandler);

function insertNumbers(rowData = [], colData = []) {
	if (rowData.length === 0) rowData = [6, 3, 3, 3, 7];
	if (colData.length === 0) colData = [2, 8, 7, 1, 5];
	for (let i = 1; i <= 5; i++) {
		document.querySelector(`#row_${i}`).value = rowData[i -1];
		document.querySelector(`#col_${i}`).value = colData[i -1];
	}
}