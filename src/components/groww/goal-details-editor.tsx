import { useEffect, useState } from "react";
import { Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PLAN_SETTINGS, type Goal, type GoalChanges } from "@/lib/goal-calculations";

export function GoalDetailsEditor({ goal, onSave }: { goal: Goal; onSave: (changes: GoalChanges) => void }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(() => ({ name: goal.name, target: String(goal.targetAmount), initial: String(goal.initialAmount) }));
  const target = Number(draft.target);
  const initial = Number(draft.initial);
  const valid = draft.name.trim().length > 0 && draft.target !== "" && draft.initial !== "" && Number.isFinite(target) && target > 0 && target <= PLAN_SETTINGS.maxAmount && Number.isFinite(initial) && initial >= 0 && initial <= PLAN_SETTINGS.maxAmount;

  useEffect(() => {
    if (!editing) {
      setDraft({ name: goal.name, target: String(goal.targetAmount), initial: String(goal.initialAmount) });
    }
  }, [editing, goal.id, goal.name, goal.targetAmount, goal.initialAmount]);

  if (!editing) return <Button variant="ghost" size="icon" aria-label="Edit goal details" title="Edit goal details" className="h-11 w-11 shrink-0 text-muted-foreground" onClick={() => setEditing(true)}><Pencil /></Button>;
  return (
    <form className="mt-4 w-full border-t border-border pt-4" onSubmit={event => { event.preventDefault(); if (!valid) return; onSave({ name: draft.name, targetAmount: target, initialAmount: initial }); setEditing(false); }}>
      <div className="flex items-center justify-between"><h2 className="text-sm font-semibold">Goal details</h2><Button type="button" variant="ghost" size="icon" aria-label="Cancel editing" title="Cancel editing" className="h-11 w-11" onClick={() => setEditing(false)}><X /></Button></div>
      <div className="space-y-3">
        <label className="block text-xs text-muted-foreground">Goal name<Input aria-label="Goal name" maxLength={80} className="mt-1 h-11 text-foreground shadow-none" value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })} /></label>
        <label className="block text-xs text-muted-foreground">Target amount (₹)<Input aria-label="Target amount" type="number" inputMode="numeric" min={1} max={PLAN_SETTINGS.maxAmount} className="num mt-1 h-11 text-foreground shadow-none" value={draft.target} onChange={e => setDraft({ ...draft, target: e.target.value })} /></label>
        <label className="block text-xs text-muted-foreground">Already saved (₹)<Input aria-label="Already saved" type="number" inputMode="numeric" min={0} max={PLAN_SETTINGS.maxAmount} className="num mt-1 h-11 text-foreground shadow-none" value={draft.initial} onChange={e => setDraft({ ...draft, initial: e.target.value })} /></label>
      </div>
      <Button type="submit" disabled={!valid} className="mt-4 h-11 w-full">Save changes</Button>
    </form>
  );
}
