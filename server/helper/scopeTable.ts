import readScope from "./readScope";

export class TableScope{
    static [key:string]:string[];
    static admin = readScope.readScopeApp('scopeAdmin').map(data=>{
        return data.scopeName
    });
    static student= readScope.readScopeApp('scopeStudent').map(data=>{
        return data.scopeName
    });
    static teacher = readScope.readScopeApp('scopeTeacher').map(data=>{
        return data.scopeName
    });
}