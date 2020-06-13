class KakurasuSolver {
	_sumNumbers = [
		[[0]],
		[[1]],
		[[2]],
		[[3], [1, 2]],
		[[4], [1, 3]],
		[[5], [2, 3], [1, 4]],
		[[2, 4], [1, 5], [1, 2, 3]],
		[[3, 4], [2, 5], [1, 2, 4]],
		[[3, 5], [1, 3, 4], [1, 2, 5]],
		[[4, 5], [2, 3, 4], [1, 3, 5]],
		[[2, 3, 5], [1, 4, 5], [1, 2, 3, 4]],
		[[2, 4, 5], [1, 2, 3, 5]],
		[[3, 4, 5], [1, 2, 4, 5]],
		[[1, 3, 4, 5]],
		[[2, 3, 4, 5]]
		[[1, 2, 3, 4, 5]]
	];
	constructor(rowTotals, colTotals) {
		this._boardGrid = Array.from(Array(5), () => new Array(5).fill(0));
		this._rowTotals = rowTotals;
		this._colTotals = colTotals;
	}
	solve() {
		return this._findSolutionAndConvertToOutput();
	}
	_findSolutionAndConvertToOutput() {
		const solution = [];
		if (this._findSolution(0)) {
			for (let i = 0; i < 5; i++) {
				for (let j = 0; j < 5; j++) {
					solution.push(this._boardGrid[i][j] === 0 ? 0 : 1);
				}
			}
		}
		return solution;
	}
	_findSolution(rowIndex) {
		if (rowIndex == 5) {
			return this._allColumnTotalsCompleted();
		}
		else {
			const rowTotal = this._rowTotals[rowIndex];
			const numberOptions = this._sumNumbers[rowTotal];

			for (let i = 0; i < numberOptions.length; i++) {
				const numbers = numberOptions[i];
				numbers.forEach((number) => {
					this._boardGrid[rowIndex][number - 1] = number;
				});
				if (this._allColTotalsAreValid() && this._findSolution(rowIndex + 1)) {
					return true;
				}
				numbers.forEach((number) => {
					this._boardGrid[rowIndex][number - 1] = 0;
				});
			}
		}
		return false;
	}
	_validateColValues(isNotValid) {
		for (let i = 0; i < 5; i++) {
			const targetValue = this._colTotals[i];
			let currentValue = 0;
			for (let j = 0; j < 5; j++) {
				if (this._boardGrid[j][i] !== 0) {
					currentValue += (j + 1);
				}
			}
			if (isNotValid(currentValue, targetValue)) return false;
		}
		return true;
	}
	_allColumnTotalsCompleted() {
		return this._validateColValues(function isInvalidTotal(currentValue, targetValue) {
			return currentValue !== targetValue;
		});
	}
	_allColTotalsAreValid() {
		return this._validateColValues(function isInvalidValue(currentValue, targetValue) {
			return currentValue > targetValue;
		});
	}
}