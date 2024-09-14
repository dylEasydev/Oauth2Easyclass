class GenerateCode {
    private _numeriqueCode = "1234567890";
    private _alphaNumerique = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"+this._numeriqueCode;

    //Methodes de generation aléatoire de code numerique
    generateId(length:number){
        let code='';
        for(let i = 0 ; i < length ;i++){
            const randomIndex = Math.floor(Math.random() * this._numeriqueCode.length);
            code += this._numeriqueCode[randomIndex];
        }
        return code;
    }

    //Methodes de generation de code alpha-numerique 
    generateKey(length:number){
        let code='';
        for(let i = 0 ; i < length ;i++){
            const randomIndex = Math.floor(Math.random() * this._alphaNumerique.length);
            code += this._alphaNumerique[randomIndex];
        }
        return code;
    }
}
/**
 * @type {GenerateCode} 
 * objet avec des methodes de generation de code numerique ou apha-numerique 
 */
export default new GenerateCode();