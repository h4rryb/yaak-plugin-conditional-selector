
//#region src/index.ts
const plugin = { templateFunctions: [
	{
		name: "conditional",
		description: "Conditionally select between two values based on a condition",
		args: [
			{
				type: "text",
				name: "condition",
				label: "Condition",
				placeholder: "true/false or comparison expression"
			},
			{
				type: "text",
				name: "valueIfTrue",
				label: "Value If True",
				placeholder: "Value when condition is met"
			},
			{
				type: "text",
				name: "valueIfFalse",
				label: "Value If False",
				placeholder: "Value when condition is not met"
			}
		],
		async onRender(ctx, args) {
			const condition = args.values.condition?.trim();
			const valueIfTrue = args.values.valueIfTrue ?? "";
			const valueIfFalse = args.values.valueIfFalse ?? "";
			if (!condition) return valueIfFalse;
			return evaluateCondition(condition) ? valueIfTrue : valueIfFalse;
		}
	},
	{
		name: "conditional.equals",
		description: "Select value based on equality check",
		args: [
			{
				type: "text",
				name: "value1",
				label: "First Value",
				placeholder: "First value to compare"
			},
			{
				type: "text",
				name: "value2",
				label: "Second Value",
				placeholder: "Second value to compare"
			},
			{
				type: "text",
				name: "valueIfTrue",
				label: "Value If Equal",
				placeholder: "Value when values are equal"
			},
			{
				type: "text",
				name: "valueIfFalse",
				label: "Value If Not Equal",
				placeholder: "Value when values are not equal"
			}
		],
		async onRender(ctx, args) {
			const value1 = args.values.value1 ?? "";
			const value2 = args.values.value2 ?? "";
			const valueIfTrue = args.values.valueIfTrue ?? "";
			const valueIfFalse = args.values.valueIfFalse ?? "";
			return value1 === value2 ? valueIfTrue : valueIfFalse;
		}
	},
	{
		name: "conditional.contains",
		description: "Select value based on whether a string contains a substring",
		args: [
			{
				type: "text",
				name: "text",
				label: "Text",
				placeholder: "Text to search in"
			},
			{
				type: "text",
				name: "substring",
				label: "Substring",
				placeholder: "Substring to search for"
			},
			{
				type: "text",
				name: "valueIfTrue",
				label: "Value If Contains",
				placeholder: "Value when substring is found"
			},
			{
				type: "text",
				name: "valueIfFalse",
				label: "Value If Not Contains",
				placeholder: "Value when substring is not found"
			}
		],
		async onRender(ctx, args) {
			const text = args.values.text ?? "";
			const substring = args.values.substring ?? "";
			const valueIfTrue = args.values.valueIfTrue ?? "";
			const valueIfFalse = args.values.valueIfFalse ?? "";
			return text.includes(substring) ? valueIfTrue : valueIfFalse;
		}
	},
	{
		name: "conditional.regex",
		description: "Select value based on regex match",
		args: [
			{
				type: "text",
				name: "text",
				label: "Text",
				placeholder: "Text to match against"
			},
			{
				type: "text",
				name: "pattern",
				label: "Regex Pattern",
				placeholder: "Regular expression pattern"
			},
			{
				type: "text",
				name: "valueIfTrue",
				label: "Value If Match",
				placeholder: "Value when pattern matches"
			},
			{
				type: "text",
				name: "valueIfFalse",
				label: "Value If No Match",
				placeholder: "Value when pattern does not match"
			}
		],
		async onRender(ctx, args) {
			const text = args.values.text ?? "";
			const pattern = args.values.pattern ?? "";
			const valueIfTrue = args.values.valueIfTrue ?? "";
			const valueIfFalse = args.values.valueIfFalse ?? "";
			try {
				return new RegExp(pattern).test(text) ? valueIfTrue : valueIfFalse;
			} catch (error) {
				console.error("Invalid regex pattern:", error);
				return valueIfFalse;
			}
		}
	}
] };
/**
* Evaluate a condition string and return a boolean result
*/
function evaluateCondition(condition) {
	const lowerCondition = condition.toLowerCase();
	if (lowerCondition === "true" || lowerCondition === "1" || lowerCondition === "yes") return true;
	if (lowerCondition === "false" || lowerCondition === "0" || lowerCondition === "no" || lowerCondition === "") return false;
	for (const op of [
		"===",
		"!==",
		"==",
		"!=",
		">=",
		"<=",
		">",
		"<"
	]) if (condition.includes(op)) {
		const parts = condition.split(op).map((p) => p.trim());
		if (parts.length === 2) return compareValues(parts[0], parts[1], op);
	}
	return condition.length > 0;
}
/**
* Compare two values using the specified operator
*/
function compareValues(left, right, operator) {
	const leftNum = parseFloat(left);
	const rightNum = parseFloat(right);
	const isNumeric = !isNaN(leftNum) && !isNaN(rightNum);
	switch (operator) {
		case "===":
		case "==": return isNumeric ? leftNum === rightNum : left === right;
		case "!==":
		case "!=": return isNumeric ? leftNum !== rightNum : left !== right;
		case ">": return isNumeric ? leftNum > rightNum : left > right;
		case "<": return isNumeric ? leftNum < rightNum : left < right;
		case ">=": return isNumeric ? leftNum >= rightNum : left >= right;
		case "<=": return isNumeric ? leftNum <= rightNum : left <= right;
		default: return false;
	}
}

//#endregion
exports.plugin = plugin;