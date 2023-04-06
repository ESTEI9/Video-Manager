import { HttpErrorResponse, HttpRequest, HttpResponse, HttpStatusCode } from "@angular/common/http";

export const SessionError = (req: HttpRequest<any>) => {
    console.log(req);
    return new HttpResponse<HttpErrorResponse>({
        statusText: 'Invalid Session',
        status: HttpStatusCode.Unauthorized
    })
}