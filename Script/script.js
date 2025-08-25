// Global state
let projects = []
let currentProject = null
let sidebarExpanded = false
let selectedTechnologies = []

// DOM elements
const sidebar = document.getElementById("sidebar")
const sidebarToggle = document.getElementById("sidebarToggle")
const navLinks = document.querySelectorAll(".nav-link")
const sections = document.querySelectorAll(".section")
const projectsList = document.getElementById("projectsList")
const projectDetails = document.getElementById("projectDetails")
const addProjectBtn = document.getElementById("addProjectBtn")
const addProjectModal = document.getElementById("addProjectModal")
const addProjectForm = document.getElementById("addProjectForm")
const closeModal = document.getElementById("closeModal")
const cancelBtn = document.getElementById("cancelBtn")
const contactForm = document.getElementById("contactForm")
const selectedTechTags = document.getElementById("selectedTechTags")

// Import EmailJS
// const emailjs = window.emailjs

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  loadProjects()
  renderProjects()
  setupEventListeners()
  // initializeEmailJS()
  initAnimations()
})

// function initializeEmailJS() {
//   emailjs.init("YOUR_PUBLIC_KEY")
// }

// Event listeners
function setupEventListeners() {
  // Sidebar toggle
  sidebarToggle.addEventListener("click", toggleSidebar)

  // Navigation
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const section = link.getAttribute("data-section")
      navigateToSection(section)
    })
  })

  // Add project modal
  // O botao de adicionar esta desabilitado pois o portifolio ainda não tem Backend e não faz sentido qualquer um poder colocar um projecto no meu portifolio 


  // addProjectBtn.addEventListener("click", openAddProjectModal)
  closeModal.addEventListener("click", closeAddProjectModal)
  cancelBtn.addEventListener("click", closeAddProjectModal)

  // Add project form
  addProjectForm.addEventListener("submit", handleAddProject)

  // Contact form
  contactForm.addEventListener("submit", handleContactForm)

  // Technology selection
  setupTechnologySelection()

  // Close modal on outside click
  addProjectModal.addEventListener("click", (e) => {
    if (e.target === addProjectModal) {
      closeAddProjectModal()
    }
  })

  // Close modal on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && addProjectModal.classList.contains("active")) {
      closeAddProjectModal()
    }
  })
}

// Sidebar functions
function toggleSidebar() {
  sidebarExpanded = !sidebarExpanded
  sidebar.classList.toggle("expanded", sidebarExpanded)
}

// Navigation functions
function navigateToSection(sectionName) {
  // Update active nav link
  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("data-section") === sectionName) {
      link.classList.add("active")
    }
  })

  // Update active section
  sections.forEach((section) => {
    section.classList.remove("active")
    if (section.id === sectionName) {
      section.classList.add("active")
    }
  })
}

