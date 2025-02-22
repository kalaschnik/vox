const supportedLanguages = ['de', 'en', 'es'];
const languageIds = [
	'heading',
	'mpi',
	'idLabel',
	'culture',
	'birthday',
	'gender',
	'female',
	'male',
	'diverse',
	'responseFormat',
	'audioPrio',
	'textPrio',
	'audioInput',
	'textInput',
	'microphone',
	'dataTransfer',
	'consentHeading',
	'adultConsent',
	'consentID',
	'consentYes',
	'startButton',
	'imprint',
	'dataProtection',
];

const translations = {
	heading: {
		de: `Einstellung zu Tieren`,
		en: `Attitudes towards Animals`,
		es: `Actitud hacia los Animales `,
	},
	mpi: {
		de: `Max-Planck-Institut für evolutionäre Anthropologie, Vergleichende Kulturpsychologie`,
		en: `Max Planck Institute for Evolutionary Anthropology, Comparative Cultural Psychology`,
		es: `Instituto Max-Planck de Antropología Evolutiva, Psicología Cultural Comparada`,
	},
	idLabel: {
		de: `Vor- und Nachname oder ID`,
		en: `Name and Surname or ID`,
		es: `Nombre y Apellido o DNI`,
	},
	culture: {
		de: `Kultur`,
		en: `Culture`,
		es: `Cultura`,
	},
	birthday: {
		de: `Geburtstag`,
		en: `Birthday`,
		es: `Cumpleaños`,
	},
	gender: {
		de: `Geschlecht`,
		en: `Gender`,
		es: `Sexo`,
	},
	female: {
		de: `weiblich`,
		en: `female`,
		es: `feminino`,
	},
	male: {
		de: `männlich`,
		en: `male`,
		es: `masculino`,
	},
	diverse: {
		de: `divers`,
		en: `diverse`,
		es: `diverso`,
	},
	responseFormat: {
		de: `Antwortformat`,
		en: `Response Input`,
		es: `Formato de respuesta`,
	},
	audioPrio: {
		de: `Später entscheiden (Sprachinput priorisiert)`,
		en: `Decide later (audio priority)`,
		es: `Decidir más tarde (Audio priorizado)`,
	},
	textPrio: {
		de: `Später entscheiden (Textinput priorisiert)`,
		en: `Decide later (keyboard priority)`,
		es: `Decidir más tarde (Texto escrito priorizado)`,
	},
	audioInput: {
		de: `Sprachinput`,
		en: `Use microphone`,
		es: `Usar el mirófono`,
	},
	textInput: {
		de: `Textinput`,
		en: `Use keyboard`,
		es: `Usar el teclado`,
	},
	microphone: {
		de: `Mikrofongenehmigung`,
		en: `Microphone permission`,
		es: `Permiso de micrófono`,
	},
	dataTransfer: {
		de: `Datentransfer`,
		en: `Data Transfer`,
		es: `Transferencia de datos`,
	},
	consentHeading: {
		de: `Einwilligungserklärung`,
		en: `Consent`,
		es: `Declaración de consentimiento`,
	},
	consentID: {
		de: `Ihre Teilnahme an der Studie ist natürlich freiwillig. Alle in der Studie erhobenen Daten
		werden anonymisiert auf einem Server am Max-Planck-Institut in Leipzig (Deutschland)
		gespeichert und nicht an Dritte weitergegeben. Sie können Ihre Teilnahme zu jedem
		Zeitpunkt abbrechen, indem sie das Browserfenster schließen. Wenn Sie zu einem späteren
		Zeitpunkt Ihre erhobenen Daten löschen lassen möchten, kontaktieren Sie uns über
		<a href="mailto:forschungsreise@eva.mpg.de">forschungsreise@eva.mpg.de</a> und geben Sie
		dafür Name und Geburtsdatum Ihres Kindes bzw. bei eigener Teilnahme von Ihnen selbst an.`,
		en: `Your participation in this study is, of course, voluntary. All study data will be stored 
		in an anonymized form on a server at the Max Planck Institute in Leipzig, Germany, and will 
		not be passed on to third parties. You can cancel your participation at any time by closing 
		the window. If you wish to withdraw your data from the study at a later date, please write 
		to us, indicating the name and birthday of your child or yourself, at this e-mail address: 
		<a href="mailto:forschungsreise@eva.mpg.de">forschungsreise@eva.mpg.de</a>.`,
		es: `Por supuesto, su participación en el estudio es voluntaria. Todos los datos recogidos 
		en el estudio se almacenarán en un servidor del Instituto Max-Planck de Leipzig (Alemania) 
		y no serán transmitidos a terceros. Puede cancelar su participación en cualquier momento 
		cerrando la ventana del navegador. Si posteriormente desea que sus datos sean eliminados, 
		póngase en contacto con nosotros por forschungsreise@eva.mpg.de e indique el nombre y la 
		fecha de nacimiento de su hijo o si participó usted mismo, debería brindar el nombre suyo.`,
	},
	adultConsent: {
		de: `Ich bin damit einverstanden, am oben genannten Projekt des Max-Planck-Instituts für
		evolutionäre Anthropologie teilzunehmen und dass Tonaufnahmen in anonymisierter Form
		zur Beantwortung wissenschaftlicher Fragestellungen ausgewertet und im Rahmen
		wissenschaftlicher Beiträge bei Forschungs-, Lehr- oder Informationsveranstaltungen
		verwendet werden können. Ausführliche Informationen zum
		<a href="https://www.eva.mpg.de/de/datenschutzhinweis.html" target="-blank"
			>Datenschutz</a> habe ich erhalten.`,
		en: `I declare my consent to participate in this study of the Max Planck Institute and 
		that sound recordings may be used in anonymised form as part of scientific contributions 
		at research, teaching or information events. I have received detailed information regarding 
		<a href="https://www.eva.mpg.de/privacy-policy.html" target="-blank"
			>data protection</a>.`,
		es: `Estoy de acuerdo de participar en el proyecto del instituto Max-Planck de Antropología 
		Evolutiva, Psicología Cultural Comparada y que las grabaciones de audio pueden estar evaluadas 
		de forma anónima para responder a preguntas científicas y pueden estar utilizadas en el contexto 
		de contribuciones científicas en actos de investigaciones, enseñanza o información. Recibí la 
		información detallada sobre la <a href="https://www.eva.mpg.de/privacy-policy.html" target="-blank"
		>protección de datos</a>.`,
	},
	consentYes: {
		de: `Ich stimme zu.`,
		en: `I agree.`,
		es: `Estoy de acuerdo.`,
	},
	startButton: {
		de: `Start`,
		en: `Start`,
		es: `Inicio`,
	},
	imprint: {
		de: `Impressum`,
		en: `Imprint`,
		es: `Pie de imprenta`,
	},
	dataProtection: {
		de: `Datenschutz`,
		en: `Data Protection`,
		es: `Protección de datos `,
	},
};

const browserLanguage = window.navigator.language.substring(0, 2);

// check if browser language is defined in supported languages
let hasTranslation = true;
if (!supportedLanguages.includes(browserLanguage)) {
	hasTranslation = false;
}

languageIds.forEach((languageId) => {
	const currentEle = document.getElementById(languageId);
	currentEle.innerHTML = hasTranslation
		? translations[languageId][browserLanguage]
		: translations[languageId].en;
});
