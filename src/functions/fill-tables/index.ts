import {handlerPath} from "@libs/handler-resolver";

export default {
    handler: `${handlerPath(__dirname)}/handler.fillTables`,
    events: [
        {
            http: {
                method: 'post',
                path: 'fill-tables',
                cors: true,
            }
        }
    ]
}
