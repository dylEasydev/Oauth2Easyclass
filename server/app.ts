import express,{Application} from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import{
    codeRoute,indexRoute,oauthRoute, signRoute
}from './router';

class ExpressApp{
    public expressServer: Application;

    constructor(){
        this.expressServer = express();
        this.configServer();
    }

    private configServer(){
        this.expressServer.use(bodyParser.json())
                          .use(bodyParser.urlencoded({extended:true}))
                          .use(cors())
                          .use('/',indexRoute)
                          .use('/',oauthRoute)
                          .use('/',signRoute)
                          .use('/',codeRoute)
                          .use('*',(req,res)=>{
                                res.redirect('/docs');
                          })
    }
}

export default new ExpressApp().expressServer