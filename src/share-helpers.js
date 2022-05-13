import { convertGridToEmojiString } from "./grid-helpers";

export const assertCanShare = (data) => {
  const shareNotEnabled = !window.navigator.canShare(data);
  const onDesktop = !window.navigator.userAgentData?.mobile;
  if (shareNotEnabled || onDesktop) {
      throw new Error('Sharing not enabled');
  }
}

export const shareGrid = (grid, onCopy) => {
  const text = convertGridToEmojiString(grid);
  const data = { text };
  try {
    assertCanShare(data);
    window.navigator.share(data);
  } catch (e) {
    navigator.clipboard.writeText(text);
    onCopy();
  }
};