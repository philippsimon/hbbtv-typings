/**
 * @see http://www.oipf.tv/docs/oipf-archive/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-V1_1-2009-10-08.pdf#page=256
 */
interface KeyEvent extends UIEvent {
  readonly shiftKey: boolean;
  readonly keyCode: number;
  readonly charCode: number;
  /**
   * @see http://www.oipf.tv/docs/oipf-archive/OIPF-T1-R1-Specification-Volume-5-Declarative-Application-Environment-V1_1-2009-10-08.pdf#page=257
   *
   * @param typeArg
   * @param canBubbleArg
   * @param cancelableArg
   * @param ctrlKeyArg MAY be ignored
   * @param altKeyArg MAY be ignored
   * @param shiftKeyArg
   * @param metaKeyArg MAY be ignored
   * @param keyCodeArg
   * @param charCodeArg
   */
  initKeyEvent(
    typeArg: 'keydown' | 'keypress' | 'keyup',
    canBubbleArg: boolean,
    cancelableArg: boolean,
    ctrlKeyArg: boolean,
    altKeyArg: boolean,
    shiftKeyArg: boolean,
    metaKeyArg: boolean,
    keyCodeArg: number,
    charCodeArg: number
  ): void;
}

interface KeyEventInit extends EventModifierInit {
  code?: string;
  key?: string;
  location?: number;
  repeat?: boolean;
}

declare var KeyEvent: {
  prototype: KeyEvent;
  new(typeArg: 'keydown' | 'keypress' | 'keyup', eventInitDict?: KeyEventInit): KeyEvent;
  readonly VK_RED: number;
  readonly VK_GREEN: number;
  readonly VK_YELLOW: number;
  readonly VK_BLUE: number;
  readonly VK_LEFT: number;
  readonly VK_UP: number;
  readonly VK_RIGHT: number;
  readonly VK_DOWN: number;
  readonly VK_ENTER: number;
  readonly VK_0: number;
  readonly VK_1: number;
  readonly VK_2: number;
  readonly VK_3: number;
  readonly VK_4: number;
  readonly VK_5: number;
  readonly VK_6: number;
  readonly VK_7: number;
  readonly VK_8: number;
  readonly VK_9: number;
  readonly VK_PLAY: number;
  readonly VK_PAUSE: number;
  readonly VK_STOP: number;
  readonly VK_FAST_FWD: number;
  readonly VK_REWIND: number;
  readonly VK_BACK: number;
  readonly VK_TELETEXT: number;
};
