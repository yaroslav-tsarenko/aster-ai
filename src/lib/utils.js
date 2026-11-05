export const cn = (...classes) => classes.filter(Boolean).join(" ");

export const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const isValidEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value).trim());

export const formatCurrency = (value, digits = 2) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);

export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "absolute";
      area.style.left = "-9999px";
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(area);
      return ok;
    } catch {
      return false;
    }
  }
};
