import { Observer, Subscriber } from 'rxjs';
import { GraphQLResponseData } from './types';
export declare const simpleResponseObserver: (subscriber: Subscriber<GraphQLResponseData>, url: string, requestStartTimestamp: number) => Observer<unknown>;
//# sourceMappingURL=utils.d.ts.map