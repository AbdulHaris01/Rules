import React from "react";
import { Ruleset, Rule } from "../redux/slice";
import "./rules.css";
interface RulesTableProps {
  editMode: boolean;
  selectedRuleSet: Ruleset;
  setSelectedRuleSet: React.Dispatch<React.SetStateAction<Ruleset>>;
  editRule: number;
  setEditRule: React.Dispatch<React.SetStateAction<number>>;
  tableRef: React.RefObject<HTMLTableElement>;
}

const RulesTable: React.FC<RulesTableProps> = ({
  editMode,
  selectedRuleSet,
  setSelectedRuleSet,
  editRule,
  setEditRule,
  tableRef,
}) => {
  const [draggedItem, setDraggedItem] = React.useState<number | null>(null);

  const handleDragStart = (index: number) => setDraggedItem(index);

  const handleDragOver = (
    e: React.DragEvent<HTMLTableRowElement>,
    index: number
  ) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem === index) return;

    let newRules = [...selectedRuleSet.rules];
    const item = newRules.splice(draggedItem, 1)[0];
    newRules.splice(index, 0, item);
    setDraggedItem(index);
    setSelectedRuleSet((prev) => ({ ...prev, rules: newRules }));
  };

  const handleDragEnd = () => setDraggedItem(null);

  const updateRuleValues = (id: number, field: string, value: any) => {
    setSelectedRuleSet((prev) => ({
      ...prev,
      rules: prev.rules.map((rule) =>
        rule.id === id ? { ...rule, [field]: value } : rule
      ),
    }));
  };

  const deleteRule = (id: number) => {
    setSelectedRuleSet((prev) => ({
      ...prev,
      rules: prev.rules.filter((rule) => rule.id !== id),
    }));
  };

  const renderInput = (
    rule: Rule,
    field: string,
    placeHolder: string,
    type: string = "text"
  ) => (
    <input
      placeholder={placeHolder}
      className="input"
      type={type}
      onChange={(e) => updateRuleValues(rule.id, field, e.target.value)}
      value={(rule as any)[field]}
    />
  );

  const renderSelect = (rule: Rule, field: string, options: string[]) => (
    <select
      value={(rule as any)[field]}
      onChange={(e) => updateRuleValues(rule.id, field, e.target.value)}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );

  return (
    <table className="table" ref={tableRef}>
      <thead>
        <tr>
          <th>RULE #</th>
          <th colSpan={3}>MEASUREMENT CONDITION</th>
          <th>FINDING ITEM</th>
          <th>ACTION</th>
          {editMode && <th>MODIFY</th>}
        </tr>
      </thead>
      <tbody>
        {selectedRuleSet?.rules.map((rule, index) => (
          <tr
            key={rule.id}
            draggable={editMode}
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            style={{ cursor: editMode ? "grab" : "default" }}
          >
            <td>{rule.id}</td>
            <td>
              {editRule === rule.id
                ? renderInput(rule, "measurementName", "Measurement Name")
                : rule.measurementName}
            </td>
            <td>
              {editRule === rule.id
                ? renderSelect(rule, "comparator", ["is", ">=", "<"])
                : rule.comparator}
            </td>
            <td>
              {editRule === rule.id ? (
                rule.comparator === "is" ? (
                  renderInput(rule, "comparedValue", "Compared Value")
                ) : (
                  <>
                    {renderInput(
                      rule,
                      "comparedValue",
                      "Compared Value",
                      "number"
                    )}
                    {renderInput(rule, "unitName", "Unit Name")}
                  </>
                )
              ) : rule.comparator === "is" ? (
                rule.comparedValue
              ) : (
                `${rule.comparedValue} ${rule.unitName}`
              )}
            </td>
            <td>
              {editRule === rule.id
                ? renderInput(rule, "findingName", "Finding Name")
                : rule.findingName}
            </td>
            <td>
              {editRule === rule.id
                ? renderSelect(rule, "action", ["Normal", "Reflux"])
                : rule.action}
            </td>
            {editMode && (
              <td>
                <button
                  className="button button-delete"
                  onClick={() => deleteRule(rule.id)}
                >
                  Delete
                </button>
                {editRule !== rule.id && (
                  <button
                    className="button button-action-edit"
                    onClick={() => setEditRule(rule.id)}
                  >
                    Edit
                  </button>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RulesTable;
