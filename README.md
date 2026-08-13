## Architecture

WS message (50/sec)
→ parseTradeMessage() — validate, drop malformed, never throw
→ bufferRef.current — useRef, NO re-render
↓
setInterval @ 500ms — throttle valve
→ drain buffer
→ setChartPoints (capped 60)
→ setHistoryRows (capped 100)
→ single re-render

Layers:
utils/ pure functions, zero imports, fully testable
services/ FinnhubSocket — plain class, zero React knowledge
context/ owns socket lifecycle + throttle. Single source of truth.
screens/ composition only
components/ dumb, memoized, props-in-JSX-out

Why no Redux: single feature, single data source, no cross-screen mutation.
Context + useRef is the correct tool. Redux here would be boilerplate, not architecture.
