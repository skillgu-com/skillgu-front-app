// TODO CHANGE ME:
import type {
    MentorCategoryT
} from "@services/dictionaries/sessionCategoriesDictionary/sessionCategoriesDictionary.data";

const sessionTypesDictionaryData: Record<MentorCategoryT, Record<string, string>> = {
    IT: {
        1: 'Rozmowa wstępna',  // INTRO_CONVERSATION
        2: 'Jedno na jedno',  // ONE_ON_ONE_CONVERSATION
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
    },
    MARKETING: {
        16: 'Trendy marketingowe i strategie cyfrowe',  // MARKETING_TRENDS_DIGITAL_STRATEGIES
        39: 'Relacje publiczne',  // PUBLIC_RELATIONS
        40: 'Tworzenie treści',  // CONTENT_CREATION
        41: 'Zarządzanie mediami społecznościowymi',  // SOCIAL_MEDIA_MANAGEMENT
        42: 'Zarządzanie marką',  // BRAND_MANAGEMENT
    },
    CAREER: {
        6: 'Przygotowanie do rozmowy',  // INTERVIEW_PREPARATION
        13: 'Przegląd CV',  // Przypisany do DESIGN, dodany też tutaj
        15: 'Coaching rozwoju kariery',  // CAREER_ADVANCEMENT_COACHING
        22: 'Skuteczny networking',  // EFFECTIVE_NETWORKING
        45: 'Kreatywne pisanie',  // CREATIVE_WRITING
    }
};


export default sessionTypesDictionaryData;