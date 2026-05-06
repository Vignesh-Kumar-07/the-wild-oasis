import { useEffect, useRef } from "react";

export function useOutsideClick(handleFn, listenOnCapturePhase = true) {
  const ref = useRef();
  useEffect(
    function () {
      function callback(e) {
        // console.log("eee");
        // console.log(elRef.current, "ref");
        // console.log(e.target, "e");
        // console.log(elRef.current?.contains(e.target), "bool");

        if (ref.current && !ref.current.contains(e.target)) {
          handleFn();
          console.log("click");
        }
      }
      document.addEventListener("click", callback, listenOnCapturePhase);

      return () =>
        document.removeEventListener("click", callback, listenOnCapturePhase);
    },
    [handleFn, ref, listenOnCapturePhase],
  );
  return { ref };
}
