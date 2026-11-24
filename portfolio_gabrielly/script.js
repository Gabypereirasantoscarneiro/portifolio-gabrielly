/* Portfólio acadêmico - Gabrielly Pereira
   PIN demonstrativo do painel: 1234 (não é segurança real).
   Para EmailJS, preencha as três constantes abaixo conforme README. */
const STORAGE_KEY = "gabriellyPortfolioMessages";
const ADMIN_PIN = "1234";
const EMAILJS_PUBLIC_KEY = ""; // preencher após criar conta no EmailJS
const EMAILJS_SERVICE_ID = ""; // preencher após configurar serviço
const EMAILJS_TEMPLATE_ID = ""; // preencher após criar template

const demoMessages = [
 ["Ana Souza","ana.souza@example.com","Gostei da organização do portfólio!"],
 ["Lucas Martins","lucas.martins@example.com","O projeto de olimpíadas ficou interessante."],
 ["Mariana Costa","mariana.costa@example.com","Você pretende desenvolver outros sites?"],
 ["Pedro Almeida","pedro.almeida@example.com","Parabéns pela apresentação."],
 ["Beatriz Lima","beatriz.lima@example.com","Gostei da parte sobre cibersegurança."],
 ["Rafael Oliveira","rafael.oliveira@example.com","A explicação sobre blockchain foi clara."],
 ["Camila Rocha","camila.rocha@example.com","Seu portfólio está bem organizado."],
 ["João Ferreira","joao.ferreira@example.com","Como você começou a estudar HTML?"],
 ["Isabela Santos","isabela.santos@example.com","Gostei da seção de tendências."],
 ["Mateus Ribeiro","mateus.ribeiro@example.com","O site funciona bem no celular."],
 ["Laura Mendes","laura.mendes@example.com","Boa sorte nos próximos projetos!"],
 ["Enzo Carvalho","enzo.carvalho@example.com","A navegação está simples e objetiva."],
 ["Sofia Gomes","sofia.gomes@example.com","Gostei da relação entre escola e programação."],
 ["Gabriel Dias","gabriel.dias@example.com","Você já estudou JavaScript?"],
 ["Valentina Nunes","valentina.nunes@example.com","A apresentação ficou elegante."],
 ["Davi Barbosa","davi.barbosa@example.com","Parabéns pelo trabalho acadêmico."],
 ["Manuela Freitas","manuela.freitas@example.com","A parte de Edge Computing foi interessante."],
 ["Arthur Cardoso","arthur.cardoso@example.com","Gostei do projeto de páginas interligadas."],
 ["Helena Teixeira","helena.teixeira@example.com","O conteúdo está fácil de entender."],
 ["Theo Moreira","theo.moreira@example.com","Sucesso na sua trajetória em TI!"]
];

