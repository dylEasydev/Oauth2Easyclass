import readScope from './readScope';

export class TableScope{
    /**definition de clé pour la reconnaissance typescript */
    static [key:string]:(
        ()=>Promise<string[]>
    )|any

    /** methodes static de lectures des permissions des administrateur */
    static admin = async()=>{
        try {
            return (await readScope.readScopeApp('scopeAdmin')).map(data=>{
                return data.scopeName;
            });
        } catch (error) {
            Promise.reject(error);
        }
    } 

    /** mathodes static de lectures des permissions des étudiants */
    static student =async()=>{
        try {
            return (await readScope.readScopeApp('scopeStudent')).map(data=>{
                return data.scopeName;
            });
        } catch (error) {
            Promise.reject(error);
        }
    } 

    /**Methodes static de lectures des permissions des enseignats */
    static teacher =async()=>{
        try {
            return (await readScope.readScopeApp('scopeteacher')).map(data=>{
                return data.scopeName;
            });
        } catch (error) {
            Promise.reject(error);
        }
    } 
}