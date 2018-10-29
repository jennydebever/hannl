/**
 * Script loaded in head
 * must be kept as lightweight as possible
 */

// set data attribute on body for current breakpoint
var getBreakpoint = require("../app/ui/get-breakpoint");
document.documentElement.setAttribute("data-breakpoint", getBreakpoint().toLowerCase());