// Project functions
function loadProjects() {
  const savedProjects = localStorage.getItem("portfolio-projects")
  if (savedProjects) {
    projects = JSON.parse(savedProjects)
  } else {
    // Default projects
    projects = [
      {
        id: 1,
        name: "Ferramenta de Pentest Interativa",
        description: "Uma aplicação de linha de comando (CLI) interativa desenvolvida em Python que automatiza e simplifica a execução de ferramentas essenciais de teste de penetração, como Nmap, ARP-Scan, Hydra, Whois e Host. O menu guiado facilita a escolha de varreduras e ataques comuns, tornando-o acessível para profissionais de segurança cibernética de todos os níveis.",
        motivation: "Criar uma ferramenta unificada que agilize processos manuais repetitivos em testes de penetração, permitindo que pentesters e administradores de sistemas realizem auditorias de rede e quebras de autenticação de forma mais eficiente e organizada, sem a necessidade de decorar comandos complexos.",
        challenges: "Estruturar um sistema de menus aninhados que fosse intuitivo e robusto; garantir a correta formatação e passagem de parâmetros para os comandos do sistema; tratar entradas do usuário para evitar erros de execução; e integrar diferentes ferramentas de pentest em um único fluxo de trabalho coeso.",
        results: "Automação bem-sucedida de comandos complexos de pentest em uma interface amigável; aceleração significativa do processo de reconhecimento e enumeração de redes; e criação de uma base modular que permite a fácil adição de novas ferramentas e funcionalidades no futuro.",
        technologies: ["Python", "Nmap", "ARP-Scan", "Hydra", "Inteligência Artificial (IA) para estruturação de código"]
      },
      {

        id: 2,
        name: "Sistema de Automação CMS V1.0",
        description: "Um sistema sofisticado de automação para processamento de dados de sistemas de gestão de clientes (CMS), projetado para lidar com grandes volumes de registros com detecção inteligente de erros e processamento automatizado de fluxos de trabalho.",
        motivation: "Criado para agilizar tarefas repetitivas de inserção de dados em plataformas CMS, reduzir erros humanos e aumentar a eficiência do processamento, automatizando fluxos de trabalho complexos que envolvem validação de dados, reconhecimento de texto por OCR e navegação no sistema.",
        challenges: "Superar elementos de interface inconsistentes, lidar com vários estados de erro, implementar extração confiável de texto OCR a partir de capturas de tela, gerenciar lógica condicional complexa para diferentes estados de processamento e garantir mecanismos robustos de recuperação de erros.",
        results: "Alcancei mais de 90% de taxa de automação para tarefas de processamento de dados, reduzi o tempo de processamento de minutos para segundos por registro, diminui significativamente erros humanos e permiti operação contínua com capacidades inteligentes de detecção e recuperação de erros.",
        technologies: ["Python", "PyAutoGUI", "Tesseract OCR", "OpenCV (indiretamente)", "Automação de Teclado", "Inteligência Artificial (IA) para estruturação de código e entedimento do funcionamento das bibliotecas"]

      },
      {
        id: 3,
        name: "Sistema de Automação CMS com Captura de Coordenadas V2.0 [Com Interface Gráfica]",
        description: "Uma solução integrada para automação de processos em sistemas de gestão de clientes (CMS), composta por dois módulos: (1) uma ferramenta gráfica para captura precisa de coordenadas e áreas de interação na tela, e (2) um núcleo de automação que utiliza essas coordenadas para executar fluxos complexos com OCR, reconhecimento de erros e registro detalhado de logs.",
        motivation: "O sistema foi criado para eliminar tarefas manuais repetitivas no CMS, reduzir erros humanos e padronizar processos. A introdução de um módulo separado de captura de coordenadas permite maior flexibilidade e adaptação a diferentes interfaces gráficas do sistema alvo.",
        challenges: "Desafios incluíram sincronizar cliques automáticos com respostas visuais do CMS, capturar e interpretar corretamente áreas de tela via OCR, tratar múltiplos estados de erro, e manter o fluxo resiliente mesmo em interfaces gráficas inconsistentes. Outro ponto crítico foi permitir que usuários não técnicos mapeassem coordenadas sem precisar editar código.",
        results: "O sistema aumentou a eficiência em mais de 90%, reduzindo o tempo de execução de tarefas que antes levavam minutos para poucos segundos. A automação tornou-se mais estável com a adição de logs filtráveis, possibilitando auditoria detalhada. O módulo de captura de coordenadas simplificou a configuração inicial, tornando o sistema reutilizável em diferentes ambientes.",
        technologies: ["Python", "Tkinter", "PyAutoGUI", "Pytesseract OCR", "Subprocess/Logs"]
      },
      {
        id: 4,
        name: "EA/Sinal MQL5 com RSI + Bandas de Bollinger (M5)",
        description: "Script em MQL5 que analisa o preço no timeframe M5 combinando RSI e Bandas de Bollinger para marcar potenciais pontos de entrada, Stop Loss e Take Profit no gráfico. A lógica identifica novas velas, calcula RSI e Bandas, e, quando as condições são atendidas (preço vs. banda média e RSI >/< 50), plota setas de entrada e níveis de SL/TP baseados no último fundo/ topo relativo às bandas.",
        motivation: "Automatizar uma rotina objetiva de leitura de mercado, padronizando sinais visuais e níveis de gestão de risco (SL/TP) para acelerar decisão e facilitar backtests visuais sem necessidade de desenho manual.",
        challenges: "Sincronizar sinais apenas em novas velas para evitar repetição; obter buffers corretos dos indicadores; definir SL/TP dinâmicos coerentes com a volatilidade; controlar estados para não alternar compra/venda na mesma sequência; lidar com possíveis retornos vazios dos buffers e cenários sem fundo/topo válido nas últimas barras.",
        results: "Geração consistente de marcações de sinal no gráfico (entrada/SL/TP) com base em regras claras; simplificação do estudo visual e da coleta de screenshots para journaling; base pronta para evoluir a um EA que execute ordens (CTrade) e para testes mais formais em Strategy Tester.",
        technologies: ["MQL5", "MetaTrader 5", "RSI (iRSI)", "Bandas de Bollinger (iBands)", "Objetos Gráficos/Chart Objects"]
      },
      {
        id: 5,
        name: "Chrono & Code - E-commerce Integrado",
        description: "Desenvolvimento de uma plataforma de e-commerce integrada que oferece tanto relógios de luxo (Chrono & Code) quanto livros (Leitura & Imaginação). O projeto inclui três sites distintos com carrinhos de compras compartilhados, sistemas de autenticação de usuários e design responsivo.",
        motivation: "Criar uma experiência de compra online unificada para dois nichos distintos (relógios e livros) demonstrando a capacidade de desenvolver sistemas complexos com funcionalidades compartilhadas e design consistente. O projeto visa mostrar competências em front-end development, UX/UI design e integração de funcionalidades de e-commerce.",
        challenges: "Implementar um carrinho de compras compartilhado entre os três sites usando localStorage; Desenvolver sistemas de filtragem e categorização diferentes para cada tipo de produto; Manter consistência visual enquanto adapta o design para diferentes identidades de marca (luxo para relógios e acolhedor para livros); Garantir responsividade em todos os dispositivos; Criar modais de login/cadastro funcionais com validação; Implementar sistemas de navegação ativa entre as páginas.",
        results: "Três websites em um, totalmente funcional com carrinho de compras integrado; Design responsivo e adaptado para mobile; Sistema de autenticação de usuários simulado; Filtros de produtos funcionais para ambas as categorias; Interface intuitiva e agradável para o usuário; Performance otimizada com carregamento rápido de páginas.",
        technologies: ["HTML5", "CSS3", "Tailwind CSS", "JavaScript (ES6+)", "Font Awesome Icons", "Hugging Face"]
      },
      {
        id: 6,
        name: "Portfólio Pessoal Interativo",
        description: "Site portfólio pessoal moderno e responsivo desenvolvido para exibir projetos técnicos, habilidades e informações de contato. Inclui navegação lateral animada, sistema de gerenciamento de projetos, design geométrico futurista e interface intuitiva com modal interativo.",
        motivation: "Criar uma presença online profissional que demonstre minhas habilidades técnicas enquanto fornece uma experiência de usuário excepcional. O portfólio serve como vitrine para projetos anteriores e ponto de contacto para oportunidades profissionais na área de cibersegurança e desenvolvimento.",
        challenges: "criar animações CSS complexas para elementos geométricos de fundo; desenvolver interface responsiva que funcione perfeitamente em dispositivos móveis; integrar sistema de formulário de contato funcional.",
        results: "Portfólio totalmente funcional com navegação intuitiva; sistema de gerenciamento de projetos com localStorage; design responsivo e acessível; animações suaves e efeitos visuais atraentes; formulário de contato integrado com cliente de email.",
        technologies: ["HTML5", "CSS3", "JavaScript (ES6+)", "LocalStorage API", "Font Awesome Icons", "CSS Grid & Flexbox", "CSS Animations", "Responsive Design", "v0"]
      }


    ]
    saveProjects()
  }
}

