/**Methodes qui mets le premier carractère d'une chaine en majuscules */
export const upperCaseFirst = (str:string) => `${str[0]?.toUpperCase()}${str.substring(1)}`;