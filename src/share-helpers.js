import { convertGridToEmojiString } from "./grid-helpers";

export const assertCanShare = (data) => {
  const shareNotEnabled = !window.navigator.canShare(data);
  // todo: better detection of desktop
  // const onDesktop = !window.navigator.userAgentData?.mobile;
  if (shareNotEnabled) {
    throw new Error('Sharing not enabled');
  }
}

export const shareGrid = (grid, onCopy, highContrast) => {
  const text = convertGridToEmojiString(grid, highContrast);
  const data = { text };
  try {
    assertCanShare(data);
    window.navigator.share(data);
  } catch (e) {
    navigator.clipboard.writeText(text);
    onCopy();
  }
};