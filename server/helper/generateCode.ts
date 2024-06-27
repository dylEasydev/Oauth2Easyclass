class GenerateCode {
    private _numeriqueCode = "1234567890";
    private _alphaNumerique = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"+this._numeriqueCode;

    generateId(length:number){
        let code='';
        for(let i = 0 ; i < length ;i++){
            const randomIndex = Math.floor(Math.random() * this._numeriqueCode.length);
            code += this._numeriqueCode[randomIndex];
        }
        return code;
    }

    generateKey(length:number){
        let code='';
        for(let i = 0 ; i < length ;i++){
            const randomIndex = Math.floor(Math.random() * this._alphaNumerique.length);
            code += this._alphaNumerique[randomIndex];
        }
        return code;
    }
}

export default new GenerateCode();