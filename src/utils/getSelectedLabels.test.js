// src/utils/getSelectedLabels.test.js
import { getSelectedLabels } from "./getSelectedLabels";

describe("getSelectedLabels", () => {
    test("returns an array of labels from selected options", () => {
        const input = [
            { id: 1, label: "Age: 18-25" },
            { id: 3, label: "USA" },
        ];
        expect(getSelectedLabels(input)).toEqual(["Age: 18-25", "USA"]);
    });

    test("returns an empty array if no items", () => {
        expect(getSelectedLabels([])).toEqual([]);
    });

    test("ignores objects without label property", () => {
        const input = [
            { id: 1, label: "Age: 18-25" },
            { id: 99 },
        ];
        expect(getSelectedLabels(input)).toEqual(["Age: 18-25"]);
    });
});
