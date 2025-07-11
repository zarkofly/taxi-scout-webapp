import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (e) => {
    const selectedLanguage = e.target.value;
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <div className='text-black '>
        <select onChange={changeLanguage} name="" defaultValue="en" id="">


      <option value ='en'>English</option>
           <option value ='de'>German</option>
                <option value ='es'>Español</option>
        </select>
    </div>
  );
};

export default LanguageSwitcher;
