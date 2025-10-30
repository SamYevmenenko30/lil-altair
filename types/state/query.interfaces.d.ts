import { OperationDefinitionNode } from 'graphql';
import { IDictionary } from '../shared';
import { RequestHandlerIds } from '../../request/types';
export interface QueryEditorState {
    isFocused: boolean;
    cursorIndex?: number;
}
export interface QueryResponse {
    content: string;
    timestamp: number;
    json?: boolean;
}
export interface LogLine {
    id: string;
    time: number;
    text: string;
    source: string;
}
export type SelectedOperation = string | null;
export interface RequestHandlerInfo {
    requestHandlerId?: RequestHandlerIds;
    additionalParams?: string;
    subscriptionUseDefaultRequestHandler?: boolean;
    subscriptionUrl?: string;
    subscriptionConnectionParams?: string;
    subscriptionRequestHandlerId?: RequestHandlerIds;
}
export interface QueryState {
    url: string;
    subscriptionUrl: string;
    query?: string;
    selectedOperation?: SelectedOperation;
    operations?: OperationDefinitionNode[];
    httpVerb: HttpVerb;
    responses?: QueryResponse[];
    requestStartTime: number;
    requestEndTime: number;
    requestHandlerId?: RequestHandlerIds;
    requestHandlerAdditionalParams?: string;
    subscriptionUseDefaultRequestHandler?: boolean;
    responseTime: number;
    responseStatus: number;
    responseStatusText: string;
    responseHeaders?: IDictionary;
    showUrlAlert: boolean;
    urlAlertMessage: string;
    urlAlertSuccess: boolean;
    showEditorAlert: boolean;
    editorAlertMessage: string;
    editorAlertSuccess: boolean;
    subscriptionConnectionParams: string;
    subscriptionRequestHandlerId?: RequestHandlerIds;
    isSubscribed: boolean;
    autoscrollResponseList: boolean;
    requestScriptLogs?: LogLine[];
    requestExtensions?: string;
    queryEditorState: QueryEditorState;
}
export declare const HTTP_VERBS: readonly ["POST", "GET", "PUT", "DELETE"];
export type HttpVerb = (typeof HTTP_VERBS)[number];
//# sourceMappingURL=query.interfaces.d.ts.map