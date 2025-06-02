module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    // Buttons
    "btn",
    "btn-primary",
    "btn-secondary",
    "btn-accent",
    "btn-neutral",
    "btn-info",
    "btn-success",
    "btn-warning",
    "btn-error",
    "btn-outline",
    "btn-link",
    "btn-active",
    "btn-disabled",

    // Alerts
    "alert",
    "alert-info",
    "alert-success",
    "alert-warning",
    "alert-error",

    // Cards
    "card",
    "card-body",
    "card-actions",
    "card-title",

    // Badges
    "badge",
    "badge-primary",
    "badge-secondary",
    "badge-accent",
    "badge-outline",
    "badge-info",
    "badge-success",
    "badge-warning",
    "badge-error",

    // Inputs
    "input",
    "input-bordered",
    "input-primary",
    "input-secondary",
    "input-accent",
    "input-info",
    "input-success",
    "input-warning",
    "input-error",
    "input-disabled",

    // Selects
    "select",
    "select-bordered",
    "select-primary",
    "select-secondary",
    "select-accent",
    "select-info",
    "select-success",
    "select-warning",
    "select-error",

    // Modals
    "modal",
    "modal-box",
    "modal-action",
    "modal-toggle",

    // Tabs
    "tabs",
    "tab",
    "tab-active",
    "tab-bordered",
    "tab-lifted",

    // Navbar
    "navbar",
    "navbar-start",
    "navbar-center",
    "navbar-end",

    // Drawer
    "drawer",
    "drawer-toggle",
    "drawer-content",
    "drawer-side",

    // Toasts
    "toast",

    // Progress
    "progress",
    "progress-primary",
    "progress-secondary",
    "progress-accent",
    "progress-info",
    "progress-success",
    "progress-warning",
    "progress-error",

    // Avatars
    "avatar",
    "avatar-group",

    // Collapse
    "collapse",
    "collapse-title",
    "collapse-content",
    "collapse-arrow",

    // Steps
    "steps",
    "step",
    "step-primary",
    "step-secondary",
    "step-accent",

    // Stats
    "stats",
    "stat",
    "stat-title",
    "stat-value",
    "stat-desc",
    "stat-figure",

    // Tables
    "table",
    "table-zebra",
    "table-pin-rows",
    "table-pin-cols",

    // Toggles & switches
    "toggle",
    "checkbox",
    "switch",

    // Others
    "divider",
    "timeline",
    "indicator",
    "kbd",
    "mask",
    "tooltip",
    "loading",
    "rating",
  ],
  theme: {
    screens: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [],
  },
};
