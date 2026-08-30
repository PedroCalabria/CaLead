/* @ds-bundle: {"format":4,"namespace":"CaLeadDesignSystem_0ab86f","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"DataTable","sourcePath":"components/data/DataTable.jsx"},{"name":"ProgressBar","sourcePath":"components/data/ProgressBar.jsx"},{"name":"ScoreMeter","sourcePath":"components/data/ScoreMeter.jsx"},{"name":"StatCard","sourcePath":"components/data/StatCard.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"EmptyState","sourcePath":"components/feedback/EmptyState.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"Breadcrumb","sourcePath":"components/navigation/Breadcrumb.jsx"},{"name":"SidebarNav","sourcePath":"components/navigation/SidebarNav.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"68f6c08eb9b0","components/core/Badge.jsx":"e44b7a70b71f","components/core/Button.jsx":"d198a8a403c3","components/core/Card.jsx":"03191375ef39","components/core/Icon.jsx":"13b09403b3bd","components/core/IconButton.jsx":"0dbb85b8649a","components/core/Tag.jsx":"deb68b3a83ce","components/data/DataTable.jsx":"7cf6f001260d","components/data/ProgressBar.jsx":"f7cbd7f0561c","components/data/ScoreMeter.jsx":"795389273570","components/data/StatCard.jsx":"fedff159ce97","components/feedback/Dialog.jsx":"90b0b1e4575e","components/feedback/EmptyState.jsx":"2150bc2464cf","components/feedback/Toast.jsx":"fce26e76e2b5","components/feedback/Tooltip.jsx":"d1379656d46f","components/forms/Checkbox.jsx":"20af21cf4cb5","components/forms/Input.jsx":"80d54a155fb4","components/forms/Select.jsx":"51821ae2e491","components/forms/Switch.jsx":"97a0c5150c6c","components/forms/Textarea.jsx":"15b911769667","components/navigation/Breadcrumb.jsx":"b6a1d8215f1a","components/navigation/SidebarNav.jsx":"b157d5318e83","components/navigation/Tabs.jsx":"dbdcb9953625","ui_kits/app/AppShell.jsx":"ec318b5427de","ui_kits/app/IcpScreen.jsx":"eed4007a94c2","ui_kits/app/LeadDetailScreen.jsx":"4e88256a1ed8","ui_kits/app/LeadsScreen.jsx":"852450f85957","ui_kits/app/QueueScreen.jsx":"304b9a109040","ui_kits/mobile/MobileChrome.jsx":"5c27c2ea91a8","ui_kits/mobile/MobileScreens.jsx":"c8af65145038","ui_kits/website/Hero.jsx":"a06cc128acb7","ui_kits/website/Marketing.jsx":"51f27ca4ae65","ui_kits/website/Sections.jsx":"bd9b06bd27e3","ui_kits/website/SiteChrome.jsx":"f478b412a59b"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.CaLeadDesignSystem_0ab86f = window.CaLeadDesignSystem_0ab86f || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const avatarSizes = {
  xs: 22,
  sm: 28,
  md: 36,
  lg: 48
};
function Avatar({
  name = "",
  src,
  size = "md",
  tone = "neutral",
  style,
  ...rest
}) {
  const box = avatarSizes[size] || 36;
  const initials = name.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join("").toUpperCase();
  const tones = {
    neutral: {
      background: "var(--stone-200)",
      color: "var(--stone-700)"
    },
    graphite: {
      background: "var(--stone-800)",
      color: "var(--stone-050)"
    },
    accent: {
      background: "var(--blue-300)",
      color: "var(--stone-950)"
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      width: box,
      height: box,
      borderRadius: "var(--radius-pill)",
      overflow: "hidden",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flex: "none",
      fontFamily: "var(--font-display)",
      fontWeight: "var(--weight-medium)",
      fontSize: Math.round(box * 0.36),
      letterSpacing: "-0.01em",
      boxShadow: "inset 0 0 0 1px rgba(11,11,11,0.06)",
      ...tones[tone],
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : initials);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const badgeTones = {
  neutral: {
    background: "var(--surface-sunken)",
    color: "var(--text-body)",
    border: "1px solid transparent"
  },
  hot: {
    background: "var(--blue-400)",
    color: "var(--text-on-accent)",
    border: "1px solid var(--blue-400)"
  },
  warm: {
    background: "var(--stone-200)",
    color: "var(--text-body)",
    border: "1px solid transparent"
  },
  cold: {
    background: "transparent",
    color: "var(--text-muted)",
    border: "1px solid var(--border-default)"
  },
  info: {
    background: "var(--info-100)",
    color: "var(--info-500)",
    border: "1px solid transparent"
  },
  positive: {
    background: "var(--positive-100)",
    color: "var(--positive-500)",
    border: "1px solid transparent"
  },
  warn: {
    background: "var(--warn-100)",
    color: "var(--warn-500)",
    border: "1px solid transparent"
  },
  critical: {
    background: "var(--critical-100)",
    color: "var(--critical-500)",
    border: "1px solid transparent"
  },
  inverse: {
    background: "rgba(255,255,255,0.1)",
    color: "var(--stone-050)",
    border: "1px solid var(--border-inverse)"
  }
};
function Badge({
  children,
  tone = "neutral",
  uppercase = true,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      padding: "4px 8px",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-label)",
      fontWeight: "var(--weight-medium)",
      letterSpacing: uppercase ? "var(--tracking-label)" : "var(--tracking-mono)",
      textTransform: uppercase ? "uppercase" : "none",
      borderRadius: "var(--radius-2)",
      whiteSpace: "nowrap",
      ...badgeTones[tone],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card({
  children,
  tone = "default",
  padding = 24,
  interactive = false,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const tones = {
    default: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-hairline)",
      color: "var(--text-body)"
    },
    sunken: {
      background: "var(--surface-sunken)",
      border: "1px solid transparent",
      color: "var(--text-body)"
    },
    inverse: {
      background: "var(--surface-inverse)",
      border: "1px solid var(--border-inverse)",
      color: "var(--text-on-inverse-muted)"
    },
    accent: {
      background: "var(--surface-accent-soft)",
      border: "1px solid var(--blue-200)",
      color: "var(--text-body)"
    }
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      borderRadius: "var(--radius-card)",
      padding,
      transition: "var(--transition-surface), border-color var(--dur-fast) var(--ease-standard)",
      ...tones[tone],
      ...(interactive ? {
        cursor: "pointer"
      } : null),
      ...(interactive && hover ? {
        transform: "translateY(-2px)",
        boxShadow: "var(--shadow-float)"
      } : null),
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
/* CaLead uses the Lucide icon set (CDN). Load once per page:
   <script src="https://unpkg.com/lucide@0.544.0/dist/umd/lucide.js"></script>
   Names are kebab-case, e.g. "arrow-up-right". */
const pascal = n => n.split(/[-_]/).map(p => p.charAt(0).toUpperCase() + p.slice(1)).join("");
function nodeToElement(node, key) {
  if (!Array.isArray(node)) return null;
  const [tag, attrs, children] = node;
  if (typeof tag !== "string") return null;
  const props = {
    key,
    ...(attrs || {})
  };
  return React.createElement(tag, props, Array.isArray(children) ? children.map((c, i) => nodeToElement(c, i)) : null);
}
function Icon({
  name,
  size = 18,
  strokeWidth = 1.75,
  color = "currentColor",
  style,
  ...rest
}) {
  const lib = typeof window !== "undefined" && window.lucide && window.lucide.icons;
  const entry = lib ? lib[pascal(name)] || lib[name] : null;
  const base = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      display: "block",
      flex: "none",
      ...style
    },
    "aria-hidden": true,
    ...rest
  };
  if (!entry) return React.createElement("svg", base, React.createElement("circle", {
    cx: 12,
    cy: 12,
    r: 9
  }));
  const children = Array.isArray(entry) && typeof entry[0] === "string" ? entry[2] || [] : entry;
  return React.createElement("svg", base, children.map((c, i) => nodeToElement(c, i)));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const buttonSizes = {
  sm: {
    padding: "0 12px",
    height: 32,
    fontSize: "var(--size-body-s)",
    gap: 6,
    icon: 15
  },
  md: {
    padding: "0 16px",
    height: 40,
    fontSize: "var(--size-body-m)",
    gap: 8,
    icon: 18
  },
  lg: {
    padding: "0 22px",
    height: 48,
    fontSize: "var(--size-body-l)",
    gap: 10,
    icon: 20
  }
};
const buttonVariants = {
  primary: {
    background: "var(--stone-950)",
    color: "var(--stone-050)",
    border: "1px solid var(--stone-950)"
  },
  accent: {
    background: "var(--blue-400)",
    color: "var(--text-on-accent)",
    border: "1px solid var(--blue-400)"
  },
  secondary: {
    background: "var(--surface-card)",
    color: "var(--text-strong)",
    border: "1px solid var(--border-default)"
  },
  ghost: {
    background: "transparent",
    color: "var(--text-strong)",
    border: "1px solid transparent"
  },
  inverse: {
    background: "var(--stone-050)",
    color: "var(--stone-950)",
    border: "1px solid var(--stone-050)"
  },
  outlineInverse: {
    background: "transparent",
    color: "var(--stone-050)",
    border: "1px solid var(--border-inverse)"
  }
};
const buttonHover = {
  primary: {
    background: "var(--stone-800)",
    borderColor: "var(--stone-800)"
  },
  accent: {
    background: "var(--blue-300)",
    borderColor: "var(--blue-300)"
  },
  secondary: {
    background: "var(--surface-hover)",
    borderColor: "var(--stone-400)"
  },
  ghost: {
    background: "var(--surface-hover)"
  },
  inverse: {
    background: "var(--stone-200)",
    borderColor: "var(--stone-200)"
  },
  outlineInverse: {
    background: "rgba(255,255,255,0.08)"
  }
};
function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  block = false,
  disabled = false,
  type = "button",
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const s = buttonSizes[size] || buttonSizes.md;
  const v = buttonVariants[variant] || buttonVariants.primary;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      display: block ? "flex" : "inline-flex",
      width: block ? "100%" : "auto",
      alignItems: "center",
      justifyContent: "center",
      gap: s.gap,
      height: s.height,
      padding: s.padding,
      fontFamily: "var(--font-display)",
      fontWeight: "var(--weight-medium)",
      fontSize: s.fontSize,
      letterSpacing: "-0.01em",
      borderRadius: "var(--radius-control)",
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "var(--transition-control), transform var(--dur-instant) var(--ease-standard)",
      transform: press && !disabled ? "scale(var(--press-scale))" : "none",
      whiteSpace: "nowrap",
      ...v,
      ...(hover && !disabled ? buttonHover[variant] : null),
      ...(disabled ? {
        background: "var(--stone-200)",
        color: "var(--text-faint)",
        borderColor: "var(--stone-200)"
      } : null),
      ...style
    }
  }, rest), icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: s.icon
  }) : null, children, iconRight ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconRight,
    size: s.icon
  }) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const iconButtonSizes = {
  sm: 30,
  md: 36,
  lg: 44
};
const iconButtonGlyph = {
  sm: 15,
  md: 18,
  lg: 20
};
function IconButton({
  icon,
  label,
  variant = "secondary",
  size = "md",
  disabled,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const box = iconButtonSizes[size] || 36;
  const tone = {
    secondary: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-default)",
      color: "var(--text-strong)"
    },
    ghost: {
      background: "transparent",
      border: "1px solid transparent",
      color: "var(--text-muted)"
    },
    solid: {
      background: "var(--stone-950)",
      border: "1px solid var(--stone-950)",
      color: "var(--stone-050)"
    },
    inverse: {
      background: "rgba(255,255,255,0.08)",
      border: "1px solid var(--border-inverse)",
      color: "var(--stone-050)"
    }
  }[variant];
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: box,
      height: box,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--radius-pill)",
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "var(--transition-control)",
      ...tone,
      ...(hover && !disabled ? {
        background: variant === "solid" ? "var(--stone-800)" : variant === "inverse" ? "rgba(255,255,255,0.16)" : "var(--surface-hover)",
        color: variant === "ghost" ? "var(--text-strong)" : undefined
      } : null),
      ...(disabled ? {
        color: "var(--text-faint)",
        background: "var(--stone-100)",
        borderColor: "var(--stone-200)"
      } : null),
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: iconButtonGlyph[size] || 18
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tag({
  children,
  onRemove,
  selected = false,
  icon,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("span", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "6px 10px 6px 12px",
      font: "var(--type-body-small)",
      color: selected ? "var(--stone-050)" : "var(--text-body)",
      background: selected ? "var(--stone-950)" : hover ? "var(--surface-hover)" : "var(--surface-card)",
      border: "1px solid " + (selected ? "var(--stone-950)" : "var(--border-hairline)"),
      borderRadius: "var(--radius-chip)",
      transition: "var(--transition-control)",
      ...style
    }
  }, rest), icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 14
  }) : null, children, onRemove ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onRemove,
    "aria-label": "Remove",
    style: {
      display: "inline-flex",
      padding: 2,
      marginRight: -2,
      background: "none",
      border: 0,
      cursor: "pointer",
      color: "inherit",
      opacity: 0.6,
      borderRadius: "var(--radius-pill)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 13
  })) : null);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/data/DataTable.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Hairline table for lead lists. Columns: {key, header, width, align, render}. */