function getMessages() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}
function saveMessages(messages) { localStorage.setItem(STORAGE_KEY, JSON.stringify(messages)); }
function seedMessages() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    const now = Date.now();
    saveMessages(demoMessages.map((m,i)=>({id:`demo-${i+1}`,name:m[0],email:m[1],message:m[2],createdAt:new Date(now-(20-i)*86400000).toISOString(),demo:true})));
  }
}
function safeText(value) {
  return String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
function formatDate(value) {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? "—" : d.toLocaleDateString("pt-BR");
}
function showFeedback(message, isError=false) {
  const el = document.getElementById("formFeedback");
  el.textContent = message;
  el.style.color = isError ? "#9b4d43" : "#6d7058";
}
async function sendEmailIfConfigured(data) {
  if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !window.emailjs) return false;
  try {
    emailjs.init({publicKey: EMAILJS_PUBLIC_KEY});
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      from_name: data.name, reply_to: data.email, message: data.message
    });
    return true;
  } catch (error) {
    console.error("Falha no EmailJS:", error);
    return false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  seedMessages();

  document.getElementById("contactForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = {
      id: `msg-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim(),
      createdAt: new Date().toISOString(),
      demo: false
    };
    if (!data.name || !data.email || !data.message) return showFeedback("Preencha todos os campos.", true);
    const messages = getMessages();
    messages.unshift(data);
    saveMessages(messages);
    const emailSent = await sendEmailIfConfigured(data);
    form.reset();
    showFeedback(emailSent ? "Mensagem salva e notificação enviada por e-mail." : "Mensagem salva neste navegador. O envio por e-mail ainda precisa ser configurado.");
  });

  const modalElement = document.getElementById("adminModal");
  const adminModal = new bootstrap.Modal(modalElement);
  document.getElementById("adminAccess").addEventListener("click", () => {
    document.getElementById("adminPin").value = "";
    document.getElementById("adminLogin").hidden = false;
    document.getElementById("adminDashboard").hidden = true;
    adminModal.show();
  });
  document.getElementById("loginButton").addEventListener("click", () => {
    if (document.getElementById("adminPin").value === ADMIN_PIN) {
      document.getElementById("adminLogin").hidden = true;
      document.getElementById("adminDashboard").hidden = false;
      renderMessages();
    } else {
      document.getElementById("loginFeedback").textContent = "PIN incorreto. Tente novamente.";
    }
  });
  document.getElementById("adminPin").addEventListener("keydown", e => { if(e.key==="Enter") document.getElementById("loginButton").click(); });

  function renderMessages() {
    const messages = getMessages();
    document.getElementById("messageCount").textContent = messages.length;
    const tbody = document.getElementById("messagesTable");
    tbody.innerHTML = messages.map(m => `<tr>
      <td><b>${safeText(m.name)}</b><br><small>${safeText(m.email)}</small>${m.demo?'<br><span class="badge text-bg-light">teste</span>':''}</td>
      <td>${safeText(m.message)}</td><td>${formatDate(m.createdAt)}</td>
      <td class="text-nowrap"><button class="btn btn-outline-dark btn-sm me-1" data-edit="${safeText(m.id)}">Editar</button><button class="btn btn-outline-danger btn-sm" data-delete="${safeText(m.id)}">Excluir</button></td>
    </tr>`).join("") || '<tr><td colspan="4" class="text-center text-muted py-4">Nenhuma mensagem cadastrada.</td></tr>';
  }
  document.getElementById("messagesTable").addEventListener("click", event => {
    const editId = event.target.dataset.edit;
    const deleteId = event.target.dataset.delete;
    if (editId) {
      const item = getMessages().find(m => m.id === editId);
      if (!item) return;
      document.getElementById("editId").value = item.id;
      document.getElementById("editName").value = item.name;
      document.getElementById("editEmail").value = item.email;
      document.getElementById("editMessage").value = item.message;
      document.getElementById("editArea").hidden = false;
      document.getElementById("editArea").scrollIntoView({behavior:"smooth",block:"nearest"});
    }
    if (deleteId && confirm("Deseja excluir esta mensagem?")) {
      saveMessages(getMessages().filter(m => m.id !== deleteId));
      renderMessages();
    }
  });
  document.getElementById("editForm").addEventListener("submit", event => {
    event.preventDefault();
    const id = document.getElementById("editId").value;
    const messages = getMessages().map(m => m.id === id ? {
      ...m,
      name: document.getElementById("editName").value.trim(),
      email: document.getElementById("editEmail").value.trim(),
      message: document.getElementById("editMessage").value.trim()
    } : m);
    saveMessages(messages);
    document.getElementById("editArea").hidden = true;
    renderMessages();
  });
  document.getElementById("cancelEdit").addEventListener("click", () => document.getElementById("editArea").hidden = true);
  document.getElementById("resetDemo").addEventListener("click", () => {
    if (confirm("Isso substituirá as mensagens atuais pelos 20 registros fictícios de teste. Continuar?")) {
      localStorage.removeItem(STORAGE_KEY);
      seedMessages();
      renderMessages();
    }
  });

  // Fecha o menu mobile após selecionar um link.
  document.querySelectorAll("#mainNav .nav-link").forEach(link => link.addEventListener("click", () => {
    const nav = document.getElementById("mainNav");
    if (nav.classList.contains("show")) bootstrap.Collapse.getOrCreateInstance(nav).hide();
  }));
});
