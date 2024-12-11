const container = document.getElementById("apartment-container");
let apartments = loadApartments(); // Carregar os apartamentos

// Atualizar a página a cada 10 segundos (10000 ms)
setInterval(() => {
  renderApartments(); // Re-renderiza a lista de apartamentos a cada 10 segundos
}, 10000);

// Função para carregar os apartamentos do localStorage ou gerar novos
function loadApartments() {
  // Simular carregamento de JSON localmente
  const data = localStorage.getItem("apartments");
  if (data) {
    return JSON.parse(data); // Retorna apartamentos salvos no localStorage
  }

  // Criação inicial dos apartamentos
  const apartamentos = [];
  let andar = 1; // Começa no andar 5
  let numeroPorAndar = 5; // Quantidade de apartamentos por andar

  for (let i = 0; i < 70; i++) {
    const numeroApartamento = (andar * 100) + (i % numeroPorAndar) + 1; // Calcula o número do apartamento
    apartamentos.push({
      id: numeroApartamento,
      status: "disponivel" // Status inicial
    });

    // Avança para o próximo andar a cada 5 apartamentos
    if ((i + 1) % numeroPorAndar === 0) {
      andar++;
    }
  }

  // Salvar os dados gerados no localStorage para uso futuro
  localStorage.setItem("apartments", JSON.stringify(apartamentos));

  return apartamentos;
}

// Função para renderizar os apartamentos
function renderApartments() {
  container.innerHTML = ""; // Limpa o container antes de adicionar os novos cards
  apartments.forEach(apartment => {
    const card = document.createElement("div");
    card.className = `card ${apartment.status}`; // Aplica a classe conforme o status
    card.textContent = `Apart. ${apartment.id}`; // Mostra o número do apartamento
    card.onclick = () => changeStatus(apartment); // Adiciona o evento de clique
    container.appendChild(card); // Adiciona o card no container
  });
}

// Função para alterar o status do apartamento
function changeStatus(apartment) {
  const statuses = ["disponivel", "reservado", "vendido"]; // Ciclo de status
  const currentIndex = statuses.indexOf(apartment.status); // Obtém o índice do status atual
  apartment.status = statuses[(currentIndex + 1) % statuses.length]; // Atualiza o status
  saveApartments(); // Salva os dados atualizados no localStorage
  renderApartments(); // Re-renderiza os apartamentos
}

// Função para salvar os apartamentos no localStorage
function saveApartments() {
  localStorage.setItem("apartments", JSON.stringify(apartments)); // Salva o estado atual no localStorage
}

// Inicializar a tela ao carregar
renderApartments();
