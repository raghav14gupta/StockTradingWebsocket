# LiveTradeChart — Architecture Rules

## Stack
React Native CLI, plain JavaScript (JSX), no TypeScript.
Navigation: @react-navigation/native-stack
State: React Context + useRef (NO Redux — single feature app)
Charts: react-native-gifted-charts

## Layer Rules (NON-NEGOTIABLE)

### Layer 1 — services/
Pure JS classes. ZERO React imports. ZERO react-native imports.
Knows nothing about UI. Communicates via callbacks only.
Example: FinnhubSocket.js exposes connect(), close(), and
accepts onTrade/onStatus callbacks in constructor.

### Layer 2 — utils/
Pure functions only. Input → output. No side effects, no state, no imports from other layers.
Every util must be unit-testable without mocking anything.

### Layer 3 — context/
Owns the service instance lifecycle. Owns the ref buffer.
The ONLY place setInterval throttling exists.
Exposes data + status to screens. Screens never touch services directly.

### Layer 4 — components/
Dumb/presentational. Props in, JSX out. No context access, no data fetching.
Every component wrapped in React.memo.

### Layer 5 — screens/
Composition only. Reads from context, passes props down to components.
No business logic. No styling logic beyond layout.

## Import Direction (STRICT)
screens → components → theme
screens → context → services → utils
NEVER: services → components (services must not know UI exists)
NEVER: components → context (components take props only)
NEVER: utils → anything (utils import nothing from src/)

## Hard Rules
- No hardcoded colors. Import from theme/colors.js
- No hardcoded spacing. Import from theme/spacing.js
- No magic numbers. Import from config/constants.js
- No inline styles. StyleSheet.create at file bottom.
- No barrel index.js re-export files.
- No console.log in committed code.
- Chart dimensions from useWindowDimensions, never hardcoded px.

## Navigation Nesting (FROZEN)
WebSocket Provider lives OUTSIDE NavigationContainer — always.

```
App.jsx
└── SafeAreaProvider
    └── TradeProvider          ← socket + buffer zinda yahan
        └── NavigationContainer
            └── RootStack (native-stack)
                ├── Splash       headerShown: false
                ├── Chart        headerShown: false
                └── TradeHistory headerShown: true
```

NO bottom tab bar. Stack navigation only. This is a single-flow app.
