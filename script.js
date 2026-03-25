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

  // Download PDF (Profissional)
  const download = document.getElementById("downloadPdf");
  download?.addEventListener("click", (e) => {
    e.preventDefault();

    const element = document.body; // Captura o body inteiro para manter o estilo
    
    // Configurações para um PDF impecável
    const opt = {
      margin: [10, 10, 10, 10],
      filename: 'Carlos_Daniel_Curriculo.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { 
        scale: 2, 
        useCORS: true, 
        letterRendering: true,
        scrollX: 0,
        scrollY: 0
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    // Estilização temporária e feedback visual
    const originalText = download.textContent;
    download.textContent = "Gerando...";
    document.body.classList.add("is-printing");

    html2pdf().set(opt).from(element).save().then(() => {
      document.body.classList.remove("is-printing");
      download.textContent = originalText;
    }).catch(err => {
      document.body.classList.remove("is-printing");
      console.error("Erro ao gerar PDF:", err);
      download.textContent = "Erro ao baixar";
      setTimeout(() => download.textContent = originalText, 2000);
    });
  });
})();
