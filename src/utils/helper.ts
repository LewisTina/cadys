
/* export function multipleSubstrReplace(keyPattern: { [key: string]: string }, inputText: string): string {
  const rep: { [key: string]: string } = {};
  for (const [k, v] of Object.entries(keyPattern)) {
    rep[RegExp.escape(k)] = v;
  }
  const pattern = new RegExp(Object.keys(rep).join('|'), 'g');
  return inputText.replace(pattern, matched => rep[matched]);
} */

export function getMonthInFrench(monthId: number): string {
  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  return months[monthId - 1];
}

export function getDayInFrench(dayId: number): string {
  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  return days[dayId - 1];
}

export function validatePassword(password: string): boolean {
  const pattern = /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).*$/;
  return pattern.test(password);
}

export function validatePostalCode(code: string): boolean {
  const regex = /^(0[1-9]|[1-9][0-9])[0-9]{3}$/;
  return regex.test(code);
}

/* function isValidPhoneNumber(number: string): string | false {
  try {
    const phoneNumber = parsePhoneNumberFromString(number, 'FR');
    if (!phoneNumber || !phoneNumber.isValid()) {
      return false;
    }
    return phoneNumber.format(PhoneNumberFormat.E164);
  } catch (e) {
    console.error(e);
    return false;
  }
} */

/* function validateDate(dateText?: string, timeText?: string) {
  try {
    let validValue: Date;
    if (dateText) {
      validValue = new Date(dateText);
    }
    if (timeText) {
      const [hours, minutes] = timeText.split(':').map(Number);
      validValue = new Date(0, 0, 0, hours, minutes);
    }
    return validValue;
  } catch (error) {
    if (dateText) {
      throw new Error(__('invalid-date'));
    }
    if (timeText) {
      throw new Error(__('invalid-time'));
    }
  }
} */

export function validateEmail(email: string): boolean {
  const EMAIL_REGEX = /[^@]+@[^@]+\.[^@]+/;
  return EMAIL_REGEX.test(email);
}

export function generateRandomKey(length: number): string {
  const rangeStart = 10 ** (length - 1);
  const rangeEnd = 10 ** length - 1;
  const randomNumber = Math.floor(Math.random() * (rangeEnd - rangeStart + 1)) + rangeStart;
  return String(randomNumber);
}

export function generateCode(length = 6, end = true): string {
  const rangeStart = 10 ** (length - 1);
  const rangeEnd = 10 ** (length) - 1;
  const randomNumber = Math.floor(Math.random() * (rangeEnd - rangeStart + 1)) + rangeStart;
  const finalString = end ? `${randomNumber}` : `${randomNumber}`;
  return finalString;
}

export function generateCustomCode(name: string): string {
  const code = name.split(' ')
    .filter(n => n)
    .map(n => n[0].toUpperCase())
    .join('');
  return `${code}-${generateCode(6, true)}`;
}

export function generateTokenHex(length = 16): string {
  const secretKey = Array.from({ length: length }, () => Math.floor(Math.random() * 16).toString(16)).join('');
  return secretKey;
}

/* export function generateTokenUrlSafe(length = 64): string {
  const secretKey = secrets.tokenUrlsafe(length);
  return secretKey;
}
 */

/* export function formatDate(date: Date, lang: string): string {
  const months = {
    '01': { fr: 'Janvier', en: 'January' },
    '02': { fr: 'Février', en: 'February' },
    '03': { fr: 'Mars', en: 'March' },
    '04': { fr: 'Avril', en: 'April' },
    '05': { fr: 'Mai', en: 'May' },
    '06': { fr: 'Juin', en: 'June' },
    '07': { fr: 'Juillet', en: 'July' },
    '08': { fr: 'Août', en: 'August' },
    '09': { fr: 'Septembre', en: 'September' },
    '10': { fr: 'Octobre', en: 'October' },
    '11': { fr: 'Novembre', en: 'November' },
    '12': { fr: 'Décembre', en: 'December' }
  };
  const day = date.getDate();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const monthName = months[month][lang.toLowerCase()];
  if (lang === 'fr') {
    return `${day} ${monthName} ${year}`;
  } else {
    return `${monthName} ${day}, ${year}`;
  }
} */

export function generateUniqueNumberString(): string {
  const uniqueNumbers = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
  return uniqueNumbers;
}

/* export function getDocumentType(type: models.DocumentType, lang: string): string {
  const translations = {
    [models.DocumentType.INVOICE]: lang.startsWith('fr') ? 'Facture' : 'Invoice',
    [models.DocumentType.QUOTE]: lang.startsWith('fr') ? 'Devis' : 'Quote',
    [models.DocumentType.EXPENSE]: lang.startsWith('fr') ? 'Dépense' : 'Expense',
    [models.DocumentType.RECEIPT]: lang.startsWith('fr') ? 'Reçu' : 'Receipt',
  };
  return translations[type];
}

export function getDocTypeValue(type: models.DocumentType): string {
  const typeValues = {
    [models.DocumentType.INVOICE]: 'INVOICE',
    [models.DocumentType.QUOTE]: 'QUOTE',
    [models.DocumentType.EXPENSE]: 'EXPENSE',
    [models.DocumentType.RECEIPT]: 'RECEIPT',
  };
  return typeValues[type];
} */

// Rest of the functions
