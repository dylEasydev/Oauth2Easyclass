import { 
    Client, Token,
    User,Role, AuthorizationCode 
} from '../init';

/*
asscocition One-to-Many entre  User et Client
(un utilisateur peu poccèder plusieurs comptes clients)
*/
User.hasMany(Client,{
    foreignKey:{
        name:'userId',
        allowNull:false
    },
    sourceKey:'id',
    hooks:true,
    onDelete:'CASCADE',
    as:'clients'
});

/**
 * association One-to-Many entre User et Token 
 * (un utilisateur peut avoir plusieur jeton d'accès)
 */
User.hasMany(Token,{
    foreignKey:{
        name:'userId',
        allowNull:false
    },
    sourceKey:'id',
    hooks:true,
    onDelete:'CASCADE',
    as:'tokens'
});

/**
 * association One-to-one entre User et Role
 * (un utilisateur à un seul role)
 */
User.hasOne(Role,{
    foreignKey:{
        name:'userId',
        allowNull:false
    },
    sourceKey:'id',
    hooks:true,
    onDelete:'CASCADE',
    as:'role'
});

/**
 * association One-to-One entre User et AuthorizationCode
 * (un utilisateur à plusieur code d'authorisation)
 */
User.hasMany(AuthorizationCode,{
    foreignKey:{
        name:'userId',
        allowNull:false
    },
    sourceKey:'id',
    hooks:true,
    onDelete:'CASCADE',
    as:'authCodes'
});

export {User};