function DataTable({
  columns = [],
  rows = [],
  onRowClick,
  selectedId,
  rowKey = "id",
  dense = false,
  style,
  ...rest
}) {
  const [hoverKey, setHoverKey] = React.useState(null);
  const pad = dense ? "10px 14px" : "14px 16px";
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-hairline)",
      borderRadius: "var(--radius-card)",
      overflow: "hidden",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      tableLayout: "fixed"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map(c => /*#__PURE__*/React.createElement("th", {
    key: c.key,
    style: {
      width: c.width,
      textAlign: c.align || "left",
      padding: pad,
      font: "var(--type-label)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      background: "var(--surface-sunken)",
      borderBottom: "1px solid var(--border-hairline)",
      whiteSpace: "nowrap"
    }
  }, c.header)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, i) => {
    const k = r[rowKey] ?? i;
    const active = selectedId != null && selectedId === k;
    return /*#__PURE__*/React.createElement("tr", {
      key: k,
      onMouseEnter: () => setHoverKey(k),
      onMouseLeave: () => setHoverKey(null),
      onClick: onRowClick ? () => onRowClick(r) : undefined,
      style: {
        cursor: onRowClick ? "pointer" : "default",
        background: active ? "var(--surface-accent-soft)" : hoverKey === k ? "var(--surface-hover)" : "transparent",
        transition: "background-color var(--dur-instant) var(--ease-standard)"
      }
    }, columns.map(c => /*#__PURE__*/React.createElement("td", {
      key: c.key,
      style: {
        padding: pad,
        textAlign: c.align || "left",
        font: "var(--type-body)",
        color: "var(--text-body)",
        borderBottom: i === rows.length - 1 ? "none" : "1px solid var(--border-hairline)",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, c.render ? c.render(r) : r[c.key])));
  }))));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/data/ProgressBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ProgressBar({
  value = 0,
  label,
  caption,
  tone = "graphite",
  style,
  ...rest
}) {
  const pct = Math.max(0, Math.min(100, value));
  const fill = tone === "accent" ? "var(--blue-400)" : tone === "inverse" ? "var(--stone-050)" : "var(--stone-950)";
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      ...style
    }
  }, rest), label || caption ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-small)",
      color: "var(--text-body)"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-data)",
      letterSpacing: "var(--tracking-mono)",
      color: "var(--text-muted)"
    }
  }, caption)) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      borderRadius: "var(--radius-pill)",
      background: tone === "inverse" ? "rgba(255,255,255,0.16)" : "var(--stone-200)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: pct + "%",
      height: "100%",
      background: fill,
      borderRadius: "var(--radius-pill)",
      transition: "width var(--dur-slow) var(--ease-out)"
    }
  })));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/data/ScoreMeter.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Lead score 0-100 rendered as a segmented bar. Soft blue = hot, stone = warm, faint = cold. */
