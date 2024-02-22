import globalize from '../scripts/globalize';
import { CountryInfo, CultureDto } from '@jellyfin/sdk/lib/generated-client';

/**
 * Helper for handling settings.
 * @module components/settingsHelper
 */

export function populateLanguagesThreeLetterISO(select: HTMLElement, languages: CultureDto[], includeAny: boolean) {
    let html = "<option value=''></option>";

    if (includeAny) {
        html = `<option value=''>${globalize.translate('AnyLanguage')}</option>`;
    }

    for (const language of languages) {
        html += `<option value='${language.ThreeLetterISOLanguageName}'>${language.DisplayName}</option>`;
    }

    select.innerHTML = html;
}

export function populateLanguagesTwoLetterISO(select: HTMLSelectElement, languages: CultureDto[], includeAny: boolean) {
    let html = "<option value=''></option>";

    if (includeAny) {
        html = `<option value=''>${globalize.translate('AnyLanguage')}</option>`;
    }

    for (const language of languages) {
        html += `<option value='${language.TwoLetterISOLanguageName}'>${language.DisplayName}</option>`;
    }

    select.innerHTML = html;
}

export function populateCountries(select: HTMLSelectElement, countries: CountryInfo[]) {
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
