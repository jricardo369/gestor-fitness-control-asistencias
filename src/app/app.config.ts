import { environment } from '../environments/environment';

export const VERSION_PORTAL = 'Versión 2022.11.15-13:24';
export const EMPRESA_PORTAL = '© / 2022';

// =====================================================
/*

PORTAL-DENTAL-QAS
ng build --prod --optimization --build-optimizer --aot --base-href /es/ --deploy-url /es/ --i18n-locale=es --output-path=dist/ROOT

REM ESTE ES PARA LA VERSION EN RAIZ
ng build --prod --optimization --build-optimizer --aot --base-href / --deploy-url / --i18n-locale=es --output-path=dist/ROOT
*/
//
//
// =====================================================
// ASI SE GENERA EL ARCHIVO DE TRADUCCION (HAY QUE EDITARLO Y CAMBIARLO DE NOMBRE Y PEGARLO EN OTRA RUTA)
//     ng xi18n --output-path translate
// Y ASI SE CORRE EN INGLÉS (O EN ESPAÑOL)
//     ng serve --configuration=en
//     ng serve --configuration=es
// =====================================================

let documentBsaeUriWithoutLanguage = document.baseURI
    .replace("/es/", "")
    .replace("/en/", "")
    .replace("/portal-dental", "/dental");

// let productionApiUrl = documentBsaeUriWithoutLanguage + "/"; // PRODUCCION
//let productionApiUrl = 'http://ec2-54-215-12-132.us-west-1.compute.amazonaws.com:8080/dental/'; // PRODUCCION
let productionApiUrl = 'localhost:18080/control-fitness-api/'; // PRODUCCION
 let localhostApiUrl = location.protocol + '//' + location.hostname + ':8080/dental/'; // LOCAL

if (environment.production) {
    // PRO
} else {
    localhostApiUrl = 'http://localhost:18080/control-fitness-api/';
}

// ====================================

export const API_URL = environment.production ? productionApiUrl : localhostApiUrl;
