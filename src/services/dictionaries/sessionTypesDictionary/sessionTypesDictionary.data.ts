import type {
    MentorCategoryT
} from "@services/dictionaries/sessionCategoriesDictionary/sessionCategoriesDictionary.data";

const sessionTypesDictionaryData: Record<MentorCategoryT, Record<number, string>> = {
    IT: {
        1: 'Rozmowa wstępna',  // INTRO_CONVERSATION
        2: 'Spotkanie 1:1',  // ONE_ON_ONE_CONVERSATION
        3: 'Przygotowanie CV',  // CV_PREPARATION
        4: 'Plan nauki',  // LEARNING_PLAN_PREPARATION
        5: 'Przegląd projektu',  // WORK_PROJECT_REVIEW
        6: 'Przygotowanie do rozmowy',  // INTERVIEW_PREPARATION
        7: 'Rozmowa z ekspertem',  // EXPERT_CONVERSATION
        9: 'Chat 30m/60m',  // CHAT_30M_OR_60M
        10: 'Pair programming',  // PAIR_PROGRAMMING
        12: 'IT Project Guidance',  // IT_PROJECT_GUIDANCE
        27: 'Code review',  // SOFTWARE_ARCHITECTURE_REVIEW
        28: 'Strategie chmurowe',  // CLOUD_COMPUTING_STRATEGIES
        29: 'Metodologie Agile',  // AGILE_METHODOLOGIES
        30: 'DevOps best practices',  // DEVOPS_BEST_PRACTICES
        31: 'Podstawy Cybersecurity',  // CYBERSECURITY_BASICS
        32: 'Zarządzanie infrastrukturą IT',  // IT_INFRASTRUCTURE_MANAGEMENT
    },
    DESIGN: {
        13: 'Design thinking i kreatywność',  // DESIGN_THINKING_CREATIVITY
        17: 'Podstawy UI/UX Design',  // UI_UX_DESIGN_FUNDAMENTALS
        18: 'Techniki projektowania graficznego',  // GRAPHIC_DESIGN_TECHNIQUES
        19: 'Optymalizacja UX',  // USER_EXPERIENCE_OPTIMIZATION
        20: 'Strategie brandingu wizualnego',  // VISUAL_BRANDING_STRATEGIES
        21: 'Warsztat kreatywnego designu',  // CREATIVE_DESIGN_WORKSHOP
        43: 'Mapowanie ścieżki użytkownika',  // USER_JOURNEY_MAPPING
        44: 'Projektowanie usług',  // SERVICE_DESIGN
        58: 'Design sprint',  // DESIGN_SPRINT
        59: 'Warsztat badań użytkowników',  // USER_RESEARCH_WORKSHOP
        60: 'Warsztat testów użyteczności',  // USABILITY_TESTING_WORKSHOP
        61: 'Wireframing i prototypowanie',  // WIREFRAMING_AND_PROTOTYPING
        62: 'Tworzenie systemów projektowych',  // DESIGN_SYSTEM_CREATION
        63: 'Testowanie dostępności',  // ACCESSIBILITY_TESTING
        64: 'Kreatywne rozwiązywanie problemów',  // CREATIVE_PROBLEM_SOLVING
        65: 'Teoria kolorów i typografia',  // COLOR_THEORY_AND_TYPOGRAPHY
        66: 'Projektowanie Mobile-First',  // MOBILE_FIRST_DESIGN
        67: 'Audyt UX',  // UX_AUDIT
    },
    BUSINESS: {
        14: 'Strategia biznesowa i innowacje',  // BUSINESS_STRATEGY_INNOVATION
        15: 'Coaching rozwoju kariery',  // CAREER_ADVANCEMENT_COACHING
        16: 'Trendy marketingowe i strategie cyfrowe',  // MARKETING_TRENDS_DIGITAL_STRATEGIES
        22: 'Skuteczny networking',  // EFFECTIVE_NETWORKING
        23: 'Konsulting biznesowy',  // BUSINESS_CONSULTING
        24: 'Twój startup',  // YOUR_STARTUP
        33: 'Transformacja cyfrowa',  // DIGITAL_TRANSFORMATION
        34: 'Analiza finansowa',  // FINANCIAL_ANALYSIS
        35: 'Strategia sprzedaży',  // SALES_STRATEGY
        36: 'Zarządzanie relacjami z klientem',  // CUSTOMER_RELATIONSHIP_MANAGEMENT
        37: 'Strategia eCommerce',  // ECOMMERCE_STRATEGY
        38: 'Badania rynku',  // MARKET_RESEARCH
        46: 'Pozyskiwanie funduszy dla startupów',  // STARTUP_FUNDRAISING
        47: 'Sesja rozwoju MVP',  // MVP_DEVELOPMENT_SESSION
        48: 'Tworzenie modelu biznesowego',  // BUSINESS_MODEL_CREATION
        49: 'Ocena dopasowania produktu do rynku',  // PRODUCT_MARKET_FIT_ASSESSMENT
        50: 'Skalowanie startupu',  // SCALING_STARTUP
        51: 'Warsztat Lean Startup',  // LEAN_STARTUP_WORKSHOP
        52: 'Coaching pitchu dla inwestorów',  // INVESTOR_PITCH_COACHING
        53: 'Budowanie zespołu dla startupów',  // TEAM_BUILDING_FOR_STARTUPS
        54: 'Sesja Growth Hackingu',  // GROWTH_HACKING_SESSION
        55: 'Planowanie strategii wejścia na rynek',  // GO_TO_MARKET_STRATEGY_PLANNING
        56: 'Aspekty prawne dla startupów',  // LEGAL_ASPECTS_OF_STARTUPS
        57: 'Matchmaking współzałożycieli',  // CO_FOUNDER_MATCHMAKING
    },
    MARKETING: {
        16: 'Trendy marketingowe i strategie cyfrowe',  // MARKETING_TRENDS_DIGITAL_STRATEGIES
        39: 'Relacje publiczne',  // PUBLIC_RELATIONS
        40: 'Tworzenie treści',  // CONTENT_CREATION
        41: 'Zarządzanie mediami społecznościowymi',  // SOCIAL_MEDIA_MANAGEMENT
        42: 'Zarządzanie marką',  // BRAND_MANAGEMENT
        68: 'Strategie marketingu cyfrowego',  // DIGITAL_MARKETING_STRATEGIES
        69: 'Optymalizacja SEO',  // SEO_OPTIMIZATION
        70: 'Reklama w mediach społecznościowych',  // SOCIAL_MEDIA_ADVERTISING
        71: 'Strategia tworzenia treści',  // CONTENT_STRATEGY
        72: 'Zarządzanie kampaniami z influencerami',  // INFLUENCER_CAMPAIGN_MANAGEMENT
        73: 'Warsztat strategii marki',  // BRAND_STRATEGY_WORKSHOP
        74: 'Optymalizacja współczynnika konwersji',  // CONVERSION_RATE_OPTIMIZATION
        75: 'Automatyzacja email marketingu',  // EMAIL_MARKETING_AUTOMATION
        76: 'Strategia marketingu afiliacyjnego',  // AFFILIATE_MARKETING_STRATEGY
        77: 'Taktyki video marketingu',  // VIDEO_MARKETING_TACTICS
        78: 'Przegląd analizy marketingowej',  // MARKETING_ANALYTICS_REVIEW
        79: 'Strategia pozyskiwania klientów',  // CUSTOMER_ACQUISITION_STRATEGY
    },
    CAREER: {
        6: 'Przygotowanie do rozmowy',  // INTERVIEW_PREPARATION
        13: 'Przegląd CV',  // CV_PREPARATION (dodane również do DESIGN)
        15: 'Coaching rozwoju kariery',  // CAREER_ADVANCEMENT_COACHING
        22: 'Skuteczny networking',  // EFFECTIVE_NETWORKING
        45: 'Kreatywne pisanie',  // CREATIVE_WRITING
        80: 'Rozwój kariery',  // CAREER_DEVELOPMENT
        81: 'Profesjonalny networking',  // PROFESSIONAL_NETWORKING
        82: 'Umiejętności rozmowy kwalifikacyjnej',  // INTERVIEW_SKILLS
        83: 'Umiejętności negocjacyjne',  // NEGOTIATION_SKILLS
        84: 'Budowanie marki osobistej',  // PERSONAL_BRANDING
        85: 'Tworzenie CV',  // RESUME_BUILDING
        86: 'Tworzenie listu motywacyjnego',  // COVER_LETTER_WRITING
        87: 'Strategie poszukiwania pracy',  // JOB_SEARCH_STRATEGIES
        88: 'Zmiany kariery',  // CAREER_TRANSITIONS
        89: 'Negocjacje płacowe',  // SALARY_NEGOTIATION
    },
    PERSONAL_DEVELOPMENT: {
        90: 'Zarządzanie stresem',  // STRESS_MANAGEMENT
        91: 'Zarządzanie czasem',  // TIME_MANAGEMENT
        92: 'Budowanie odporności',  // RESILIENCE_BUILDING
        93: 'Myślenie krytyczne',  // CRITICAL_THINKING
        94: 'Rozwiązywanie problemów',  // PROBLEM_SOLVING
        95: 'Inteligencja emocjonalna',  // EMOTIONAL_INTELLIGENCE
        96: 'Równowaga praca-życie',  // WORK_LIFE_BALANCE
        97: 'Podejmowanie decyzji',  // DECISION_MAKING
        98: 'Zwiększanie kreatywności',  // CREATIVITY_BOOSTING
        99: 'Samomotywacja',  // SELF_MOTIVATION
    },
    TRADING: {
        100: 'Wprowadzenie do handlu kryptowalutami',  // INTRO_TO_CRYPTO
        101: 'Zaawansowane strategie handlowe',  // ADVANCED_TRADING_STRATEGIES
        102: 'Sesja analizy technicznej',  // TECHNICAL_ANALYSIS_SESSION
        103: 'Podstawy blockchain',  // BLOCKCHAIN_101
        104: 'Tworzenie botów handlowych',  // TRADING_BOT_DEVELOPMENT
        105: 'Wprowadzenie do zdecentralizowanych finansów (DeFi)',  // DECENTRALIZED_FINANCE_INTRO
        106: 'Konfiguracja i zabezpieczenie portfela kryptowalut',  // CRYPTO_WALLET_SETUP
        107: 'Inwestowanie i handel NFT',  // NFT_INVESTING
        108: 'Psychologia rynku i finanse behawioralne',  // MARKET_PSYCHOLOGY
        109: 'Zarządzanie ryzykiem w handlu',  // TRADING_RISK_MANAGEMENT
        110: 'Handel opcjami i kontraktami terminowymi',  // OPTIONS_AND_FUTURES
        111: 'Strategie handlowe Forex',  // FOREX_STRATEGY
        112: 'Podstawy giełdy papierów wartościowych',  // STOCK_MARKET_BASICS
        113: 'Demonstracja handlu na żywo',  // LIVE_TRADING_DEMO
        114: 'Kompletny kurs handlowy',  // TRADING_COURSE_BUNDLE
    },
}

export default sessionTypesDictionaryData;
