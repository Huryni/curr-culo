(function () {
  const root = document.documentElement;

  // Theme persistence
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    root.setAttribute("data-theme", savedTheme);
  }

  const themeToggle = document.getElementById("themeToggle");
  themeToggle?.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  // Last updated
  const last = document.getElementById("lastUpdated");
  if (last) {
    const d = new Date();
    last.textContent = d.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
  }

  // Copy contacts
  const copyBtn = document.getElementById("copyBtn");
  copyBtn?.addEventListener("click", async () => {
    const text =
`Carlos Daniel Bezerra Ferreira
Email: bf.carlosdaniel04@gmail.com
Telefone: (98) 98545-4435
GitHub: https://github.com/Huryni
LinkedIn: https://www.linkedin.com/in/carlos-ferreira-027a15180/`;

    try {
      await navigator.clipboard.writeText(text);
      copyBtn.textContent = "Copiado";
      setTimeout(() => (copyBtn.textContent = "Copiar contatos"), 1200);
    } catch {
      alert("Não foi possível copiar automaticamente. Copie manualmente.");
    }
  });

  // Download JSON (mini API do seu CV)
  // Placeholder for PDF download analytics or future logic
  const download = document.getElementById("downloadPdf");
  if (download) {
     // Optional: Add analytics or tracking here if needed
  }
})();
