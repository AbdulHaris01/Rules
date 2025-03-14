import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import {
  updateRuleset,
  copyRuleset,
  deleteRuleset,
  Ruleset,
  Rule,
} from "../redux/slice";
import RulesTable from "./RulesTable";
import "./rules.css";

const Rules: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const rulesets = useSelector((state: RootState) => state.rules.rulesets);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const tableRef = useRef<HTMLTableElement>(null);
  const [selectedRuleSet, setSelectedRuleSet] = useState<Ruleset>(rulesets[0]);
  const [editRule, setEditRule] = useState<number>(-1);
  const [deleted, setDeleted] = useState<boolean>(false);

  const handleSave = () => {
    if (!selectedRuleSet.name.trim()) {
      alert("Ruleset name cannot be empty!");
      return;
    }

    const invalidRule = selectedRuleSet.rules.find((rule) => {
      const isMeasurementNameEmpty = !rule.measurementName.trim();
      const isFindingNameEmpty = !rule.findingName.trim();
      const isComparedValueEmpty =
        typeof rule.comparedValue === "string"
          ? !rule.comparedValue.trim()
          : isNaN(rule.comparedValue);
      const isUnitNameEmpty = rule.comparator !== "is" && !rule.unitName.trim();

      return (
        isMeasurementNameEmpty ||
        isComparedValueEmpty ||
        isFindingNameEmpty ||
        isUnitNameEmpty
      );
    });

    if (invalidRule) {
      alert(
        "Each rule must have a Measurement Name, a valid Compared Value, and a Finding Name. Additionally, Unit Name is required if Comparator is >= or <."
      );
      return;
    }
    dispatch(updateRuleset(selectedRuleSet));
    setEditRule(-1);
    setEditMode(false);
  };

  const handleCancel = () => setShowCancelPopup(true);

  const handleAddRule = () => {
    let newRule: Rule = {
      id:
        selectedRuleSet.rules.reduce(
          (max: number, rule: Rule) => (rule.id > max ? rule.id : max),
          0
        ) + 1,
      measurementName: "",
      comparator: "is",
      comparedValue: "Not Present",
      unitName: "",
      findingName: "",
      action: "Normal",
    };
    setSelectedRuleSet((prev: Ruleset) => ({
      ...prev,
      rules: [...prev.rules, newRule],
    }));
    setEditRule(newRule.id);
    setTimeout(() => {
      if (tableRef.current) {
        tableRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }, 100);
  };

  const handleDeleteRuleset = (id: number) => {
    setEditMode(false);
    dispatch(deleteRuleset(id));
    setDeleted(true);
  };
  useEffect(() => {
    if (deleted) {
      setDeleted(false);
      setSelectedRuleSet(rulesets[0]);
    }
  }, [deleted]);

  const handlePopupResponse = (confirm: boolean) => {
    if (confirm) {
      setEditMode(false);
      let restore: Ruleset =
        rulesets.find((rules) => rules.id === selectedRuleSet.id) ||
        rulesets[0];
      setSelectedRuleSet(restore);
      setEditRule(-1);
    }
    setShowCancelPopup(false);
  };
  return (
    <div className="container">
      <div className="flex-container">
        {editMode ? (
          <input
            placeholder="Ruleset Name"
            type="text"
            className="input-edit-mode"
            value={selectedRuleSet?.name || ""}
            onChange={(e) =>
              setSelectedRuleSet((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <select
            className="select"
            value={selectedRuleSet?.id}
            onChange={(e) => {
              setSelectedRuleSet(
                rulesets.find((r) => r.id === Number(e.target.value)) ||
                  rulesets[0]
              );
            }}
          >
            {rulesets.map((ruleset) => (
              <option key={ruleset.id} value={ruleset.id}>
                {ruleset.name}
              </option>
            ))}
          </select>
        )}

        {!editMode ? (
          <>
            {rulesets.length > 0 && (
              <>
                <button
                  className="button button-edit"
                  onClick={() => setEditMode(!editMode)}
                >
                  Edit Rules
                </button>
                <button
                  className="button button-copy"
                  onClick={() => dispatch(copyRuleset(selectedRuleSet?.id))}
                >
                  Copy Ruleset
                </button>
              </>
            )}
          </>
        ) : (
          <>
            <button className="button button-save" onClick={handleSave}>
              Save Changes
            </button>
            <button className="button button-cancel" onClick={handleCancel}>
              Cancel
            </button>
            <button className="button button-add" onClick={handleAddRule}>
              Add New Rule
            </button>
            <button
              className="button button-delete"
              onClick={() => handleDeleteRuleset(selectedRuleSet?.id)}
            >
              Delete Ruleset
            </button>
          </>
        )}
      </div>

      {showCancelPopup && (
        <div className="popup">
          <p>Are you sure you want to discard changes?</p>
          <button
            className="button button-popup-no"
            onClick={() => handlePopupResponse(false)}
          >
            No
          </button>
          <button
            className="button button-popup-yes"
            onClick={() => handlePopupResponse(true)}
          >
            Yes
          </button>
        </div>
      )}

      <RulesTable
        editMode={editMode}
        selectedRuleSet={selectedRuleSet}
        setSelectedRuleSet={setSelectedRuleSet}
        editRule={editRule}
        setEditRule={setEditRule}
        tableRef={tableRef as any}
      />
    </div>
  );
};

export default Rules;
