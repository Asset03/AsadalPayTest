import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    interpolation:{
      escapeValue: false
    },
    resources: {
      en: {
        translation: {
          title: 'Transaction History',
          chart: 'Chart',
          searchForm: 'Search Form',
          search: 'Search',
          placeholder: 'Type here...',
          startDate: 'Start Date',
          endDate: 'End Date'
        }
      },
      ru: {
        translation: {
          title: 'История Транзакций',
          chart: 'Графика',
          searchForm: 'Форма поиска',
          search: 'Поиск',
          placeholder: 'Введите здесь...',
          startDate: 'Дата начала',
          endDate: 'Дата окончания'
        }
      }
    }
  });

export default i18n;