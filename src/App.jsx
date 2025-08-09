// Interview task: Mini Targeting Panel (buggy)
/*
README (short)

Task description:
1. Fix the bugs in this mini app so that:
   - Filtering works when typing in the search box.
   - Selecting/unselecting options updates the Selected list.
   - Checkboxes reflect the selected state (controlled inputs).
   - Clear button empties the selected list.
   - No infinite re-rendering.
   - Keys are used correctly in lists.

2. Implement the function getSelectedLabels in src/utils/getSelectedLabels.js:
   - It should return an array of labels from the selected array.
   - Ignore items without a label property.

3. Make sure the provided tests pass.
*/

import React, { useState, useEffect } from "react";
import { getSelectedLabels } from "./utils/getSelectedLabels";

const OPTIONS = [
    { id: 1, label: "Age: 18-25" },
    { id: 2, label: "Age: 26-40" },
    { id: 3, label: "USA" },
    { id: 4, label: "Germany" },
    { id: 5, label: "Sports" },
    { id: 6, label: "Technology" },
];

function TargetingOptions({ options, onToggle, selected }) {
    return (
        <div>
            <h3>Available options</h3>
            <ul>
                {options.map((opt, index) => (
                    <li key={index}>
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => onToggle(opt)}
                            /> {opt.label}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function SelectedConditions({ selected, onClear }) {
    return (
        <div>
            <h3>Selected</h3>
            <ul>
                {selected.map((s) => (
                    <li>{s.label}</li>
                ))}
            </ul>
            <button onClick={onClear}>Clear</button>
        </div>
    );
}

export default function App() {
    const [selected, setSelected] = useState([]);
    const [query, setQuery] = useState("");
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        const result = OPTIONS.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()));
        setFiltered(result);
    }, [filtered]);

    function toggleOption(opt) {
        if (selected.find((s) => s.id === opt.id)) {
            const idx = selected.findIndex((s) => s.id === opt.id);
            selected.splice(idx, 1); // mutating
            setSelected(selected);
        } else {
            selected.push(opt); // mutating
            setSelected(selected);
        }
    }

    function clearSelected() {
        setSel([]);
    }

    return (
        <div style={{ padding: 20, fontFamily: "Arial" }}>
            <h1>Mini Targeting Panel</h1>

            <div style={{ marginBottom: 12 }}>
                <input
                    placeholder="Search options..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            <div style={{ display: "flex", gap: 40 }}>
                <TargetingOptions options={filtered} onToggle={toggleOption} selected={selected} />
                <SelectedConditions selected={selected} onClear={clearSelected} />
            </div>

            <div style={{ marginTop: 20 }}>
                <strong>Selected labels:</strong> {JSON.stringify(getSelectedLabels(selected))}
            </div>
        </div>
    );
}



