// Shared utilities for action handlers to reduce boilerplate

export function advanceDialogue(scene) {
  scene.isAnimating = false;
  scene.dialogueIndex++;
  scene.processDialogue();
}

export function advanceDialogueAfterDelay(scene, delay) {
  scene.time.delayedCall(delay, () => {
    advanceDialogue(scene);
  });
}
