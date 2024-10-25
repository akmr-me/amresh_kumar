import ReactDOM from "react-dom/client";
import App from "@/entrypoints/content/App";
import MessageProvider from "@/context/message";

let anchor: Element | null | undefined;
console.log(",,", import.meta.env.WXT_TARGET_ELEMENT_CLASS_NAME);
export default defineContentScript({
  matches: [import.meta.env.WXT_ALLOWED_URL],
  // matches: ["*://www.linkedin.com/messaging/thread/*"],
  cssInjectionMode: "ui",

  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: "linkedin-chatgpt-writer",
      position: "inline",
      // anchor: `body`,
      // // anchor: `.${import.meta.env.WXT_TARGET_ELEMENT_CLASS_NAME}`,,
      // append: "last",
      //----
      anchor: () => anchor,
      append: (anchor, root) => anchor.insertAdjacentElement("afterend", root),
      onMount: async (container) => {
        // don't mount react app directly on <body>
        const wrapper = document.createElement("div");
        container.append(wrapper);
        console.log("called");
        const root = ReactDOM.createRoot(wrapper);
        root.render(
          <MessageProvider>
            <App />
          </MessageProvider>
        );
        return { root, wrapper };
      },
      onRemove: (elements) => {
        // elements?.root.unmount();
        elements?.then((element) => {
          element?.root.unmount();
          element?.wrapper.remove();
        });
        // elements?.wrapper.remove();
        // elements?.unmount();
      },
    });
    watchDomChanges(
      ctx,
      `[class^="${import.meta.env.WXT_TARGET_ELEMENT_CLASS_NAME}"]`,
      {
        onAdd: (newAnchor: any) => {
          anchor = newAnchor;
          ui.mount();
        },
        onRemove: () => {
          ui.remove();
        },
      }
    );
    // ui.mount();
  },
});

function watchDomChanges(ctx: any, selector: any, callbacks: any) {
  let prevAnchor: HTMLElement | undefined;

  // If desired element based on selector is not mounted on first load
  const observer = new MutationObserver(() => {
    const el = document.querySelector(selector);
    if (el && !prevAnchor) {
      callbacks.onAdd(el);
    } else if (!el && prevAnchor) {
      callbacks.onRemove();
    }
    prevAnchor = el;
  });
  ctx.onInvalidated(() => observer.disconnect());
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // if element is alreday loaded in DOM
  const initialEl = document.querySelector(selector);
  if (initialEl) {
    callbacks.onAdd(initialEl);
    prevAnchor = initialEl;
  }
}
