import globalize from '../scripts/globalize';

/**
 * Helper for handling settings.
 * @module components/settingsHelper
 */

type Language = {
    Name?: string,
    DisplayName?: string,
    TwoLetterISOLanguageName?: string,
    ThreeLetterISOLanguageName?: string,
    ThreeLetterISOLanguageNames?: string[]
};

type Country = {
    Name?: string,
    DisplayName?: string,
    TwoLetterISORegionName?: string,
    ThreeLetterISORegionName?: string,
};

export function populateLanguagesThreeLetterISO(select: HTMLElement, languages: Language[], includeAny: boolean) {
    let html = "<option value=''></option>";

    if (includeAny) {
        html = `<option value=''>${globalize.translate('AnyLanguage')}</option>`;
    }

    for (const language of languages) {
        html += `<option value='${language.ThreeLetterISOLanguageName}'>${language.DisplayName}</option>`;
    }

    select.innerHTML = html;
}

export function populateLanguagesTwoLetterISO(select: HTMLSelectElement, languages: Language[], includeAny: boolean) {
    let html = "<option value=''></option>";

    if (includeAny) {
        html = `<option value=''>${globalize.translate('AnyLanguage')}</option>`;
    }

    for (const language of languages) {
        html += `<option value='${language.TwoLetterISOLanguageName}'>${language.DisplayName}</option>`;
    }

    select.innerHTML = html;
}

export function populateCountries(select: HTMLSelectElement, countries: Country[]) {
    let html = "<option value=''></option>";
    for (const country of countries) {
        html += `<option value='${country.TwoLetterISORegionName}'>${country.DisplayName}</option>`;
    }

    select.innerHTML = html;
}

export default {
    populateLanguagesTwoLetterISO: populateLanguagesTwoLetterISO,
    populateLanguagesThreeLetterISO: populateLanguagesThreeLetterISO,
    populateCountries: populateCountries
};
