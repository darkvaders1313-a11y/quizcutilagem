/**
 * Cutilagem Russa — Quiz Funnel
 * Personalização profunda: cada escolha muda o final
 */

(() => {
  "use strict";

  // ── Quiz data ──────────────────────────────────────────
  // Opções cobrem do ZERO total até quem já atende,
  // alinhadas aos cursos do Drive (cutilagem, manicure, gel, anti-medo…)
  const STEPS = [
    {
      id: "perfil",
      stepLabel: "sobre você",
      question: "qual o seu momento com unhas?",
      hint: "não tem resposta errada — a gente monta o curso no seu nível",
      cta: "continuar",
      options: [
        { id: "zero", emoji: "🌱", label: "não sei nada — quero do zero" },
        { id: "casa", emoji: "🏠", label: "só faço em casa (em mim ou amiga)" },
        { id: "ja_faco", emoji: "💅", label: "já faço unhas e quero melhorar" },
        { id: "pro", emoji: "💼", label: "já atendo cliente e quero evoluir" },
        { id: "carreira", emoji: "🔄", label: "quero mudar de vida / de emprego" },
        { id: "renda", emoji: "💵", label: "quero uma renda extra com unhas" },
      ],
    },
    {
      id: "tecnica",
      stepLabel: "seu nível",
      question: "o que você já sabe fazer hoje?",
      hint: "fale a verdade — isso muda os módulos do seu curso",
      cta: "essa é minha base",
      options: [
        { id: "nenhuma", emoji: "🙈", label: "não sei nada de unhas ainda" },
        { id: "so_esmalte", emoji: "🎨", label: "só passo esmalte, sem cutilagem" },
        { id: "youtube", emoji: "📱", label: "só vi no celular, quase não pratiquei" },
        { id: "alicate", emoji: "✂️", label: "só uso alicate" },
        { id: "lixa", emoji: "🪵", label: "uso lixa e faço na mão" },
        { id: "motor_basico", emoji: "⚙️", label: "tenho motor, mas travo na hora" },
        { id: "russa_inicio", emoji: "🇷🇺", label: "já tentei cutilagem russa" },
        { id: "dominio", emoji: "🏆", label: "já sei bastante, quero aperfeiçoar" },
      ],
    },
    {
      id: "equipamento",
      stepLabel: "seu material",
      question: "o que você tem pra trabalhar hoje?",
      cta: "esse é meu material",
      options: [
        { id: "nada", emoji: "📦", label: "não tenho quase nada ainda" },
        { id: "barato", emoji: "🛒", label: "só alicate e lixa barata" },
        { id: "basico", emoji: "🧰", label: "kit básico de casa" },
        { id: "motor", emoji: "🔌", label: "já tenho motor / lixadeira" },
        { id: "completo", emoji: "💎", label: "tenho bastante material de profissional" },
      ],
    },
    {
      id: "desafio",
      stepLabel: "sua dificuldade",
      question: "qual sua maior dificuldade agora?",
      cta: "essa é a dificuldade",
      options: [
        { id: "comecar", emoji: "🧭", label: "não sei por onde começar" },
        { id: "medo", emoji: "😰", label: "medo de machucar / cortar" },
        { id: "motor_medo", emoji: "⚡", label: "nunca usei motor e tenho medo" },
        { id: "brocas", emoji: "🛠️", label: "não sei qual broca usar" },
        { id: "irregular", emoji: "🪞", label: "cutícula fica feia / torta" },
        { id: "material", emoji: "💳", label: "medo de gastar com material errado" },
        { id: "tempo", emoji: "⏱️", label: "demoro muito pra fazer" },
        { id: "preco", emoji: "💸", label: "não sei quanto cobrar" },
        { id: "cliente", emoji: "🙋", label: "não sei como conseguir cliente" },
        { id: "inseguranca", emoji: "🫣", label: "fico insegura se ficou bom" },
      ],
    },
    {
      id: "meta",
      stepLabel: "seu objetivo",
      question: "o que você mais quer com unhas?",
      cta: "é esse o objetivo",
      options: [
        { id: "aprender", emoji: "📘", label: "aprender do jeito certo, do zero" },
        { id: "acabamento", emoji: "✨", label: "fazer unha que parece de salão" },
        { id: "primeira", emoji: "🤝", label: "atender a primeira cliente sem medo" },
        { id: "cobrar", emoji: "💰", label: "conseguir cobrar mais" },
        { id: "agenda", emoji: "📅", label: "encher a agenda de cliente" },
        { id: "casa", emoji: "🏡", label: "trabalhar de casa com unhas" },
        { id: "instagram", emoji: "📱", label: "postar unha linda no Instagram" },
        { id: "referencia", emoji: "🏆", label: "ser a mais falada da região" },
        { id: "liberdade", emoji: "🕊️", label: "viver de unhas de verdade" },
      ],
    },
    {
      id: "estilo",
      stepLabel: "o que quer fazer",
      question: "o que você mais quer aprender a fazer?",
      hint: "pode ser o que você ama ou o que mais pede cliente",
      cta: "montar meu curso",
      options: [
        { id: "cuticula", emoji: "🇷🇺", label: "cutilagem russa / cutícula perfeita" },
        { id: "nude", emoji: "🤍", label: "unha nude limpinha" },
        { id: "baby", emoji: "🎀", label: "baby boomer" },
        { id: "french", emoji: "🇫🇷", label: "francesinha" },
        { id: "gel", emoji: "🧴", label: "esmaltação em gel" },
        { id: "polygel", emoji: "💜", label: "polygel / alongamento" },
        { id: "glossy", emoji: "✨", label: "unha com brilho de salão" },
        { id: "spa", emoji: "🦶", label: "pé e spa dos pés também" },
        { id: "todos", emoji: "💎", label: "quero aprender de tudo" },
      ],
    },
  ];

  // Labels simples (ecoam o que a aluna escolheu)
  const LABELS = {
    perfil: {
      zero: { short: "do zero", chip: "não sei nada ainda", voice: "você está começando do zero" },
      casa: { short: "em casa", chip: "só faço em casa", voice: "você só faz unha em casa" },
      ja_faco: { short: "já faz", chip: "já faço unhas", voice: "você já faz unhas e quer melhorar" },
      pro: { short: "já atende", chip: "já atendo cliente", voice: "você já atende e quer evoluir" },
      carreira: { short: "nova vida", chip: "mudar de vida", voice: "você quer mudar de vida com unhas" },
      renda: { short: "renda extra", chip: "renda extra", voice: "você quer uma renda extra com unhas" },
    },
    tecnica: {
      nenhuma: {
        short: "não sabe nada",
        chip: "não sei nada ainda",
        voice: "ainda não sabe nada de unhas",
        level: "iniciante",
      },
      so_esmalte: {
        short: "só esmalte",
        chip: "só passo esmalte",
        voice: "hoje só passa esmalte, sem cutilagem",
        level: "iniciante",
      },
      youtube: {
        short: "só vi no celular",
        chip: "só vi no celular",
        voice: "só vi no celular e quase não praticou",
        level: "iniciante",
      },
      alicate: {
        short: "só alicate",
        chip: "só alicate",
        voice: "hoje só usa alicate",
        level: "básico",
      },
      lixa: {
        short: "lixa e mão",
        chip: "lixa e faço na mão",
        voice: "trabalha com lixa e na mão",
        level: "básico",
      },
      motor_basico: {
        short: "motor com trava",
        chip: "tenho motor, mas travo",
        voice: "já tem motor, mas ainda trava",
        level: "intermediário",
      },
      russa_inicio: {
        short: "já tentou russa",
        chip: "já tentei cutilagem russa",
        voice: "já tentou cutilagem russa e quer fazer direito",
        level: "intermediário",
      },
      dominio: {
        short: "já sabe bastante",
        chip: "já sei bastante",
        voice: "já sabe bastante e quer aperfeiçoar",
        level: "avançado",
      },
    },
    equipamento: {
      nada: { short: "sem material", chip: "quase sem material", voice: "ainda não tem material" },
      barato: { short: "alicate e lixa", chip: "alicate e lixa barata", voice: "só tem alicate e lixa barata" },
      basico: { short: "kit básico", chip: "kit básico", voice: "tem kit básico em casa" },
      motor: { short: "tem motor", chip: "tem motor", voice: "já tem motor" },
      completo: { short: "bem equipada", chip: "material de profissional", voice: "já tem bastante material" },
    },
    desafio: {
      comecar: {
        short: "não sei começar",
        chip: "não sei por onde começar",
        pain: "não saber por onde começar trava tudo",
        fix: "passo a passo do zero",
      },
      medo: {
        short: "medo de cortar",
        chip: "medo de machucar",
        pain: "o medo de machucar trava a mão",
        fix: "fazer sem medo",
      },
      motor_medo: {
        short: "medo do motor",
        chip: "medo de usar o motor",
        pain: "o medo do motor impede de evoluir",
        fix: "usar o motor com calma",
      },
      brocas: {
        short: "não sei as brocas",
        chip: "não sei qual broca",
        pain: "sem saber a broca, cada unha vira chute",
        fix: "qual broca usar e em que ordem",
      },
      irregular: {
        short: "cutícula feia",
        chip: "cutícula fica feia",
        pain: "cutícula feia estraga o resultado",
        fix: "cutícula lisinha",
      },
      material: {
        short: "medo de gastar errado",
        chip: "medo de gastar errado",
        pain: "medo de gastar com material errado",
        fix: "lista do que comprar de verdade",
      },
      tempo: {
        short: "demora muito",
        chip: "demoro muito",
        pain: "demorar muito cansa e rende pouco",
        fix: "fazer mais rápido",
      },
      preco: {
        short: "não sei cobrar",
        chip: "não sei quanto cobrar",
        pain: "não saber o preço deixa você cobrando barato",
        fix: "saber quanto cobrar",
      },
      cliente: {
        short: "sem cliente",
        chip: "não sei conseguir cliente",
        pain: "sem cliente o serviço não vira dinheiro",
        fix: "como chamar e atender cliente",
      },
      inseguranca: {
        short: "insegura no final",
        chip: "fico insegura se ficou bom",
        pain: "a insegurança baixa o preço e a confiança",
        fix: "saber se ficou bom de verdade",
      },
    },
    meta: {
      aprender: {
        short: "aprender do zero",
        chip: "aprender do jeito certo",
        desire: "aprender do jeito certo, do zero",
        cta: "quero aprender do zero",
      },
      acabamento: {
        short: "unha de salão",
        chip: "unha de salão",
        desire: "fazer unha que parece de salão",
        cta: "quero unha de salão",
      },
      primeira: {
        short: "primeira cliente",
        chip: "atender a primeira cliente",
        desire: "atender a primeira cliente sem medo",
        cta: "quero atender minha primeira cliente",
      },
      cobrar: {
        short: "cobrar mais",
        chip: "cobrar mais",
        desire: "conseguir cobrar mais",
        cta: "quero cobrar mais",
      },
      agenda: {
        short: "agenda cheia",
        chip: "encher a agenda",
        desire: "encher a agenda de cliente",
        cta: "quero encher minha agenda",
      },
      casa: {
        short: "trabalhar de casa",
        chip: "trabalhar de casa",
        desire: "trabalhar de casa com unhas",
        cta: "quero trabalhar de casa",
      },
      instagram: {
        short: "Instagram",
        chip: "postar no Instagram",
        desire: "postar unha linda no Instagram",
        cta: "quero postar unha linda",
      },
      referencia: {
        short: "ser a melhor",
        chip: "ser a mais falada",
        desire: "ser a manicure mais falada da região",
        cta: "quero ser a melhor da região",
      },
      liberdade: {
        short: "viver de unhas",
        chip: "viver de unhas",
        desire: "viver de unhas de verdade",
        cta: "quero viver de unhas",
      },
    },
    estilo: {
      cuticula: { short: "cutilagem russa", chip: "cutilagem / cutícula", look: "cutícula perfeita" },
      nude: { short: "nude", chip: "nude limpinho", look: "nude limpinho" },
      baby: { short: "baby boomer", chip: "baby boomer", look: "baby boomer" },
      french: { short: "francesinha", chip: "francesinha", look: "francesinha" },
      gel: { short: "gel", chip: "esmaltação em gel", look: "esmaltação em gel" },
      polygel: { short: "polygel", chip: "polygel / alongamento", look: "polygel e alongamento" },
      glossy: { short: "brilho", chip: "brilho de salão", look: "unha com brilho de salão" },
      spa: { short: "spa dos pés", chip: "pé e spa", look: "pé e spa dos pés" },
      todos: { short: "de tudo", chip: "quero aprender de tudo", look: "várias técnicas" },
    },
  };

  // ── State ──────────────────────────────────────────────
  const state = {
    step: 0,
    answers: {},
    selected: null,
  };

  // ── DOM ────────────────────────────────────────────────
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const screens = {
    intro: $("#screen-intro"),
    quiz: $("#screen-quiz"),
    loading: $("#screen-loading"),
    offer: $("#screen-offer"),
  };

  // Biblioteca real (Drive) — usada na animação de montagem
  const CATALOG = [
    "Curso Cutilagem / Cutilagem Russa",
    "Cutilagem Russa",
    "Cutilagem Russa com Unhas em Gel",
    "Técnica Anti Medo",
    "Baby boomer",
    "Cursos Francesinhas",
    "Novo — Francesinhas com Polygel",
    "Esmaltação em Gel",
    "Esmaltação em Gel e Decoração",
    "Curso Completo Manicure",
    "Curso Completo Alongamento",
    "Curso Completo Molde F1",
    "Polygel",
    "Unhas Gel-X",
    "Caderno de Treino Nail Designer",
    "Aprenda Fotografias para Nail Designer",
    "Fornecedores Nail Designer",
    "Tabela de Valor",
    "Ferramentas",
    "3 Técnicas com Pó Cromado",
    "Curso Cascata de Gliter",
    "Curso Spa dos Pés",
    "Manicure e Pedicure Masculino",
    "Melhor formato p/ unhas ultralargas",
    "BAILARINA",
    "SQUARE QUADRADA",
    "Curso Extensão de Cílios",
    "Curso Maquiagem para Noivas",
    "Ficha Anamnese",
    "Figurinhas para Stories",
  ];

  const els = {
    btnStart: $("#btnStart"),
    btnBack: $("#btnBack"),
    btnNext: $("#btnNext"),
    quizStepLabel: $("#quizStepLabel"),
    quizQuestion: $("#quizQuestion"),
    quizHint: $("#quizHint"),
    quizOptions: $("#quizOptions"),
    progressTrack: $("#progressTrack"),
    offerBadge: $("#offerBadge"),
    offerTitle: $("#offerTitle"),
    offerTags: $("#offerTags"),
    offerInsights: $("#offerInsights"),
    offerDiag: $("#offerDiag"),
    offerWhy: $("#offerWhy"),
    offerCardKicker: $("#offerCardKicker"),
    offerCardTitle: $("#offerCardTitle"),
    offerList: $("#offerList"),
    btnCheckout: $("#btnCheckout"),
    offerSocialProof: $("#offerSocialProof"),
    loadingTitle: $("#loadingTitle"),
    loadingStory: $("#loadingStory"),
    buildStatus: $("#buildStatus"),
    buildPct: $("#buildPct"),
    buildFill: $("#buildFill"),
    buildHint: $("#buildHint"),
    buildFeedList: $("#buildFeedList"),
    buildStack: $("#buildStack"),
    buildStackItems: $("#buildStackItems"),
    buildBar: $(".build-bar"),
    introVideo: $("#introVideo"),
    quizVideo: $("#quizVideo"),
    introPlay: $("#introPlay"),
    quizPlay: $("#quizPlay"),
    resultsRow: $("#resultsRow"),
  };

  // Timers da montagem (pra poder limpar se voltar — edge case)
  let buildTimers = [];
  let buildRaf = null;

  function clearBuildTimers() {
    buildTimers.forEach(clearTimeout);
    buildTimers = [];
    if (buildRaf) {
      cancelAnimationFrame(buildRaf);
      buildRaf = null;
    }
  }

  function later(ms, fn) {
    const id = setTimeout(fn, ms);
    buildTimers.push(id);
    return id;
  }

  // Build progress segments once
  function buildProgress() {
    els.progressTrack.innerHTML = STEPS.map(
      (_, i) => `<span class="progress__seg" data-seg="${i}"></span>`
    ).join("");
  }
  buildProgress();

  // ── Screen transitions ─────────────────────────────────
  function showScreen(name) {
    // ao trocar de tela, corta qualquer áudio/vídeo
    stopAllVideos();

    Object.entries(screens).forEach(([key, el]) => {
      if (!el) return;
      if (key === name) {
        el.classList.add("screen--active");
        el.classList.remove("screen--exit");
      } else if (el.classList.contains("screen--active")) {
        el.classList.add("screen--exit");
        setTimeout(() => {
          el.classList.remove("screen--active", "screen--exit");
        }, 280);
      }
    });

    // Fundo mudo de novo + play pulsando
    if (name === "intro") {
      setTimeout(() => startIntroBackground(), 50);
    }
    if (name === "quiz") {
      setTimeout(() => startQuizBackground(), 50);
    }

    try {
      window.scrollTo({ top: 0, behavior: "instant" });
    } catch {
      window.scrollTo(0, 0);
    }
  }

  // ── Video: parar áudio de verdade em toda navegação ────
  function showPlayOverlay(overlay) {
    if (!overlay) return;
    overlay.classList.remove("is-hidden");
    overlay.setAttribute("aria-label", "Toque para ouvir");
  }

  /** Para o vídeo e volta o play pulsando — NÃO reinicia sozinho */
  function stopVideo(video, overlay) {
    if (!video) return;
    video.loop = false;
    try {
      video.pause();
    } catch (_) {}
    video.muted = true;
    try {
      video.currentTime = 0;
    } catch (_) {}
    showPlayOverlay(overlay);
  }

  function stopAllVideos() {
    stopVideo(els.introVideo, els.introPlay);
    stopVideo(els.quizVideo, els.quizPlay);
    document.querySelectorAll("video").forEach((v) => {
      try {
        v.loop = false;
        v.pause();
        v.muted = true;
      } catch (_) {}
    });
  }

  // Vídeos por etapa do quiz (mesmo formato do intro)
  const QUIZ_VIDEOS = {
    perfil: "assets/quiz-momento.mp4",
    tecnica: "assets/quiz-tecnica.mp4",
    equipamento: "assets/quiz-equipamento.mp4",
    desafio: "assets/quiz-desafio.mp4",
    meta: "assets/quiz-meta.mp4",
    estilo: "assets/quiz-estilo.mp4",
  };
  const QUIZ_VIDEO_DEFAULT = "assets/quiz-momento.mp4";

  function getQuizVideoSrc(stepIndex) {
    const step = STEPS[stepIndex];
    if (step && QUIZ_VIDEOS[step.id]) return QUIZ_VIDEOS[step.id];
    return QUIZ_VIDEO_DEFAULT;
  }

  /**
   * Fundo mudo UMA vez (sem loop).
   * Quando acaba → play pulsando de novo, sem tocar sozinho.
   */
  function startBgVideo(video, overlay) {
    if (!video) return;
    video.loop = false;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    try {
      video.currentTime = 0;
    } catch (_) {}

    // overlay fica visível por cima enquanto roda mudo
    showPlayOverlay(overlay);

    video.play().catch(() => {
      // autoplay bloqueado: só fica o play pulsando
      showPlayOverlay(overlay);
    });
  }

  function startIntroBackground() {
    startBgVideo(els.introVideo, els.introPlay);
  }

  function videoBasename(url) {
    if (!url) return "";
    try {
      const path = decodeURIComponent(String(url).split("?")[0]);
      return path.split("/").pop() || "";
    } catch {
      return String(url).split("/").pop() || "";
    }
  }

  function startQuizBackground() {
    const video = els.quizVideo;
    if (!video) return;

    const src = getQuizVideoSrc(state.step);
    const want = videoBasename(src);
    const have = videoBasename(video.currentSrc || video.getAttribute("src") || video.src);

    // sempre garante o vídeo da etapa atual (ex.: dificuldade = quiz-desafio.mp4)
    if (have !== want) {
      try {
        video.pause();
      } catch (_) {}
      video.muted = true;
      video.loop = false;
      video.src = src;
      video.load();
    }

    startBgVideo(video, els.quizPlay);
  }

  /**
   * Toque no play:
   * - toca do começo COM SOM (sem loop)
   * - se já estiver tocando com som, para e volta o play
   * Ao terminar o vídeo: volta o play pulsando (nunca repete sozinho)
   */
  function bindListenOverlay(video, overlay, otherVideo) {
    if (!video || !overlay || video.dataset.listenBound === "1") return;
    video.dataset.listenBound = "1";

    // quando acabar (com ou sem som) → play pulsando, sem autoplay de novo
    video.addEventListener("ended", () => {
      video.loop = false;
      video.muted = true;
      try {
        video.pause();
        video.currentTime = 0;
      } catch (_) {}
      showPlayOverlay(overlay);
    });

    overlay.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const isListening = !video.muted && !video.paused;

      if (isListening) {
        // lead tocou de novo enquanto ouvia → para e volta o play
        stopVideo(video, overlay);
        return;
      }

      // corta o outro vídeo
      if (otherVideo) {
        stopVideo(
          otherVideo,
          otherVideo === els.introVideo ? els.introPlay : els.quizPlay
        );
      }

      // sempre do começo, COM SOM, SEM loop
      try {
        video.pause();
        video.currentTime = 0;
      } catch (_) {}
      video.loop = false;
      video.muted = false;

      const playFromStart = () => {
        const p = video.play();
        if (p && typeof p.catch === "function") {
          p.catch(() => {
            // se falhar com som, tenta mudo (raro) mas ainda sem loop
            video.muted = true;
            video.play().catch(() => {});
          });
        }
      };

      if (video.readyState >= 1) {
        playFromStart();
      } else {
        video.addEventListener("loadeddata", playFromStart, { once: true });
      }
      overlay.classList.add("is-hidden");
    });
  }

  bindListenOverlay(els.introVideo, els.introPlay, els.quizVideo);
  bindListenOverlay(els.quizVideo, els.quizPlay, els.introVideo);
  startIntroBackground();

  // ── Helpers ────────────────────────────────────────────
  function L(group, id) {
    return (LABELS[group] && LABELS[group][id]) || null;
  }

  function getPersona(a) {
    return {
      perfil: L("perfil", a.perfil),
      tecnica: L("tecnica", a.tecnica),
      equipamento: L("equipamento", a.equipamento),
      desafio: L("desafio", a.desafio),
      meta: L("meta", a.meta),
      estilo: L("estilo", a.estilo),
    };
  }

  /**
   * Nome e promessa do curso — linguagem simples.
   * Sempre lidera pelo que ELA QUER.
   */
  function buildCourseIdentity(a, p) {
    const levelEasy = {
      iniciante: "do zero",
      básico: "do começo",
      "básico+": "do começo",
      intermediário: "pra quem já mexe um pouco",
      "intermediário+": "pra quem já tentou",
      avançado: "pra aperfeiçoar",
    };
    const levelRaw = (p.tecnica && p.tecnica.level) || "do zero";
    const level = levelEasy[levelRaw] || levelRaw;
    const estilo = (p.estilo && p.estilo.look) || "unha bonita";

    const goalNames = {
      aprender: "Começar do zero",
      acabamento: "Unha de salão",
      primeira: "Primeira cliente",
      cobrar: "Cobrar mais",
      agenda: "Agenda cheia",
      casa: "Trabalhar de casa",
      instagram: "Unha pro Instagram",
      referencia: "Ser a melhor da região",
      liberdade: "Viver de unhas",
    };
    const goalName = goalNames[a.meta] || "Curso de unhas";
    const goalShort = {
      aprender: "aprender do zero",
      acabamento: "fazer unha de salão",
      primeira: "atender a primeira cliente",
      cobrar: "cobrar mais",
      agenda: "encher a agenda",
      casa: "trabalhar de casa",
      instagram: "postar unha linda",
      referencia: "ser a melhor da região",
      liberdade: "viver de unhas",
    };
    const goalVerb = goalShort[a.meta] || "fazer unha bonita";

    // Dificuldade → jeito simples (link genérico por meta)
    const bridge = {
      comecar: {
        short: "por onde começar",
        how: "com o passo a passo do zero",
        link: "a gente te mostra o primeiro passo, sem te jogar no meio",
      },
      medo: {
        short: "sem medo de machucar",
        how: "sem medo de cortar",
        link: "sem medo na mão, o resultado e o preço melhoram",
      },
      motor_medo: {
        short: "sem medo do motor",
        how: "aprendendo o motor com calma",
        link: "motor com calma é o que separa amadora de profissional",
      },
      brocas: {
        short: "qual broca usar",
        how: "sabendo qual broca usar",
        link: "broca certa = cutícula limpa = unha que parece cara",
      },
      irregular: {
        short: "cutícula lisinha",
        how: "deixando a cutícula lisinha",
        link: "cutícula lisinha é o que a cliente nota na hora",
      },
      material: {
        short: "o que comprar",
        how: "sabendo o que comprar de verdade",
        link: "lista certa evita gastar dinheiro à toa",
      },
      tempo: {
        short: "mais rápido",
        how: "fazendo mais rápido",
        link: "mais rápida = mais cliente no dia = mais dinheiro",
      },
      preco: {
        short: "quanto cobrar",
        how: "sabendo quanto cobrar",
        link: "preço certo é o que faz o trabalho valer a pena",
      },
      cliente: {
        short: "conseguir cliente",
        how: "aprendendo a chamar cliente",
        link: "sem cliente não tem renda — a gente te mostra o caminho",
      },
      inseguranca: {
        short: "sair da insegurança",
        how: "sabendo se ficou bom",
        link: "quando você tem certeza, cobra melhor e posta com orgulho",
      },
    };

    const b = bridge[a.desafio] || {
      short: "cutilagem russa",
      how: "com o jeito certo",
      link: `a gente montou o curso pra você ${goalVerb}`,
    };
    const linkLine =
      typeof b.link === "string"
        ? b.link
        : `a gente montou o curso pra você ${goalVerb}`;

    const name = `Seu curso: ${goalName}`;
    const subtitle = `${b.short} · ${level} · ${estilo}`;
    const cardTitle = `${goalName} — módulos do seu nível`;

    const promiseByMeta = {
      aprender: `seu curso pra começar do zero — ${b.how}`,
      acabamento: `seu curso pra unha de salão — ${b.how}`,
      primeira: `seu curso pra atender a primeira cliente — ${b.how}`,
      cobrar: `seu curso pra cobrar mais — ${b.how}`,
      agenda: `seu curso pra encher a agenda — ${b.how}`,
      casa: `seu curso pra trabalhar de casa — ${b.how}`,
      instagram: `seu curso pra postar unha linda — ${b.how}`,
      referencia: `seu curso pra ser a melhor da região — ${b.how}`,
      liberdade: `seu curso pra viver de unhas — ${b.how}`,
    };
    const headline =
      promiseByMeta[a.meta] || `seu curso de unhas — ${b.how}`;

    return {
      name,
      subtitle,
      cardTitle,
      headline,
      linkLine,
      goalName,
      goalVerb,
      bridgeShort: b.short,
      level,
      estilo,
    };
  }

  function buildHeadline(p, a) {
    return buildCourseIdentity(a, p).headline;
  }

  /** Mini-cards do resumo (no lugar do parágrafo longo) */
  function buildInsights(p, a) {
    const id = buildCourseIdentity(a || state.answers, p);
    const quer = p.meta ? p.meta.chip || p.meta.desire : id.goalVerb;
    const trava = p.desafio ? p.desafio.chip : id.bridgeShort;

    return [
      { e: "🎯", k: "você quer", v: quer },
      { e: "🔧", k: "a trava hoje", v: trava },
      { e: "✨", k: "o curso foca em", v: id.bridgeShort },
    ];
  }

  /** Chips curtos no lugar da linha uppercase densa */
  function buildOfferTags(p, a) {
    const id = buildCourseIdentity(a || state.answers, p);
    return [id.bridgeShort, id.level, id.estilo].filter(Boolean);
  }

  /** Iniciante total? (não sabe nada / só esmalte / só viu no celular / do zero) */
  function isBeginner(a) {
    return (
      a.perfil === "zero" ||
      a.perfil === "renda" ||
      a.tecnica === "nenhuma" ||
      a.tecnica === "so_esmalte" ||
      a.tecnica === "youtube" ||
      a.meta === "aprender" ||
      a.desafio === "comecar"
    );
  }

  /**
   * MÓDULOS reais do Drive com base nas respostas.
   * Ordem: base zero → cutilagem → dificuldade → material → estilo → meta.
   */
  function pickModulesForUser(a) {
    const picked = [];
    const seen = new Set();

    const add = (name, why) => {
      if (!name || seen.has(name)) return;
      seen.add(name);
      picked.push({ name, why });
    };

    const beginner = isBeginner(a);

    // ── TRILHA DO ZERO (prioridade alta) ──
    if (beginner) {
      add(
        "Curso Completo Manicure",
        "base do zero — manicure completa, bem devagar"
      );
      add(
        "Caderno de Treino Nail Designer",
        "pra praticar em casa sem pressa"
      );
    }

    // ── SEMPRE: cutilagem (coração da oferta) ──
    add(
      "Cutilagem Russa",
      beginner
        ? "você aprende cutícula limpa mesmo começando agora"
        : "é o coração do curso — cutícula limpa e bem feita"
    );
    add(
      "Curso Cutilagem / Cutilagem Russa",
      beginner
        ? "passo a passo da cutilagem, do começo"
        : "passo a passo completo da técnica"
    );

    // ── DIFICULDADE ──
    if (
      a.desafio === "medo" ||
      a.desafio === "motor_medo" ||
      a.desafio === "inseguranca" ||
      a.meta === "primeira"
    ) {
      add("Técnica Anti Medo", "pra perder o medo de errar e de machucar");
    }
    if (
      a.desafio === "brocas" ||
      a.desafio === "motor_medo" ||
      a.tecnica === "motor_basico" ||
      a.tecnica === "russa_inicio"
    ) {
      add("Ferramentas", "mostra brocas e material — sem adivinhar");
    }
    if (
      a.desafio === "irregular" ||
      a.desafio === "brocas" ||
      a.tecnica === "russa_inicio" ||
      a.tecnica === "dominio" ||
      a.estilo === "cuticula"
    ) {
      add(
        "Cutilagem Russa com Unhas em Gel",
        "pra cutícula ficar lisinha de verdade"
      );
    }
    if (
      a.desafio === "preco" ||
      a.meta === "cobrar" ||
      a.meta === "liberdade" ||
      a.perfil === "renda"
    ) {
      add("Tabela de Valor", "pra saber quanto cobrar sem se rebaixar");
    }
    if (a.desafio === "tempo") {
      add("Caderno de Treino Nail Designer", "treino pra ficar mais rápida");
    }
    if (a.desafio === "material" || a.equipamento === "nada" || a.equipamento === "barato") {
      add("Fornecedores Nail Designer", "onde comprar barato o que precisa");
      add("Ferramentas", "lista do que comprar — sem gastar à toa");
    }
    if (a.desafio === "cliente" || a.meta === "primeira" || a.meta === "agenda" || a.meta === "casa") {
      add("Figurinhas para Stories", "pra chamar cliente no celular");
      add(
        "Aprenda Fotografias para Nail Designer",
        "foto boa atrai cliente"
      );
    }
    if (a.desafio === "comecar") {
      add("Curso Completo Manicure", "começa do início, sem pular etapa");
      add("Ferramentas", "o básico de material pra não se perder");
    }

    // ── NÍVEL / TÉCNICA ──
    if (a.tecnica === "so_esmalte" || a.tecnica === "youtube") {
      add("Curso Completo Manicure", "vai além do esmalte — base de verdade");
      add("Esmaltação em Gel", "próximo passo depois do esmalte comum");
    }
    if (a.tecnica === "alicate" || a.tecnica === "lixa") {
      add("Curso Completo Manicure", "pra sair só do alicate/lixa");
    }
    if (a.tecnica === "dominio" || a.perfil === "pro") {
      add(
        "Cutilagem Russa com Unhas em Gel",
        "nível mais alto pro seu atendimento"
      );
    }

    // ── MATERIAL ──
    if (a.equipamento === "nada" || a.equipamento === "barato" || a.equipamento === "basico") {
      add("Fornecedores Nail Designer", "fornecedor bom e mais em conta");
    }
    if (a.equipamento === "motor" || a.equipamento === "completo") {
      add("Ferramentas", "pra usar melhor o que você já tem");
    }

    // ── ESTILO (cursos do Drive) ──
    if (a.estilo === "cuticula") {
      add("Cutilagem Russa", "foco total na cutícula perfeita");
      add("Técnica Anti Medo", "cutícula limpa sem medo de errar");
    }
    if (a.estilo === "baby" || a.estilo === "todos") {
      add("Baby boomer", "o estilo que você escolheu");
    }
    if (a.estilo === "french" || a.estilo === "todos") {
      add("Cursos Francesinhas", "francesinha limpinha");
      add("Novo — Francesinhas com Polygel", "francesinha com acabamento profissional");
    }
    if (a.estilo === "nude" || a.estilo === "glossy" || a.estilo === "gel" || a.estilo === "todos") {
      add("Esmaltação em Gel", "brilho e acabamento de salão");
    }
    if (a.estilo === "glossy" || a.estilo === "gel") {
      add("Esmaltação em Gel e Decoração", "unha com brilho que chama atenção");
    }
    if (a.estilo === "polygel" || a.estilo === "todos") {
      add("Polygel", "polygel e alongamento");
      add("Curso Completo Alongamento", "alongamento do jeito certo");
      add("Curso Completo Molde F1", "molde pra alongar com segurança");
    }
    if (a.estilo === "spa" || a.estilo === "todos") {
      add("Curso Spa dos Pés", "pé e spa — outro serviço pra ganhar mais");
    }
    if (a.estilo === "todos") {
      add("Unhas Gel-X", "mais uma técnica pedida pelas clientes");
    }

    // ── META ──
    if (a.meta === "aprender" || a.perfil === "zero") {
      add("Curso Completo Manicure", "caminho do zero até a primeira unha bem feita");
      add("Certificado com Seu Nome", "pra mostrar que você fez o curso");
    }
    if (a.meta === "primeira" || a.meta === "casa" || a.perfil === "casa" || a.perfil === "renda") {
      add("Ficha Anamnese", "pra atender igual profissional, mesmo em casa");
      add("Tabela de Valor", "pra não cobrar qualquer preço");
    }
    if (
      a.meta === "instagram" ||
      a.meta === "referencia" ||
      a.desafio === "cliente"
    ) {
      add("Aprenda Fotografias para Nail Designer", "foto que vende seu trabalho");
      add("Figurinhas para Stories", "stories que chamam cliente");
    }
    if (a.meta === "cobrar" || a.meta === "liberdade" || a.perfil === "carreira") {
      add("Tabela de Valor", "preço justo pro seu trabalho");
      add("Curso Completo Manicure", "base forte pra viver de unhas");
    }
    if (a.meta === "agenda" || a.meta === "referencia") {
      add("Ficha Anamnese", "atendimento organizado que fideliza");
    }
    if (a.meta === "acabamento") {
      add("Esmaltação em Gel", "fecha a unha com cara de salão");
    }

    // ── BÔNUS se lista ainda curta ──
    if (picked.length < 5) {
      add("Certificado com Seu Nome", "pra você mostrar que se formou");
    }
    if (picked.length < 5) {
      add("Curso Completo Manicure", "base completa de manicure");
    }

    return picked.slice(0, 8);
  }

  /**
   * Bullets da oferta = módulos reais que ela vai receber
   */
  function buildModules(a, p) {
    const mods = pickModulesForUser(a);
    return mods.map((m) => ({
      icon: "✓",
      name: m.name,
      why: m.why,
      text: m.name, // fallback
    }));
  }

  /** Por que foi feito pra você — frases curtas (legado) */
  function buildWhy(p, a) {
    return buildWhyCards(p, a).map(
      (item) => `<strong>${item.k}:</strong> ${item.v}`
    );
  }

  /** Por que foi feito pra você — mini-cards fáceis de ler */
  function buildWhyCards(p, a) {
    const id = buildCourseIdentity(a, p);
    const items = [];

    if (p.meta) {
      items.push({
        k: "o que você quer",
        v: `${p.meta.desire} — o curso inteiro aponta pra isso`,
      });
    }
    if (p.desafio) {
      items.push({
        k: "sua dificuldade",
        v: `${p.desafio.chip} · foco em ${id.bridgeShort}`,
      });
    }
    if (p.tecnica) {
      items.push({
        k: "seu nível",
        v: `${p.tecnica.chip} — começa do jeito que você está`,
      });
    }
    if (p.equipamento) {
      if (a.equipamento === "nada" || a.equipamento === "basico") {
        items.push({
          k: "seu material",
          v: `${p.equipamento.chip} · lista simples, sem luxo`,
        });
      } else {
        items.push({
          k: "seu material",
          v: `${p.equipamento.chip} · usa o que você já tem`,
        });
      }
    }
    if (p.estilo) {
      items.push({
        k: "seu gosto",
        v: `${p.estilo.chip} — exemplos nesse estilo`,
      });
    }

    return items;
  }

  /** Sempre sobe pro topo ao trocar de pergunta */
  function scrollQuizToTop() {
    const setTop = (el) => {
      if (!el) return;
      try {
        el.scrollTop = 0;
      } catch (_) {}
    };

    try {
      window.scrollTo(0, 0);
    } catch (_) {}
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    } catch (_) {}

    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;

    setTop(document.getElementById("app"));
    setTop(screens.quiz);
    setTop(document.querySelector(".quiz-body"));
    setTop(els.quizOptions);

    const header = document.querySelector(".quiz-header");
    if (header && typeof header.scrollIntoView === "function") {
      try {
        header.scrollIntoView({ block: "start", inline: "nearest", behavior: "auto" });
      } catch (_) {
        try {
          header.scrollIntoView(true);
        } catch (__) {}
      }
    }

    // reforço depois do paint (mobile às vezes “segura” o scroll do clique)
    requestAnimationFrame(() => {
      try {
        window.scrollTo(0, 0);
      } catch (_) {}
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
      setTop(screens.quiz);
      setTop(els.quizOptions);
    });
  }

  // ── Render quiz step ───────────────────────────────────
  function renderStep() {
    const step = STEPS[state.step];
    if (!step) return;

    state.selected = state.answers[step.id] || null;

    els.quizStepLabel.textContent = `${state.step + 1}/${STEPS.length} · ${step.stepLabel}`;
    els.quizQuestion.textContent = step.question;

    if (step.hint) {
      els.quizHint.hidden = false;
      els.quizHint.textContent = step.hint;
    } else {
      els.quizHint.hidden = true;
      els.quizHint.textContent = "";
    }

    els.btnNext.textContent = step.cta;
    els.btnNext.disabled = !state.selected;

    $$(".progress__seg", els.progressTrack).forEach((seg, i) => {
      seg.classList.toggle("is-done", i < state.step);
      seg.classList.toggle("is-current", i === state.step);
    });

    els.quizOptions.innerHTML = "";
    step.options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option" + (state.selected === opt.id ? " is-selected" : "");
      btn.setAttribute("role", "option");
      btn.setAttribute("aria-selected", state.selected === opt.id ? "true" : "false");
      btn.dataset.id = opt.id;
      btn.innerHTML = `
        <span class="option__emoji" aria-hidden="true">${opt.emoji}</span>
        <span class="option__label">${opt.label}</span>
        <span class="option__preview" aria-hidden="true"></span>
      `;
      btn.addEventListener("click", () => selectOption(opt.id));
      els.quizOptions.appendChild(btn);
    });

    // vídeo da etapa (fundo mudo + Toque para ouvir)
    startQuizBackground();

    // sempre começa no topo da nova pergunta
    scrollQuizToTop();
    setTimeout(scrollQuizToTop, 50);
    setTimeout(scrollQuizToTop, 150);
  }

  function selectOption(id) {
    state.selected = id;
    const step = STEPS[state.step];
    state.answers[step.id] = id;

    $$(".option", els.quizOptions).forEach((el) => {
      const on = el.dataset.id === id;
      el.classList.toggle("is-selected", on);
      el.setAttribute("aria-selected", on ? "true" : "false");
    });

    els.btnNext.disabled = false;
    if (navigator.vibrate) navigator.vibrate(8);
  }

  // ── Navigation ─────────────────────────────────────────
  function goNext() {
    if (!state.selected) return;

    // cada avanço de pergunta: para o vídeo/música
    stopAllVideos();
    scrollQuizToTop();

    if (state.step < STEPS.length - 1) {
      state.step += 1;
      renderStep(); // reativa fundo mudo da nova etapa + sobe pro topo
    } else {
      startLoading();
    }
  }

  function goBack() {
    stopAllVideos();
    scrollQuizToTop();

    if (state.step === 0) {
      showScreen("intro");
      return;
    }
    state.step -= 1;
    renderStep(); // reativa fundo mudo da etapa + sobe pro topo
  }

  // Feed de loading: nomes da biblioteca que “encaixam”
  function pickMatchedCourses(a) {
    return pickModulesForUser(a).map((m) => m.name);
  }

  // Chips da montagem = módulos reais
  function modulesForStack(a) {
    return pickModulesForUser(a)
      .slice(0, 5)
      .map((m) => m.name);
  }

  // ── Loading → Offer (montagem lenta e imersiva) ────────
  function startLoading() {
    const a = state.answers;
    const p = getPersona(a);
    const matched = pickMatchedCourses(a);
    const stackMods = modulesForStack(a);

    clearBuildTimers();
    showScreen("loading");

    // Reset UI
    if (els.buildFill) els.buildFill.style.width = "0%";
    if (els.buildPct) els.buildPct.textContent = "0%";
    if (els.buildStatus) els.buildStatus.textContent = "iniciando varredura…";
    if (els.buildFeedList) els.buildFeedList.innerHTML = "";
    if (els.buildStack) els.buildStack.hidden = true;
    if (els.buildStackItems) els.buildStackItems.innerHTML = "";
    if (els.buildBar) els.buildBar.classList.add("is-active");

    const difficulty =
      (p.desafio && p.desafio.chip) || "sua dificuldade";

    if (els.loadingTitle) {
      els.loadingTitle.textContent = "montando seu curso…";
    }
    if (els.loadingStory) {
      els.loadingStory.innerHTML = `+100 cursos · escolhendo os seus por: <strong>${difficulty}</strong>`;
    }
    if (els.buildHint) {
      els.buildHint.textContent = "aguarde — encaixando módulo por módulo";
    }

    // ── Barra lenta (~16s) com easing suave ──
    const DURATION = 16000;
    const start = performance.now();
    let lastPct = 0;

    // Status messages at percentage thresholds
    const statusAt = [
      { pct: 0, text: "lendo suas 6 respostas…" },
      { pct: 6, text: "abrindo a biblioteca de +100 cursos…" },
      { pct: 14, text: `filtrando pelo gargalo: ${difficulty}…` },
      { pct: 24, text: "descartando aulas que não servem pro seu nível…" },
      { pct: 36, text: "encontrando combinações na cutilagem russa…" },
      { pct: 48, text: "cruzando técnica atual + setup que você tem…" },
      { pct: 58, text: "encaixando módulos na ordem certa…" },
      { pct: 70, text: "personalizando a sequência do seu curso…" },
      { pct: 82, text: "gerando o protocolo automático final…" },
      { pct: 92, text: "últimos ajustes no seu caminho…" },
      { pct: 98, text: "curso montado. liberando…" },
    ];
    let statusIdx = 0;

    function setPct(pct) {
      const clamped = Math.min(100, Math.max(0, pct));
      lastPct = clamped;
      if (els.buildFill) els.buildFill.style.width = clamped.toFixed(1) + "%";
      if (els.buildPct) els.buildPct.textContent = Math.floor(clamped) + "%";

      while (statusIdx < statusAt.length - 1 && clamped >= statusAt[statusIdx + 1].pct) {
        statusIdx += 1;
        if (els.buildStatus) els.buildStatus.textContent = statusAt[statusIdx].text;
      }
    }

    // Ease-out cubic so it starts ok and slows near the end (mais “trabalhando”)
    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }
    // Mix with linear so it doesn't finish too fast at the start
    function progressEase(t) {
      // slightly slower middle: use smoothstep-ish
      const s = t * t * (3 - 2 * t);
      return t * 0.35 + s * 0.65;
    }

    function tick(now) {
      const t = Math.min(1, (now - start) / DURATION);
      const eased = progressEase(t);
      // Cap at 97 until the very end so it feels like finishing work
      const pct = t < 1 ? eased * 97 : 100;
      setPct(pct);
      if (t < 1) {
        buildRaf = requestAnimationFrame(tick);
      } else {
        setPct(100);
        if (els.buildStatus) els.buildStatus.textContent = "pronto — abrindo seu curso…";
        if (els.buildBar) els.buildBar.classList.remove("is-active");
        later(700, () => {
          buildOffer();
          showScreen("offer");
        });
      }
    }
    buildRaf = requestAnimationFrame(tick);
    if (els.buildStatus) els.buildStatus.textContent = statusAt[0].text;

    // ── Feed: varre cursos da biblioteca ──
    // Interleave: mostly catalog scan, then “match” highlights
    const scanOrder = shuffleUnique([...CATALOG]);
    const matchSet = new Set(matched);
    // Ensure matches appear in the feed at good moments
    const feedPlan = [];
    let mi = 0;
    scanOrder.forEach((name, i) => {
      if (matchSet.has(name)) {
        feedPlan.push({ name, type: "match" });
      } else if (i % 3 === 0 && mi < matched.length) {
        // inject a match periodically
        feedPlan.push({ name: matched[mi++], type: "match" });
        feedPlan.push({ name, type: "skip" });
      } else {
        feedPlan.push({ name, type: i % 4 === 0 ? "skip" : "scan" });
      }
    });
    // leftover matches
    while (mi < matched.length) {
      feedPlan.push({ name: matched[mi++], type: "match" });
    }

    const FEED_START = 900;
    const FEED_EVERY = 720; // slow cadence
    const MAX_VISIBLE = 6;

    feedPlan.slice(0, 18).forEach((item, i) => {
      later(FEED_START + i * FEED_EVERY, () => {
        appendFeedItem(item.name, item.type);
        // keep list short
        const kids = els.buildFeedList && els.buildFeedList.children;
        if (kids && kids.length > MAX_VISIBLE) {
          kids[0].remove();
        }
      });
    });

    // ── Stack de módulos encaixados (aparece na 2ª metade) ──
    later(7500, () => {
      if (els.buildStack) els.buildStack.hidden = false;
    });

    stackMods.forEach((label, i) => {
      later(8200 + i * 1100, () => {
        if (!els.buildStackItems) return;
        const chip = document.createElement("div");
        chip.className = "build-stack__chip";
        chip.innerHTML = `<span>✓</span>${label}`;
        els.buildStackItems.appendChild(chip);
      });
    });
  }

  function appendFeedItem(name, type) {
    if (!els.buildFeedList) return;
    const li = document.createElement("li");
    li.className = "build-feed__item is-" + type;

    let icon = "·";
    let tag = "";
    if (type === "match") {
      icon = "✓";
      tag = "encaixe";
    } else if (type === "skip") {
      icon = "–";
      tag = "";
    } else {
      icon = "⟳";
      tag = "";
    }

    li.innerHTML = `
      <span class="build-feed__icon">${icon}</span>
      <span class="build-feed__name">${name}</span>
      ${tag ? `<span class="build-feed__tag">${tag}</span>` : ""}
    `;
    els.buildFeedList.appendChild(li);
  }

  function shuffleUnique(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function buildOffer() {
    const a = state.answers;
    const p = getPersona(a);
    const id = buildCourseIdentity(a, p);

    // Badge + título mais curto (sem parágrafo denso)
    els.offerBadge.textContent = `✨ feito pra quem quer ${id.goalVerb}`;
    els.offerTitle.textContent = `seu curso pra ${id.goalVerb}`;

    // Chips em vez da linha uppercase longa
    if (els.offerTags) {
      const tags = buildOfferTags(p, a);
      els.offerTags.innerHTML = tags
        .map((t) => `<span class="offer-tag">${t}</span>`)
        .join("");
    }

    // Mini-cards de resumo (fácil de escanear)
    if (els.offerInsights) {
      const insights = buildInsights(p, a);
      els.offerInsights.innerHTML = insights
        .map(
          (item) => `
        <div class="offer-insight">
          <span class="offer-insight__emoji" aria-hidden="true">${item.e}</span>
          <div>
            <span class="offer-insight__k">${item.k}</span>
            <span class="offer-insight__v">${item.v}</span>
          </div>
        </div>`
        )
        .join("");
    }

    // Resumo das respostas (palavras fáceis)
    const diagItems = [
      { k: "você hoje", v: p.perfil && p.perfil.chip, e: "👤" },
      { k: "o que já sabe", v: p.tecnica && p.tecnica.chip, e: "🛠️" },
      { k: "seu material", v: p.equipamento && p.equipamento.chip, e: "🧰" },
      { k: "sua dificuldade", v: p.desafio && p.desafio.chip, e: "🎯" },
      { k: "o que você quer", v: p.meta && p.meta.chip, e: "🚀" },
      { k: "seu estilo", v: p.estilo && p.estilo.chip, e: "💅" },
    ].filter((x) => x.v);

    els.offerDiag.innerHTML = `
      <div class="diag__head">
        <span class="diag__title">o que você respondeu</span>
        <span class="diag__tag">montado pra você</span>
      </div>
      <div class="diag__grid">
        ${diagItems
          .map(
            (item) => `
          <div class="diag__item">
            <span class="diag__emoji" aria-hidden="true">${item.e}</span>
            <div>
              <span class="diag__k">${item.k}</span>
              <span class="diag__v">${item.v}</span>
            </div>
          </div>`
          )
          .join("")}
      </div>
    `;

    // Why card em mini-cards (sem parede de texto)
    const whyItems = buildWhyCards(p, a);
    els.offerWhy.innerHTML = `
      <div class="why-card__head">por que esse curso é o seu</div>
      <div class="why-card__grid">
        ${whyItems
          .map(
            (item) => `
          <div class="why-card__item">
            <span class="why-card__k">${item.k}</span>
            <span class="why-card__v">${item.v}</span>
          </div>`
          )
          .join("")}
      </div>
    `;

    // Results: highlight images matching style
    if (els.resultsRow) {
      const style = a.estilo || "todos";
      $$("img", els.resultsRow).forEach((img) => {
        const tags = (img.dataset.style || "").split(/\s+/);
        const match = tags.includes(style) || style === "todos";
        img.classList.toggle("is-highlight", match && style !== "todos");
        img.classList.toggle("is-dim", style !== "todos" && !match);
      });
      // reorder: matching first
      const imgs = $$("img", els.resultsRow);
      imgs
        .sort((x, y) => {
          const xm = (x.dataset.style || "").includes(style) ? 0 : 1;
          const ym = (y.dataset.style || "").includes(style) ? 0 : 1;
          return xm - ym;
        })
        .forEach((img) => els.resultsRow.appendChild(img));
    }

    // Módulos reais que ela vai receber (Drive + respostas)
    const modules = buildModules(a, p);
    const modCount = modules.length;
    els.offerCardKicker.textContent = `módulos que você vai receber`;
    els.offerCardTitle.textContent = `${modCount} módulos montados pra você ${id.goalVerb}`;
    els.offerList.innerHTML = modules
      .map(
        (m) => `
      <li class="mod-item">
        <span class="mod-num">✓</span>
        <span class="mod-copy">
          <span class="mod-name">${m.name}</span>
          <span class="mod-why">${m.why}</span>
        </span>
      </li>`
      )
      .join("");

    // CTA = o que ela quer
    if (els.btnCheckout && p.meta) {
      els.btnCheckout.textContent = p.meta.cta;
    }

    // Prova social simples
    if (els.offerSocialProof && p.perfil) {
      const social = {
        zero: "milhares de mulheres começaram do zero — como você",
        casa: "mulheres que começaram fazendo unha em casa",
        ja_faco: "mulheres que já faziam unha e melhoraram o resultado",
        pro: "manicures que queriam atender melhor e cobrar melhor",
        carreira: "mulheres que mudaram de vida com unhas",
        renda: "mulheres que começaram uma renda extra com unhas",
      };
      els.offerSocialProof.textContent =
        (social[a.perfil] || "+5.000 alunas") + " · garantia de 7 dias";
    }
  }

  // ── Events ─────────────────────────────────────────────
  els.btnStart.addEventListener("click", () => {
    stopAllVideos();
    state.step = 0;
    state.selected = state.answers[STEPS[0].id] || null;
    showScreen("quiz");
    renderStep();
  });

  els.btnBack.addEventListener("click", goBack);
  els.btnNext.addEventListener("click", goNext);

  document.addEventListener("keydown", (e) => {
    if (!screens.quiz.classList.contains("screen--active")) return;
    if (e.key === "Enter" && !els.btnNext.disabled) goNext();
    if (e.key === "Escape") goBack();
  });

  // Prefetch quiz video
  if (els.quizVideo) {
    setTimeout(() => {
      try {
        els.quizVideo.load();
      } catch (_) {}
    }, 800);
  }
})();
