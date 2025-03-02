import type { KeyboardKey } from './keyboardKeyLite';

/**
 * This is a type alias. The indicies start at 1, corresponding to the leftmost button on the left keyboard side and moving clockwise.
 * After 9, this jumps to the rightmost key on the right keyboard side and moves clockwise again.
 * So using the top keys as reference, it goes "Alt" is 1, "Ctrl" is 2, then up to "mouse up" as 9, then "alt" on the right side is 10, followed by "mouse up" as 11, finishing with "ctrl" as 18
 */
export type RowGroupSpecifier = number;

export interface SectorGroupDataRow {
  firstKey: KeyboardKey;
  secondKey: KeyboardKey;
  thirdKey: KeyboardKey;
  fourthKey: KeyboardKey;
  fifthKey: KeyboardKey;
  sixthKey: KeyboardKey;
  seventhKey: KeyboardKey;
  eighthKey: KeyboardKey;
  ninthKey: KeyboardKey;
  tenthKey: KeyboardKey;
  eleventhKey: KeyboardKey;
  twelfthKey: KeyboardKey;
  thirteenthKey?: KeyboardKey;
  fourteenthKey?: KeyboardKey;
}
