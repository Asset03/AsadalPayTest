import { ChangeEvent, FormEvent, useState } from "react";
import { SearchFormType, TransactionType } from "@/app/types";
import { useTranslation } from "react-i18next";

const SearchForm: React.FC<SearchFormType> = ({ onSearch, transactions }) => {
  const { t, i18n } = useTranslation();

  const [inputValue, setInputValue] = useState("");
  const [inputStartDate, setInputStartDate] = useState("");
  const [inputEndDate, setInputEndDate] = useState("");
  const [suggestions, setSuggestions] = useState<TransactionType[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    const filteredSuggestions = transactions.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.amount.toString().includes(value) ||
        item.type.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);

    if (value === "") {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (value: string) => {
    setInputValue(value);
    setSuggestions([]);
    debugger;
  };

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(inputValue, inputStartDate, inputEndDate);
  };
  return (
    <form onSubmit={handleOnSubmit}>
      <div className="form-group mb-3 mt-3">
        <label htmlFor="inputTextSearch" className="mb-1">
          {t('search')}
        </label>
        <div className="autocomplete-container">
          <input
            id="inputTextSearch"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={() => setSuggestions([])}
            placeholder={t('placeholder')}
            type="text"
            name="search"
            className="form-control"
          />
          <ul className="list-group mt-2">
            {suggestions.map((item, index) => (
              <li
                key={index}
                className="list-group-item suggestion-item"
                onMouseDown={() => handleSuggestionClick(item.name)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="form-group mb-3">
        <label htmlFor="inputTextStartDate" className="mb-1">
          {t('startDate')}
        </label>
        <input
          id="inputTextStartDate"
          value={inputStartDate}
          onChange={(e) => setInputStartDate(e.target.value)}
          type="date"
          name="start_date"
          className="form-control form-control form-control-lg form-control-solid"
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="inputTextEndDate" className="mb-1">
          {t('endDate')}
        </label>
        <input
          id="inputTextEndDate"
          value={inputEndDate}
          onChange={(e) => setInputEndDate(e.target.value)}
          type="date"
          name="end_date"
          className="form-control form-control form-control-lg form-control-solid"
        />
      </div>
      <div className="d-flex flex-center mt-4 mb-2">
        <button className="btn btn-primary w-100" type="submit">
          <span>{t('search')}</span>
        </button>
      </div>
    </form>
  );
};
export default SearchForm;
