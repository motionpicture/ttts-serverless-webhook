/**
 * GMOルーター
 * @namespace routes.gmo
 */

import * as ttts from '@motionpicture/ttts-domain';

/**
 * gmo通知受信httpTrigger
 */
module.exports.notify = async (context: any, req: any) => {
    context.log('JavaScript HTTP trigger function processed a request.');

    const res: any = {};

    if (req.body.OrderID === undefined) {
        // res.send(RECV_RES_OK);
        res.status = 200;
        context.done(null, res);
        return;
    }

    // リクエストボディをDBに保管
    try {
        const notification = ttts.GMO.factory.resultNotification.creditCard.createFromRequestBody(req.body);
        const gmoNotificationRepo = new ttts.repository.GMONotification(ttts.mongoose.connection);
        await gmoNotificationRepo.save(notification);
        // debug('notification created.', notification);
        // res.send(RECV_RES_OK);
        res.status = 200;
        context.done(null, res);
    } catch (error) {
        // res.send(RECV_RES_NG);
        res.status = 400;
        context.done(null, res);
    }
}