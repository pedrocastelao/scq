document.addEventListener("DOMContentLoaded", function () {
  // Verifica se existe um token de autenticação; caso contrário, redireciona para o login.
  const token = localStorage.getItem("authToken");
  if (!token) {
    window.location.href = "login.html";
    return;
  }

  // Se houver token, continue com a inicialização do sistema
  updateWeekDisplay();
  renderReservas();
});

// Constantes
const ITEMS_PER_PAGE = 9;
let currentPage = 1;
let currentWeekStart = new Date();
currentWeekStart.setHours(0, 0, 0, 0);
currentWeekStart.setDate(
  currentWeekStart.getDate() - currentWeekStart.getDay()
);

// Dados de exemplo dos agendamentos
let reservas = [];

function formatDateToISO(date) {
  if (!date) return "";

  // Se a data já estiver no formato correto, retorna como está
  if (typeof date === "string" && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return date;
  }

  // Tenta converter para Date no formato correto
  let d = new Date(date);

  // Se a conversão falhar ou a data vier errada, tenta ajustar manualmente
  if (isNaN(d.getTime()) || d.getFullYear() < 2000) {
    const parts = date.split("-");
    if (parts.length === 3) {
      const [year, month, day] = parts;
      d = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }
  }

  // Se ainda assim for inválida, retorna string vazia
  if (isNaN(d.getTime())) {
    console.error("Data inválida:", date);
    return "";
  }

  // Formata corretamente para YYYY-MM-DD
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

async function fetchReservas() {
  try {
    const response = await fetch("http://localhost:4000/reservas"); // ajuste conforme sua URL
    if (!response.ok) {
      throw new Error("Erro ao buscar reservas");
    }
    // Supondo que o retorno já seja um array com as reservas
    reservas = await response.json();

    // Garante que todas as datas estão no formato correto
    reservas = reservas.map((reserva) => ({
      ...reserva,
      data: formatDateToISO(reserva.data),
      datanascimento: formatDateToISO(reserva.datanascimento),
    }));

    renderReservas();
  } catch (error) {
    console.error("Erro:", error);
    document.getElementById("appointments-container").innerHTML = `
      <div class="col-12 text-center">
        <h3>Não foi possível carregar as reservas. Tente novamente mais tarde!</h3>
      </div>
    `;
  }
}

// Exemplo: Alteração na função para receber o objeto event
function showView(viewName, event) {
  // Oculta todas as views
  document.getElementById("appointments-view").style.display = "none";
  document.getElementById("reports-view").style.display = "none";

  // Mostra a view selecionada
  document.getElementById(`${viewName}-view`).style.display = "block";

  // Atualiza o menu ativo
  document.querySelectorAll(".menu-item").forEach((item) => {
    item.classList.remove("active-menu");
  });
  // 'event' é passado para identificar o item clicado
  if (event && event.currentTarget) {
    event.currentTarget.classList.add("active-menu");
  }

  // Se for a view de agendamentos, atualiza a exibição
  if (viewName === "appointments") {
    updateWeekDisplay();
    renderReservas();
  }
}

function getWeekRange(date) {
  const start = new Date(date);
  start.setDate(start.getDate() - start.getDay());
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return { start, end };
}

function formatDateRange(start, end) {
  const options = { day: "numeric", month: "short" };
  return `${start.toLocaleDateString(
    "pt-BR",
    options
  )} - ${end.toLocaleDateString("pt-BR", options)}`;
}

function updateWeekDisplay() {
  const range = getWeekRange(currentWeekStart);
  document.getElementById("week-range").textContent = formatDateRange(
    range.start,
    range.end
  );

  // Atualizar o seletor de semana
  const weekSelector = document.getElementById("week-selector");
  const year = range.start.getFullYear();
  const week = getWeekNumber(range.start);
  weekSelector.value = `${year}-W${week.toString().padStart(2, "0")}`;
}

function getWeekNumber(date) {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

function previousWeek() {
  currentWeekStart.setDate(currentWeekStart.getDate() - 7);
  renderReservas();
  updateWeekDisplay();
}

function nextWeek() {
  currentWeekStart.setDate(currentWeekStart.getDate() + 7);
  renderReservas();
  updateWeekDisplay();
}

function selectSpecificWeek(weekString) {
  const [year, week] = weekString.split("-W");
  currentWeekStart = getDateOfWeek(parseInt(week), parseInt(year));
  renderReservas();
  updateWeekDisplay();
}

function getDateOfWeek(week, year) {
  const simple = new Date(year, 0, 1 + (week - 1) * 7);
  const dow = simple.getDay();
  const ISOweekStart = new Date(simple);
  if (dow <= 4) {
    ISOweekStart.setDate(simple.getDate() - simple.getDay());
  } else {
    ISOweekStart.setDate(simple.getDate() + (7 - simple.getDay()));
  }
  return ISOweekStart;
}

function getAppointmentStatus(appointmentDate) {
  const now = new Date();
  const appointmentDateTime = new Date(appointmentDate);
  const currentWeekRange = getWeekRange(new Date());

  if (appointmentDateTime < now) {
    return "expired";
  } else if (
    appointmentDateTime >= currentWeekRange.start &&
    appointmentDateTime <= currentWeekRange.end
  ) {
    return "current-week";
  } else {
    return "future-week";
  }
}

function filterReservasByWeek(reservas) {
  const weekRange = getWeekRange(currentWeekStart);
  const showExpired = document.getElementById("showExpired").checked;

  return reservas.filter((reserva) => {
    const reservaDate = new Date(reserva.data);
    console.log(reservaDate);

    const isExpired = reservaDate < new Date();

    if (!showExpired && isExpired) {
      return false;
    }

    if (showExpired && !isExpired) {
      return false;
    }

    return reservaDate >= weekRange.start && reservaDate <= weekRange.end;
  });
}

function renderReservas() {
  const container = document.getElementById("appointments-container");
  const filteredReservas = filterReservasByWeek(reservas);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const pageReservas = filteredReservas.slice(startIndex, endIndex);

  console.log("filteredReservas", filteredReservas);
  console.log("startIndex", startIndex);
  console.log("endIndex", endIndex);
  console.log("pageReservas", pageReservas);

  container.innerHTML = "";

  if (pageReservas.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center">
        <h3>Nenhuma reserva nesta semana</h3>
      </div>
    `;
    return;
  }

  pageReservas.forEach((reserva) => {
    // Caso queira manter a lógica de status, adapte-a para utilizar reserva.data
    const status = getAppointmentStatus(reserva.data);
    const card = `
      <div class="col-md-4 mb-4">
        <div class="card appointment-card ${status}">
          <div class="card-body">
            <h5 class="card-title">Reserva: ${reserva.nome}</h5>
            <p class="card-text">
              <strong>CPF:</strong> ${reserva.cpf}<br>
              <strong>Email:</strong> ${reserva.email}<br>
              <strong>Data de Nascimento:</strong> ${new Date(
                reserva.datanascimento
              ).toLocaleDateString("pt-BR")}<br>
              <strong>Data:</strong> ${new Date(
                reserva.data
              ).toLocaleDateString("pt-BR")}<br>
              <strong>Horário:</strong> ${reserva.horaInicio} - ${
      reserva.horaFim
    }<br>
              <strong>Quadra:</strong> ${reserva.quadraId}<br>
              <strong>Status:</strong> ${reserva.Status}<br>
              <strong>Detalhes:</strong> ${reserva.detalhes}
            </p>
            <div class="d-flex justify-content-end">
              <button class="btn btn-sm btn-outline-primary me-2">Editar</button>
              <button class="btn btn-sm btn-outline-danger">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += card;
  });

  renderPagination(filteredReservas.length);
}

function renderPagination(totalItems) {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const paginationElement = document.getElementById("pagination");
  paginationElement.innerHTML = "";

  if (totalItems <= ITEMS_PER_PAGE) return;

  // Botão Anterior
  paginationElement.innerHTML += `
    <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
      <a class="page-link" href="#" onclick="changePage(${
        currentPage - 1
      })">Anterior</a>
    </li>
  `;

  // Itens de Página
  for (let i = 1; i <= totalPages; i++) {
    paginationElement.innerHTML += `
      <li class="page-item ${currentPage === i ? "active" : ""}">
        <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
      </li>
    `;
  }

  // Botão Próximo
  paginationElement.innerHTML += `
    <li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
      <a class="page-link" href="#" onclick="changePage(${
        currentPage + 1
      })">Próximo</a>
    </li>
  `;
}

function changePage(page) {
  currentPage = page;
  renderReservas();
}

function generateReport(type) {
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const reportType = document.getElementById("reportType").value;

  console.log(`Gerando relatório do tipo: ${type}`);
  console.log(`Período: ${startDate} até ${endDate}`);
  console.log(`Tipo de relatório: ${reportType}`);

  alert("Relatório gerado com sucesso!");
}

function changePassword() {
  alert("Funcionalidade de alteração de senha será implementada aqui");
}

function logout() {
  if (confirm("Deseja realmente sair do sistema?")) {
    localStorage.removeItem("authToken");
    window.location.href = "login.html";
  }
}

// Inicialização após carregar o conteúdo do DOM
document.addEventListener("DOMContentLoaded", () => {
  updateWeekDisplay();
  fetchReservas();

  document
    .getElementById("showExpired")
    .addEventListener("change", renderReservas);
});
