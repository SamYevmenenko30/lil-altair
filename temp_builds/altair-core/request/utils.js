export const simpleResponseObserver = (subscriber, url, requestStartTimestamp) => {
    return {
        next: (res) => {
            const requestEndTimestamp = Date.now();
            subscriber.next({
                ok: true,
                data: JSON.stringify(res),
                headers: new Headers(),
                status: 200,
                statusText: 'OK',
                url: url,
                requestStartTimestamp,
                requestEndTimestamp,
                resopnseTimeMs: requestEndTimestamp - requestStartTimestamp,
            });
        },
        error: (...args) => subscriber.error(...args),
        complete: () => subscriber.complete(),
    };
};
//# sourceMappingURL=utils.js.map