function ScoreMeter({
  value = 0,
  segments = 10,
  label,
  showValue = true,
  size = "md",
  style,
  ...rest
}) {
  const filled = Math.round(Math.max(0, Math.min(100, value)) / 100 * segments);
  const tone = value >= 75 ? "var(--score-hot)" : value >= 45 ? "var(--score-warm)" : "var(--score-cold)";
  const h = size === "sm" ? 6 : size === "lg" ? 14 : 10;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      ...style
    }
  }, rest), label || showValue ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      gap: 8
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-label)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, label) : null, showValue ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-data)",
      letterSpacing: "var(--tracking-mono)",
      color: "var(--text-strong)"
    }
  }, Math.round(value)) : null) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 3
    }
  }, Array.from({
    length: segments
  }).map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      flex: 1,
      height: h,
      borderRadius: "var(--radius-2)",
      background: i < filled ? tone : "var(--stone-200)",
      transition: "background-color var(--dur-base) var(--ease-standard)"
    }
  }))));
}
Object.assign(__ds_scope, { ScoreMeter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ScoreMeter.jsx", error: String((e && e.message) || e) }); }

// components/data/StatCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function StatCard({
  label,
  value,
  delta,
  deltaTone = "positive",
  caption,
  tone = "default",
  style,
  ...rest
}) {
  const inverse = tone === "inverse";
  const deltaColors = {
    positive: "var(--positive-500)",
    critical: "var(--critical-500)",
    neutral: "var(--text-muted)"
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      padding: 20,
      background: inverse ? "var(--surface-inverse-raised)" : tone === "accent" ? "var(--surface-accent-soft)" : "var(--surface-card)",
      border: "1px solid " + (inverse ? "var(--border-inverse)" : tone === "accent" ? "var(--blue-200)" : "var(--border-hairline)"),
      borderRadius: "var(--radius-card)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-label)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: inverse ? "var(--text-on-inverse-muted)" : "var(--text-muted)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: "var(--weight-medium)",
      fontSize: 34,
      letterSpacing: "-0.03em",
      lineHeight: 1,
      color: inverse ? "var(--text-on-inverse)" : "var(--text-strong)"
    }
  }, value), delta ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 3,
      font: "var(--type-data)",
      letterSpacing: "var(--tracking-mono)",
      color: inverse ? "var(--blue-400)" : deltaColors[deltaTone]
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: deltaTone === "critical" ? "arrow-down-right" : "arrow-up-right",
    size: 13
  }), delta) : null), caption ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-small)",
      color: inverse ? "var(--text-on-inverse-muted)" : "var(--text-muted)"
    }
  }, caption) : null);
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Dialog({
  open = true,
  title,
  description,
  children,
  footer,
  onClose,
  width = 480,
  style,
  ...rest
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 60,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      background: "var(--scrim-flat)",
      backdropFilter: "blur(2px)"
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", _extends({
    onClick: e => e.stopPropagation(),
    role: "dialog",
    "aria-modal": "true",
    style: {
      width,
      maxWidth: "100%",
      background: "var(--surface-card)",
      borderRadius: "var(--radius-panel)",
      boxShadow: "var(--shadow-dialog)",
      padding: 28,
      display: "flex",
      flexDirection: "column",
      gap: 18,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      font: "var(--type-h3)",
      letterSpacing: "var(--tracking-heading)",
      color: "var(--text-strong)"
    }
  }, title), description ? /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-muted)"
    }
  }, description) : null), onClose ? /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "x",
    label: "Close",
    variant: "ghost",
    size: "sm",
    onClick: onClose
  }) : null), children, footer ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: 8,
      paddingTop: 4
    }
  }, footer) : null));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/EmptyState.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function EmptyState({
  icon = "inbox",
  title,
  message,
  action,
  tone = "default",
  style,
  ...rest
}) {
  const inverse = tone === "inverse";
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      padding: "56px 32px",
      textAlign: "center",
      background: inverse ? "var(--surface-inverse-raised)" : "var(--surface-card)",
      border: "1px dashed " + (inverse ? "var(--border-inverse)" : "var(--border-default)"),
      borderRadius: "var(--radius-card)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      borderRadius: "var(--radius-pill)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 4,
      background: inverse ? "rgba(255,255,255,0.08)" : "var(--surface-sunken)",
      color: inverse ? "var(--stone-400)" : "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 19
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-h4)",
      color: inverse ? "var(--text-on-inverse)" : "var(--text-strong)"
    }
  }, title), message ? /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body-small)",
      color: inverse ? "var(--text-on-inverse-muted)" : "var(--text-muted)",
      maxWidth: 340
    }
  }, message) : null, action ? /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: 8
    }
  }, action) : null);
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const toastIcons = {
  info: "info",
  positive: "check",
  warn: "alert-triangle",
  critical: "octagon-alert"
};
function Toast({
  tone = "info",
  title,
  message,
  onClose,
  action,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      gap: 12,
      alignItems: "flex-start",
      padding: "14px 16px",
      minWidth: 320,
      maxWidth: 420,
      background: "var(--surface-inverse)",
      color: "var(--text-on-inverse)",
      borderRadius: "var(--radius-card)",
      boxShadow: "var(--shadow-float)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: 1,
      color: tone === "positive" ? "var(--blue-400)" : tone === "critical" ? "#FF8A73" : tone === "warn" ? "#F0C062" : "var(--stone-400)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: toastIcons[tone],
    size: 17
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-h4)",
      fontSize: "var(--size-body-m)",
      color: "var(--text-on-inverse)"
    }
  }, title), message ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-small)",
      color: "var(--text-on-inverse-muted)"
    }
  }, message) : null, action ? /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: 6
    }
  }, action) : null), onClose ? /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "x",
    label: "Dismiss",
    variant: "inverse",
    size: "sm",
    onClick: onClose
  }) : null);
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tooltip({
  label,
  children,
  side = "top",
  style,
  ...rest
}) {
  const [show, setShow] = React.useState(false);
  const pos = {
    top: {
      bottom: "calc(100% + 8px)",
      left: "50%",
      transform: "translateX(-50%)"
    },
    bottom: {
      top: "calc(100% + 8px)",
      left: "50%",
      transform: "translateX(-50%)"
    },
    left: {
      right: "calc(100% + 8px)",
      top: "50%",
      transform: "translateY(-50%)"
    },
    right: {
      left: "calc(100% + 8px)",
      top: "50%",
      transform: "translateY(-50%)"
    }
  }[side];
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      position: "relative",
      display: "inline-flex",
      ...style
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false)
  }, rest), children, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      zIndex: 40,
      ...pos,
      pointerEvents: "none",
      opacity: show ? 1 : 0,
      transition: "opacity var(--dur-fast) var(--ease-standard)",
      background: "var(--stone-950)",
      color: "var(--stone-050)",
      padding: "6px 9px",
      borderRadius: "var(--radius-4)",
      font: "var(--type-body-small)",
      whiteSpace: "nowrap",
      boxShadow: "var(--shadow-float)"
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Checkbox({
  label,
  description,
  checked = false,
  onChange,
  disabled,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      gap: 10,
      alignItems: "flex-start",
      cursor: disabled ? "not-allowed" : "pointer",
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    checked: checked,
    onChange: onChange,
    disabled: disabled,
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      flex: "none",
      marginTop: 1,
      borderRadius: "var(--radius-4)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: checked ? "var(--stone-950)" : "var(--surface-card)",
      border: "1px solid " + (checked ? "var(--stone-950)" : hover && !disabled ? "var(--stone-500)" : "var(--border-default)"),
      color: "var(--blue-400)",
      transition: "var(--transition-control)",
      opacity: disabled ? 0.5 : 1
    }
  }, checked ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 13,
    strokeWidth: 2.5
  }) : null), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body)",
      color: disabled ? "var(--text-faint)" : "var(--text-strong)"
    }
  }, label), description ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-small)",
      color: "var(--text-muted)"
    }
  }, description) : null));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  label,
  hint,
  error,
  icon,
  suffix,
  size = "md",
  disabled,
  style,
  wrapperStyle,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const h = size === "sm" ? 34 : size === "lg" ? 48 : 40;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      ...wrapperStyle
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-label)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, label) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      height: h,
      padding: "0 12px",
      background: disabled ? "var(--stone-100)" : "var(--surface-card)",
      border: "1px solid " + (error ? "var(--critical-500)" : focus ? "var(--border-focus)" : "var(--border-default)"),
      boxShadow: focus && !error ? "0 0 0 3px rgba(11,11,11,0.06)" : "none",
      borderRadius: "var(--radius-control)",
      transition: "var(--transition-control)"
    }
  }, icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 16,
    color: "var(--text-muted)"
  }) : null, /*#__PURE__*/React.createElement("input", _extends({
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      minWidth: 0,
      border: 0,
      outline: "none",
      background: "transparent",
      font: "var(--type-body)",
      color: "var(--text-strong)",
      padding: 0,
      ...style
    }
  }, rest)), suffix ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-data)",
      letterSpacing: "var(--tracking-mono)",
      color: "var(--text-faint)"
    }
  }, suffix) : null), error ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-small)",
      color: "var(--critical-500)"
    }
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-small)",
      color: "var(--text-muted)"
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Select({
  label,
  hint,
  options = [],
  value,
  onChange,
  size = "md",
  disabled,
  wrapperStyle,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const h = size === "sm" ? 34 : size === "lg" ? 48 : 40;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      ...wrapperStyle
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-label)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, label) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      height: h,
      background: disabled ? "var(--stone-100)" : "var(--surface-card)",
      border: "1px solid " + (focus ? "var(--border-focus)" : "var(--border-default)"),
      boxShadow: focus ? "0 0 0 3px rgba(11,11,11,0.06)" : "none",
      borderRadius: "var(--radius-control)",
      transition: "var(--transition-control)"
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    value: value,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      appearance: "none",
      WebkitAppearance: "none",
      border: 0,
      outline: "none",
      background: "transparent",
      font: "var(--type-body)",
      color: "var(--text-strong)",
      padding: "0 34px 0 12px",
      height: "100%",
      width: "100%",
      cursor: disabled ? "not-allowed" : "pointer",
      ...style
    }
  }, rest), options.map(o => {
    const opt = typeof o === "string" ? {
      value: o,
      label: o
    } : o;
    return /*#__PURE__*/React.createElement("option", {
      key: opt.value,
      value: opt.value
    }, opt.label);
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: 11,
      pointerEvents: "none",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 16
  }))), hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-small)",
      color: "var(--text-muted)"
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Switch({
  label,
  checked = false,
  onChange,
  disabled,
  size = "md",
  style,
  ...rest
}) {
  const w = size === "sm" ? 34 : 44;
  const h = size === "sm" ? 20 : 26;
  const knob = h - 6;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      cursor: disabled ? "not-allowed" : "pointer",
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    checked: checked,
    onChange: onChange,
    disabled: disabled,
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    style: {
      width: w,
      height: h,
      borderRadius: "var(--radius-pill)",
      flex: "none",
      position: "relative",
      background: checked ? "var(--stone-950)" : "var(--stone-300)",
      transition: "background-color var(--dur-fast) var(--ease-standard)",
      opacity: disabled ? 0.5 : 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 3,
      left: checked ? w - knob - 3 : 3,
      width: knob,
      height: knob,
      borderRadius: "var(--radius-pill)",
      background: checked ? "var(--blue-400)" : "var(--stone-000)",
      boxShadow: "0 1px 2px rgba(11,11,11,0.2)",
      transition: "left var(--dur-fast) var(--ease-standard), background-color var(--dur-fast) var(--ease-standard)"
    }
  })), label ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body)",
      color: disabled ? "var(--text-faint)" : "var(--text-strong)"
    }
  }, label) : null);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Textarea({
  label,
  hint,
  error,
  rows = 4,
  disabled,
  counter,
  value,
  style,
  wrapperStyle,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      ...wrapperStyle
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-label)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, label) : null, /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows,
    disabled: disabled,
    value: value,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      resize: "vertical",
      padding: "10px 12px",
      font: "var(--type-body)",
      color: "var(--text-strong)",
      background: disabled ? "var(--stone-100)" : "var(--surface-card)",
      border: "1px solid " + (error ? "var(--critical-500)" : focus ? "var(--border-focus)" : "var(--border-default)"),
      boxShadow: focus && !error ? "0 0 0 3px rgba(11,11,11,0.06)" : "none",
      borderRadius: "var(--radius-control)",
      outline: "none",
      transition: "var(--transition-control)",
      ...style
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-small)",
      color: error ? "var(--critical-500)" : "var(--text-muted)"
    }
  }, error || hint), counter ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-data)",
      letterSpacing: "var(--tracking-mono)",
      color: "var(--text-faint)"
    }
  }, String(value || "").length, "/", counter) : null));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Breadcrumb.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Breadcrumb({
  items = [],
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      flexWrap: "wrap",
      ...style
    }
  }, rest), items.map((it, i) => {
    const last = i === items.length - 1;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, last ? /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--type-body-small)",
        color: "var(--text-strong)"
      }
    }, it.label) : /*#__PURE__*/React.createElement("a", {
      href: it.href || "#",
      onClick: it.onClick,
      style: {
        font: "var(--type-body-small)",
        color: "var(--text-muted)",
        textDecoration: "none"
      }
    }, it.label), !last ? /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--text-faint)",
        display: "inline-flex"
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "chevron-right",
      size: 13
    })) : null);
  }));
}
Object.assign(__ds_scope, { Breadcrumb });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Breadcrumb.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SidebarNav.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SidebarNav({
  items = [],
  value,
  onChange,
  footer,
  header,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(null);
  return /*#__PURE__*/React.createElement("nav", _extends({
    style: {
      width: "var(--sidebar-w)",
      flex: "none",
      display: "flex",
      flexDirection: "column",
      background: "var(--surface-inverse)",
      borderRight: "1px solid var(--border-inverse)",
      padding: "20px 12px",
      gap: 24,
      ...style
    }
  }, rest), header, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2,
      flex: 1
    }
  }, items.map(it => {
    if (it.section) return /*#__PURE__*/React.createElement("span", {
      key: it.section,
      style: {
        font: "var(--type-label)",
        letterSpacing: "var(--tracking-label)",
        textTransform: "uppercase",
        color: "var(--stone-600)",
        padding: "16px 10px 6px"
      }
    }, it.section);
    const on = it.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: it.value,
      type: "button",
      onClick: () => onChange && onChange(it.value),
      onMouseEnter: () => setHover(it.value),
      onMouseLeave: () => setHover(null),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "9px 10px",
        border: 0,
        cursor: "pointer",
        borderRadius: "var(--radius-control)",
        font: "var(--type-ui)",
        textAlign: "left",
        background: on ? "rgba(255,255,255,0.10)" : hover === it.value ? "rgba(255,255,255,0.05)" : "transparent",
        color: on ? "var(--stone-050)" : "var(--stone-400)",
        transition: "var(--transition-control)"
      }
    }, it.icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: it.icon,
      size: 17,
      color: on ? "var(--blue-400)" : "currentColor"
    }) : null, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, it.label), it.count != null ? /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--type-data)",
        letterSpacing: "var(--tracking-mono)",
        color: on ? "var(--blue-400)" : "var(--stone-600)"
      }
    }, it.count) : null);
  })), footer);
}
Object.assign(__ds_scope, { SidebarNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SidebarNav.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tabs({
  items = [],
  value,
  onChange,
  variant = "underline",
  style,
  ...rest
}) {
  const active = value ?? (items[0] && (items[0].value ?? items[0]));
  const norm = items.map(i => typeof i === "string" ? {
    value: i,
    label: i
  } : i);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      gap: variant === "underline" ? 24 : 4,
      borderBottom: variant === "underline" ? "1px solid var(--border-hairline)" : "none",
      background: variant === "segmented" ? "var(--surface-sunken)" : "transparent",
      padding: variant === "segmented" ? 3 : 0,
      borderRadius: variant === "segmented" ? "var(--radius-control)" : 0,
      ...style
    }
  }, rest), norm.map(t => {
    const on = t.value === active;
    return /*#__PURE__*/React.createElement("button", {
      key: t.value,
      type: "button",
      onClick: () => onChange && onChange(t.value),
      style: {
        border: 0,
        cursor: "pointer",
        font: "var(--type-ui)",
        letterSpacing: "-0.01em",
        transition: "var(--transition-control)",
        ...(variant === "underline" ? {
          background: "transparent",
          color: on ? "var(--text-strong)" : "var(--text-muted)",
          padding: "0 0 12px",
          borderBottom: "2px solid " + (on ? "var(--stone-950)" : "transparent"),
          marginBottom: -1
        } : {
          background: on ? "var(--surface-card)" : "transparent",
          color: on ? "var(--text-strong)" : "var(--text-muted)",
          padding: "7px 14px",
          borderRadius: "var(--radius-4)",
          boxShadow: on ? "var(--shadow-raised)" : "none"
        })
      }
    }, t.label, t.count != null ? /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--type-data)",
        letterSpacing: "var(--tracking-mono)",
        color: "var(--text-faint)",
        marginLeft: 7
      }
    }, t.count) : null);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/AppShell.jsx
