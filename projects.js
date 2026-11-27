window.PROJECTS = [
  {
    "id": "rpa-pinreset",
    "group": "Banco (descrição sanitizada)",
    "title": "RPA de reset de PIN",
    "status": "Produção",
    "stack": [
      ".NET 8",
      "Playwright",
      "SQL Server",
      "EF Core",
      "DACPAC",
      "Azure DevOps"
    ],
    "problem": "O tratamento de tentativas de PIN exigia passos manuais repetitivos em vários portais.",
    "solution": "Robot que orquestra três portais web e trata o reset de forma automática, com política de negócio configurável e verificação posterior.",
    "decisions": [
      "Impacto (estimativa interna): tarefa que ocupava uma equipa de 4 pessoas a tempo inteiro passou a correr sozinha, todos os dias, com capacidade cerca de 7 vezes superior à manual.",
      "Idempotência e retoma por checkpoints, para recuperar execuções interrompidas sem repetir trabalho.",
      "Schema SQL versionado como projecto DACPAC, com testes de paridade face ao EF Core.",
      "Credenciais e dados sensíveis cifrados com AES-GCM; ficheiros intermédios sensíveis não persistem em disco.",
      "Vários runners em paralelo com contextos de browser isolados."
    ],
    "link": null
  },
  {
    "id": "rpa-journais",
    "group": "Banco (descrição sanitizada)",
    "title": "RPA de journais electrónicos de ATM",
    "status": "Produção",
    "stack": [
      ".NET 8",
      "Playwright",
      "EF Core",
      "SQL Server",
      "SMB/SFTP/FTP",
      "SonarQube"
    ],
    "problem": "A recolha e reconciliação de journais de ATM era um processo manual.",
    "solution": "Robot que extrai os journais de um portal web, converte-os, reconcilia-os com outro sistema e envia relatórios.",
    "decisions": [
      "Impacto (estimativa interna): um ciclo que exigia várias pessoas durante 2 dias passou a concluir-se em menos de 1 dia, sem intervenção humana.",
      "Armazenamento multi-protocolo (SMB, SFTP, FTP) com fallback e retentativas.",
      "Checkpoints por ATM e recuperação após falhas.",
      "Auditoria de execuções, etapas e eventos.",
      "Correcção de vulnerabilidades e hotspots apontados pelo SonarQube; pipeline CI/CD."
    ],
    "link": null
  },
  {
    "id": "rpa-conciliacao",
    "group": "Banco (descrição sanitizada)",
    "title": "Serviço Windows de conciliação de movimentos ATM",
    "status": "Em desenvolvimento",
    "stack": [
      ".NET 8",
      "Windows Service",
      "SignalR",
      "JWT",
      "EF Core",
      "DACPAC"
    ],
    "problem": "A conciliação de transacções entre dois sistemas e o reporte eram manuais e sem monitorização.",
    "solution": "Serviço que concilia movimentos, produz relatórios Excel, envia dados consolidados a uma API interna com fila de reenvio e expõe um dashboard em tempo real.",
    "decisions": [
      "Impacto: passou a existir um controlo que antes não se fazia, concluído em cerca de 4 horas; o equivalente manual levaria cerca de 2 dias.",
      "Agendador diário com relógio de negócio e reexecução configurável.",
      "Escrita de Excel em streaming e esperas dinâmicas para reduzir tempos.",
      "Configuração por ambiente e base de dados criada e validada pelo DACPAC."
    ],
    "link": null
  },
  {
    "id": "standards",
    "group": "Banco (descrição sanitizada)",
    "title": "Standards de engenharia com Claude Code",
    "status": "Em evolução",
    "stack": [
      "Claude Code",
      ".NET",
      "React",
      "SonarQube"
    ],
    "problem": "Equipas diferentes aplicavam convenções diferentes de arquitectura, qualidade e segurança.",
    "solution": "Conjunto de agentes, comandos e skills versionados que uniformizam o desenvolvimento .NET e React e fazem a revisão antes do PR.",
    "decisions": [
      "Convenções transversais: arquitectura limpa, API, resiliência, segredos, observabilidade e testes.",
      "Gates de qualidade integrados com SonarQube."
    ],
    "link": null
  },
  {
    "id": "agent-orchestrator",
    "group": "Projectos pessoais",
    "title": "Agent-Orchestrator",
    "status": "Protótipo avançado",
    "stack": [
      "Python (stdlib)",
      "git worktrees",
      "Claude Code"
    ],
    "problem": "Vários subagentes em paralelo colidem nos mesmos ficheiros.",
    "solution": "Skill do Claude Code que coordena subagentes com plano em DAG, worktrees isolados e integração por ondas com testes.",
    "decisions": [
      "Hook que impede escritas fora do conjunto de ficheiros de cada tarefa.",
      "Retentativas para limites de uso e falhas de proxy.",
      "Limitação: sem CI; a validação em sessões reais ainda está em curso."
    ],
    "link": "https://github.com/HackMaster300/Agent-Orchestrator"
  },
  {
    "id": "job-hunter",
    "group": "Projectos pessoais",
    "title": "Job-Hunter",
    "status": "v1.6",
    "stack": [
      "Python",
      "Node.js",
      "GitHub Actions"
    ],
    "problem": "Procurar vagas e adaptar CV e carta consome tempo e arrisca enviar documentos sem revisão.",
    "solution": "Skill que procura vagas sem LLM, avalia a adequação e só liberta CV e carta após aprovação determinística de 6 agentes revisores.",
    "decisions": [
      "Anúncios tratados como dados, não como instruções (defesa contra prompt injection).",
      "Nunca submete candidaturas; a decisão final é humana.",
      "Instalação a partir do repositório."
    ],
    "link": "https://github.com/HackMaster300/Job-Hunter"
  },
  {
    "id": "triscalier",
    "group": "Projectos pessoais",
    "title": "Triscalier",
    "status": "v0.1.0, protótipo",
    "stack": [
      "Node.js",
      "Markdown",
      "Claude Code"
    ],
    "problem": "Auditorias de segurança e conformidade antes do lançamento são inconsistentes.",
    "solution": "Skill que audita sites e aplicações contra 40 pontos de segurança, privacidade, consumidor e produção, com limite de complexidade ciclomática, e corrige em paralelo.",
    "decisions": [
      "Pede autorização antes de corrigir e re-audita no fim.",
      "Usa a LGPD brasileira como referência de privacidade.",
      "Limitação: sem testes nem CI."
    ],
    "link": "https://github.com/HackMaster300/Triscalier"
  },
  {
    "id": "software-factory",
    "group": "Projectos pessoais",
    "title": "software-factory",
    "status": "Protótipo avançado",
    "stack": [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "SQLite",
      "Docker"
    ],
    "problem": "Começar projectos novos com a mesma arquitectura exige repetir trabalho de estrutura.",
    "solution": "Plataforma que define blueprints de arquitectura e gera scaffolds em 8 linguagens.",
    "decisions": [
      "CI que compila o produto gerado nas várias linguagens.",
      "Mitigação de Zip Slip e SSRF no proxy de IA; cifra AES-256-GCM em repouso.",
      "Limitação: só 2 de 13 agregados têm persistência por API."
    ],
    "link": "https://github.com/HackMaster300/software-factory"
  },
  {
    "id": "pulseflow",
    "group": "Projectos pessoais",
    "title": "PulseFlow",
    "status": "MVP, repositório privado",
    "stack": [
      ".NET 8",
      "Blazor Server",
      "SignalR",
      "EF Core",
      "MediatR",
      "Testcontainers"
    ],
    "problem": "Gestão de projectos e tarefas com auditoria e integrações num único sistema.",
    "solution": "Plataforma de gestão operacional com Clean Architecture e CQRS, API JWT, webhooks e servidor MCP.",
    "decisions": [
      "684 métodos de teste (unitários, integração com SQL Server real, E2E) e testes de arquitectura.",
      "RBAC, rate limiting, histórico de passwords e auditoria completa.",
      "Propostas de mudança de estado geradas a partir de commits exigem decisão humana."
    ],
    "link": null
  },
  {
    "id": "estudio-palito",
    "group": "Projectos pessoais",
    "title": "estudio-palito",
    "status": "Pré-MVP, uso local, repositório privado",
    "stack": [
      "TypeScript",
      "Remotion",
      "React",
      "Hono",
      "Zod",
      "Vitest"
    ],
    "problem": "Produzir vídeos explicativos em português de Moçambique é lento e caro.",
    "solution": "Motor e estúdio local que gera vídeos a partir de JSON, com voz, legendas e guião assistido por IA multi-fornecedor.",
    "decisions": [
      "Cache por segmento: re-exportar só renderiza o que mudou.",
      "O áudio não sai da máquina (Whisper local).",
      "Servidor local endurecido (guardas de Host/Origin, confinamento de caminhos)."
    ],
    "link": null
  }
];
