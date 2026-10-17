import type { Locale } from '.';

interface PageStrings {
  siteDescription: string;
  rssDescription: string;
  homeHeading: string;
  homeLead: string;
  homeWorksHeading: string;
  homePostsHeading: string;
  blogDescription: string;
  blogHeading: string;
  blogLead: string;
  worksDescription: string;
  worksHeading: string;
  worksLead: string;
  aboutDescription: string;
  aboutHeading: string;
  aboutLead: string;
  aboutProfileEyebrow: string;
  aboutProfileHeading: string;
  aboutProfile: string[];
  aboutSiteEyebrow: string;
  aboutSiteHeading: string;
  aboutSite: string;
  searchDescription: string;
  searchHeading: string;
}

const pages: Record<Locale, PageStrings> = {
  en: {
    siteDescription: 'Software engineer focused on Go, developer tooling, and systems.',
    rssDescription: 'Technical writing about Go, infrastructure, and maintainable systems.',
    homeHeading: 'Software engineer building backend systems and useful tools',
    homeLead: 'Backend systems, developer tools, and experiments driven by technical curiosity.',
    homeWorksHeading: 'Selected work.',
    homePostsHeading: 'Latest posts.',
    blogDescription: 'Technical notes on Go, systems, and developer tooling.',
    blogHeading: 'Notes from building systems.',
    blogLead:
      'Implementation notes on Go, storage infrastructure, and the decisions behind the projects on this site.',
    worksDescription: 'Selected projects and case studies.',
    worksHeading: 'Open-source systems and developer tools.',
    worksLead: 'Open-source projects, tools, and experiments currently in development.',
    aboutDescription: 'About the author behind this site.',
    aboutHeading: 'Software engineering beyond application code.',
    aboutLead:
      'Rodrigo Mecheri is a software engineer specializing in backend systems, developer tooling, and Go. His work combines the development of concrete solutions with careful analysis of the engineering decisions that make software reliable and maintainable.',
    aboutProfileEyebrow: 'Profile',
    aboutProfileHeading: 'How systems work in practice.',
    aboutProfile: [
      'The focus is on backend software and the behavior of systems as a whole: how they store and move data, handle failures, communicate, and respond to unexpected conditions.',
      'Concrete projects serve as a method of investigation. Some examine a technology in depth; others test an idea against practical constraints.',
    ],
    aboutSiteEyebrow: 'This site',
    aboutSiteHeading: 'A record of ongoing technical work.',
    aboutSite:
      'This site brings together projects, technical notes, experiments, and lessons from implementation. Completed work and ongoing investigations both form part of that record.',
    searchDescription: 'Search posts and works.',
    searchHeading: 'Find posts and works.',
  },
  pt: {
    siteDescription:
      'Engenheiro de software com foco em Go, ferramentas para desenvolvedores e sistemas.',
    rssDescription: 'Artigos técnicos sobre Go, infraestrutura e sistemas de fácil manutenção.',
    homeHeading: 'Engenheiro de software criando sistemas backend e ferramentas úteis',
    homeLead:
      'Sistemas backend, ferramentas para desenvolvedores e experimentos orientados por curiosidade técnica.',
    homeWorksHeading: 'Projetos selecionados.',
    homePostsHeading: 'Artigos recentes.',
    blogDescription: 'Artigos técnicos sobre Go, sistemas e ferramentas para desenvolvedores.',
    blogHeading: 'Notas sobre a construção de sistemas.',
    blogLead:
      'Detalhes de implementação sobre Go, infraestrutura de armazenamento e as decisões por trás dos projetos deste site.',
    worksDescription: 'Projetos e estudos de caso selecionados.',
    worksHeading: 'Sistemas de código aberto e ferramentas para desenvolvedores.',
    worksLead: 'Projetos, ferramentas e experimentos de código aberto em desenvolvimento.',
    aboutDescription: 'Sobre o autor deste site.',
    aboutHeading: 'Engenharia de software além do código da aplicação.',
    aboutLead:
      'Rodrigo Mecheri é engenheiro de software especializado em sistemas backend, ferramentas para desenvolvedores e Go. Seu trabalho une a construção de soluções concretas à análise das decisões de engenharia que tornam o software confiável e fácil de manter.',
    aboutProfileEyebrow: 'Perfil',
    aboutProfileHeading: 'Como os sistemas funcionam na prática.',
    aboutProfile: [
      'O foco está no software backend e no comportamento dos sistemas como um todo: como armazenam e movimentam dados, lidam com falhas, se comunicam e respondem a condições inesperadas.',
      'Projetos concretos servem como método de investigação. Alguns examinam uma tecnologia em profundidade; outros testam uma ideia diante de restrições práticas.',
    ],
    aboutSiteEyebrow: 'Este site',
    aboutSiteHeading: 'Um registro do trabalho técnico em andamento.',
    aboutSite:
      'Este site reúne projetos, notas técnicas, experimentos e aprendizados de implementação. Trabalhos concluídos e investigações em andamento fazem parte desse registro.',
    searchDescription: 'Busque artigos e projetos.',
    searchHeading: 'Encontre artigos e projetos.',
  },
  it: {
    siteDescription:
      'Ingegnere del software specializzato in Go, strumenti per sviluppatori e sistemi.',
    rssDescription: 'Articoli tecnici su Go, infrastruttura e sistemi manutenibili.',
    homeHeading: 'Ingegnere del software che crea sistemi backend e strumenti utili',
    homeLead:
      'Sistemi backend, strumenti per sviluppatori ed esperimenti guidati dalla curiosità tecnica.',
    homeWorksHeading: 'Progetti selezionati.',
    homePostsHeading: 'Articoli recenti.',
    blogDescription: 'Articoli tecnici su Go, sistemi e strumenti per sviluppatori.',
    blogHeading: 'Appunti sullo sviluppo di sistemi.',
    blogLead:
      'Note pratiche su Go, infrastrutture di archiviazione e sulle decisioni alla base dei progetti di questo sito.',
    worksDescription: 'Progetti e casi di studio selezionati.',
    worksHeading: 'Sistemi open source e strumenti per sviluppatori.',
    worksLead: 'Progetti, strumenti ed esperimenti open source in fase di sviluppo.',
    aboutDescription: 'Informazioni sull’autore di questo sito.',
    aboutHeading: 'Ingegneria del software oltre il codice applicativo.',
    aboutLead:
      'Rodrigo Mecheri è un ingegnere del software specializzato in sistemi backend, strumenti per sviluppatori e Go. Il suo lavoro unisce la realizzazione di soluzioni concrete all’analisi delle decisioni ingegneristiche che rendono il software affidabile e manutenibile.',
    aboutProfileEyebrow: 'Approccio',
    aboutProfileHeading: 'Come funzionano i sistemi nella pratica.',
    aboutProfile: [
      'L’attenzione è rivolta al software backend e al comportamento dei sistemi nel loro insieme: come archiviano e trasferiscono dati, gestiscono i guasti, comunicano e reagiscono a condizioni impreviste.',
      'I progetti concreti sono anche un metodo di indagine. Alcuni esaminano una tecnologia in profondità; altri verificano un’idea di fronte a vincoli concreti.',
    ],
    aboutSiteEyebrow: 'Questo sito',
    aboutSiteHeading: 'Un archivio del lavoro tecnico in corso.',
    aboutSite:
      'Questo sito raccoglie progetti, note tecniche, esperimenti e conoscenze maturate durante l’implementazione. I lavori conclusi e le indagini in corso fanno parte di questo archivio.',
    searchDescription: 'Cerca articoli e progetti.',
    searchHeading: 'Trova articoli e progetti.',
  },
};

export const getPageStrings = (locale: Locale) => pages[locale];