try { (() => {
const DSA = () => window.CaLeadDesignSystem_0ab86f;
const LEADS = [{
  id: 1,
  company: "Acme Robotics",
  domain: "acmerobotics.com",
  contact: "Marina Alves",
  role: "Head of Sales",
  fit: 92,
  stage: "New",
  signal: "Opened São Paulo plant",
  owner: "You",
  synced: "14:02"
}, {
  id: 2,
  company: "Northwind Logistics",
  domain: "northwind.co",
  contact: "Diego Prado",
  role: "VP Sales",
  fit: 84,
  stage: "Contacted",
  signal: "Hiring 3 SDRs",
  owner: "R. Lima",
  synced: "13:47"
}, {
  id: 3,
  company: "Vela Health",
  domain: "velahealth.io",
  contact: "Ana Ribeiro",
  role: "Head of Growth",
  fit: 71,
  stage: "New",
  signal: "Series A announced",
  owner: "You",
  synced: "13:20"
}, {
  id: 4,
  company: "Corvo Fintech",
  domain: "corvo.finance",
  contact: "Bruno Sá",
  role: "CRO",
  fit: 64,
  stage: "Contacted",
  signal: "New pricing page",
  owner: "M. Costa",
  synced: "12:58"
}, {
  id: 5,
  company: "Tidal Grid",
  domain: "tidalgrid.energy",
  contact: "Helena Duarte",
  role: "Director, Revenue",
  fit: 48,
  stage: "Nurture",
  signal: "Blog cadence up",
  owner: "You",
  synced: "12:31"
}, {
  id: 6,
  company: "Palma Retail",
  domain: "palma.store",
  contact: "Caio Menezes",
  role: "Head of Ops",
  fit: 31,
  stage: "Nurture",
  signal: "No CRM detected",
  owner: "R. Lima",
  synced: "11:44"
}];
function AppShell({
  page,
  onNavigate,
  children
}) {
  const {
    SidebarNav,
    Avatar
  } = DSA();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      height: "100vh",
      overflow: "hidden",
      background: "var(--surface-page)"
    }
  }, /*#__PURE__*/React.createElement(SidebarNav, {
    value: page,
    onChange: onNavigate,
    header: /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "4px 10px 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 500,
        fontSize: 20,
        letterSpacing: "-0.035em",
        color: "var(--stone-050)"
      }
    }, "CaLead"), /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--type-data)",
        letterSpacing: "var(--tracking-mono)",
        color: "var(--stone-600)"
      }
    }, "v3")),
    items: [{
      section: "Pipeline"
    }, {
      value: "leads",
      label: "Leads",
      icon: "target",
      count: 1284
    }, {
      value: "queue",
      label: "Ice breakers",
      icon: "message-square-quote",
      count: 12
    }, {
      value: "accounts",
      label: "Accounts",
      icon: "building-2"
    }, {
      section: "Setup"
    }, {
      value: "icp",
      label: "ICP criteria",
      icon: "sliders-horizontal"
    }, {
      value: "sources",
      label: "Sources",
      icon: "scan-line"
    }],
    footer: /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: "1px solid var(--border-inverse)",
        paddingTop: 14,
        display: "flex",
        gap: 10,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: "Rafael Lima",
      size: "sm",
      tone: "accent"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        font: "var(--type-ui)",
        color: "var(--stone-050)"
      }
    }, "Rafael Lima"), /*#__PURE__*/React.createElement("div", {
      style: {
        font: "var(--type-body-small)",
        color: "var(--stone-600)"
      }
    }, "Acme SDR team")))
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      overflow: "auto"
    }
  }, children));
}
function TopBar({
  title,
  subtitle,
  actions,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 20,
      background: "var(--glass-panel)",
      backdropFilter: "var(--blur-panel)",
      WebkitBackdropFilter: "var(--blur-panel)",
      borderBottom: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 32px 0",
      display: "flex",
      alignItems: "flex-start",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      font: "var(--type-h2)",
      letterSpacing: "var(--tracking-heading)"
    }
  }, title), subtitle ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-small)",
      color: "var(--text-muted)"
    }
  }, subtitle) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      alignItems: "center"
    }
  }, actions)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 32px 0"
    }
  }, children));
}
Object.assign(window, {
  AppShell,
  TopBar,
  LEADS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/AppShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/IcpScreen.jsx
try { (() => {
const DSI = () => window.CaLeadDesignSystem_0ab86f;
function IcpScreen({
  onToast
}) {
  const {
    Button,
    Card,
    Input,
    Select,
    Checkbox,
    Switch,
    Tag,
    Badge,
    ScoreMeter,
    Dialog,
    EmptyState
  } = DSI();
  const [confirm, setConfirm] = React.useState(false);
  const [auto, setAuto] = React.useState(true);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(window.TopBar, {
    title: "ICP criteria",
    subtitle: "Applied to every scrape \xB7 model ICP fit v3",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      icon: "history"
    }, "Version history"), /*#__PURE__*/React.createElement(Button, {
      variant: "accent",
      icon: "check",
      onClick: () => setConfirm(true)
    }, "Save and re-score"))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "24px 32px 48px",
      display: "grid",
      gridTemplateColumns: "1fr 340px",
      gap: 20,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: 28,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ca-mono-label"
  }, "Firmographics"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Select, {
    label: "Funding stage",
    options: ["Series B or later", "Series A or later", "Any"]
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Headcount",
    options: ["50–500", "10–50", "500+"]
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Regions",
    defaultValue: "Brazil, Mexico, Chile",
    icon: "map-pin"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Minimum fit to surface",
    defaultValue: "45",
    suffix: "of 100"
  }))), /*#__PURE__*/React.createElement(Card, {
    padding: 28,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ca-mono-label"
  }, "Signals to weight"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    checked: true,
    label: "Hiring SDRs or AEs",
    description: "Careers page and LinkedIn jobs."
  }), /*#__PURE__*/React.createElement(Checkbox, {
    checked: true,
    label: "Recent funding",
    description: "Last 12 months."
  }), /*#__PURE__*/React.createElement(Checkbox, {
    checked: true,
    label: "Publishes product updates",
    description: "Changelog or blog cadence."
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Existing outbound tooling",
    description: "Detected from site scripts."
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Conference presence"
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Multi-region footprint"
  })), /*#__PURE__*/React.createElement("hr", {
    className: "ca-hairline"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    selected: true,
    icon: "check"
  }, "Warehouse automation"), /*#__PURE__*/React.createElement(Tag, {
    onRemove: () => {}
  }, "Logistics SaaS"), /*#__PURE__*/React.createElement(Tag, {
    onRemove: () => {}
  }, "Fintech infra"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    icon: "plus"
  }, "Add industry"))), /*#__PURE__*/React.createElement(Card, {
    padding: 28,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ca-mono-label"
  }, "Automation"), /*#__PURE__*/React.createElement(Switch, {
    label: "Auto-enrich new leads nightly",
    checked: auto,
    onChange: () => setAuto(!auto)
  }), /*#__PURE__*/React.createElement(Switch, {
    label: "Post hot leads to #outbound in Slack",
    checked: true
  }), /*#__PURE__*/React.createElement(Switch, {
    label: "Generate ice breakers automatically"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: 24,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ca-mono-label"
  }, "Preview against 1,284 leads"), /*#__PURE__*/React.createElement(ScoreMeter, {
    label: "Median fit",
    value: 68,
    segments: 12
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "hot"
  }, "96 hot"), /*#__PURE__*/React.createElement(Badge, {
    tone: "warm"
  }, "418 warm"), /*#__PURE__*/React.createElement(Badge, {
    tone: "cold"
  }, "770 cold")), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body-small)",
      color: "var(--text-muted)"
    }
  }, "Saving re-scores the whole list. Existing ice breakers stay attached.")), /*#__PURE__*/React.createElement(EmptyState, {
    icon: "flask-conical",
    title: "No A/B test running",
    message: "Duplicate this model to compare two scoring definitions on the same list.",
    action: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "secondary"
    }, "Duplicate model")
  }))), /*#__PURE__*/React.createElement(Dialog, {
    open: confirm,
    title: "Re-score 1,284 leads?",
    description: "This uses 1 credit per lead and replaces current fit scores.",
    onClose: () => setConfirm(false),
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: () => setConfirm(false)
    }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
      variant: "accent",
      onClick: () => {
        setConfirm(false);
        onToast({
          tone: "positive",
          title: "Re-scoring started",
          message: "1,284 leads queued."
        });
      }
    }, "Re-score now"))
  }));
}
Object.assign(window, {
  IcpScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/IcpScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/LeadDetailScreen.jsx
try { (() => {
const DSD = () => window.CaLeadDesignSystem_0ab86f;
function LeadDetailScreen({
  lead,
  onBack,
  onToast
}) {
  const {
    Button,
    IconButton,
    Badge,
    Card,
    Avatar,
    ScoreMeter,
    Breadcrumb,
    Textarea,
    Tabs,
    Icon,
    ProgressBar
  } = DSD();
  const [draft, setDraft] = React.useState(`Saw ${lead.company} ${lead.signal.toLowerCase()} — how is that changing the way your team handles inbound?`);
  const [tab, setTab] = React.useState("context");
  const criteria = [["Funding stage matches", "+24", "positive"], ["Hiring 3 SDRs in São Paulo", "+18", "positive"], ["Headcount 50–500", "+12", "positive"], ["Uses HubSpot", "+8", "positive"], ["No outbound tooling detected", "−6", "warn"]];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(window.TopBar, {
    title: lead.company,
    subtitle: `${lead.domain} · owner ${lead.owner} · synced ${lead.synced}`,
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IconButton, {
      icon: "arrow-left",
      label: "Back to leads",
      variant: "ghost",
      onClick: onBack
    }), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      icon: "refresh-cw",
      onClick: () => onToast({
        tone: "positive",
        title: "Re-scraping acmerobotics.com",
        message: "Context will refresh in under a minute."
      })
    }, "Re-scrape"), /*#__PURE__*/React.createElement(Button, {
      variant: "accent",
      icon: "send",
      onClick: () => onToast({
        tone: "positive",
        title: "Ice breaker sent",
        message: `Logged against ${lead.contact}.`
      })
    }, "Send opener"))
  }, /*#__PURE__*/React.createElement(Tabs, {
    items: [{
      value: "context",
      label: "Context"
    }, {
      value: "scoring",
      label: "Scoring"
    }, {
      value: "activity",
      label: "Activity"
    }],
    value: tab,
    onChange: setTab
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "24px 32px 48px",
      display: "grid",
      gridTemplateColumns: "1.35fr 0.65fr",
      gap: 20,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: 24,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ca-mono-label"
  }, "Generated ice breaker"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Badge, {
    tone: "info"
  }, "Draft v3")), /*#__PURE__*/React.createElement(Textarea, {
    rows: 3,
    counter: 280,
    value: draft,
    onChange: e => setDraft(e.target.value)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "primary",
    icon: "send"
  }, "Send via Gmail"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "secondary",
    icon: "refresh-cw",
    onClick: () => setDraft(`Noticed ${lead.company} is ${lead.signal.toLowerCase()} — is the SDR team taking that on directly?`)
  }, "Regenerate"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost",
    icon: "copy"
  }, "Copy"))), /*#__PURE__*/React.createElement(Card, {
    padding: 24,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ca-mono-label"
  }, "Scraped context"), [["globe", "Website", "Robotics integrator for warehouse automation. Opened a São Paulo plant in July; 4 open roles on the careers page, three of them SDR."], ["linkedin", "LinkedIn — last 90 days", "Marina posted twice about hiring outbound reps and once about the plant opening. 41 reactions on the plant post."], ["newspaper", "News", "Series B ($28M) led by Kepler Ventures, announced 12 June."]].map(([icon, label, body]) => /*#__PURE__*/React.createElement("div", {
    key: label,
    style: {
      display: "flex",
      gap: 12,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)",
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 17
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-h4)",
      fontSize: "var(--size-body-m)",
      color: "var(--text-strong)"
    }
  }, label), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body-small)",
      color: "var(--text-muted)",
      maxWidth: 640
    }
  }, body)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: 24,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: lead.contact,
    size: "md"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-h4)",
      color: "var(--text-strong)"
    }
  }, lead.contact), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-body-small)",
      color: "var(--text-muted)"
    }
  }, lead.role)), /*#__PURE__*/React.createElement(Badge, {
    tone: lead.fit >= 75 ? "hot" : lead.fit >= 45 ? "warm" : "cold"
  }, lead.fit)), /*#__PURE__*/React.createElement(ScoreMeter, {
    label: "ICP fit",
    value: lead.fit,
    segments: 12
  }), /*#__PURE__*/React.createElement("hr", {
    className: "ca-hairline"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, criteria.map(([label, delta, tone]) => /*#__PURE__*/React.createElement("div", {
    key: label,
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: tone
  }, delta), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-small)",
      color: "var(--text-body)"
    }
  }, label))))), /*#__PURE__*/React.createElement(Card, {
    padding: 24,
    tone: "sunken",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ca-mono-label"
  }, "Enrichment run"), /*#__PURE__*/React.createElement(ProgressBar, {
    label: "Sources read",
    caption: "7 / 7",
    value: 100
  }), /*#__PURE__*/React.createElement(ProgressBar, {
    label: "Credits this month",
    caption: "412 / 500",
    value: 82
  })))));
}
Object.assign(window, {
  LeadDetailScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/LeadDetailScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/LeadsScreen.jsx
try { (() => {
const DSL = () => window.CaLeadDesignSystem_0ab86f;
function LeadsScreen({
  onOpen,
  onToast
}) {
  const {
    Button,
    IconButton,
    Badge,
    Tag,
    DataTable,
    ScoreMeter,
    StatCard,
    Tabs,
    Input,
    Tooltip
  } = DSL();
  const [tab, setTab] = React.useState("all");
  const [query, setQuery] = React.useState("");
  const rows = window.LEADS.filter(l => tab === "all" || (tab === "hot" ? l.fit >= 75 : l.stage === "New")).filter(l => l.company.toLowerCase().includes(query.toLowerCase()) || l.contact.toLowerCase().includes(query.toLowerCase()));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(window.TopBar, {
    title: "Leads",
    subtitle: "1,284 records \xB7 nightly enrichment finished 14:02",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Tooltip, {
      label: "Re-run enrichment"
    }, /*#__PURE__*/React.createElement(IconButton, {
      icon: "refresh-cw",
      label: "Re-run enrichment",
      onClick: () => onToast({
        tone: "positive",
        title: "Enrichment queued",
        message: "6 records will refresh in about 2 minutes."
      })
    })), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      icon: "upload"
    }, "Import CSV"), /*#__PURE__*/React.createElement(Button, {
      variant: "accent",
      icon: "sparkles",
      onClick: () => onToast({
        tone: "positive",
        title: "12 ice breakers generated",
        message: "Ready in the queue."
      })
    }, "Generate ice breakers"))
  }, /*#__PURE__*/React.createElement(Tabs, {
    items: [{
      value: "all",
      label: "All leads",
      count: 1284
    }, {
      value: "hot",
      label: "Hot",
      count: 96
    }, {
      value: "new",
      label: "Unworked",
      count: 214
    }],
    value: tab,
    onChange: setTab
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "24px 32px 40px",
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    label: "Qualified this week",
    value: "284",
    delta: "+18%",
    caption: "vs. last week"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Hot leads waiting",
    value: "96",
    caption: "fit \u2265 75",
    tone: "accent"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Reply rate",
    value: "34%",
    delta: "+9%",
    caption: "ice breaker sends"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Credits left",
    value: "412",
    caption: "of 500 this month"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    icon: "search",
    placeholder: "Search company or contact",
    value: query,
    onChange: e => setQuery(e.target.value),
    size: "sm",
    wrapperStyle: {
      width: 280
    }
  }), /*#__PURE__*/React.createElement(Tag, {
    icon: "filter",
    selected: true
  }, "Series B+"), /*#__PURE__*/React.createElement(Tag, {
    onRemove: () => {}
  }, "Hiring SDRs"), /*#__PURE__*/React.createElement(Tag, {
    onRemove: () => {}
  }, "LATAM"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    icon: "plus"
  }, "Add criterion"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-data)",
      letterSpacing: "var(--tracking-mono)",
      color: "var(--text-faint)"
    }
  }, rows.length, " SHOWN")), /*#__PURE__*/React.createElement(DataTable, {
    rows: rows,
    onRowClick: onOpen,
    columns: [{
      key: "company",
      header: "Company",
      render: r => /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          flexDirection: "column"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          font: "var(--type-ui)",
          color: "var(--text-strong)"
        }
      }, r.company), /*#__PURE__*/React.createElement("span", {
        style: {
          font: "var(--type-body-small)",
          color: "var(--text-muted)"
        }
      }, r.domain))
    }, {
      key: "contact",
      header: "Contact",
      width: "20%",
      render: r => /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          flexDirection: "column"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          color: "var(--text-strong)"
        }
      }, r.contact), /*#__PURE__*/React.createElement("span", {
        style: {
          font: "var(--type-body-small)",
          color: "var(--text-muted)"
        }
      }, r.role))
    }, {
      key: "signal",
      header: "Latest signal",
      width: "22%",
      render: r => /*#__PURE__*/React.createElement("span", {
        style: {
          font: "var(--type-body-small)",
          color: "var(--text-body)"
        }
      }, r.signal)
    }, {
      key: "fit",
      header: "ICP fit",
      width: "150px",
      render: r => /*#__PURE__*/React.createElement(ScoreMeter, {
        value: r.fit,
        segments: 8,
        size: "sm",
        showValue: false
      })
    }, {
      key: "score",
      header: "Score",
      width: "100px",
      align: "right",
      render: r => /*#__PURE__*/React.createElement(Badge, {
        tone: r.fit >= 75 ? "hot" : r.fit >= 45 ? "warm" : "cold"
      }, r.fit)
    }, {
      key: "synced",
      header: "Synced",
      width: "92px",
      align: "right",
      render: r => /*#__PURE__*/React.createElement("span", {
        style: {
          font: "var(--type-data)",
          letterSpacing: "var(--tracking-mono)",
          color: "var(--text-faint)"
        }
      }, r.synced)
    }]
  })));
}
Object.assign(window, {
  LeadsScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/LeadsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/QueueScreen.jsx
try { (() => {
const DSQ = () => window.CaLeadDesignSystem_0ab86f;
function QueueScreen({
  onToast
}) {
  const {
    Button,
    Card,
    Badge,
    Avatar,
    ScoreMeter,
    IconButton,
    Tabs,
    EmptyState
  } = DSQ();
  const [items, setItems] = React.useState(window.LEADS.filter(l => l.fit >= 60));
  const approve = id => {
    setItems(items.filter(i => i.id !== id));
    onToast({
      tone: "positive",
      title: "Opener approved",
      message: "Queued for the 09:00 send window."
    });
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(window.TopBar, {
    title: "Ice breakers",
    subtitle: "Drafts waiting on approval before the next send window",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      icon: "settings-2"
    }, "Send windows"), /*#__PURE__*/React.createElement(Button, {
      variant: "accent",
      icon: "check-check",
      onClick: () => {
        setItems([]);
        onToast({
          tone: "positive",
          title: "All drafts approved",
          message: "4 openers queued."
        });
      }
    }, "Approve all"))
  }, /*#__PURE__*/React.createElement(Tabs, {
    items: [{
      value: "pending",
      label: "Pending",
      count: items.length
    }, {
      value: "sent",
      label: "Sent",
      count: 128
    }],
    value: "pending",
    onChange: () => {}
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "24px 32px 48px",
      display: "flex",
      flexDirection: "column",
      gap: 14,
      maxWidth: 960
    }
  }, items.length === 0 ? /*#__PURE__*/React.createElement(EmptyState, {
    icon: "inbox",
    title: "Queue is clear",
    message: "New drafts appear after each nightly enrichment run."
  }) : items.map(l => /*#__PURE__*/React.createElement(Card, {
    key: l.id,
    padding: 20,
    style: {
      display: "grid",
      gridTemplateColumns: "220px 1fr 130px",
      gap: 20,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: l.contact,
    size: "sm"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-ui)",
      color: "var(--text-strong)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, l.contact), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-body-small)",
      color: "var(--text-muted)"
    }
  }, l.company))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-strong)"
    }
  }, "Saw ", l.company, " ", l.signal.toLowerCase(), " \u2014 how is that changing the way your team handles inbound?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral",
    uppercase: false
  }, l.signal), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-data)",
      letterSpacing: "var(--tracking-mono)",
      color: "var(--text-faint)"
    }
  }, "SYNCED ", l.synced))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      alignItems: "flex-end"
    }
  }, /*#__PURE__*/React.createElement(ScoreMeter, {
    value: l.fit,
    segments: 6,
    size: "sm",
    style: {
      width: 110
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "pencil",
    label: "Edit draft",
    variant: "ghost",
    size: "sm"
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "check",
    label: "Approve",
    variant: "solid",
    size: "sm",
    onClick: () => approve(l.id)
  })))))));
}
Object.assign(window, {
  QueueScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/QueueScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mobile/MobileChrome.jsx
try { (() => {
const DSM = () => window.CaLeadDesignSystem_0ab86f;
function PhoneFrame({
  children,
  label
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 375,
      height: 760,
      background: "var(--surface-page)",
      borderRadius: 38,
      border: "1px solid var(--border-default)",
      boxShadow: "var(--shadow-float)",
      overflow: "hidden",
      position: "relative",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44,
      flex: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 22px",
      font: "var(--type-data)",
      letterSpacing: "var(--tracking-mono)",
      color: "var(--text-strong)",
      background: "var(--surface-page)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "9:41"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: 6,
      opacity: 0.8
    }
  }, "LTE \u25AA\u25AA\u25AA 82%")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: "auto"
    }
  }, children)), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-label)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, label));
}
function MobileTabBar({
  value,
  onChange
}) {
  const {
    Icon
  } = DSM();
  const tabs = [["today", "Today", "sun"], ["leads", "Leads", "target"], ["queue", "Openers", "message-square-quote"], ["me", "Me", "user"]];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      bottom: 0,
      display: "flex",
      background: "var(--surface-inverse)",
      borderTop: "1px solid var(--border-inverse)",
      padding: "10px 8px 18px"
    }
  }, tabs.map(([k, label, icon]) => {
    const on = k === value;
    return /*#__PURE__*/React.createElement("button", {
      key: k,
      type: "button",
      onClick: () => onChange(k),
      style: {
        flex: 1,
        minHeight: 48,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        background: "none",
        border: 0,
        cursor: "pointer",
        color: on ? "var(--stone-050)" : "var(--stone-600)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: icon,
      size: 20,
      color: on ? "var(--blue-400)" : "currentColor"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--type-label)",
        letterSpacing: "0.02em"
      }
    }, label));
  }));
}
function MobileHeader({
  title,
  right
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 20px 14px",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: 12,
      borderBottom: "1px solid var(--border-hairline)",
      background: "var(--surface-page)"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      font: "var(--weight-medium) 26px/1.15 var(--font-display)",
      letterSpacing: "-0.03em"
    }
  }, title), right);
}
Object.assign(window, {
  PhoneFrame,
  MobileTabBar,
  MobileHeader
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mobile/MobileChrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mobile/MobileScreens.jsx
try { (() => {
const DSMS = () => window.CaLeadDesignSystem_0ab86f;
const MLEADS = [{
  id: 1,
  company: "Acme Robotics",
  contact: "Marina Alves",
  role: "Head of Sales",
  fit: 92,
  signal: "Opened São Paulo plant"
}, {
  id: 2,
  company: "Northwind Logistics",
  contact: "Diego Prado",
  role: "VP Sales",
  fit: 84,
  signal: "Hiring 3 SDRs"
}, {
  id: 3,
  company: "Vela Health",
  contact: "Ana Ribeiro",
  role: "Head of Growth",
  fit: 71,
  signal: "Series A announced"
}, {
  id: 4,
  company: "Corvo Fintech",
  contact: "Bruno Sá",
  role: "CRO",
  fit: 64,
  signal: "New pricing page"
}, {
  id: 5,
  company: "Tidal Grid",
  contact: "Helena Duarte",
  role: "Director, Revenue",
  fit: 48,
  signal: "Blog cadence up"
}];
function MobileToday({
  onOpen
}) {
  const {
    StatCard,
    Card,
    Badge,
    ScoreMeter,
    Button,
    Avatar
  } = DSMS();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement(window.MobileHeader, {
    title: "Today",
    right: /*#__PURE__*/React.createElement(Avatar, {
      name: "Rafael Lima",
      size: "sm",
      tone: "accent"
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 20px 24px",
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    label: "Hot waiting",
    value: "12",
    tone: "accent",
    caption: "fit \u2265 75"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Openers due",
    value: "4",
    caption: "before 09:00"
  })), /*#__PURE__*/React.createElement("span", {
    className: "ca-mono-label"
  }, "Work these first"), MLEADS.slice(0, 3).map(l => /*#__PURE__*/React.createElement(Card, {
    key: l.id,
    padding: 16,
    interactive: true,
    onClick: () => onOpen(l),
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: l.contact,
    size: "sm"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-ui)",
      color: "var(--text-strong)"
    }
  }, l.company), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-body-small)",
      color: "var(--text-muted)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, l.contact, " \xB7 ", l.role)), /*#__PURE__*/React.createElement(Badge, {
    tone: l.fit >= 75 ? "hot" : "warm"
  }, l.fit)), /*#__PURE__*/React.createElement(ScoreMeter, {
    value: l.fit,
    segments: 8,
    size: "sm",
    showValue: false
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-small)",
      color: "var(--text-body)"
    }
  }, l.signal))), /*#__PURE__*/React.createElement(Button, {
    block: true,
    variant: "secondary",
    iconRight: "arrow-right"
  }, "See all 1,284 leads")));
}
function MobileLeads({
  onOpen
}) {
  const {
    Card,
    Badge,
    Input,
    Tag,
    ScoreMeter,
    Avatar
  } = DSMS();
  const [q, setQ] = React.useState("");
  const rows = MLEADS.filter(l => l.company.toLowerCase().includes(q.toLowerCase()));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(window.MobileHeader, {
    title: "Leads"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "14px 20px 24px",
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Input, {
    icon: "search",
    size: "sm",
    placeholder: "Search",
    value: q,
    onChange: e => setQ(e.target.value)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      overflowX: "auto",
      paddingBottom: 2
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    selected: true,
    icon: "check"
  }, "Hot"), /*#__PURE__*/React.createElement(Tag, null, "Unworked"), /*#__PURE__*/React.createElement(Tag, null, "Series B+"), /*#__PURE__*/React.createElement(Tag, null, "LATAM")), rows.map(l => /*#__PURE__*/React.createElement(Card, {
    key: l.id,
    padding: 14,
    interactive: true,
    onClick: () => onOpen(l),
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: l.contact,
    size: "sm"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-ui)",
      color: "var(--text-strong)"
    }
  }, l.company), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-body-small)",
      color: "var(--text-muted)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, l.signal), /*#__PURE__*/React.createElement(ScoreMeter, {
    value: l.fit,
    segments: 8,
    size: "sm",
    showValue: false,
    style: {
      marginTop: 8
    }
  })), /*#__PURE__*/React.createElement(Badge, {
    tone: l.fit >= 75 ? "hot" : l.fit >= 45 ? "warm" : "cold"
  }, l.fit)))));
}
function MobileLeadDetail({
  lead,
  onBack,
  onToast
}) {
  const {
    Card,
    Badge,
    Button,
    IconButton,
    ScoreMeter,
    Avatar,
    Icon,
    Textarea
  } = DSMS();
  const [draft, setDraft] = React.useState(`Saw ${lead.company} ${lead.signal.toLowerCase()} — how is that changing inbound for your team?`);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 16px 14px",
      display: "flex",
      alignItems: "center",
      gap: 8,
      borderBottom: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "arrow-left",
    label: "Back",
    variant: "ghost",
    size: "sm",
    onClick: onBack
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-ui)",
      color: "var(--text-strong)",
      flex: 1
    }
  }, lead.company), /*#__PURE__*/React.createElement(Badge, {
    tone: lead.fit >= 75 ? "hot" : "warm"
  }, lead.fit)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 20px 28px",
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: 16,
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: lead.contact,
    size: "md"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-h4)"
    }
  }, lead.contact), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-body-small)",
      color: "var(--text-muted)"
    }
  }, lead.role))), /*#__PURE__*/React.createElement(Card, {
    padding: 16
  }, /*#__PURE__*/React.createElement(ScoreMeter, {
    label: "ICP fit",
    value: lead.fit,
    segments: 10
  })), /*#__PURE__*/React.createElement(Card, {
    padding: 16,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ca-mono-label"
  }, "Ice breaker"), /*#__PURE__*/React.createElement(Textarea, {
    rows: 3,
    counter: 280,
    value: draft,
    onChange: e => setDraft(e.target.value)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "accent",
    icon: "send",
    onClick: () => onToast({
      tone: "positive",
      title: "Opener sent"
    })
  }, "Send"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "secondary",
    icon: "refresh-cw"
  }, "Redo"))), /*#__PURE__*/React.createElement(Card, {
    padding: 16,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ca-mono-label"
  }, "Scraped context"), [["globe", "Robotics integrator; new São Paulo plant, 4 open roles."], ["linkedin", "Marina posted twice about hiring outbound reps."], ["newspaper", "Series B ($28M), 12 June."]].map(([i, t]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)",
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: i,
    size: 16
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-small)",
      color: "var(--text-body)"
    }
  }, t))))));
}
function MobileQueue({
  onToast
}) {
  const {
    Card,
    Button,
    Badge,
    Avatar,
    EmptyState
  } = DSMS();
  const [items, setItems] = React.useState(MLEADS.slice(0, 4));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(window.MobileHeader, {
    title: "Openers",
    right: /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--type-data)",
        letterSpacing: "var(--tracking-mono)",
        color: "var(--text-muted)"
      }
    }, items.length, " PENDING")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 20px 24px",
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, items.length === 0 ? /*#__PURE__*/React.createElement(EmptyState, {
    icon: "inbox",
    title: "Queue is clear",
    message: "New drafts land after tonight's run."
  }) : items.map(l => /*#__PURE__*/React.createElement(Card, {
    key: l.id,
    padding: 16,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: l.contact,
    size: "xs"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-ui)",
      color: "var(--text-strong)",
      flex: 1
    }
  }, l.contact), /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral"
  }, l.company.split(" ")[0])), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body-small)",
      color: "var(--text-body)"
    }
  }, "Saw ", l.company, " ", l.signal.toLowerCase(), " \u2014 how is that changing inbound?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "primary",
    block: true,
    icon: "check",
    onClick: () => {
      setItems(items.filter(i => i.id !== l.id));
      onToast({
        tone: "positive",
        title: "Approved"
      });
    }
  }, "Approve"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost",
    icon: "pencil"
  }, "Edit"))))));
}
Object.assign(window, {
  MobileToday,
  MobileLeads,
  MobileLeadDetail,
  MobileQueue,
  MLEADS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mobile/MobileScreens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Hero.jsx
try { (() => {
const CAH = window.CaLeadDesignSystem_0ab86f;
function LeadPreviewPanel() {
  const {
    Badge,
    ScoreMeter,
    Avatar,
    Button,
    Icon
  } = CAH;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      borderRadius: "var(--radius-panel)",
      boxShadow: "var(--shadow-dialog)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "12px 16px",
      borderBottom: "1px solid var(--border-hairline)",
      background: "var(--surface-sunken)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "target",
    size: 15,
    color: "var(--text-muted)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-label)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      flex: 1
    }
  }, "Lead context"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-data)",
      letterSpacing: "var(--tracking-mono)",
      color: "var(--text-faint)"
    }
  }, "SYNCED 14:02")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Marina Alves",
    size: "md"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-h4)",
      color: "var(--text-strong)"
    }
  }, "Marina Alves"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-body-small)",
      color: "var(--text-muted)"
    }
  }, "Head of Sales \xB7 Acme Robotics")), /*#__PURE__*/React.createElement(Badge, {
    tone: "hot"
  }, "Hot 92")), /*#__PURE__*/React.createElement(ScoreMeter, {
    label: "ICP fit",
    value: 92,
    segments: 12
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-label)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, "Generated ice breaker"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-strong)",
      background: "var(--surface-accent-soft)",
      border: "1px solid var(--blue-200)",
      borderRadius: "var(--radius-card)",
      padding: 14
    }
  }, "Saw Acme opened the S\xE3o Paulo plant last month \u2014 how is the new line changing how your team handles inbound?")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "accent",
    icon: "send"
  }, "Send"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "secondary",
    icon: "refresh-cw"
  }, "Regenerate"))));
}
function Hero({
  onNavigate
}) {
  const {
    Button,
    Badge
  } = CAH;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--surface-inverse)",
      padding: "96px 32px 120px",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      backgroundImage: "linear-gradient(var(--border-inverse) 1px, transparent 1px), linear-gradient(90deg, var(--border-inverse) 1px, transparent 1px)",
      backgroundSize: "80px 80px",
      opacity: 0.5,
      maskImage: "radial-gradient(120% 90% at 30% 0%, #000 20%, transparent 75%)",
      WebkitMaskImage: "radial-gradient(120% 90% at 30% 0%, #000 20%, transparent 75%)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      maxWidth: "var(--page-max)",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "1.05fr 0.95fr",
      gap: 72,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 26
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "inverse",
    style: {
      alignSelf: "flex-start"
    }
  }, "For SDR teams"), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: "var(--type-hero)",
      letterSpacing: "var(--tracking-display)",
      color: "var(--stone-050)",
      maxWidth: 620
    }
  }, "Every lead arrives", /*#__PURE__*/React.createElement("br", null), "already qualified"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body-lead)",
      color: "var(--stone-400)",
      maxWidth: 520
    }
  }, "CaLead reads the company website and the contact's LinkedIn, scores the fit against your criteria, and writes the opener your rep uses on the first touch."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "lg",
    iconRight: "arrow-up-right",
    onClick: () => onNavigate("pricing")
  }, "Book a demo"), /*#__PURE__*/React.createElement(Button, {
    variant: "outlineInverse",
    size: "lg",
    onClick: () => onNavigate("how")
  }, "See how it works")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 32,
      paddingTop: 8
    }
  }, [["34%", "reply rate"], ["6.5×", "faster research"], ["1,284", "leads scored daily"]].map(([v, l]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 500,
      fontSize: 28,
      letterSpacing: "-0.03em",
      color: "var(--blue-400)"
    }
  }, v), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-small)",
      color: "var(--stone-500)"
    }
  }, l))))), /*#__PURE__*/React.createElement(LeadPreviewPanel, null)));
}
Object.assign(window, {
  Hero,
  LeadPreviewPanel
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Marketing.jsx
try { (() => {
const CAP = window.CaLeadDesignSystem_0ab86f;
function Proof() {
  const {
    StatCard,
    Avatar
  } = CAP;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--surface-inverse)",
      padding: "var(--gutter-section) 32px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--page-max)",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: 48
    }
  }, /*#__PURE__*/React.createElement(window.SectionHead, {
    tone: "inverse",
    eyebrow: "Outcomes",
    title: "Reps stop researching and start talking",
    lead: "Measured across 40 outbound teams in their first 90 days on CaLead."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    tone: "inverse",
    label: "Reply rate",
    value: "34%",
    delta: "+18%",
    caption: "vs. manual openers"
  }), /*#__PURE__*/React.createElement(StatCard, {
    tone: "inverse",
    label: "Research time",
    value: "\u22126.5\xD7",
    caption: "per qualified lead"
  }), /*#__PURE__*/React.createElement(StatCard, {
    tone: "inverse",
    label: "Meetings booked",
    value: "1.9\xD7",
    delta: "+92%",
    caption: "same headcount"
  }), /*#__PURE__*/React.createElement(StatCard, {
    tone: "inverse",
    label: "Leads scored daily",
    value: "1,284",
    caption: "median team"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 24
    }
  }, [["The opener is the whole job. CaLead hands our reps a specific, recent line and the call starts halfway through.", "Diego Prado", "VP Sales, Northwind"], ["We stopped paying for three research tools. The score explains itself, so nobody argues with the queue order.", "Ana Ribeiro", "Head of Growth, Vela"]].map(([quote, name, role]) => /*#__PURE__*/React.createElement("div", {
    key: name,
    style: {
      border: "1px solid var(--border-inverse)",
      borderRadius: "var(--radius-panel)",
      padding: 32,
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--weight-regular) 23px/1.4 var(--font-display)",
      letterSpacing: "-0.02em",
      color: "var(--stone-050)"
    }
  }, quote), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: name,
    size: "sm",
    tone: "graphite"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-ui)",
      color: "var(--stone-050)"
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-body-small)",
      color: "var(--stone-500)"
    }
  }, role))))))));
}
function Pricing({
  onNavigate
}) {
  const {
    Card,
    Button,
    Icon,
    Badge
  } = CAP;
  const plans = [["Starter", "$390", "/mo", "For a single closer", ["500 enrichments / mo", "1 ICP model", "CSV import", "Email support"], "secondary"], ["Team", "$1,290", "/mo", "For a 5–15 rep floor", ["5,000 enrichments / mo", "Unlimited ICP models", "CRM two-way sync", "Slack alerts", "Shared ice breaker library"], "accent"], ["Scale", "Custom", "", "For multi-region outbound", ["Volume enrichment", "Custom scoring criteria", "SSO + audit log", "Dedicated CSM"], "secondary"]];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "var(--gutter-section) 32px",
      background: "var(--surface-page)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--page-max)",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: 48
    }
  }, /*#__PURE__*/React.createElement(window.SectionHead, {
    align: "center",
    eyebrow: "Pricing",
    title: "Priced per enrichment, not per seat",
    lead: "Every plan includes scoring, ice breakers and the full context record."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 20,
      alignItems: "start"
    }
  }, plans.map(([name, price, per, note, features, variant]) => {
    const featured = variant === "accent";
    return /*#__PURE__*/React.createElement(Card, {
      key: name,
      padding: 28,
      tone: featured ? "default" : "default",
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 18,
        ...(featured ? {
          border: "1.5px solid var(--stone-950)",
          boxShadow: "var(--shadow-raised)"
        } : null)
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--type-h4)",
        color: "var(--text-strong)"
      }
    }, name), featured ? /*#__PURE__*/React.createElement(Badge, {
      tone: "hot"
    }, "Most used") : null), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "baseline",
        gap: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 500,
        fontSize: 42,
        letterSpacing: "-0.035em",
        color: "var(--text-strong)"
      }
    }, price), /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--type-body-small)",
        color: "var(--text-muted)"
      }
    }, per)), /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--type-body-small)",
        color: "var(--text-muted)"
      }
    }, note), /*#__PURE__*/React.createElement("hr", {
      className: "ca-hairline"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 10
      }
    }, features.map(fx => /*#__PURE__*/React.createElement("div", {
      key: fx,
      style: {
        display: "flex",
        gap: 9,
        alignItems: "flex-start"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--blue-600)",
        marginTop: 2
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 15,
      strokeWidth: 2.2
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--type-body-small)",
        color: "var(--text-body)"
      }
    }, fx)))), /*#__PURE__*/React.createElement(Button, {
      block: true,
      variant: featured ? "accent" : "secondary",
      onClick: () => onNavigate("home")
    }, name === "Scale" ? "Talk to sales" : "Start free trial"));
  }))));
}
function CtaBand({
  onNavigate
}) {
  const {
    Button
  } = CAP;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "0 32px var(--gutter-section)",
      background: "var(--surface-page)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--page-max)",
      margin: "0 auto",
      background: "var(--blue-400)",
      borderRadius: "var(--radius-panel)",
      padding: "56px 48px",
      display: "flex",
      gap: 32,
      alignItems: "center",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "1 1 420px",
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "var(--type-h1)",
      letterSpacing: "var(--tracking-heading)",
      color: "var(--stone-950)"
    }
  }, "Put context in front of every call"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body-lead)",
      color: "var(--stone-800)",
      maxWidth: 520
    }
  }, "Import 50 leads and see the scores and openers in under ten minutes.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    iconRight: "arrow-up-right",
    onClick: () => onNavigate("pricing")
  }, "Book a demo"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    onClick: () => onNavigate("docs")
  }, "Read the docs"))));
}
Object.assign(window, {
  Proof,
  Pricing,
  CtaBand
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Marketing.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Sections.jsx
try { (() => {
const CAS = window.CaLeadDesignSystem_0ab86f;
function SectionHead({
  eyebrow,
  title,
  lead,
  tone = "light",
  align = "left"
}) {
  const inv = tone === "inverse";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14,
      maxWidth: 640,
      margin: align === "center" ? "0 auto" : 0,
      textAlign: align
    }
  }, eyebrow ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-label)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: inv ? "var(--stone-500)" : "var(--text-muted)"
    }
  }, eyebrow) : null, /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "var(--type-h1)",
      letterSpacing: "var(--tracking-heading)",
      color: inv ? "var(--stone-050)" : "var(--text-strong)"
    }
  }, title), lead ? /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body-lead)",
      color: inv ? "var(--stone-400)" : "var(--text-body)"
    }
  }, lead) : null);
}
function HowItWorks() {
  const {
    Icon
  } = CAS;
  const steps = [["link", "Drop in a domain or a list", "CSV, CRM sync or a single URL. CaLead resolves the company and the decision makers."], ["scan-line", "Scrape site and LinkedIn", "Homepage, product pages, careers, funding notes, and the contact's last 90 days of activity."], ["sliders-horizontal", "Score against your criteria", "You define what a good lead looks like — headcount, stack, region, hiring signals, funding stage."], ["message-square-quote", "Get the ice breaker", "One line, drawn from something specific and recent, ready for the rep to send."]];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "var(--gutter-section) 32px",
      background: "var(--surface-page)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--page-max)",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: 48
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "How it works",
    title: "Four steps, no research tab open",
    lead: "The pipeline runs before your rep sees the record."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 1,
      background: "var(--border-hairline)",
      border: "1px solid var(--border-hairline)",
      borderRadius: "var(--radius-panel)",
      overflow: "hidden"
    }
  }, steps.map(([icon, title, body], i) => /*#__PURE__*/React.createElement("div", {
    key: title,
    style: {
      background: "var(--surface-card)",
      padding: 28,
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-strong)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 22
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-data)",
      letterSpacing: "var(--tracking-mono)",
      color: "var(--text-faint)"
    }
  }, "0", i + 1)), /*#__PURE__*/React.createElement("h3", {
    style: {
      font: "var(--type-h4)",
      color: "var(--text-strong)"
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body-small)",
      color: "var(--text-muted)"
    }
  }, body))))));
}
function Features() {
  const {
    Card,
    Icon,
    Badge,
    Tag
  } = CAS;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "0 32px var(--gutter-section)",
      background: "var(--surface-page)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--page-max)",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "1.1fr 0.9fr",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: 32,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20,
      gridRow: "span 2"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-label)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, "Custom criteria"), /*#__PURE__*/React.createElement("h3", {
    style: {
      font: "var(--type-h2)",
      letterSpacing: "var(--tracking-heading)"
    }
  }, "Your definition of a good lead, not a generic score"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-body)",
      maxWidth: 480
    }
  }, "Build the ICP once. Every scrape is measured against it, and the score explains itself line by line."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap",
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    icon: "check",
    selected: true
  }, "Series B+"), /*#__PURE__*/React.createElement(Tag, null, "50\u2013500 headcount"), /*#__PURE__*/React.createElement(Tag, null, "Hiring SDRs"), /*#__PURE__*/React.createElement(Tag, null, "LATAM"), /*#__PURE__*/React.createElement(Tag, null, "Uses HubSpot")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      borderTop: "1px solid var(--border-hairline)",
      paddingTop: 18,
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, [["Funding stage matches", "positive", "+24"], ["Hiring 3 SDRs in São Paulo", "positive", "+18"], ["No CRM detected", "warn", "−6"]].map(([label, tone, delta]) => /*#__PURE__*/React.createElement("div", {
    key: label,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: tone
  }, delta), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-small)",
      color: "var(--text-body)"
    }
  }, label))))), [["scan-search", "Reads what the company publishes", "Product pages, changelogs, job posts and funding notes — the sources a rep would open manually."], ["zap", "Runs before the rep logs in", "Nightly enrichment on new and stale records, so the queue is always current."]].map(([icon, title, body]) => /*#__PURE__*/React.createElement(Card, {
    key: title,
    padding: 28,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-strong)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 22
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      font: "var(--type-h3)",
      letterSpacing: "var(--tracking-heading)"
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body-small)",
      color: "var(--text-muted)"
    }
  }, body)))));
}
Object.assign(window, {
  SectionHead,
  HowItWorks,
  Features
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Sections.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/SiteChrome.jsx
try { (() => {
const CA = window.CaLeadDesignSystem_0ab86f;
function Wordmark({
  tone = "light",
  size = 21
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 500,
      fontSize: size,
      letterSpacing: "-0.035em",
      color: tone === "light" ? "var(--stone-050)" : "var(--text-strong)"
    }
  }, "CaLead");
}
function SiteHeader({
  page,
  onNavigate
}) {
  const {
    Button
  } = CA;
  const nav = [["product", "Product"], ["how", "How it works"], ["pricing", "Pricing"], ["docs", "Docs"]];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 30,
      background: "rgba(11,11,11,0.86)",
      backdropFilter: "var(--blur-panel)",
      WebkitBackdropFilter: "var(--blur-panel)",
      borderBottom: "1px solid var(--border-inverse)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--page-max)",
      margin: "0 auto",
      height: 68,
      padding: "0 32px",
      display: "flex",
      alignItems: "center",
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate("home");
    },
    style: {
      textDecoration: "none",
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Wordmark, null)), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: 28,
      flex: 1
    }
  }, nav.map(([k, label]) => /*#__PURE__*/React.createElement("a", {
    key: k,
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate(k);
    },
    style: {
      font: "var(--type-ui)",
      textDecoration: "none",
      color: page === k ? "var(--stone-050)" : "var(--stone-400)",
      transition: "var(--transition-control)"
    }
  }, label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      font: "var(--type-ui)",
      color: "var(--stone-400)",
      textDecoration: "none"
    }
  }, "Sign in"), /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    iconRight: "arrow-up-right",
    onClick: () => onNavigate("pricing")
  }, "Book a demo"))));
}
function SiteFooter() {
  const cols = [["Product", ["Lead scoring", "Ice breakers", "ICP criteria", "Integrations"]], ["Company", ["About", "Careers", "Contact"]], ["Resources", ["Docs", "Changelog", "Status"]]];
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "var(--surface-inverse)",
      borderTop: "1px solid var(--border-inverse)",
      padding: "64px 32px 40px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--page-max)",
      margin: "0 auto",
      display: "flex",
      gap: 72,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "1 1 260px",
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    size: 24
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body-small)",
      color: "var(--stone-500)",
      maxWidth: 280
    }
  }, "Lead context for SDR teams. Scraped, scored and written up before the first call.")), cols.map(([h, links]) => /*#__PURE__*/React.createElement("div", {
    key: h,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-label)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: "var(--stone-600)"
    }
  }, h), links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      font: "var(--type-body-small)",
      color: "var(--stone-400)",
      textDecoration: "none"
    }
  }, l))))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--page-max)",
      margin: "48px auto 0",
      paddingTop: 20,
      borderTop: "1px solid var(--border-inverse)",
      display: "flex",
      justifyContent: "space-between",
      gap: 16,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-data)",
      letterSpacing: "var(--tracking-mono)",
      color: "var(--stone-600)"
    }
  }, "\xA9 2026 CALEAD"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-data)",
      letterSpacing: "var(--tracking-mono)",
      color: "var(--stone-600)"
    }
  }, "PRIVACY \xB7 TERMS \xB7 DPA")));
}
Object.assign(window, {
  Wordmark,
  SiteHeader,
  SiteFooter
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/SiteChrome.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.ScoreMeter = __ds_scope.ScoreMeter;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Breadcrumb = __ds_scope.Breadcrumb;

__ds_ns.SidebarNav = __ds_scope.SidebarNav;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