function saveProjects() {
  localStorage.setItem("portfolio-projects", JSON.stringify(projects))
}

function renderProjects() {
  projectsList.innerHTML = ""

  if (projects.length === 0) {
    projectsList.innerHTML = `
            <div class="empty-state" style="padding: 40px 20px; text-align: center;">
                <i class="fas fa-folder-open" style="font-size: 2rem; opacity: 0.5; margin-bottom: 1rem;"></i>
                <p style="color: #64748b;">Nenhum projeto encontrado</p>
            </div>
        `
    return
  }

  projects.forEach((project) => {
    const projectElement = document.createElement("div")
    projectElement.className = "project-item"
    projectElement.innerHTML = `
            <h4>${project.name}</h4>
            <p>${project.description.substring(0, 100)}...</p>
        `

    projectElement.addEventListener("click", () => selectProject(project))
    projectsList.appendChild(projectElement)
  })
}

function selectProject(project) {
  currentProject = project

  // Update active project item
  document.querySelectorAll(".project-item").forEach((item) => {
    item.classList.remove("active")
  })
  event.currentTarget.classList.add("active")

  // Render project details
  renderProjectDetails(project)
}

function renderProjectDetails(project) {
  const cardIcons = {
    Descrição: "fas fa-info-circle",
    Motivação: "fas fa-lightbulb",
    Desafios: "fas fa-mountain",
    Resultados: "fas fa-trophy",
  }

  // Categorizar tecnologias
  const techCategories = categorizeTechnologies(project.technologies)

  projectDetails.innerHTML = `
        <div class="project-detail-content active">
            <div class="project-detail-header-modern">
                <h2 class="project-detail-title-modern">${project.name}</h2>
                <div class="project-technologies-modern">
                    ${project.technologies.map((tech) => `<span class="tech-tag-modern">${tech}</span>`).join("")}
                </div>
            </div>
            
            <div class="project-details-cards">
                <div class="project-card">
                    <div class="project-card-icon">
                        <i class="${cardIcons["Descrição"]}"></i>
                    </div>
                    <h4 class="project-card-title">Descrição</h4>
                    <div class="project-card-content">
                        <p>${project.description}</p>
                    </div>
                </div>
                
                <div class="project-card">
                    <div class="project-card-icon">
                        <i class="${cardIcons["Motivação"]}"></i>
                    </div>
                    <h4 class="project-card-title">Motivação</h4>
                    <div class="project-card-content">
                        <p>${project.motivation}</p>
                    </div>
                </div>
                
                <div class="project-card">
                    <div class="project-card-icon">
                        <i class="${cardIcons["Desafios"]}"></i>
                    </div>
                    <h4 class="project-card-title">Desafios</h4>
                    <div class="project-card-content">
                        <p>${project.challenges}</p>
                    </div>
                </div>
                
                <div class="project-card">
                    <div class="project-card-icon">
                        <i class="${cardIcons["Resultados"]}"></i>
                    </div>
                    <h4 class="project-card-title">Resultados</h4>
                    <div class="project-card-content">
                        <p>${project.results}</p>
                    </div>
                </div>
            </div>
            
            <div class="tech-details-card">
                <h3 class="tech-details-title">Stack Tecnológico Detalhado</h3>
                <div class="tech-categories-grid">
                    ${Object.entries(techCategories)
      .map(([category, techs]) =>
        techs.length > 0
          ? `
                        <div class="tech-category-display">
                            <h5>${category}</h5>
                            <div class="tech-category-tags">
                                ${techs.map((tech) => `<span class="tech-category-tag">${tech}</span>`).join("")}
                            </div>
                        </div>
                      `
          : "",
      )
      .join("")}
                </div>
            </div>
        </div>
    `
}

