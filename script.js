document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("equation-form-id");
    const value_a = document.getElementById("input-a");
    const value_b = document.getElementById("input-b");
    const value_c = document.getElementById("input-c");
    const outPut = document.getElementById("result");

    const roundOff = Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4
    });

    function quadraticCalculations(a, b, c, d) {
        if (d > 0) {
            const discriminant = Math.sqrt(d);
            return {
                xP: (-b + discriminant) / (2 * a),
                xN: (-b - discriminant) / (2 * a)
            };
        }

        if (d === 0) {
            return {
                x: equX = -b / (2 * a)
            };
        }

        if (d < 0) {
            const absDiscriminant = Math.sqrt(-d);
            return {
                xR: -b / (2 * a),
                xI: absDiscriminant / (2 * a)
            };
        }
    }

    function numberFilter(input, name) {

        if (input.value.trim() === "") {
            throw new Error(`${name} is required.`)
        }

        const n = Number(input.value);
        if (Number.isNaN(n)) {
            throw new Error(`${name} must be a number.`)
        }
        if (name === "a" && n === 0) {
            throw new Error("a can't be zero.")
        }
        return n;
    }

    function sign(s) {
        return s >= 0 ? `+ ${roundOff.format(Math.abs(s))}` : `- ${roundOff.format(Math.abs(s))}`;
    }
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        try {
            const a = numberFilter(value_a, "a");
            const b = numberFilter(value_b, "b");
            const c = numberFilter(value_c, "c");
            const d = b * b - 4 * a * c;

            const result = quadraticCalculations(a, b, c, d);
            const equation = `Equation: ${sign(a)}x² ${sign(b)}x ${sign(c)} = 0`
            if (d > 0) {
                outPut.value = `${equation} \nSolution: x = ${sign(result.xP)} or x = ${sign(result.xN)}`;
            }

            if (d === 0) {
                outPut.value = `${equation} \nSolution: x = ${sign(result.x)}`;
            }

            if (d < 0) {
                outPut.value = `${equation} \nSolution: x = ${sign(result.xR)} ${sign(result.xI)}i or x = ${sign(result.xR)} ${sign(result.xI)}i`;
            }
        }
        catch (error) {
            outPut.value = error.message;
        }
    });
});