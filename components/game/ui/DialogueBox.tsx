// components/game/ui/DialogueBox.tsx
"use client";
import { useEffect } from "react";
import { useGameStore } from "@/store/gameStore";
import { dialogues } from "@/data/dialogues";
import { npcs } from "@/data/district";
import { useIsTouch } from "@/hooks/useIsTouch";

export default function DialogueBox() {
  const dialogue = useGameStore((s) => s.dialogue);
  const nearbyNpc = useGameStore((s) => s.nearbyNpc);
  const paused = useGameStore((s) => s.paused);
  const startDialogue = useGameStore((s) => s.startDialogue);
  const advance = useGameStore((s) => s.advanceDialogue);
  const isTouch = useIsTouch();

  const node = dialogue
    ? dialogues[dialogue.treeId]?.nodes[dialogue.nodeId]
    : undefined;
  const npc = npcs.find((n) => n.id === nearbyNpc);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const s = useGameStore.getState();
      if (s.paused) return;

      if (s.dialogue) {
        const n = dialogues[s.dialogue.treeId]?.nodes[s.dialogue.nodeId];
        if (!n) {
          s.endDialogue();
          return;
        }
        if (n.choices?.length) {
          const i = Number(e.key) - 1;
          if (Number.isInteger(i) && i >= 0 && i < n.choices.length) {
            s.advanceDialogue(n.choices[i].next);
          }
          return;
        }
        if (e.code === "KeyE" || e.code === "Enter" || e.code === "Space") {
          s.advanceDialogue(n.next ?? null);
        }
        return;
      }

      if (e.code === "KeyE" && s.nearbyNpc) {
        const target = npcs.find((x) => x.id === s.nearbyNpc);
        if (target) s.startDialogue(target.dialogueId);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (dialogue && node) {
    return (
      <div className="fixed inset-x-0 bottom-0 z-30 flex justify-center p-4">
        <div className="w-full max-w-xl space-y-3 rounded-lg bg-zinc-900/95 p-4 text-white">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-400">
            {node.speaker}
          </p>
          <p className="leading-relaxed">{node.text}</p>

          {node.choices?.length ? (
            <div className="flex flex-col gap-2">
              {node.choices.map((c, i) => (
                <button
                  key={c.label}
                  onClick={() => advance(c.next)}
                  className="rounded bg-zinc-800 px-3 py-2 text-left text-sm hover:bg-zinc-700"
                >
                  {i + 1}. {c.label}
                </button>
              ))}
            </div>
          ) : (
            <button
              onClick={() => advance(node.next ?? null)}
              className="rounded bg-amber-500 px-4 py-2 text-sm font-semibold text-black"
            >
              {node.next ? "Continue" : "Close"}
              {!isTouch && " (E)"}
            </button>
          )}
        </div>
      </div>
    );
  }

  if (npc && !paused) {
    return (
      <div className="pointer-events-none fixed inset-x-0 bottom-28 z-30 flex justify-center">
        {isTouch ? (
          <button
            onClick={() => startDialogue(npc.dialogueId)}
            className="pointer-events-auto rounded-full bg-amber-500 px-5 py-2 text-sm font-semibold text-black"
          >
            Talk to {npc.name}
          </button>
        ) : (
          <div className="rounded bg-black/60 px-3 py-1 text-sm text-white">
            Press <b>E</b> to talk to {npc.name}
          </div>
        )}
      </div>
    );
  }

  return null;
}