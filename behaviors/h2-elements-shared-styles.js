const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="h2-elements-shared-styles">
  <template>
    <style>
      :host([readonly]) .mask,
      :host([disabled]) .mask {
        position: absolute;
        top: -1px;
        bottom: -1px;
        right: -1px;
        left: -1px;
        background-color: rgba(255, 255, 255, 0.5);
        z-index: 10;
      }

      :host([data-invalid]) .prompt-tip__container[data-prompt]:not([data-prompt=""]) {
        transform: translateX(5px);
        visibility: visible;
        opacity: 1;
      }

      .prompt-tip__container {
        -webkit-transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out, -webkit-transform 0.2s cubic-bezier(0.71, 1.7, 0.77, 1.24);
        -moz-transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out, -moz-transform 0.2s cubic-bezier(0.71, 1.7, 0.77, 1.24);
        -ms-transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out, -ms-transform 0.2s cubic-bezier(0.71, 1.7, 0.77, 1.24);
        -o-transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out, -o-transform 0.2s cubic-bezier(0.71, 1.7, 0.77, 1.24);
        transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out, transform 0.2s cubic-bezier(0.71, 1.7, 0.77, 1.24);

        display: flex;
        align-items: center;
        visibility: hidden;

        position: absolute;
        left: 100%;
        margin-left: 24px;
        height: 100%;

        opacity: 0;
        z-index: 9;

        pointer-events: none;
      }

      .prompt-tip {
        flex: 1;
        padding: 0 6px;
        background: var(--h2-prompt-tip-background-color, #aeaeae);
        color: var(--h2-prompt-tip-color, white);
        border-radius: 4px;
        font-size: 14px;
        line-height: 22px;
        position: relative;
        white-space: nowrap;
      }

      .prompt-tip::before {
        position: absolute;
        content: '';
        border: 11px solid transparent;
        border-right: 11px solid var(--h2-prompt-tip-background-color, #aeaeae);
        left: -20px;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