// Modal functions
function openAddProjectModal() {
  addProjectModal.classList.add("active")
  document.body.style.overflow = "hidden"
  selectedTechnologies = []
  renderSelectedTechnologies()
}

function closeAddProjectModal() {
  addProjectModal.classList.remove("active")
  document.body.style.overflow = "auto"
  addProjectForm.reset()
  selectedTechnologies = []

  // Clear all select elements
  const techSelects = document.querySelectorAll(".tech-category select")
  techSelects.forEach((select) => {
    select.selectedIndex = -1
  })

  renderSelectedTechnologies()
}

function handleAddProject(e) {
  e.preventDefault()

  const newProject = {
    id: Date.now(),
    name: document.getElementById("projectName").value,
    description: document.getElementById("projectDescription").value,
    motivation: document.getElementById("projectMotivation").value,
    challenges: document.getElementById("projectChallenges").value,
    results: document.getElementById("projectResults").value,
    technologies: [...selectedTechnologies],
  }

  projects.push(newProject)
  saveProjects()
  renderProjects()
  closeAddProjectModal()

  // Show success message
  showNotification("Projeto adicionado com sucesso!", "success")
}

function handleContactForm(e) {
  e.preventDefault()

  const submitBtn = document.getElementById('ContactBtn')


  // Verificar se os elementos existem antes de acessar suas propriedades
  if (!submitBtn) {
    console.error("Elementos do botão não encontrados")
    return
  }

  // Mostrar estado de carregamento

  submitBtn.disabled = true

  // Simular envio e abrir cliente de email
  setTimeout(() => {
    const nameInput = document.getElementById('ContactName')
    const emailInput = document.getElementById('ContactEmail')
    const messageInput = document.getElementById('ContactMsg')

    if (!nameInput || !emailInput || !messageInput) {
      console.error("Campos do formulário não encontrados")
      showNotification("Erro: Campos do formulário não encontrados", "error")

      // Restaurar estado do botão

      submitBtn.disabled = false
      return
    }

    const name = nameInput.value
    const email = emailInput.value
    const message = messageInput.value

    // Criar link mailto com os dados do formulário
    const subject = `Contato de ${name} - Portfólio`
    const body = `Email: ${email}\n\n${message}`
    const mailtoLink = `mailto:zerdone2301@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    // Abrir cliente de email
    window.location.href = mailtoLink

    showNotification("Cliente de email aberto! Complete o envio no seu aplicativo de email.", "success")
    contactForm.reset()

    // Restaurar estado do botão

    submitBtn.disabled = false
  }, 1000)
}

function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#8b5cf6"};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `
  notification.textContent = message

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

// Technology selection functions
function setupTechnologySelection() {
  const techSelects = document.querySelectorAll(".tech-category select")

  techSelects.forEach((select) => {
    select.addEventListener("change", updateSelectedTechnologies)
  })
}

function updateSelectedTechnologies() {
  selectedTechnologies = []
  const techSelects = document.querySelectorAll(".tech-category select")

  techSelects.forEach((select) => {
    const selectedOptions = Array.from(select.selectedOptions)
    selectedOptions.forEach((option) => {
      if (!selectedTechnologies.includes(option.value)) {
        selectedTechnologies.push(option.value)
      }
    })
  })

  renderSelectedTechnologies()
}

function renderSelectedTechnologies() {
  if (selectedTechnologies.length === 0) {
    selectedTechTags.innerHTML =
      '<span style="color: #64748b; font-style: italic;">Nenhuma tecnologia selecionada</span>'
    return
  }

  selectedTechTags.innerHTML = selectedTechnologies
    .map(
      (tech) => `
    <span class="selected-tech-tag">
      ${tech}
      <button type="button" class="remove-tech" onclick="removeTechnology('${tech}')">×</button>
    </span>
  `,
    )
    .join("")
}

function removeTechnology(tech) {
  selectedTechnologies = selectedTechnologies.filter((t) => t !== tech)

  // Unselect from all selects
  const techSelects = document.querySelectorAll(".tech-category select")
  techSelects.forEach((select) => {
    Array.from(select.options).forEach((option) => {
      if (option.value === tech) {
        option.selected = false
      }
    })
  })

  renderSelectedTechnologies()
}

// Utility functions
window.navigateToSection = navigateToSection

// Initialize animations
function initAnimations() {
  // Add scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeInUp 0.6s ease forwards"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  document.querySelectorAll(".skill-card, .stat, .contact-item").forEach((el) => {
    observer.observe(el)
  })
}

// Add fade in animation CSS
const animationStyle = document.createElement("style")
animationStyle.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .skill-card, .stat, .contact-item {
        opacity: 0;
    }
`
document.head.appendChild(animationStyle)

// Technology categorization function
function categorizeTechnologies(technologies) {
  const categories = {
    Frontend: ["React", "Vue.js", "Angular", "HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript", "Tailwind CSS", "Bootstrap"],
    Backend: ["Node.js", "Express", "Django", "Flask", "FastAPI", "Spring Boot", "Laravel", "Ruby on Rails"],
    Database: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "SQLite", "Firebase", "Supabase"],
    Redes: ["Nmap", "ARP-Scan", "Wireshark", "Tcpdump", "Netcat", "OpenVAS", "Burp Suite", "Metasploit", "Hydra"],
    Bibliotecas: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "Scikit-learn", "TensorFlow", "PyTorch", "PyAutoGUI", "Tesseract OCR", "OpenCV", "Keyboard", "Pytesseract OCR", "Tkinter", "Subprocess/Logs"],
    "Cloud & DevOps": ["AWS", "Azure", "Google Cloud", "Vercel", "Netlify", "Docker", "Kubernetes"],
    "IA & Machine Learning": [
      "OpenAI",
      "TensorFlow",
      "PyTorch",
      "Scikit-learn",
      "Hugging Face",
      "LangChain",
      "Anthropic",
      "Inteligência Artificial (IA) para estruturação de código",
      "Inteligência Artificial (IA) para estruturação de código e entedimento do funcionamento das bibliotecas", 
      "v0"
    ],
    Outras: ["Git", "GitHub", "Stripe", "Socket.io", "GraphQL", "REST API", "Webpack", "Vite", "Celery", "D3.js", "MQL5", "MetaTrader 5", "RSI (iRSI)", "Bandas de Bollinger (iBands)", "Objetos Gráficos/Chart Objects"],
  }

  const result = {}

  Object.keys(categories).forEach((category) => {
    result[category] = technologies.filter((tech) => categories[category].includes(tech))
  })

  return result
}

// Add CSS animations for notifications
const style = document.createElement("style")
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`
document.head.appendChild(style)
