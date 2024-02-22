import loading from '../../../components/loading/loading';
import '../../../elements/emby-checkbox/emby-checkbox';
import '../../../elements/emby-button/emby-button';
import '../../../elements/emby-select/emby-select';
import Dashboard from '../../../utils/dashboard';
import { populateCountries, populateLanguagesTwoLetterISO } from 'components/settingshelper';

function save(page) {
    loading.show();
    const apiClient = ApiClient;
    apiClient.getJSON(apiClient.getUrl('Startup/Configuration')).then(function (config) {
        config.PreferredMetadataLanguage = page.querySelector('#selectLanguage').value;
        config.MetadataCountryCode = page.querySelector('#selectCountry').value;
        apiClient.ajax({
            type: 'POST',
            data: JSON.stringify(config),
            url: apiClient.getUrl('Startup/Configuration'),
            contentType: 'application/json'
        }).then(function () {
            loading.hide();
            navigateToNextPage();
        });
    });
}

function reloadData(page, config, cultures, countries) {
    populateLanguagesTwoLetterISO(page.querySelector('#selectLanguage'), cultures, false);
    populateCountries(page.querySelector('#selectCountry'), countries);
    page.querySelector('#selectLanguage').value = config.PreferredMetadataLanguage;
    page.querySelector('#selectCountry').value = config.MetadataCountryCode;
    loading.hide();
}

function reload(page) {
    loading.show();
    const apiClient = ApiClient;
    const promise1 = apiClient.getJSON(apiClient.getUrl('Startup/Configuration'));
    const promise2 = apiClient.getCultures();
    const promise3 = apiClient.getCountries();
    Promise.all([promise1, promise2, promise3]).then(function (responses) {
        reloadData(page, responses[0], responses[1], responses[2]);
    });
}

function navigateToNextPage() {
    Dashboard.navigate('wizardremoteaccess.html');
}

function onSubmit(e) {
    save(this);
    e.preventDefault();
    return false;
}

export default function (view) {
    view.querySelector('.wizardSettingsForm').addEventListener('submit', onSubmit);
    view.addEventListener('viewshow', function () {
        document.querySelector('.skinHeader').classList.add('noHomeButtonHeader');
        reload(this);
    });
    view.addEventListener('viewhide', function () {
        document.querySelector('.skinHeader').classList.remove('noHomeButtonHeader');
    });
}
