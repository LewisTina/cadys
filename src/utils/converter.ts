export function ParseDate(date: any) {
    const parseDate = new Date(date);
	const formattedValue = parseDate.toLocaleString( "fr" , { day: "numeric", month: "numeric", year :"numeric", hour: '2-digit', minute: '2-digit' });
	return formattedValue;
}

export function FormatCurrency(value: any, currency: string) {
    const formattedValue = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: currency }).format(value);
	return formattedValue;
}